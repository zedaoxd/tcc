import { isAuthenticated } from "@/supabase/auth";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await isAuthenticated();
  return <div>{children}</div>;
}
