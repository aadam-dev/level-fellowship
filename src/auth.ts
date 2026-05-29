import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/password"; // server-only — not imported by middleware

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;
        if (!email || !password) return null;

        const user = await prisma.user.findUnique({
          where: { email: email.toLowerCase() },
          include: {
            candidate: true,
            enterprisePartner: true,
          },
        });
        if (!user) return null;

        const valid = await verifyPassword(password, user.passwordHash);
        if (!valid) return null;

        return {
          id: user.id,
          email: user.email,
          accountRole: user.accountRole,
          candidateId: user.candidate?.id,
          chapterId: user.candidate?.chapterId,
          enterprisePartnerId: user.enterprisePartner?.id,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/auth/login" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id!;
        token.id = user.id!;
        token.accountRole = user.accountRole;
        token.candidateId = user.candidateId;
        token.chapterId = user.chapterId;
        token.enterprisePartnerId = user.enterprisePartnerId;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.accountRole = token.accountRole;
        session.user.candidateId = token.candidateId as string | undefined;
        session.user.chapterId = token.chapterId as number | undefined;
        session.user.enterprisePartnerId = token.enterprisePartnerId as
          | string
          | undefined;
      }
      return session;
    },
  },
});
