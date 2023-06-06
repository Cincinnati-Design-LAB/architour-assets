import { authOptions } from '@/app/auth/[...nextauth]/route';
import { ALLOWED_USER_EMAILS } from '@/utils/constants';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import './globals.css';

export const metadata = {
  title: 'Clearyst Cloudinary Assets',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // const providers = await getProviders();
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/signin');
    // return (
    //   <>
    //     Not signed in <br />
    //     <button onClick={() => signIn()}>Sign in</button>
    //   </>
    // );
  }

  // console.log({ session });
  if (!session?.user?.email || !ALLOWED_USER_EMAILS.includes(session?.user?.email)) {
    return (
      <html lang="en">
        <body>Access denied</body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
