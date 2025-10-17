// sentry.client.config.ts
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,  // add this key in .env.local
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
  beforeSend(event) {
    // Remove sensitive data
    if (event.request?.headers?.cookie) {
      delete event.request.headers.cookie;
    }
    return event;
  },
});
//runtime React errors
//Failed network requests
//Uncaught exceptions in user browser
