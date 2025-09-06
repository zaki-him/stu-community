import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://84286091a3baf341d1c23eee5f4f009e@o4509974095200256.ingest.de.sentry.io/4509974097166416",
  integrations: [
    Sentry.feedbackIntegration({
      // Additional SDK configuration goes in here, for example:
      colorScheme: "system",
    }),
  ],
});