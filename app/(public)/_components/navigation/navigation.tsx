import { SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";

export const Navigation = () => {
  return (
    <div className="border-b">
      <div className="flex items-center justify-between container mx-auto">
        <Link href="/" className="p-2 font-bold text-lg font-mono">
          DELIFUNDS
        </Link>

        <SidebarTrigger />
      </div>
    </div>
  );
};
