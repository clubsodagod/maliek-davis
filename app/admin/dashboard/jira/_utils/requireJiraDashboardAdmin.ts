import { auth } from "@/auth";
import { redirect } from "next/navigation";
import type { JiraAdminIdentity } from "@/app/api/jira/_lib/auth";

export async function requireJiraDashboardAdmin(): Promise<JiraAdminIdentity> {
  const session = await auth();
  const userId = typeof session?.user?._id === "string" ? session.user._id : "";

  if (!userId || session?.user?.role !== "admin") {
    redirect("/");
  }

  return {
    userId,
    role: "admin",
  };
}
