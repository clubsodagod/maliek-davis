import { describe, expect, it } from "vitest";
import {
  normalizeProjectKeySlug,
  normalizeTaskTypeSlug,
  normalizeWorkStatusSlug,
  projectWorkPath,
  statusWorkPath,
} from "@/app/admin/dashboard/jira/_utils/workRouting";

describe("Jira work routing", () => {
  it("normalizes project keys and supported route slugs", () => {
    expect(normalizeProjectKeySlug("pbmlv")).toBe("PBMLV");
    expect(normalizeTaskTypeSlug("SubTask")).toBe("subtask");
    expect(normalizeWorkStatusSlug("in-progress")).toBe("in-progress");
  });

  it("rejects unknown task type and status slugs", () => {
    expect(normalizeTaskTypeSlug("initiative")).toBeNull();
    expect(normalizeWorkStatusSlug("waiting")).toBeNull();
  });

  it("builds canonical admin Jira work paths", () => {
    expect(projectWorkPath("PBMLV")).toBe("/admin/dashboard/jira/PBMLV/work");
    expect(statusWorkPath("PBMLV", "subtask", "ready")).toBe(
      "/admin/dashboard/jira/PBMLV/work/subtask/ready",
    );
  });
});
