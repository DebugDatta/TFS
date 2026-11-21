import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Clock, Users, ArrowSquareOut as ExternalLink } from "@phosphor-icons/react";
import { useConclaveSessionsData } from "../hooks/useConclaveSessionsData";

export default function TFS2025ConclaveContent() {
  const { sessions, loading } = useConclaveSessionsData();
  const [expandedSessions, setExpandedSessions] = useState<Set<string>>(
    () => new Set(),
  );

  useEffect(() => {
    if (sessions.length > 0) {
      setExpandedSessions((current) =>
        current.size === 0 ? new Set([sessions[0].id]) : current,
      );
    }
  }, [sessions]);

  const toggleSession = useCallback((sessionId: string) => {
    setExpandedSessions((current) => {
      const next = new Set(current);
      if (next.has(sessionId)) next.delete(sessionId);
      else next.add(sessionId);
      return next;
    });
  }, []);

  const stats = useMemo(() => ({
    totalSessions: sessions.length,
    expertSpeakers: sessions.reduce((total, session) => total + session.speakers.length, 0),
    uniqueExperts: new Set(
      sessions.flatMap((session) => session.speakers.map((speaker) => speaker.id)),
    ).size,
  }), [sessions]);

  if (loading) {
    return <div className="text-center py-8 text-foreground/60">Loading sessions...</div>;
  }

  return (
    <div>
      <div className="space-y-4 sm:space-y-6 mb-8">
        {sessions.map((session) => {
          const isExpanded = expandedSessions.has(session.id);
          return (
            <div
              key={session.id}
              className="bg-gradient-to-br from-finance-navy/80 to-finance-navy-light/50 border border-finance-teal/30 rounded-xl overflow-hidden"
            >
              <button
                type="button"
                onClick={() => toggleSession(session.id)}
                aria-expanded={isExpanded}
                aria-controls={`tfs-2025-speakers-${session.id}`}
                className="w-full p-4 sm:p-6 text-left hover:bg-finance-teal/5 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl sm:text-2xl font-bold text-finance-teal mb-2">
                      {session.name}
                    </h3>
                    {session.description && (
                      <p className="text-foreground/70 text-sm mb-3">
                        {session.description}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm">
                      {(session.startTime || session.endTime) && (
                        <div className="flex items-center gap-2 text-finance-mint">
                          <Clock className="w-4 h-4 flex-shrink-0" />
                          <span>
                            {session.startTime || "—"} {session.endTime && `to ${session.endTime}`}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-finance-electric">
                        <Users className="w-4 h-4 flex-shrink-0" />
                        <span>
                          {session.speakers.length} Speaker{session.speakers.length !== 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-finance-teal text-xl flex-shrink-0">
                    {isExpanded ? "−" : "+"}
                  </div>
                </div>
              </button>

              {isExpanded && (
                <div
                  id={`tfs-2025-speakers-${session.id}`}
                  className="border-t border-finance-teal/20 px-4 sm:px-6 py-4 sm:py-6 space-y-4"
                >
                  {session.speakers.map((speaker) => (
                    <div
                      key={speaker.id}
                      className="bg-finance-navy/50 rounded-lg p-3 sm:p-4 border border-finance-teal/20"
                    >
                      <div className="flex gap-3 sm:gap-4">
                        {speaker.photo && (
                          <img
                            src={speaker.photo}
                            alt={speaker.name}
                            loading="lazy"
                            className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg object-cover flex-shrink-0"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = "none";
                            }}
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-finance-teal mb-1 text-sm sm:text-base">
                            {speaker.name}
                          </div>
                          {speaker.bio && (
                            <p className="text-xs text-foreground/70 mb-2">{speaker.bio}</p>
                          )}
                          {(speaker.startTime || speaker.endTime) && (
                            <div className="flex items-center gap-2 text-finance-mint text-xs mb-2">
                              <Clock className="w-3 h-3 flex-shrink-0" />
                              <span>
                                {speaker.startTime || "—"} {speaker.endTime && `to ${speaker.endTime}`}
                              </span>
                            </div>
                          )}
                          {speaker.linkedinId && (
                            <a
                              href={
                                speaker.linkedinId.startsWith("http")
                                  ? speaker.linkedinId
                                  : `https://linkedin.com/in/${speaker.linkedinId}`
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-finance-electric text-xs hover:text-finance-teal transition-colors"
                            >
                              LinkedIn
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-finance-teal/10 to-finance-mint/10 rounded-lg p-4 sm:p-6 border border-finance-teal/30 text-center">
          <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-finance-teal mb-2">
            {stats.totalSessions}
          </div>
          <div className="text-xs sm:text-sm text-foreground/70">Total Sessions</div>
        </div>
        <div className="bg-gradient-to-br from-finance-mint/10 to-finance-teal/10 rounded-lg p-4 sm:p-6 border border-finance-mint/30 text-center">
          <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-finance-mint mb-2">
            {stats.expertSpeakers}
          </div>
          <div className="text-xs sm:text-sm text-foreground/70">Expert Speakers</div>
        </div>
        <div className="bg-gradient-to-br from-finance-electric/10 to-finance-teal/10 rounded-lg p-4 sm:p-6 border border-finance-electric/30 text-center">
          <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-finance-electric mb-2">
            {stats.uniqueExperts}
          </div>
          <div className="text-xs sm:text-sm text-foreground/70">Unique Experts</div>
        </div>
      </div>
    </div>
  );
}
