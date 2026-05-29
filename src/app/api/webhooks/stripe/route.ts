import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { syncLedgerFromStripeInvoice } from "@/server/billing/wakalah-controller";

export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!secret || !key) {
    return NextResponse.json({ received: true, mode: "noop" });
  }

  const stripe = new Stripe(key);
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, secret);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "invoice.paid") {
    const invoice = event.data.object as Stripe.Invoice;
    if (invoice.id) {
      await syncLedgerFromStripeInvoice(invoice.id, "cleared");
    }
  } else if (event.type === "invoice.payment_failed") {
    const invoice = event.data.object as Stripe.Invoice;
    if (invoice.id) {
      await syncLedgerFromStripeInvoice(invoice.id, "disputed");
    }
  }

  return NextResponse.json({ received: true });
}
