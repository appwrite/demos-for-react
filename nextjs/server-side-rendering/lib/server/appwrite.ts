import { Client, Account, Users } from "luke-node-appwrite-ssr";
import { parseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";

export const SESSION_COOKIE = "a_session";

export function createAppwriteClient(
  headers: ReadonlyHeaders,
  clientOptions?: { setKey?: boolean; setSession?: boolean }
) {
  const { setKey = true, setSession = true } = clientOptions ?? {};
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

  /* Set the API key for the client, bypassing rate limiting and enabling
   * Appwrite to return the `secret` property in the sessions objects. */
  if (setKey) {
    client.setKey(process.env.APPWRITE_KEY!);
  }

  /* Optional step: set the forwarded headers to record the user's IP address
   * and user agent. */
  const origin = headers.get("origin");
  if (origin) {
    client.setForwardedFor(origin);
  }
  const userAgent = headers.get("user-agent");
  if (userAgent) {
    client.setForwardedUserAgent(userAgent);
  }

  /* Extract the session from cookies and use it for the client */
  const cookies = parseCookie(headers.get("cookie") ?? "");
  const session = cookies.get(SESSION_COOKIE);
  if (session && setSession) {
    client.setSession(session);
  }

  return {
    get account() {
      return new Account(client);
    },
  };
}

export async function getLoggedInUser(account: Account) {
  let user = null;
  try {
    user = await account.get();
  } catch (error) {
    console.error(error);
  }
  return user && user.$id ? user : null;
}
