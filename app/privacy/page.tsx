import type { Metadata } from "next";

import PatternStrip from "@/components/PatternStrip";
import LegalProse from "@/components/pages/LegalProse";

export const metadata: Metadata = {
  title: "Privacy Policy | Anny",
  description:
    "How Anny collects, uses, and protects personal data for AI search analytics.",
};

export default function PrivacyPage() {
  return (
    <div>
      <PatternStrip />
      <LegalProse
        title="Privacy Policy"
        lastUpdated="July 26, 2026"
        intro='This Privacy Policy is issued by Anny (“Anny”, “we”, or “us”). For privacy questions, email privacy@dodoxhq.com. Formal notices should use the address on our Imprint page. We process data only as needed to provide and improve Anny, in a privacy-friendly way and in compliance with the EU General Data Protection Regulation (“GDPR”). This policy covers website visits, signup and onboarding, product use, communications, payments, and internal operations — including purposes, legal bases (Art. 6 GDPR), processors (Art. 28 GDPR), international transfers (Arts. 44 ff. GDPR), and your rights (Arts. 12–22 GDPR).'
        sections={[
          {
            heading: "(1) When you visit our website",
            body: [
              "In brief: We use our website to inform you about Anny, and we employ certain analytics and marketing tools to understand how the site is used and to reach interested users. We minimize personal data in this process. Our site is hosted by Vercel. We use cookies and similar technologies for analytics and advertising only with your consent.",
              "Purpose: To load the website for you and ensure its security and performance. With your permission, we also collect analytics data (e.g. page views, clicks) to understand site usage and improve content.",
              "Data & cookies: When you visit, we (or our analytics tools) may collect information such as your IP address, browser type/version, device identifiers, and referring site. Essential cookies are only used to make the site function (e.g. load balancing, security) and do not require consent. For analytics or ads, we use cookies or similar identifiers only if you opt in via our cookie consent banner. You can adjust preferences later or block nonessential cookies in your browser. Declining analytics cookies will not affect basic use of the site.",
              "Legal basis: Delivering the website and securing it relies on our legitimate interest (Art. 6(1)(f) GDPR). Analytics or advertising cookies rely on your consent (Art. 6(1)(a) GDPR).",
              "Processors: We use Vercel to host the website. For analytics we may use Google Analytics 4 (Google Ireland Ltd.) with IP truncation in the EU, Google Tag Manager to load tracking scripts, Microsoft Clarity (with consent) to understand interaction patterns, Google Ads for conversion measurement and remarketing (with consent), and PostHog for product analytics. These providers act as processors under GDPR. Some may transfer data to third countries (see section 7).",
            ],
          },
          {
            heading: "(2) When you sign up or onboard",
            body: [
              "In brief: When you register for an Anny account or join a waitlist or partner program (e.g. Agency & Creator Partner Program), we collect what we need to create and manage your account — typically email and an organization or team name. Authentication and account storage may use Firebase (Google Cloud). We keep registration data secure and only use it to provide the service.",
              "Purpose: To create your account, authenticate you, set up your workspace, and manage waitlists.",
              "Data collected: Email (verified via login link or confirmation), name and/or organization name, an internal user ID, and technical data such as IP address and device/browser info used to deliver login verification and detect suspicious access.",
              "Legal basis: Contract (Art. 6(1)(b) GDPR) — we need this data to provide the account and platform access you request.",
              "Processors: Firebase Auth and Google Cloud Firestore (Google Ireland Ltd.) for authentication and account storage; DocuSign where contracts include names. Some processors may transfer data to third countries (see section 7).",
              "Storage: We retain registration data while your account is active. Incomplete registrations or inactive waitlist entries may be deleted after a reasonable period. After account deletion, limited data may remain briefly in backups or logs, or as required by law.",
            ],
          },
          {
            heading: "(3) When you use our product",
            body: [
              "In brief: Once you use Anny, we process data to deliver the product, monitor and improve it, and support you. That includes content you enter, usage analytics, and support communications.",
              "Purpose: (A) Core product features; (B) product analytics and improvement; (C) customer support; (D) security and maintenance.",
              "Data collected: Information you provide or generate in the product (e.g. tracked domains, prompts, projects, results, metrics), usage events and error logs (typically tied to a user ID or aggregated), and in-app support messages and contact details if you use the support messenger.",
              "Legal basis: Mostly contract performance (Art. 6(1)(b) GDPR). Analytics and improvement may also rely on legitimate interest (Art. 6(1)(f) GDPR) in functionality, security, and usability.",
              "Processors: Google Cloud Platform for backend and databases; PostHog (preferably EU Cloud) for in-app usage analytics; Intercom for in-app support chat; Sentry for error and performance monitoring. We sign data processing agreements with each. Some may transfer data to third countries (see section 7).",
              "Storage: Content you create remains until you delete it or request account deletion. You can often delete or export data from the product. Deleted items are removed from live systems and purged from backups after a short period.",
            ],
          },
          {
            heading: "(4) Communications, contact, and meetings",
            body: [
              "In brief: Newsletters and marketing emails require consent and include an unsubscribe option. Users receive essential service emails as part of the product, plus optional product updates you can opt out of. If you contact us or book a meeting, we use the information you provide to respond.",
              "Data collected: Newsletter email (and name if provided) plus consent records; marketing and transactional emails; support message content; meeting booking details via scheduling tools (name, email, time slot, prep questions); CRM records (name, email, company, interaction context); and email engagement metrics (opens/clicks) where used.",
              "Legal basis: Consent (Art. 6(1)(a) GDPR) for newsletters, marketing, and demo scheduling. Contract (Art. 6(1)(b) GDPR) for transactional/service emails, support, and CRM needed to serve customers. Legitimate interest (Art. 6(1)(f) GDPR) for limited contact enrichment to keep records accurate.",
              "Processors: Email platforms (e.g. Loops), HubSpot CRM, scheduling tools (e.g. Cal.com, Default), optional enrichment tools (e.g. Clay, Apollo), and Google Workspace for inbound email. All operate under processing agreements. Some may transfer data to third countries (see section 7).",
              "Storage: Contact data is kept while you are subscribed or while needed for the purpose. After you unsubscribe, delete your account, or stop being a customer, we purge or anonymize communication history except records we must keep by law (e.g. invoices).",
            ],
          },
          {
            heading: "(5) When you make a payment",
            body: [
              "In brief: For paid plans we process billing information. We do not store full card numbers ourselves — Stripe is our payment processor.",
              "Purpose: To charge for the service, manage billing, and keep transaction histories for accounting and tax compliance.",
              "Data collected: Payment details entered into Stripe (card number, expiry, CVC, billing name/address), optional VAT/tax IDs, and Stripe tokens or truncated card references (e.g. last four digits) for invoices and renewals.",
              "Legal basis: Contract (Art. 6(1)(b) GDPR) for payment processing; legal obligation (Art. 6(1)(c) GDPR) for retaining financial records (often up to 10 years under applicable tax law).",
              "Processors: Stripe Payments Europe Ltd. (with Stripe, Inc. infrastructure). See section 7 for U.S. transfers.",
              "Storage: Full card numbers stay with Stripe. We retain billing contact details and transaction records for the legally required period.",
            ],
          },
          {
            heading: "(6) Internal operations and recruiting",
            body: [
              "In brief: We process personal data internally for administration — team communications, document storage, contracts, and job applications — primarily via Google Workspace and related tools.",
              "Purpose: Service delivery coordination, records, collaboration, and recruitment (applications, interviews, evaluation, and documentation).",
              "Data collected: Emails and chats with us; meeting content; customer/lead lists and contracts; recruitment materials (CV, cover letter, interview notes); and internal support notes.",
              "Legal basis: Contract (Art. 6(1)(b) GDPR) and/or legitimate interests (Art. 6(1)(f) GDPR).",
              "Processors: Google Workspace, document collaboration tools (e.g. Microsoft SharePoint), applicant tracking (e.g. Ashby), and Slack for internal chat — each under processing agreements. See section 7 for transfers.",
              "Storage: Kept only as long as needed. Contracts and tax-relevant records may be retained for statutory periods (often up to 10 years). Unsuccessful job applications are typically deleted within 6 months after the process ends unless you consent to longer retention for future roles.",
            ],
          },
          {
            heading: "(7) Third-country transfers",
            body: "Using providers such as Google, Stripe, Cal.com, HubSpot, Loops, DocuSign, Apollo, Clay, and others may involve transfers to the United States, the United Kingdom, or other third countries. Those processors are either certified under the EU–US Data Privacy Framework or bound by Standard Contractual Clauses approved by the European Commission. We only transfer data outside the EU where necessary and with appropriate safeguards.",
          },
          {
            heading: "(8) Your rights",
            body: [
              "Email privacy@dodoxhq.com for any privacy-related request. Under the GDPR you may request access, rectification, erasure, restriction, portability, objection, and withdrawal of consent, and you may lodge a complaint with your local supervisory authority.",
              "We will not charge for exercising these rights except in exceptional cases of manifestly unfounded or excessive requests permitted by the GDPR. We respond as soon as possible and within one month, or notify you if more time is needed for complex requests.",
            ],
          },
          {
            heading: "(9) Further information",
            body: [
              "Data security: We use appropriate technical and organizational measures, including encryption in transit (HTTPS) and at rest where applicable, secure credential management, software updates, and access limited to personnel who need it.",
              "Other recipients: We do not share your data outside Anny except with processors and when legally required.",
              "Processors and agreements: Processors operate under binding agreements and may only process data on our instructions.",
              "Automated decisions: We do not use personal data for automated decision-making (including profiling) with legal or similarly significant effects (Art. 22 GDPR).",
              "Children’s data: Anny is not directed to children under 16. We do not knowingly collect their data. If we learn we have, we will delete it.",
              "Changes: We may update this policy to reflect product or legal changes. Material changes will be announced by email or a prominent notice. The “Last updated” date always reflects the latest revision. Continued use after a change means you accept the revised policy.",
              "Contact: Questions about this Privacy Policy or how Anny handles data — privacy@dodoxhq.com.",
            ],
          },
        ]}
      />
    </div>
  );
}
