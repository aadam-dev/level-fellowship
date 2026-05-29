-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "AccountRole" AS ENUM ('candidate', 'ambassador', 'enterprise', 'sys_admin');

-- CreateEnum
CREATE TYPE "SocietyType" AS ENUM ('IF_society', 'isoc_node');

-- CreateEnum
CREATE TYPE "EnrollmentType" AS ENUM ('university_student', 'non_student_aspirant');

-- CreateEnum
CREATE TYPE "RegistryStatus" AS ENUM ('incubating', 'verified_talent', 'placed');

-- CreateEnum
CREATE TYPE "ScrutinyStatus" AS ENUM ('pending', 'interviewed', 'approved', 'rejected');

-- CreateEnum
CREATE TYPE "FrameworkType" AS ENUM ('uni_licensing', 'corp_sponsorship', 'certification', 'talent_placement');

-- CreateEnum
CREATE TYPE "ShariahProtocol" AS ENUM ('wakalah_bil_ujrah', 'fixed_service_fee');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('pending', 'cleared', 'disputed');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('active', 'suspended', 'cancelled');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "account_role" "AccountRole" NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chapters" (
    "id" SERIAL NOT NULL,
    "university_name" VARCHAR(150) NOT NULL,
    "society_type" "SocietyType" NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "region_node" VARCHAR(50) NOT NULL DEFAULT 'UK-MIDLANDS',

    CONSTRAINT "chapters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "candidates" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "chapter_id" INTEGER NOT NULL,
    "current_semester" INTEGER NOT NULL DEFAULT 1,
    "academic_major" VARCHAR(100),
    "enrollment_type" "EnrollmentType" NOT NULL,
    "registry_status" "RegistryStatus" NOT NULL DEFAULT 'incubating',

    CONSTRAINT "candidates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "enterprise_partners" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "organization_name" VARCHAR(200) NOT NULL,
    "subscription_status" "SubscriptionStatus" NOT NULL DEFAULT 'active',

    CONSTRAINT "enterprise_partners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ambassador_vetting" (
    "id" SERIAL NOT NULL,
    "user_id" UUID NOT NULL,
    "chapter_id" INTEGER NOT NULL,
    "scrutiny_status" "ScrutinyStatus" NOT NULL DEFAULT 'pending',
    "assigned_by" UUID,
    "academic_credentials_url" TEXT,
    "statement_of_commitment_hash" VARCHAR(64),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ambassador_vetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "curriculum_modules" (
    "id" SERIAL NOT NULL,
    "module_code" VARCHAR(50) NOT NULL,
    "semester_index" INTEGER NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "content_url" TEXT,
    "workbook_url" TEXT,

    CONSTRAINT "curriculum_modules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "module_completions" (
    "id" SERIAL NOT NULL,
    "candidate_id" UUID NOT NULL,
    "semester_index" INTEGER NOT NULL,
    "module_code" VARCHAR(50) NOT NULL,
    "workbook_submitted" BOOLEAN NOT NULL DEFAULT false,
    "exam_score" INTEGER,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "module_completions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "revenue_ledger" (
    "id" UUID NOT NULL,
    "payer_id" UUID NOT NULL,
    "framework_type" "FrameworkType" NOT NULL,
    "shariah_protocol" "ShariahProtocol" NOT NULL DEFAULT 'wakalah_bil_ujrah',
    "amount_usd" DECIMAL(12,2) NOT NULL,
    "payment_status" "PaymentStatus" NOT NULL DEFAULT 'pending',
    "stripe_invoice_id" VARCHAR(100),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "revenue_ledger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chapter_events" (
    "id" SERIAL NOT NULL,
    "chapter_id" INTEGER NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "description" TEXT,
    "starts_at" TIMESTAMPTZ(6) NOT NULL,
    "capacity" INTEGER NOT NULL DEFAULT 100,
    "is_open_access" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "chapter_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_registrations" (
    "id" SERIAL NOT NULL,
    "event_id" INTEGER NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "enrollment_class" "EnrollmentType" NOT NULL,
    "qr_token" VARCHAR(100) NOT NULL,
    "candidate_id" UUID,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "event_registrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attendance_records" (
    "id" UUID NOT NULL,
    "registration_id" INTEGER NOT NULL,
    "event_id" INTEGER NOT NULL,
    "status_logged" VARCHAR(50) NOT NULL DEFAULT 'confirmed_present',
    "checked_in_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "checked_in_by" UUID,

    CONSTRAINT "attendance_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "placement_records" (
    "id" UUID NOT NULL,
    "enterprise_partner_id" UUID NOT NULL,
    "candidate_id" UUID NOT NULL,
    "annualized_base_salary_usd" DECIMAL(12,2) NOT NULL,
    "placement_fee_usd" DECIMAL(12,2) NOT NULL,
    "ledger_id" UUID,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "placement_records_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "candidates_user_id_key" ON "candidates"("user_id");

-- CreateIndex
CREATE INDEX "candidates_chapter_id_registry_status_idx" ON "candidates"("chapter_id", "registry_status");

-- CreateIndex
CREATE UNIQUE INDEX "enterprise_partners_user_id_key" ON "enterprise_partners"("user_id");

-- CreateIndex
CREATE INDEX "ambassador_vetting_user_id_scrutiny_status_idx" ON "ambassador_vetting"("user_id", "scrutiny_status");

-- CreateIndex
CREATE UNIQUE INDEX "curriculum_modules_module_code_key" ON "curriculum_modules"("module_code");

-- CreateIndex
CREATE INDEX "module_completions_candidate_id_semester_index_idx" ON "module_completions"("candidate_id", "semester_index");

-- CreateIndex
CREATE UNIQUE INDEX "module_completions_candidate_id_module_code_key" ON "module_completions"("candidate_id", "module_code");

-- CreateIndex
CREATE INDEX "revenue_ledger_payment_status_framework_type_idx" ON "revenue_ledger"("payment_status", "framework_type");

-- CreateIndex
CREATE UNIQUE INDEX "event_registrations_qr_token_key" ON "event_registrations"("qr_token");

-- CreateIndex
CREATE INDEX "event_registrations_event_id_email_idx" ON "event_registrations"("event_id", "email");

-- CreateIndex
CREATE UNIQUE INDEX "attendance_records_registration_id_key" ON "attendance_records"("registration_id");

-- CreateIndex
CREATE UNIQUE INDEX "placement_records_ledger_id_key" ON "placement_records"("ledger_id");

-- AddForeignKey
ALTER TABLE "candidates" ADD CONSTRAINT "candidates_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidates" ADD CONSTRAINT "candidates_chapter_id_fkey" FOREIGN KEY ("chapter_id") REFERENCES "chapters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enterprise_partners" ADD CONSTRAINT "enterprise_partners_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ambassador_vetting" ADD CONSTRAINT "ambassador_vetting_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ambassador_vetting" ADD CONSTRAINT "ambassador_vetting_chapter_id_fkey" FOREIGN KEY ("chapter_id") REFERENCES "chapters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ambassador_vetting" ADD CONSTRAINT "ambassador_vetting_assigned_by_fkey" FOREIGN KEY ("assigned_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "module_completions" ADD CONSTRAINT "module_completions_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "revenue_ledger" ADD CONSTRAINT "revenue_ledger_payer_id_fkey" FOREIGN KEY ("payer_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chapter_events" ADD CONSTRAINT "chapter_events_chapter_id_fkey" FOREIGN KEY ("chapter_id") REFERENCES "chapters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_registrations" ADD CONSTRAINT "event_registrations_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "chapter_events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_registrations" ADD CONSTRAINT "event_registrations_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance_records" ADD CONSTRAINT "attendance_records_registration_id_fkey" FOREIGN KEY ("registration_id") REFERENCES "event_registrations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance_records" ADD CONSTRAINT "attendance_records_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "chapter_events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "placement_records" ADD CONSTRAINT "placement_records_enterprise_partner_id_fkey" FOREIGN KEY ("enterprise_partner_id") REFERENCES "enterprise_partners"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "placement_records" ADD CONSTRAINT "placement_records_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
