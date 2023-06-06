import { AuthOptions } from 'next-auth';
import SlackProvider from 'next-auth/providers/slack';

export const authOptions: AuthOptions = {
  secret: process.env.AUTH_SECRET!,
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        path: '/',
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      },
    },
    callbackUrl: {
      name: `__Secure-next-auth.callback-url`,
      options: {
        path: '/',
        sameSite: 'none',
        secure: true,
      },
    },
    csrfToken: {
      name: `__Host-next-auth.csrf-token`,
      options: {
        path: '/',
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      },
    },
  },
  providers: [
    SlackProvider({
      clientId: process.env.SLACK_CLIENT_ID!,
      clientSecret: process.env.SLACK_CLIENT_SECRET!,
    }),
  ],
};
