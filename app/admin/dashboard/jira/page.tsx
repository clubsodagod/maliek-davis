import { JiraDashboardShell } from "./_components/dashboard";
import { requireJiraDashboardAdmin } from "./_utils/requireJiraDashboardAdmin";

export default async function JiraTopLevelPage() {
  await requireJiraDashboardAdmin();
  return <JiraDashboardShell />;
}
