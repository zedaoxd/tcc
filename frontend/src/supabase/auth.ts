import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { RedirectType, redirect } from "next/navigation";

export async function isAuthenticated() {
  let loggedIn = false;
  try {
    const supabase = createServerComponentClient({ cookies });
    const {
      data: { session },
    } = await supabase.auth.getSession();

    loggedIn = session !== null;
  } catch (error) {
    console.log(`isAuthenticated error`, error);
  } finally {
    if (!loggedIn) {
      redirect("/", RedirectType.replace);
    }
  }
}
