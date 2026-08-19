"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  ClipboardCheck,
  LockKeyhole,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Target,
  UsersRound,
} from "lucide-react";

type Answer = "not-yet" | "exploring" | "in-place";

type Question = {
  category: string;
  icon: typeof Target;
  title: string;
  description: string;
  prompt: string;
  detail: string;
};

const questions: Question[] = [
  {
    category: "Direction",
    icon: Target,
    title: "A clear reason to use AI",
    description: "Start with the outcomes that matter, not the tools.",
    prompt: "Does your team have a shared view of where AI can create value?",
    detail: "Examples: reducing repetitive work, improving customer response time, or creating better internal knowledge.",
  },
  {
    category: "People",
    icon: UsersRound,
    title: "Confidence across your team",
    description: "AI sticks when people know how to use it thoughtfully.",
    prompt: "Are people equipped to use AI in their everyday work?",
    detail: "This includes practical training, a safe space to try things, and examples that feel relevant to their role.",
  },
  {
    category: "Foundations",
    icon: BarChart3,
    title: "Useful, accessible data",
    description: "Good AI work starts with information you can trust.",
    prompt: "Can your team find and safely use the data and knowledge it needs?",
    detail: "Think about how current, organised, and accessible your important information is today.",
  },
  {
    category: "Trust",
    icon: ShieldCheck,
    title: "Simple rules for safe use",
    description: "Clarity creates momentum and protects the business.",
    prompt: "Do people know what is and is not okay to share with AI tools?",
    detail: "A useful policy is short, practical, and clear about privacy, customer data, and checking important outputs.",
  },
];

const options: { id: Answer; label: string; caption: string; score: number }[] = [
  { id: "not-yet", label: "Not yet", caption: "We have not started", score: 0 },
  { id: "exploring", label: "Exploring", caption: "A few early steps", score: 12 },
  { id: "in-place", label: "In place", caption: "This is working today", score: 25 },
];

const nextSteps = [
  {
    title: "Choose one high-value workflow",
    body: "Pick a small, repeatable task where better speed or quality would be easy to measure.",
    emphasis: "This week",
  },
  {
    title: "Give the team one shared playbook",
    body: "Document the approved tools, safe inputs, and a simple review step before work goes out.",
    emphasis: "Next 30 days",
  },
  {
    title: "Make learning visible",
    body: "Share prompt examples, wins, and failures so people can build confidence together.",
    emphasis: "Keep going",
  },
];

function scoreLabel(score: number) {
  if (score >= 88) return "AI momentum";
  if (score >= 63) return "Ready to build";
  if (score >= 38) return "Strong starting point";
  return "Early opportunity";
}

function scoreDescription(score: number) {
  if (score >= 88) return "You have the habits and foundations to move from experiments to repeatable AI advantage.";
  if (score >= 63) return "You have the right ingredients. A focused plan can turn good intent into dependable ways of working.";
  if (score >= 38) return "There is useful progress here. Now is the moment to make a few intentional choices and build confidence.";
  return "The opportunity is wide open. Start small, make the learning safe, and you will create meaningful momentum quickly.";
}

function CircularScore({ score }: { score: number }) {
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative grid size-44 place-items-center sm:size-52" aria-label={`${score} out of 100`}>
      <svg viewBox="0 0 112 112" className="size-full -rotate-90" aria-hidden="true">
        <circle cx="56" cy="56" r="45" fill="none" stroke="currentColor" strokeWidth="9" className="text-[#e5e1ff]" />
        <circle
          cx="56"
          cy="56"
          r="45"
          fill="none"
          stroke="url(#score-gradient)"
          strokeLinecap="round"
          strokeWidth="9"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-700 ease-out"
        />
        <defs>
          <linearGradient id="score-gradient" x1="12" y1="30" x2="100" y2="80" gradientUnits="userSpaceOnUse">
            <stop stopColor="#5939ee" />
            <stop offset="1" stopColor="#f35a93" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute text-center">
        <p className="text-5xl font-semibold tracking-[-0.08em] text-[#161334] sm:text-6xl">{score}</p>
        <p className="mt-1 text-[11px] font-bold tracking-[0.16em] text-[#6d6990] uppercase">out of 100</p>
      </div>
    </div>
  );
}

