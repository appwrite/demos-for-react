"use server";

import { NextResponse } from "next/server";
import { createAdminClient } from "./appwrite";
import { headers } from "next/headers";

export async function signInWithGithub() {
  const { account } = createAdminClient();

  const origin = headers().get("origin");
  const successUrl = `${origin}/oauth`;
  const failureUrl = `${origin}/signin`;

  const redirectUrl = await account.createOAuth2Token(
    "github",
    successUrl,
    failureUrl
  );

  return NextResponse.redirect(redirectUrl);
}
