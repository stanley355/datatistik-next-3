import { env } from "../env";
import { Session, User } from "../types";

const baseUrl = env.NEXT_PUBLIC_BETTER_AUTH_URL + "/api/auth";

type AuthErrorRes = {
  message: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isAuthError = (res: any): res is AuthErrorRes => {
  return (res as AuthErrorRes).message !== undefined && !("user" in res);
};

type AuthSignUpEmailParams = {
  name: string;
  email: string;
  password: string;
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

type AuthRequestPasswordResetRes =
  | {
      status: boolean;
      message: string;
    }
  | AuthErrorRes;
export const authRequestPasswordReset = async (
  email: string,
): Promise<AuthRequestPasswordResetRes | undefined> => {
  try {
    const res = await fetch(baseUrl + "/request-password-reset", {
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

type AuthResetPasswordRes =
  | {
      status: boolean;
    }
  | AuthErrorRes;
export const authResetPassword = async (
  newPassword: string,
  token: string,
): Promise<AuthResetPasswordRes | undefined> => {
  try {
    const res = await fetch(baseUrl + "/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newPassword, token }),
    });
    return await res.json();
  } catch (err) {
    console.error(err);
  }
};

type AuthGetSessionRes =
  | {
      session: Session;
      user: User;
    }
  | AuthErrorRes;
export const authGetSession = async (
  headers?: Record<string, string | null>,
): Promise<AuthGetSessionRes | undefined> => {
  try {
    const res = await fetch(baseUrl + "/get-session", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      credentials: "include",
    });
    return await res.json();
  } catch (err) {
    console.error(err);
  }
};

type AuthSignInEmailRes =
  | {
      redirect: boolean;
      token: string;
      url: string;
      user: User;
    }
  | AuthErrorRes;

export const authSignIn = async (
  email: string,
  password: string,
): Promise<AuthSignInEmailRes | undefined> => {
  try {
    const res = await fetch(baseUrl + "/sign-in/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
    return await res.json();
  } catch (err) {
    console.error(err);
  }
};

type AuthSignOutRes =
  | {
      success: boolean;
    }
  | AuthErrorRes;

export const authSignOut = async (): Promise<AuthSignOutRes | undefined> => {
  try {
    const res = await fetch(baseUrl + "/sign-out", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    return await res.json();
  } catch (err) {
    console.error(err);
  }
};
