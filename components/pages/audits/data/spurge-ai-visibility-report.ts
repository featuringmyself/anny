import type { VisibilityReport } from "../types";

/**
 * SPURGE Rentals AI visibility report.
 */
const SHOT = "/audits/spurge";

export const spurgeAiVisibilityReport: VisibilityReport = {
  slug: "spurge-rentals-ai-visibility-report",
  company: "SPURGE Rentals",
  website: "spurge.rentals",
  industry: "Business laptop rentals",
  preparedFor: "Farzeen",
  dateLabel: "August 2026",
  overallScore: 30,
  scoreLabel: "Poor",
  summary:
    "On general business-laptop category prompts (India-wide, Bangalore, B2B startups, and MacBook/remote/ onboarding use-cases), ChatGPT does not shortlist SPURGE Rentals. It does show up on more operational + finance-aware prompts: “renewed laptop rental for corporate fleet India”, “laptop rental company with reconciliation ready rental logs India” (ranked #1), and “doorstep delivery and pickup for laptop rentals India”. Brand trust checks are mixed but directional: the model treats SPURGE as a real entity yet still cautions about limited independent proof before paying—so the sprint should convert operational citations into trust-safe positioning.",
  stats: [
    { label: "ICP", value: "IT admin & HR / Admin" },
    { label: "Geo baseline", value: "Bengaluru (multi-city list)" },
    { label: "Must-win categories", value: "B2B + onboarding + temporary teams" },
  ],
  modelScores: [
    { model: "chatgpt", visibility: 30, cited: 3, total: 10, audited: true },
    { model: "perplexity", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "ai-overview", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "gemini", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "claude", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "ai-mode", visibility: 0, cited: 0, total: 0, audited: false },
  ],
  competitors: [
    { name: "Sumo Technologies", visibility: 60 },
    { name: "Techvity", visibility: 30 },
    { name: "Rentio", visibility: 30 },
    { name: "Unitech Microsystems", visibility: 30 },
    { name: "SPURGE Rentals", visibility: 30 },
    { name: "Optivantage Technologies", visibility: 20 },
    { name: "Swish Club", visibility: 20 },
    { name: "Rental Bunny", visibility: 20 },
  ],
  queriesHeadline: "Prompt audit · 10 queries",
  queriesIntro:
    "The discovery prompts cover broad business-laptop shortlists across India/Bangalore and several operational use-cases (B2B startups, MacBooks, remote employees, and onboarding teams). In this screenshot pack, SPURGE Rentals is absent from most general category shelves, but it is cited on finance/operations-aware prompts (renewed corporate fleet shortlist, reconciliation-ready rental logs with SPURGE ranked #1, and doorstep delivery/pickup).",
  brandCrisis: [
    {
      id: "crisis-is-spurge-reliable",
      query: "is SPURGE reliable",
      title: "Real entity, but independent proof is thin",
      body:
        "When asked about “SPURGE IT SERVICES,” the model describes it as a real, registered Indian company (active since 2018). However it also avoids calling it highly reliable: it frames SPURGE as a very small/unlisted entity with limited independent customer feedback, even though it notes at least one positive employee review.",
      outcome: "Trust partial · real, not fully proven",
      screenshot: {
        src: `${SHOT}/01-is-spurge-reliable.png`,
        alt: "ChatGPT answering “is SPURGE reliable” with real-but-cautious framing",
        model: "chatgpt",
      },
    },
    {
      id: "crisis-is-spurge-rentals-reliable",
      query: "is spurge.rentals reliable",
      title: "Real operator, still cautions before expensive rental pay",
      body:
        "The model says SPURGE Rentals appears to be a real operating business, but recommends caution before paying—especially for an expensive laptop rental. It points to a physical Bengaluru office address, LinkedIn presence, and detailed rental terms (including upfront payment and deposit/PDC cheque language), while also noting that the strongest searchable info comes mainly from SPURGE’s own website and LinkedIn rather than a large body of independent customer reviews.",
      outcome: "Trust partial · cautious before payment",
      screenshot: {
        src: `${SHOT}/02-is-spurge-rentals-reliable.png`,
        alt: "ChatGPT answering “is spurge.rentals reliable” as real-but-cautious",
        model: "chatgpt",
      },
    },
  ],
  queries: [
    {
      id: "q1",
      query: "best laptop rental company for businesses India",
      intent:
        "Category shelf: first shortlist buyers build when they shop for business laptop rentals in India",
      severity: "high",
      citedBrands: ["Sumo Technologies", "Computer Junction", "Rental Plaza", "LaptopRent"],
      rentokStatus: "missing",
      outcome: "Absent from the business-laptop India shortlist",
      screenshot: {
        src: `${SHOT}/03-best-laptop-rental-company-for-businesses-india.png`,
        alt: "ChatGPT business laptop rental shortlist for India without SPURGE Rentals",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "ChatGPT shortlists Sumo Technologies, Computer Junction, Rental Plaza, and LaptopRent for business laptop rentals in India. SPURGE Rentals is not named.",
        },
      ],
    },
    {
      id: "q2",
      query: "alternatives to AAA Rental LLP",
      intent:
        "Competitor switching: when buyers search for AAA Rental LLP alternatives, which brands get recommended instead",
      severity: "high",
      citedBrands: [
        "Sumo Technologies",
        "Unitech Microsystems",
        "Optivantage Technologies",
        "LaptopRent.in",
        "Shreeji Computers",
        "ComputerRent.in",
        "Anantaa Technologies",
        "APPmac Infotech",
      ],
      rentokStatus: "missing",
      outcome: "Absent on the alternatives shelf (competitors fill the table)",
      screenshot: {
        src: `${SHOT}/04-alternatives-to-aaa-rental-llp.png`,
        alt: "ChatGPT alternatives to AAA Rental LLP without SPURGE Rentals",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "The alternatives list includes Sumo Technologies, Unitech Microsystems, Optivantage Technologies, LaptopRent.in, Shreeji Computers, ComputerRent.in, Anantaa Technologies, and APPmac Infotech. SPURGE Rentals is not included in the table shown.",
        },
      ],
    },
    {
      id: "q3",
      query: "best laptop rental company for businesses in Bangalore",
      intent:
        "Geo shortlist defense: Bengaluru business-laptop rental shelf where SPURGE should be considered",
      severity: "high",
      citedBrands: [
        "Techvity IT Solutions",
        "Rentorzo",
        "Vmbea Infotech",
        "ABCOM Private Limited",
        "The Server Hub",
        "AAA RENTAL LLP",
      ],
      rentokStatus: "missing",
      outcome: "Absent from the Bengaluru business shortlist",
      screenshot: {
        src: `${SHOT}/05-best-laptop-rental-company-for-businesses-in-bangalore.png`,
        alt: "ChatGPT Bengaluru business laptop rentals shortlist without SPURGE Rentals",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "ChatGPT lists Techvity IT Solutions, Rentorzo, Vmbea Infotech, ABCOM Private Limited, The Server Hub, and AAA RENTAL LLP for Bengaluru business laptop rentals. SPURGE Rentals is not shown in the shortlist.",
        },
      ],
    },
    {
      id: "q4",
      query: "B2B laptop rental for startups India",
      intent: "ICP: startups/enterprise B2B laptop rentals prompt",
      severity: "high",
      citedBrands: [
        "Sumo Technologies",
        "Techvity",
        "RentLappy",
        "LaptopCentral",
        "Rental Bunny",
        "Rentio",
        "Swish Club",
      ],
      rentokStatus: "missing",
      outcome: "Absent from the B2B startup vendor shortlist",
      screenshot: {
        src: `${SHOT}/06-b2b-laptop-rental-for-startups-india.png`,
        alt: "ChatGPT B2B laptop rental for startups India shortlist without SPURGE Rentals",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "The B2B startup shortlist lists Sumo Technologies, Techvity, RentLappy, LaptopCentral, Rental Bunny, Rentio, and Swish Club. SPURGE Rentals is not included.",
        },
      ],
    },
    {
      id: "q5",
      query: "MacBook rental for companies India",
      intent: "Use-case: MacBook rentals for companies/teams in India",
      severity: "high",
      citedBrands: [
        "Rentio",
        "AppMac Infotech",
        "TrueTech Services",
        "Unitech Microsystems",
        "Sumo Technologies",
        "Rental Bunny",
      ],
      rentokStatus: "missing",
      outcome: "Absent from the MacBook rental for companies list",
      screenshot: {
        src: `${SHOT}/07-macbook-rental-for-companies-india.png`,
        alt: "ChatGPT MacBook rental for companies India without SPURGE Rentals",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "The MacBook rental list includes Rentio, AppMac Infotech, TrueTech Services, Unitech Microsystems, Sumo Technologies, and Rental Bunny. SPURGE Rentals does not appear in the screenshot evidence.",
        },
      ],
    },
    {
      id: "q6",
      query: "laptop rental for remote employees India",
      intent: "Use-case: remote workforce laptop rental providers in India",
      severity: "high",
      citedBrands: ["APPMAC Infotech", "TriYantra", "Rentio", "ComputerRent", "Diamond Red IT Solution"],
      rentokStatus: "missing",
      outcome: "Absent on the remote-employees options list",
      screenshot: {
        src: `${SHOT}/08-laptop-rental-for-remote-employees-india.png`,
        alt: "ChatGPT laptop rental for remote employees India without SPURGE Rentals",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "ChatGPT lists APPMAC Infotech, TriYantra, Rentio, ComputerRent, and Diamond Red IT Solution for remote employees. SPURGE Rentals is not included in the screenshot evidence.",
        },
      ],
    },
    {
      id: "q7",
      query: "corporate laptop rental for onboarding teams India",
      intent:
        "Onboarding feature prompt: provisioning + imaging/MDM + delivery/swap/replacement framing",
      severity: "high",
      citedBrands: [
        "ABCOM Private Limited",
        "Rental Plaza",
        "Madhu Infotech India Pvt LTD",
        "LaptopKart",
        "Optivantage Technologies",
        "Sumo Technologies",
      ],
      rentokStatus: "missing",
      outcome: "Absent from the onboarding-teams shortlisting",
      screenshot: {
        src: `${SHOT}/09-corporate-laptop-rental-for-onboarding-teams-india.png`,
        alt: "ChatGPT corporate laptop rental for onboarding teams India without SPURGE Rentals",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "The onboarding-teams list shown includes ABCOM Private Limited, Rental Plaza, Madhu Infotech India Pvt LTD, LaptopKart, Optivantage Technologies, and Sumo Technologies. SPURGE Rentals is not shown.",
        },
      ],
    },
    {
      id: "q8",
      query: "renewed laptop rental for corporate fleet India",
      intent: "Use-case: renewed/refurbished corporate fleet laptop rentals",
      severity: "high",
      citedBrands: [
        "Maxicom Global",
        "MicroApts Technologies",
        "SPURGE Rentals",
        "Sumo Technologies",
        "Swish Club",
        "Sirius Star",
      ],
      rentokStatus: "cited",
      outcome: "Recommended on the renewed corporate fleet vendor shortlist",
      screenshot: {
        src: `${SHOT}/10-renewed-laptop-rental-for-corporate-fleet-india.png`,
        alt: "ChatGPT renewed laptop rental for corporate fleet India including SPURGE Rentals",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: true,
          excerpt:
            "In the renewed/corporate-fleet shortlist, ChatGPT explicitly includes SPURGE Rentals alongside Maxicom Global, MicroApts Technologies, Sumo Technologies, Swish Club, and Sirius Star.",
        },
      ],
    },
    {
      id: "q9",
      query: "laptop rental company with reconciliation ready rental logs India",
      intent: "Finance/ops feature: reconciliation-ready rental logs for customer/device/account and rental-date alignment",
      severity: "high",
      citedBrands: ["SPURGE Rentals", "Techvity IT Solutions", "RentInvoice", "AssetShield"],
      rentokStatus: "cited",
      outcome: "Best match #1 for reconciliation-ready rental logs",
      screenshot: {
        src: `${SHOT}/11-laptop-rental-company-reconciliation-ready-rental-logs-india.png`,
        alt: "ChatGPT reconciliation-ready rental logs India ranking SPURGE Rentals #1",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: true,
          position: 1,
          excerpt:
            "ChatGPT ranks SPURGE Rentals #1 for reconciliation-ready rental logs, describing “rental recon”/monthly reconciliation, automated logs, and support. Techvity IT Solutions, RentInvoice, and AssetShield follow.",
        },
      ],
    },
    {
      id: "q10",
      query: "doorstep delivery and pickup for laptop rentals India",
      intent: "Operations: doorstep delivery + pickup/returns for laptop rentals",
      severity: "high",
      citedBrands: ["Rentit4me", "RentEZ", "Shreeji Computers", "Unitech Microsystems", "OrCon", "SPURGE Rentals"],
      rentokStatus: "cited",
      outcome: "Included on the doorstep delivery/pickup shortlist",
      screenshot: {
        src: `${SHOT}/12-doorstep-delivery-and-pickup-for-laptop-rentals-india.png`,
        alt: "ChatGPT doorstep delivery and pickup for laptop rentals India including SPURGE Rentals",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: true,
          excerpt:
            "The doorstep delivery/pickup list includes SPURGE Rentals (alongside Rentit4me, RentEZ, Shreeji Computers, Unitech Microsystems, and OrCon).",
        },
      ],
    },
  ],
  sprint: {
    name: "AI Visibility Audit",
    duration: "One-time",
    headline: "How AI perceives SPURGE Rentals today (screenshot-backed)",
    body: "Populate discovery prompts with the provided screenshot pack to confirm whether SPURGE is cited/recommended and at what rank. Then translate the gaps into a focused, credibility-first action plan across model engines.",
    outcomes: [
      "Screenshot-backed confirmation of cited status and rank (no fabrication)",
      "Clear competitor share from discovery prompts only",
      "Brand-trust exhibit selection (recommended via two crisis screenshots)",
      "A short, credible next-step plan tied to the missing evidence",
    ],
  },
  ctaLabel: "Book the analysis",
  ctaEyebrow: "One-time service",
  ctaHeadline: "Ready to see where AI cites SPURGE (with proof)?",
  ctaBody:
    "Share the SPURGE screenshot pack for the prompt audit run. We’ll then confirm citations/ranks with screenshot proof, quantify visibility from discovery prompts, and leave you with a practical fix plan across the gaps.",
  brandCrisisHeadline: "Brand trust & reliability exhibits (proof-backed)",
  brandCrisisDek:
    "Two short exhibits should show where SPURGE is reliable (or where it collides / warns).",
};

