import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Sparkle } from "@phosphor-icons/react";
import Navigation from "../components/Navigation";

const sessionGroups = [
  {
    year: "2025",
    events: [
      {
        title: "Risk Management: Navigating Financial Uncertainties",
        description:
          "Understanding financial risks and strategies to manage uncertainty in today’s evolving market landscape.",
      },
    ],
  },
  {
    year: "2026",
    events: [
      {
        title: "Investor’s Dilemma: Can Risk and Safety Ever Agree?",
        description:
          "Exploring the balance between investment growth and financial security in uncertain conditions.",
      },
      {
        title: "Money Matters: Building Your Financial Future",
        description:
          "Discovering the fundamentals of financial planning, wealth creation, and long-term decision-making.",
      },
    ],
  },
];

export default function SessionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-finance-navy via-finance-navy-light to-finance-navy">
      <Navigation scrolled={true} />

      <div className="pt-28 pb-16 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-10">
            <Link
              to="/"
              className="inline-flex items-center space-x-2 text-finance-gold hover:text-finance-electric transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>

            <div className="rounded-3xl border border-finance-gold/20 bg-finance-navy/70 p-8 shadow-2xl backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-finance-gold to-finance-electric text-finance-navy">
                  <Calendar className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.32em] text-finance-electric/80">
                    Educational Series
                  </p>
                  <h1 className="text-4xl font-bold text-white">Sessions</h1>
                </div>
              </div>

              <p className="max-w-3xl text-lg text-foreground/80">
                Explore our curated session series across the latest editions,
                beginning with the 2025 chapter and continuing into the 2026
                cohort of finance learning experiences.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            {sessionGroups.map((group) => (
              <section
                key={group.year}
                className="rounded-3xl border border-finance-gold/20 bg-finance-navy/50 p-6 md:p-8"
              >
                <div className="mb-6 flex items-center justify-between gap-4 border-b border-finance-gold/15 pb-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-finance-electric/80">
                      Year
                    </p>
                    <h2 className="text-3xl font-bold text-finance-gold">
                      {group.year}
                    </h2>
                  </div>
                  <div className="rounded-full border border-finance-electric/30 bg-finance-electric/10 px-3 py-1 text-sm text-finance-electric">
                    {group.events.length} session{group.events.length > 1 ? "s" : ""}
                  </div>
                </div>

                <div className="space-y-4">
                  {group.events.map((event, index) => (
                    <div
                      key={`${group.year}-${index}`}
                      className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 transition-all duration-300 hover:border-finance-gold/40 hover:shadow-lg hover:shadow-finance-gold/10"
                    >
                      <div className="mb-3 flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-finance-gold to-finance-electric text-xs font-bold text-finance-navy">
                          {index + 1}
                        </div>
                        <h3 className="text-xl font-semibold text-white">
                          {event.title}
                        </h3>
                      </div>

                      <p className="text-foreground/75 leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-finance-electric/20 bg-finance-electric/5 p-6 text-center">
            <div className="mb-3 flex items-center justify-center text-finance-electric">
              <Sparkle className="mr-2 h-5 w-5" />
              <span className="text-sm uppercase tracking-[0.2em]">Session Series</span>
            </div>
            <p className="text-foreground/80">
              2025 opens with the foundational Risk Management session, while 2026
              continues with the remaining conversations in finance, investment, and
              personal planning.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
