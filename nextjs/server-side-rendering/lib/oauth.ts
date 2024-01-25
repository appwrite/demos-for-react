"use client";

export async function signInWithGithub() {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/account/sessions/oauth2/github`
  );

  const origin = window.location.origin;

  url.searchParams.set("project", process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);
  url.searchParams.set("success", `${origin}/auth`);
  url.searchParams.set("failure", `${origin}/signin`);

  /* Important: For SSR we set token=true to get a auth token in the success URL */
  url.searchParams.set("token", `true`);

  window.location.href = url.toString();
}