export function AiReadinessChecker() {
  const [stage, setStage] = useState<"intro" | "questions" | "results">("intro");
  const [active, setActive] = useState(0);
  const [answers, setAnswers] = useState<Partial<Record<number, Answer>>>({});

  const score = useMemo(
    () => Object.values(answers).reduce((total, answer) => total + (options.find((option) => option.id === answer)?.score ?? 0), 0),
    [answers],
  );
  const current = questions[active];
  const selected = answers[active];
  const progress = stage === "questions" ? ((active + (selected ? 1 : 0)) / questions.length) * 100 : 0;

  function choose(answer: Answer) {
    setAnswers((currentAnswers) => ({ ...currentAnswers, [active]: answer }));
  }

  function next() {
    if (!selected) return;
    if (active === questions.length - 1) {
      setStage("results");
      return;
    }
    setActive((currentIndex) => currentIndex + 1);
  }

  function reset() {
    setStage("intro");
    setActive(0);
    setAnswers({});
  }

  if (stage === "results") {
    return (
      <section className="overflow-hidden bg-[#f8f7ff] text-[#161334]">
        <div className="border-b border-[#e8e4ff] bg-white/80 px-5 py-4 backdrop-blur sm:px-8">
          <div className="mx-auto flex max-w-6xl items-center justify-between">
            <Brand />
            <button onClick={reset} className="inline-flex items-center gap-2 text-sm font-semibold text-[#5a45ce] transition hover:text-[#20125f]">
              <RotateCcw className="size-4" /> Start again
            </button>
          </div>
        </div>
        <div className="relative isolate overflow-hidden px-5 py-12 sm:px-8 sm:py-20">
          <div className="pointer-events-none absolute -top-32 left-1/2 -z-10 size-[38rem] -translate-x-1/2 rounded-full bg-[#d8d1ff]/55 blur-3xl" />
          <div className="pointer-events-none absolute right-[-8rem] bottom-[-9rem] -z-10 size-[28rem] rounded-full bg-[#ffd9e8]/60 blur-3xl" />
          <div className="mx-auto max-w-5xl">
            <div className="grid items-center gap-10 rounded-[2rem] border border-white bg-white/80 p-6 shadow-[0_24px_70px_rgba(79,56,174,0.10)] backdrop-blur sm:p-10 md:grid-cols-[1fr_1.15fr]">
              <div className="flex flex-col items-center justify-center rounded-3xl bg-[#f4f1ff] px-5 py-8 sm:py-10">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-bold tracking-wide text-[#6655c9] shadow-sm">
                  <Sparkles className="size-3.5" /> YOUR READINESS SCORE
                </div>
                <CircularScore score={score} />
                <p className="mt-3 text-lg font-bold text-[#392f80]">{scoreLabel(score)}</p>
              </div>
              <div>
                <p className="text-sm font-bold tracking-[0.15em] text-[#6d58d1] uppercase">Your snapshot</p>
                <h1 className="mt-3 max-w-xl text-4xl font-semibold tracking-[-0.055em] text-balance sm:text-5xl">You are closer than you think.</h1>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#625e7e]">{scoreDescription(score)}</p>
                <div className="mt-7 flex items-center gap-3 text-sm font-medium text-[#524b72]">
                  <span className="grid size-9 place-items-center rounded-xl bg-[#edebff] text-[#5b45d2]"><ClipboardCheck className="size-4" /></span>
                  Your three most useful moves are below.
                </div>
              </div>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {nextSteps.map((step, index) => (
                <article key={step.title} className="rounded-3xl border border-[#e5e0fa] bg-white p-6 shadow-[0_10px_35px_rgba(70,46,150,0.05)]">
                  <div className="flex items-center justify-between">
                    <span className="grid size-8 place-items-center rounded-full bg-[#eeeaff] text-sm font-bold text-[#5b45d2]">0{index + 1}</span>
                    <span className="text-xs font-bold tracking-wide text-[#9a91ba] uppercase">{step.emphasis}</span>
                  </div>
                  <h2 className="mt-5 text-lg font-bold tracking-tight">{step.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-[#6c6787]">{step.body}</p>
                </article>
              ))}
            </div>
            <div className="mt-8 flex flex-col items-center justify-between gap-5 rounded-3xl bg-[#29204f] px-6 py-6 text-white sm:flex-row sm:px-8">
              <div>
                <p className="font-bold">Want help turning this into a plan?</p>
                <p className="mt-1 text-sm text-[#c9c2ef]">Anny helps teams see where AI can make a measurable difference.</p>
              </div>
              <Link href="/register" className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#cfed67] px-5 py-3 text-sm font-bold text-[#25203c] transition hover:bg-[#dcf785]">Explore Anny <ArrowRight className="size-4" /></Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (stage === "questions") {
    const Icon = current.icon;
    return (
      <section className="min-h-[calc(100vh-73px)] bg-[#f8f7ff] px-5 py-5 text-[#161334] sm:px-8 sm:py-8">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Brand />
          <button onClick={reset} className="text-sm font-semibold text-[#777191] transition hover:text-[#3d316f]">Exit check</button>
        </div>
        <div className="mx-auto mt-8 max-w-3xl sm:mt-12">
          <div className="flex items-center justify-between text-xs font-bold tracking-[0.14em] text-[#777191] uppercase">
            <span>Question {active + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#e5e1f6]">
            <div className="h-full rounded-full bg-gradient-to-r from-[#5a3def] to-[#eb5a96] transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
          <div className="mt-7 rounded-[2rem] border border-white bg-white p-6 shadow-[0_20px_70px_rgba(79,56,174,0.10)] sm:mt-10 sm:p-10">
            <div className="grid size-12 place-items-center rounded-2xl bg-[#eeebff] text-[#5a42cf]"><Icon className="size-6" /></div>
            <p className="mt-6 text-sm font-bold tracking-[0.14em] text-[#775fd3] uppercase">{current.category}</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">{current.title}</h1>
            <p className="mt-3 text-lg leading-relaxed text-[#696381]">{current.description}</p>
            <div className="mt-8 rounded-2xl bg-[#f8f7ff] p-5 sm:p-6">
              <p className="text-lg font-semibold leading-snug sm:text-xl">{current.prompt}</p>
              <p className="mt-3 text-sm leading-6 text-[#77718f]">{current.detail}</p>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {options.map((option) => {
                const isSelected = selected === option.id;
                return (
                  <button key={option.id} onClick={() => choose(option.id)} aria-pressed={isSelected} className={`group rounded-2xl border p-4 text-left transition sm:min-h-28 ${isSelected ? "border-[#6045dc] bg-[#f1efff] shadow-[0_8px_22px_rgba(96,69,220,0.13)]" : "border-[#e6e2f4] bg-white hover:-translate-y-0.5 hover:border-[#bdb3ef] hover:bg-[#fbfaff]"}`}>
                    <span className={`flex size-5 items-center justify-center rounded-full border ${isSelected ? "border-[#6045dc] bg-[#6045dc] text-white" : "border-[#c9c3df]"}`}>{isSelected ? <Check className="size-3.5" /> : null}</span>
                    <span className="mt-3 block text-sm font-bold">{option.label}</span>
                    <span className="mt-1 block text-xs text-[#7c7694]">{option.caption}</span>
                  </button>
                );
              })}
            </div>
            <div className="mt-8 flex items-center justify-between border-t border-[#edeaf6] pt-6">
              <button onClick={() => setActive((value) => Math.max(0, value - 1))} disabled={active === 0} className="inline-flex items-center gap-2 text-sm font-semibold text-[#655e82] transition hover:text-[#302765] disabled:cursor-not-allowed disabled:opacity-35"><ChevronLeft className="size-4" /> Back</button>
              <button onClick={next} disabled={!selected} className="inline-flex items-center gap-2 rounded-xl bg-[#332863] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#473581] disabled:cursor-not-allowed disabled:opacity-40">{active === questions.length - 1 ? "See my score" : "Continue"}<ChevronRight className="size-4" /></button>
            </div>
          </div>
          <p className="mt-5 flex items-center justify-center gap-2 text-center text-xs text-[#8b85a2]"><LockKeyhole className="size-3.5" /> Your answers stay in this browser. No email required.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative isolate overflow-hidden bg-[#f8f7ff] text-[#161334]">
      <div className="pointer-events-none absolute -top-40 -left-32 -z-10 size-[37rem] rounded-full bg-[#e5ddff] opacity-75 blur-3xl" />
      <div className="pointer-events-none absolute top-16 right-[-16rem] -z-10 size-[38rem] rounded-full bg-[#ffdde9] opacity-70 blur-3xl" />
      <div className="border-b border-white/70 bg-white/55 px-5 py-4 backdrop-blur-sm sm:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between"><Brand /><span className="hidden items-center gap-2 text-sm font-semibold text-[#6d6785] sm:flex"><LockKeyhole className="size-4 text-[#5d45d3]" /> Private & free</span></div>
      </div>
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.12fr_.88fr] lg:items-center lg:gap-16 lg:py-24">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#dbd3ff] bg-white/80 px-3 py-1.5 text-xs font-bold tracking-[0.12em] text-[#634bc9] uppercase shadow-sm"><Sparkles className="size-3.5" /> Free AI readiness check</div>
          <h1 className="mt-6 max-w-2xl text-5xl font-semibold leading-[0.97] tracking-[-0.065em] text-balance sm:text-6xl lg:text-7xl">Get clear on your <span className="text-[#6145d9]">AI next move.</span></h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#66617d] sm:text-xl">A thoughtful 3-minute check-in for teams who want to use AI with more confidence, clarity, and momentum.</p>
          <button onClick={() => setStage("questions")} className="group mt-8 inline-flex items-center gap-3 rounded-2xl bg-[#31265d] px-6 py-4 text-base font-bold text-white shadow-[0_12px_25px_rgba(50,38,93,0.22)] transition hover:-translate-y-0.5 hover:bg-[#493880]">Start my free check <span className="grid size-6 place-items-center rounded-lg bg-white/15 transition group-hover:translate-x-0.5"><ArrowRight className="size-4" /></span></button>
          <p className="mt-4 flex items-center gap-2 text-sm text-[#807a95]"><Check className="size-4 text-[#6a51d4]" /> No sign-up. No jargon. Just useful next steps.</p>
        </div>
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="absolute inset-6 rounded-[2.5rem] bg-[#6a4ce0] blur-3xl opacity-20" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white bg-white/85 p-5 shadow-[0_30px_80px_rgba(73,53,145,0.16)] backdrop-blur sm:p-7">
            <div className="flex items-center justify-between"><div className="flex items-center gap-3"><div className="grid size-10 place-items-center rounded-xl bg-[#eeebff] text-[#6045d8]"><CircleHelp className="size-5" /></div><div><p className="text-xs font-bold tracking-[0.12em] text-[#817a9f] uppercase">A quick preview</p><p className="text-sm font-bold">What we will explore</p></div></div><span className="rounded-full bg-[#f0edff] px-3 py-1 text-xs font-bold text-[#674fc7]">4 areas</span></div>
            <div className="mt-6 space-y-3">
              {questions.map((question, index) => { const Icon = question.icon; return <div key={question.category} className="flex items-center gap-4 rounded-2xl border border-[#edeaf5] bg-white px-4 py-3.5"><span className="grid size-8 place-items-center rounded-xl bg-[#f4f2ff] text-xs font-bold text-[#664dce]">0{index + 1}</span><Icon className="size-4 text-[#756a9d]" /><span className="text-sm font-semibold">{question.category}</span><Check className="ml-auto size-4 text-[#b5acd6]" /></div>; })}
            </div>
            <div className="mt-6 rounded-2xl bg-[#29204f] px-5 py-4 text-white"><div className="flex items-center gap-3"><div className="grid size-9 place-items-center rounded-xl bg-[#cfed67] text-[#29204f]"><Sparkles className="size-4" /></div><div><p className="text-sm font-bold">Leave with a simple score</p><p className="mt-0.5 text-xs text-[#c7c0e8]">And three practical moves for your team.</p></div></div></div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/80 bg-white/50 px-5 py-5 sm:px-8"><div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-9 gap-y-3 text-sm font-semibold text-[#7f7895]"><span>Built for thoughtful teams</span><span className="hidden size-1.5 rounded-full bg-[#d0c9eb] sm:block" /><span>Practical, not theoretical</span><span className="hidden size-1.5 rounded-full bg-[#d0c9eb] sm:block" /><span>Free to use, anytime</span></div></div>
    </section>
  );
}

function Brand() {
  return <Link href="/" className="flex items-center gap-2.5"><span className="grid size-8 place-items-center rounded-lg bg-[#332863] text-sm font-bold text-[#cfed67]">a</span><span className="text-lg font-bold tracking-[-0.04em] text-[#29204f]">anny</span></Link>;
}
