export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || "";

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("config", GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

type GTagEvent = {
  action: string;
  category: string;
  label: string;
  value?: number;
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: GTagEvent) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Custom events for tutorial tracking
export const trackTutorialStarted = (tutorialId: string, category: string) => {
  event({
    action: "tutorial_started",
    category: "engagement",
    label: `${category}/${tutorialId}`,
  });
};

export const trackTutorialCompleted = (tutorialId: string, duration: number) => {
  event({
    action: "tutorial_completed",
    category: "engagement",
    label: tutorialId,
    value: duration,
  });
};

export const trackCodeCopied = (tutorialId: string, codeBlockId: string) => {
  event({
    action: "code_copied",
    category: "interaction",
    label: `${tutorialId}/${codeBlockId}`,
  });
};

export const trackSearchPerformed = (query: string, resultsCount: number) => {
  event({
    action: "search_performed",
    category: "search",
    label: query,
    value: resultsCount,
  });
};

export const trackFeedbackSubmitted = (helpful: boolean, tutorialId: string) => {
  event({
    action: "feedback_submitted",
    category: "feedback",
    label: `${tutorialId}/${helpful ? "helpful" : "not_helpful"}`,
  });
};
