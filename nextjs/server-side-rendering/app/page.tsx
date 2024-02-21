import { createSessionClient, getLoggedInUser } from "@/lib/server/appwrite";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const { account } = createSessionClient(headers());

  const user = await getLoggedInUser(account);
  if (!user) redirect("/signin");

  redirect("/account");
}
