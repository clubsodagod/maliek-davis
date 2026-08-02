import Link from "next/link";
import {
  Alert,
  Box,
  Chip,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { ArrowForward, SyncProblem } from "@mui/icons-material";
import type { WorkQueueItem, WorkQueueView as WorkQueueViewModel } from "../../_types";
import type { WorkStatusSlug } from "../../_config/workManagement";
import { jiraClassNames } from "../../_theme";
import { questionSearchParam, statusWorkPath } from "../../_utils/workRouting";
import { WorkQueueToolbar } from "./WorkQueueToolbar";

export interface WorkQueueViewProps {
  projectKey: string;
  queue: WorkQueueViewModel;
}

function itemHref(projectKey: string, item: WorkQueueItem, statusSlug: WorkStatusSlug): string {
  if (item.issueTypeSlug === "subtask") {
    return `${statusWorkPath(projectKey, "subtask", statusSlug)}?${questionSearchParam(item.issueKey)}`;
  }
  return statusWorkPath(projectKey, item.issueTypeSlug, statusSlug);
}

function progressPercent(item: WorkQueueItem): number {
  return item.progress.total === 0
    ? 0
    : Math.round((item.progress.completed / item.progress.total) * 100);
}

function WorkItemCard({
  projectKey,
  item,
  statusSlug,
}: {
  projectKey: string;
  item: WorkQueueItem;
  statusSlug: WorkStatusSlug;
}) {
  return (
    <Paper
      component={Link}
      href={itemHref(projectKey, item, statusSlug)}
      className={jiraClassNames.interactivePanel}
      sx={{
        p: 2,
      }}
    >
      <Stack spacing={1.5}>
        <Stack direction="row" spacing={1} justifyContent="space-between">
          <Stack spacing={0.75} minWidth={0}>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Chip label={item.issueKey} size="small" />
              <Chip label={item.issueType} size="small" />
              <Chip label={item.status} size="small" />
              {item.overdue ? <Chip label="Overdue" size="small" /> : null}
              {item.scheduleRisk && !item.overdue ? (
                <Chip label="Schedule risk" size="small" />
              ) : null}
            </Stack>
            <Typography component="h3" variant="h6" sx={{ lineHeight: 1.16 }}>
              {item.summary}
            </Typography>
            <Typography variant="body2">
              {item.workstream?.summary ?? item.parent?.summary ?? item.ref}
            </Typography>
          </Stack>
          <ArrowForward aria-hidden="true" />
        </Stack>

        <Stack spacing={0.75}>
          <Stack direction="row" justifyContent="space-between" spacing={2}>
            <Typography variant="caption">
              {item.progress.label}
            </Typography>
            <Typography variant="caption">
              {item.recommendedAction.label}
            </Typography>
          </Stack>
          <LinearProgress
            className={jiraClassNames.progressDense}
            variant="determinate"
            value={progressPercent(item)}
          />
        </Stack>

        {item.synchronizationHealth.jira !== "synced" ? (
          <Typography variant="caption">
            {item.synchronizationHealth.message ?? "Jira sync pending"}
          </Typography>
        ) : null}
      </Stack>
    </Paper>
  );
}

export function WorkQueueView({ projectKey, queue }: WorkQueueViewProps) {
  return (
    <Stack spacing={3}>
      <WorkQueueToolbar
        projectKey={projectKey}
        statusSlug={queue.filters.statusSlug}
        taskTypeSlug={queue.filters.taskTypeSlug}
        search={queue.filters.search}
        sort={queue.filters.sort}
      />

      {queue.partialSynchronization ? (
        <Alert severity="warning" icon={<SyncProblem aria-hidden="true" />}>
          {queue.synchronizationHealth.message ?? "Some Jira synchronization state is pending."}
        </Alert>
      ) : null}

      <Paper
        className={jiraClassNames.panel}
        sx={{
          p: { xs: 2.5, md: 3 },
        }}
      >
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between" spacing={2}>
            <Stack spacing={0.5}>
              <Typography component="h2" variant="h5">
                {queue.filters.taskTypeSlug
                  ? `${queue.filters.status} ${queue.filters.taskTypeSlug}`
                  : `${queue.filters.status} Work`}
              </Typography>
              <Typography variant="body2">
                {queue.counts.total} items
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {queue.counts.byStatus.map((item) => (
                <Chip key={item.statusSlug} label={`${item.status}: ${item.count}`} size="small" />
              ))}
            </Stack>
          </Stack>

          {queue.items.length === 0 ? (
            <Box
              className={jiraClassNames.emptyState}
              sx={{
                p: 2,
              }}
            >
              <Typography variant="body2">
                No work items match this queue.
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", lg: "repeat(2, minmax(0, 1fr))" },
                gap: 1.5,
              }}
            >
              {queue.items.map((item) => (
                <WorkItemCard
                  key={`${item.issueKey}-${item.version}`}
                  projectKey={projectKey}
                  item={item}
                  statusSlug={queue.filters.statusSlug}
                />
              ))}
            </Box>
          )}
        </Stack>
      </Paper>
    </Stack>
  );
}
