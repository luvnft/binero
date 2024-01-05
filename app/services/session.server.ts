import { type Session, createCookieSessionStorage } from '@remix-run/node';

import { type SessionData } from '~/services/session';

const sessionStorage = createCookieSessionStorage<SessionData>({
  cookie: {
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === 'production',
  },
});

export function getSession(request: Request) {
  return sessionStorage.getSession(request.headers.get('Cookie'));
}

export function commitSession(session: Session<SessionData>) {
  return sessionStorage.commitSession(session);
}
