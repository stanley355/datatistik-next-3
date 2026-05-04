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
  | {
      token: string;
      user: User;
    }
  | AuthErrorRes;

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

type AuthVerifyEmailRes =
  | {
      status: boolean;
      user: User;
    }
  | AuthErrorRes;
export const authVerifyEmail = async (
  token: string,
): Promise<AuthVerifyEmailRes | undefined> => {
  try {
    const res = await fetch(baseUrl + "/verify-email?token=" + token, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  } catch (err) {
    console.error(err);
  }
};

type AuthSendVerificationEmailRes =
  | {
      status: boolean;
    }
  | AuthErrorRes;
export const authSendVerificationEmail = async (
  email: string,
): Promise<AuthSendVerificationEmailRes | undefined> => {
  try {
    const res = await fetch(baseUrl + "/send-verification-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    return await res.json();
  } catch (err) {
    console.error(err);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isAuthError = (res: any): res is AuthErrorRes => {
  return (res as AuthErrorRes).message !== undefined && !("user" in res);
};
