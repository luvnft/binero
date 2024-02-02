import { type AppLoadContext, type Session, createCookieSessionStorage } from '@remix-run/cloudflare';

import { type SessionData } from '~/services/session';

function getSessionStorage(context: AppLoadContext) {
  return createCookieSessionStorage<SessionData>({
    cookie: {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secrets: [context.env.SESSION_SECRET],
      secure: import.meta.env.PROD,
    },
  });
}

export function getSession(context: AppLoadContext, request: Request) {
  return getSessionStorage(context).getSession(request.headers.get('Cookie'));
}

export function commitSession(context: AppLoadContext, session: Session<SessionData>) {
  return getSessionStorage(context).commitSession(session);
}
