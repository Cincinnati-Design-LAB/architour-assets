import SlackProvider from 'next-auth/providers/slack';

export const authOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    SlackProvider({
      clientId: process.env.SLACK_CLIENT_ID!,
      clientSecret: process.env.SLACK_CLIENT_SECRET!,
    }),
  ],
};
