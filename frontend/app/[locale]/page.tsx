import { redirect } from 'next/navigation';

export default async function RootPage({ params }: { params: Promise<{ locale: string }> }) {
  // Await params to get the locale
  const { locale } = await params;
  
  // Redirect to dashboard as that's the main application
  redirect(`/${locale}/dashboard`);
}