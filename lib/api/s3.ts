import { env } from "../env";
import { Api, S3Image } from "../types";

const baseUrl = env.NEXT_PUBLIC_API_URL + "/s3";
export const uploadImages = async (
  files: File[] | null,
): Promise<Api<S3Image[]> | undefined> => {
  if (!files) {
    return undefined;
  }
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("images", file);
  });

  try {
    const response = await fetch(`${baseUrl}/images`, {
      method: "POST",
      headers: {},
      body: formData,
      credentials: "include",
    });

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};
