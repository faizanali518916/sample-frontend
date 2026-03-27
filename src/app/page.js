import HomePage from "@/components/home/HomePage";
import { cookies } from "next/headers";
import { getLocaleFromCookieStore } from "@/lib/locale";

export default async function Home() {
  const cookieStore = await cookies();
  const locale = getLocaleFromCookieStore(cookieStore);

  return <HomePage locale={locale} />;
}
