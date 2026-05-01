import { env } from "../env";
import { User } from "../types";

const baseUrl = env.NEXT_PUBLIC_BETTER_AUTH_URL + "/api/auth";

type AuthSignUpEmailParams = {
  name: string;
  email: string;
  password: string;
};

type AuthErrorRes = {
  message: string;
};

type AuthSignUpEmailRes =
  | AuthErrorRes
  | {
      token: string;
      user: User;
    };

export const authSignUpEmail = async (
  params: AuthSignUpEmailParams,
): Promise<AuthSignUpEmailRes | undefined> => {
  try {
    const res = await fetch(baseUrl + "/sign-up/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    return await res.json();
  } catch (err) {
    console.error(err);
  }
};
