import { LANGUAGES } from "@/lib/constant/languages";
import { usePathname, useRouter } from "next/navigation";

export const useLanguage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [_, currentLanguage] = pathname.split("/");

  const setLanguage = (newLanguage: (typeof LANGUAGES)[number]) => {
    const newPathname = pathname.split("/");
    if (LANGUAGES.includes(currentLanguage)) {
      newPathname.splice(1, 1, newLanguage);
      router.push(newPathname.join("/"));
      return;
    }
    newPathname.splice(1, 1, "id");
    router.push(newPathname.join("/"));
    return;
  };

  return {
    language: LANGUAGES.includes(currentLanguage) ? currentLanguage : "id",
    setLanguage,
  };
};
