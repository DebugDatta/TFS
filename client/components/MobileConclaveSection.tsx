import React from "react";

export default function MobileConclaveSection() {
  return (
    <section className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-b from-finance-navy to-finance-navy-light">
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white font-league-spartan">
            FLAGSHIP <span className="text-finance-teal">CONCLAVE</span>
          </h2>
          <div className="mb-8 rounded-xl border border-finance-teal/30 bg-finance-navy/50 py-16 sm:py-20">
            <div className="text-5xl sm:text-6xl mb-4">🚧</div>
            <h3 className="text-2xl sm:text-3xl font-bold text-finance-teal">
              Coming Soon
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
