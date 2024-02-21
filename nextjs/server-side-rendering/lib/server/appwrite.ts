import { Client, Account, Models } from "node-appwrite";
import { parseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";

export const SESSION_COOKIE = "a_session";

export function createSessionClient(headers: ReadonlyHeaders) {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

  const cookies = parseCookie(headers.get("cookie") ?? "");
  const session = cookies.get(SESSION_COOKIE);
  if (session) {
    client.setSession(session);
  }

  return {
    get account() {
      return new Account(client);
    },
  };
}

export function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
    .setKey(process.env.NEXT_APPWRITE_KEY);

  return {
    get account() {
      return new Account(client);
    },
  };
}

export async function getLoggedInUser(
  account: Account
): Promise<Models.User<Models.Preferences> | undefined> {
  try {
    return await account.get();
  } catch {}
}
