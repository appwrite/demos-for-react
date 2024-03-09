"use server";

import { createAdminClient } from "./appwrite";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function signInWithGithub() {
  const { account } = await createAdminClient();

  const origin = headers().get("origin");
  const successUrl = `${origin}/oauth`;
  const failureUrl = `${origin}/signin`;

  const redirectUrl = await account.createOAuth2Token(
    "github",
    successUrl,
    failureUrl
  );

  redirect(redirectUrl);
}
