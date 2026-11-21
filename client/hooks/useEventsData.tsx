import { useState, useEffect, useMemo } from "react";

interface EventItem {
  title: string;
  description?: string;
  link?: string;
}

interface EventGroup {
  year: string;
  events?: EventItem[];
}

interface EventDetails {
  id: string;
  title: string;
  events?: EventItem[];
  eventGroups?: EventGroup[];
  comingSoon?: boolean;
}

interface UpcomingEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  registrationLink: string;
  countdown: {
    days: number;
    hours: number;
    minutes: number;
  };
}

interface EventsConfig {
  pastEvents: {
    [key: string]: {
      events?: EventItem[];
      groups?: EventGroup[];
      comingSoon?: boolean;
    };
  };
  upcomingEvents: UpcomingEvent[];
}

const defaultConfig: EventsConfig = {
  pastEvents: {
    "saturday-sessions": { events: [], comingSoon: false },
    "networking-events": { comingSoon: true },
    "flagship-event": { comingSoon: true },
  },
  upcomingEvents: [],
};
let eventsRequest: Promise<EventsConfig> | null = null;

function loadEventsConfig(): Promise<EventsConfig> {
  if (!eventsRequest) {
    eventsRequest = fetch("/data/events.json")
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Failed to load events (${response.status})`);
        }
        return (await response.json()) as EventsConfig;
      })
      .catch((error) => {
        console.warn("Failed to load events:", error);
        eventsRequest = null;
        return defaultConfig;
      });
  }
  return eventsRequest;
}

export function useEventsData() {
  const [config, setConfig] = useState<EventsConfig>(defaultConfig);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    loadEventsConfig().then((loadedConfig) => {
      if (active) {
        setConfig(loadedConfig);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const getTitleFromId = (id: string): string => {
    const titleMap: { [key: string]: string } = {
      "saturday-sessions": "Sessions",
      "networking-events": "Networking Events",
      "flagship-event": "THE FINANCE SYMPOSIUM 2025",
    };
    return titleMap[id] || id;
  };

  const eventDetails = useMemo((): EventDetails[] => {
    return Object.entries(config.pastEvents).map(([id, eventConfig]) => ({
      id,
      title: getTitleFromId(id),
      events: eventConfig.events,
      eventGroups: eventConfig.groups,
      comingSoon: eventConfig.comingSoon,
    }));
  }, [config.pastEvents]);

  const sortedUpcomingEvents = useMemo((): UpcomingEvent[] => {
    return [...config.upcomingEvents].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      if (dateA.getTime() === dateB.getTime()) {
        const timeA = parseTimeString(a.time);
        const timeB = parseTimeString(b.time);
        return timeA - timeB;
      }

      return dateA.getTime() - dateB.getTime();
    });
  }, [config.upcomingEvents]);

  const parseTimeString = (timeStr: string): number => {
    try {
      const cleanTime = timeStr.toLowerCase().trim();

      if (cleanTime.includes("am") || cleanTime.includes("pm")) {
        const [time, period] = cleanTime.split(/\s+/);
        const [hours, minutes = "0"] = time.split(":").map(Number);

        let hour24 = hours;
        if (period.includes("pm") && hours !== 12) {
          hour24 += 12;
        } else if (period.includes("am") && hours === 12) {
          hour24 = 0;
        }

        return hour24 * 60 + minutes;
      }

      const [hours, minutes = "0"] = cleanTime.split(":").map(Number);
      return hours * 60 + minutes;
    } catch (error) {
      console.warn(`Failed to parse time string: ${timeStr}`);
      return 0;
    }
  };

  return {
    loading,
    eventDetails,
    upcomingEvents: sortedUpcomingEvents,
    rawConfig: config,
  };
}
