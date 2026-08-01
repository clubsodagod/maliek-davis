import { redirect } from "next/navigation";
import { requireJiraDashboardAdmin } from "../_utils/requireJiraDashboardAdmin";

export default async function NewJiraEntityPage() {
  await requireJiraDashboardAdmin();

  redirect("/admin/dashboard/jira/configure");
}
