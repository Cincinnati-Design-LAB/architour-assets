import './globals.css';

export const metadata = {
  title: 'Clearyst Cloudinary Assets',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
