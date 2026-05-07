import { env } from "../env";
import { UserSearch } from "../types";

const baseUrl = env.NEXT_PUBLIC_API_URL + "/user-search";
export const createUserSearch = async (
  keyword: string,
  user_id?: string,
): Promise<UserSearch | undefined> => {
  try {
    const res = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ keyword, user_id }),
    });
    return await res.json();
  } catch (err) {
    console.error(err);
  }
};
