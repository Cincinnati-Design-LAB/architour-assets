import "./globals.css";
import { getProviders } from "next-auth/react";
import { authOptions } from "@/app/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Clearyst Cloudinary Assets",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const providers = await getProviders();
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
    // return (
    //   <>
    //     Not signed in <br />
    //     <button onClick={() => signIn()}>Sign in</button>
    //   </>
    // );
  }

  console.log({ session });

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
