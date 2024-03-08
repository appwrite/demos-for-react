import { createAdminClient, getLoggedInUser } from "@/lib/server/appwrite";

import { redirect } from "next/navigation";

export default async function Home() {
  const { account } = createAdminClient();

  const user = await getLoggedInUser(account);
  if (!user) redirect("/signin");

  redirect("/account");
}
