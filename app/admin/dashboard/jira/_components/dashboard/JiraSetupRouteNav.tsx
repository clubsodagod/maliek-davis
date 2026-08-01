import Link from "next/link";
import { Button, Stack } from "@mui/material";

export interface JiraSetupRouteNavProps {
  setupId: string;
  activeRoute: "preview" | "run" | "results";
}

const setupRouteItems: Array<{
  route: JiraSetupRouteNavProps["activeRoute"];
  label: string;
}> = [
  { route: "preview", label: "Preview" },
  { route: "run", label: "Run" },
  { route: "results", label: "Results" },
];

export function JiraSetupRouteNav({ setupId, activeRoute }: JiraSetupRouteNavProps) {
  return (
    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
      {setupRouteItems.map((item) => {
        const selected = item.route === activeRoute;

        return (
          <Button
            key={item.route}
            component={Link}
            href={`/admin/dashboard/jira/setups/${setupId}/${item.route}`}
            variant={selected ? "contained" : "outlined"}
            aria-current={selected ? "page" : undefined}
          >
            {item.label}
          </Button>
        );
      })}
    </Stack>
  );
}
