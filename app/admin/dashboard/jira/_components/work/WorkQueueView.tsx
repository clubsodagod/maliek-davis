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
import { questionSearchParam, statusWorkPath } from "../../_utils/workRouting";
import { WorkQueueToolbar } from "./WorkQueueToolbar";

const mutedText = "rgba(248, 247, 255, 0.68)";

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
      elevation={0}
      sx={{
        display: "block",
        p: 2,
        borderRadius: 1,
        border: "1px solid rgba(255, 255, 255, 0.12)",
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        color: "inherit",
        textDecoration: "none",
        transition: "border-color 160ms ease, background-color 160ms ease",
        "&:hover, &:focus-visible": {
          borderColor: "rgba(144, 202, 249, 0.58)",
          backgroundColor: "rgba(144, 202, 249, 0.08)",
        },
        "&:focus-visible": {
          outline: "2px solid rgba(144, 202, 249, 0.9)",
          outlineOffset: 2,
        },
      }}
    >
      <Stack spacing={1.5}>
        <Stack direction="row" spacing={1} justifyContent="space-between">
          <Stack spacing={0.75} minWidth={0}>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Chip label={item.issueKey} size="small" color="primary" />
              <Chip label={item.issueType} size="small" />
              <Chip label={item.status} size="small" />
              {item.overdue ? <Chip label="Overdue" color="error" size="small" /> : null}
              {item.scheduleRisk && !item.overdue ? (
                <Chip label="Schedule risk" color="warning" size="small" />
              ) : null}
            </Stack>
            <Typography component="h3" variant="h6" sx={{ lineHeight: 1.16 }}>
              {item.summary}
            </Typography>
            <Typography variant="body2" sx={{ color: mutedText }}>
              {item.workstream?.summary ?? item.parent?.summary ?? item.ref}
            </Typography>
          </Stack>
          <ArrowForward color="primary" aria-hidden="true" />
        </Stack>

        <Stack spacing={0.75}>
          <Stack direction="row" justifyContent="space-between" spacing={2}>
            <Typography variant="caption" sx={{ color: mutedText }}>
              {item.progress.label}
            </Typography>
            <Typography variant="caption" sx={{ color: mutedText }}>
              {item.recommendedAction.label}
            </Typography>
          </Stack>
          <LinearProgress
            variant="determinate"
            value={progressPercent(item)}
            sx={{ height: 6, borderRadius: 1 }}
          />
        </Stack>

        {item.synchronizationHealth.jira !== "synced" ? (
          <Typography variant="caption" sx={{ color: "warning.light" }}>
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
        elevation={0}
        sx={{
          p: { xs: 2.5, md: 3 },
          borderRadius: 2,
          border: "1px solid rgba(255, 255, 255, 0.1)",
          background:
            "linear-gradient(145deg, rgba(255, 255, 255, 0.075), rgba(255, 255, 255, 0.032))",
          color: "inherit",
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
              <Typography variant="body2" sx={{ color: mutedText }}>
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
              sx={{
                p: 2,
                borderRadius: 1,
                border: "1px dashed rgba(255, 255, 255, 0.18)",
                backgroundColor: "rgba(255, 255, 255, 0.04)",
              }}
            >
              <Typography variant="body2" sx={{ color: mutedText }}>
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
