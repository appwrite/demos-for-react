import { createSessionClient, getLoggedInUser } from "@/lib/server/appwrite";
import { redirect } from "next/navigation";
import { SESSION_COOKIE } from "@/lib/server/const";

import { cookies } from "next/headers";

function getInitials(name: string) {
  const [first, last] = name.split(" ");
  if (last) return `${first[0]}${last[0]}`;
  return `${first[0]}`;
}

async function signOut() {
  "use server";

  const { account } = await createSessionClient();

  cookies().delete(SESSION_COOKIE);
  await account.deleteSession("current");

  redirect("/signin");
}

export default async function HomePage() {
  const user = await getLoggedInUser();
  if (!user) redirect("/signin");

  return (
    <div className="u-max-width-500 u-width-full-line">
      <h1 className="heading-level-2 u-margin-block-start-auto">
        Your account
      </h1>
      <div className="u-margin-block-start-24">
        <section className="card">
          <div className="user-profile">
            <span className="avatar">{getInitials(user.name)}</span>
            <span className="user-profile-info">
              <span className="name">{user.email}</span>
              <div className="interactive-text-output u-padding-inline-0">
                <span className="text">{user.$id}</span>
                <div className="u-flex u-cross-child-start u-gap-8">
                  <button
                    className="interactive-text-output-button"
                    aria-label="copy text"
                  >
                    <span className="icon-duplicate" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </span>
            <span className="user-profile-sep" />
            <span className="user-profile-empty-column" />
            <span className="user-profile-info">
              <span className="text">Welcome back, {user.name}!</span>
            </span>
          </div>
        </section>
        <form className="form common-section" action={signOut}>
          <ul
            className="form-list"
            style={{ "--form-list-gap": "1.5rem" } as React.CSSProperties}
          >
            <li className="form-item">
              <button
                className="button is-secondary is-full-width"
                type="submit"
              >
                Sign out
              </button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
}
