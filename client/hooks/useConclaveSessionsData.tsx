import { useState, useEffect } from "react";

export interface Speaker {
  id: string;
  name: string;
  linkedinId: string;
  photo: string;
  bio?: string;
  startTime?: string;
  endTime?: string;
}

export interface ConclaveSession {
  id: string;
  name: string;
  description?: string;
  startTime?: string;
  endTime?: string;
  speakers: Speaker[];
  createdAt: number;
  isActive?: boolean;
}

const defaultSessions: ConclaveSession[] = [];
let sessionsRequest: Promise<ConclaveSession[]> | null = null;

function loadConclaveSessions(): Promise<ConclaveSession[]> {
  if (!sessionsRequest) {
    sessionsRequest = fetch("/data/sessions.json")
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Failed to load sessions (${response.status})`);
        }
        const data = await response.json();
        return Array.isArray(data.sessions) ? data.sessions : defaultSessions;
      })
      .catch((error) => {
        console.warn("Failed to load sessions:", error);
        sessionsRequest = null;
        return defaultSessions;
      });
  }
  return sessionsRequest;
}

export function useConclaveSessionsData() {
  const [sessions, setSessions] = useState<ConclaveSession[]>(defaultSessions);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    loadConclaveSessions().then((loadedSessions) => {
      if (active) {
        setSessions(loadedSessions);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  return {
    sessions,
    loading,
  };
}
