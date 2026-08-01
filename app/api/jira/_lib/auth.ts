import { auth } from "@/auth";
import { JiraAppError } from "./errors";

export type JiraAdminIdentity = {
  userId: string;
  role: "admin";
};

/**
 * Resolves trusted Jira management identity from the Auth.js session.
 *
 * @returns The authenticated admin identity used for authorization and rate limits.
 * @throws JiraAppError when the user is missing or not an admin.
 */
export async function requireJiraAdmin(): Promise<JiraAdminIdentity> {
  const session = await auth();
  const user = session?.user;
  const userId = typeof user?._id === "string" ? user._id : "";
  const role = user?.role;

  if (!userId) {
    throw new JiraAppError("UNAUTHENTICATED", "Authentication required.");
  }

  if (role !== "admin") {
    throw new JiraAppError("UNAUTHORIZED", "Admin access required.");
  }

  return {
    userId,
    role,
  };
}
