import { signInWithGithub } from "@/lib/server/oauth";
import {
  SESSION_COOKIE,
  createAdminClient,
  getLoggedInUser,
} from "@/lib/server/appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function signInWithEmail(formData: FormData) {
  "use server";

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { account } = createAdminClient();
  const session = await account.createEmailPasswordSession(email, password);

  cookies().set(SESSION_COOKIE, session.secret, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });

  redirect("/account");
}

export default async function SignInPage() {
  const { account } = createAdminClient();

  const user = await getLoggedInUser(account);
  if (user) redirect("/account");

  return (
    <div className="u-max-width-500 u-width-full-line">
      <h1 className="heading-level-2 u-margin-block-start-auto">
        Demo sign in
      </h1>
      <div className="u-margin-block-start-24">
        <form className="form common-section" action={signInWithEmail}>
          <ul
            className="form-list"
            style={{ "--form-list-gap": "1.5rem" } as React.CSSProperties}
          >
            <li className="form-item">
              <p>
                This is a demo project for{" "}
                <a href="https://appwrite.io">Appwrite</a> server side
                rendering. View the source code on the{" "}
                <a
                  className="link"
                  href="https://github.com/appwrite/demos-for-svelte"
                >
                  GitHub repository
                </a>
                .
              </p>
            </li>
            <li className="form-item">
              <label className="label is-required" htmlFor="email">
                Email
              </label>
              <div className="input-text-wrapper">
                <input
                  id="email"
                  placeholder="Email"
                  type="email"
                  className="input-text"
                  autoComplete="off"
                />
              </div>
            </li>
            <li className="form-item">
              <label className="label is-required" htmlFor="password">
                Password
              </label>
              <div
                className="input-text-wrapper"
                style={{ "--amount-of-buttons": "1" } as React.CSSProperties}
              >
                <input
                  id="password"
                  placeholder="Password"
                  minLength={8}
                  type="password"
                  className="input-text"
                  autoComplete="off"
                />
                <button
                  type="button"
                  className="show-password-button"
                  aria-label="show password"
                >
                  <span aria-hidden="true" className="icon-eye" />
                </button>
              </div>
            </li>
            <li className="form-item">
              <button className="button is-full-width" type="submit">
                Sign in
              </button>
            </li>
            <span className="with-separators eyebrow-heading-3">or</span>
            <li className="form-item">
              <form action={signInWithGithub}>
                <button
                  className="button is-github is-full-width"
                  type="submit"
                >
                  <span className="icon-github" aria-hidden="true" />
                  <span className="text">Sign in with GitHub</span>
                </button>
              </form>
            </li>
          </ul>
        </form>
      </div>
      <ul className="inline-links is-center is-with-sep u-margin-block-start-32">
        <li className="inline-links-item">
          <span className="text">
            Don't have an account?{" "}
            <a className="link" href="/signup">
              Sign up
            </a>
          </span>
        </li>
      </ul>
    </div>
  );
}
