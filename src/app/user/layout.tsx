import type { Metadata } from "next";
import DemoAccessNotice from "@/components/DemoAccessNotice";

export const metadata: Metadata = { robots: { index: false, follow: false } };
export default function UserLayout({ children }: { children: React.ReactNode }) { return <><DemoAccessNotice />{children}</>; }
