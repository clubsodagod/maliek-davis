"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  Divider,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import {
  CheckCircle,
  ErrorOutline,
  PlayArrow,
  QueryStats,
  Sync,
} from "@mui/icons-material";
import { pollJiraRun } from "../../_services";
import { startJiraSetupRunAction } from "../../_services/actions";
import type { JiraRunRecord, JiraSetupRecord } from "../../_types";
import {
  getJiraRunProgress,
  type JiraRunProgressSummary,
} from "../../_utils/runProgress";
import { getJiraHierarchyStats } from "../../_utils/setupBuilder";

export interface JiraSetupRunClientProps {
  setup: JiraSetupRecord;
  initialRunId?: string;
}

const INITIAL_POLL_DELAY_MS = 900;
const mutedText = "rgba(248, 247, 255, 0.68)";

function wait(ms: number, signal: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal.aborted) {
      reject(new DOMException("Polling cancelled.", "AbortError"));
      return;
    }

    const timeout = window.setTimeout(resolve, ms);

    signal.addEventListener(
      "abort",
      () => {
        window.clearTimeout(timeout);
        reject(new DOMException("Polling cancelled.", "AbortError"));
      },
      { once: true },
    );
  });
}

function formatDateTime(value: string | undefined): string {
  if (!value) return "Not available";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function statusColor(
  progress: JiraRunProgressSummary,
): "default" | "primary" | "success" | "error" | "warning" {
  if (progress.stage === "completed") return "success";
  if (progress.stage === "failed") return "error";
  if (progress.stage === "queued") return "warning";
  if (progress.stage === "idle") return "default";
  return "primary";
}

function StatItem({ label, value }: { label: string; value: string | number }) {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 1,
        border: "1px solid rgba(255, 255, 255, 0.1)",
        backgroundColor: "rgba(8, 9, 16, 0.28)",
      }}
    >
      <Stack spacing={0.5}>
        <Typography component="p" variant="h5" sx={{ lineHeight: 1 }}>
          {value}
        </Typography>
        <Typography variant="body2" sx={{ color: mutedText }}>
          {label}
        </Typography>
      </Stack>
    </Box>
  );
}

function queuedProgress(
  progress: JiraRunProgressSummary,
): JiraRunProgressSummary {
  return {
    ...progress,
    stage: "queued",
    statusLabel: "Queued",
    currentOperation: "Queued",
  };
}

export function JiraSetupRunClient({
  setup,
  initialRunId,
}: JiraSetupRunClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [activeRunId, setActiveRunId] = useState<string | null>(
    initialRunId ?? null,
  );
  const [run, setRun] = useState<JiraRunRecord | undefined>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPolling, setIsPolling] = useState(Boolean(initialRunId));
  const [isStarting, setIsStarting] = useState(false);
  const stats = useMemo(
    () => getJiraHierarchyStats(setup.request.workstreams),
    [setup.request.workstreams],
  );
  const baseProgress = getJiraRunProgress(setup, run);
  const progress =
    activeRunId && !run ? queuedProgress(baseProgress) : baseProgress;
  const canStart = !activeRunId && !isStarting;
  const hasTerminalRun = progress.isTerminal;

  useEffect(() => {
    if (!activeRunId) {
      setIsPolling(false);
      return;
    }

    const controller = new AbortController();
    const runId = activeRunId;
    setIsPolling(true);
    setErrorMessage(null);

    async function pollRun() {
      try {
        await wait(INITIAL_POLL_DELAY_MS, controller.signal);

        const result = await pollJiraRun(runId, {
          signal: controller.signal,
          onUpdate: setRun,
        });

        if (!controller.signal.aborted) {
          if (result.success) {
            setRun(result.data);
          } else {
            setErrorMessage(result.error.message);
          }
        }
      } catch (error) {
        if (
          !controller.signal.aborted &&
          (!(error instanceof DOMException) || error.name !== "AbortError")
        ) {
          setErrorMessage("Jira run polling stopped unexpectedly.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsPolling(false);
        }
      }
    }

    void pollRun();

    return () => {
      controller.abort();
    };
  }, [activeRunId]);

  async function handleStartRun() {
    setErrorMessage(null);
    setIsStarting(true);

    try {
      const result = await startJiraSetupRunAction({ setupId: setup.id });

      if (!result.success) {
        setErrorMessage(result.error.message);
        return;
      }

      setRun(result.data);
      setActiveRunId(result.data.id);
      router.replace(`${pathname}?runId=${encodeURIComponent(result.data.id)}`);
    } finally {
      setIsStarting(false);
    }
  }

  return (
    <Stack spacing={3}>
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
        <Stack spacing={2.5}>
          <Stack
            direction={{ xs: "column", lg: "row" }}
            spacing={2.5}
            justifyContent="space-between"
          >
            <Stack spacing={1.25} sx={{ minWidth: 0 }}>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                <Chip label={setup.request.project.key} color="primary" />
                <Chip label={progress.statusLabel} color={statusColor(progress)} />
                {activeRunId ? <Chip label={`Run ${activeRunId}`} /> : null}
              </Stack>
              <Typography component="h2" variant="h4" sx={{ lineHeight: 1.08 }}>
                {setup.request.project.name}
              </Typography>
              <Typography variant="body2" sx={{ color: mutedText, maxWidth: 720 }}>
                Start the saved setup when ready. Progress is read from persisted
                automation state through protected application routes.
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
              <Button
                variant="contained"
                startIcon={<PlayArrow aria-hidden="true" />}
                disabled={!canStart}
                onClick={() => {
                  void handleStartRun();
                }}
              >
                {isStarting ? "Starting..." : "Start run"}
              </Button>
              {hasTerminalRun ? (
                <Button
                  component={Link}
                  href={
                    activeRunId
                      ? `/admin/dashboard/jira/setups/${setup.id}/results?runId=${encodeURIComponent(
                          activeRunId,
                        )}`
                      : `/admin/dashboard/jira/setups/${setup.id}/results`
                  }
                  variant="outlined"
                >
                  View results
                </Button>
              ) : null}
            </Stack>
          </Stack>

          {errorMessage ? (
            <Alert severity="error" icon={<ErrorOutline aria-hidden="true" />}>
              {errorMessage}
            </Alert>
          ) : null}

          {run?.error ? (
            <Alert severity="error" icon={<ErrorOutline aria-hidden="true" />}>
              {run.error}
            </Alert>
          ) : null}

          <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.08)" }} />

          <Stack spacing={1.5}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1}
              justifyContent="space-between"
            >
              <Stack direction="row" spacing={1} alignItems="center">
                {progress.stage === "completed" ? (
                  <CheckCircle color="success" aria-hidden="true" />
                ) : progress.stage === "failed" ? (
                  <ErrorOutline color="error" aria-hidden="true" />
                ) : (
                  <Sync color="primary" aria-hidden="true" />
                )}
                <Typography component="h3" variant="h5">
                  {progress.currentOperation}
                </Typography>
              </Stack>
              <Typography variant="body2" sx={{ color: mutedText }}>
                {progress.completedCount} of {progress.totalCount} operations
              </Typography>
            </Stack>

            <LinearProgress
              variant="determinate"
              value={progress.percentage}
              aria-label="Setup run progress"
              sx={{ height: 10, borderRadius: 999 }}
            />
            <Typography variant="body2" sx={{ color: mutedText }}>
              {isPolling ? "Polling automation progress..." : "Progress is current."}
            </Typography>
          </Stack>
        </Stack>
      </Paper>

      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, md: 3 },
          borderRadius: 2,
          border: "1px solid rgba(255, 255, 255, 0.1)",
          backgroundColor: "rgba(255, 255, 255, 0.06)",
          color: "inherit",
        }}
      >
        <Stack spacing={2.25}>
          <Stack direction="row" spacing={1.25} alignItems="center">
            <QueryStats color="primary" aria-hidden="true" />
            <Typography component="h2" variant="h5">
              Run Details
            </Typography>
          </Stack>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2, minmax(0, 1fr))",
                md: "repeat(4, minmax(0, 1fr))",
              },
              gap: 1.5,
            }}
          >
            <StatItem label="Workstreams" value={stats.workstreams} />
            <StatItem label="Tasks" value={stats.tasks} />
            <StatItem label="Subtasks" value={stats.subtasks} />
            <StatItem label="Links" value={stats.links} />
            <StatItem label="Completed" value={progress.completedCount} />
            <StatItem label="Failed" value={progress.failedCount} />
            <StatItem label="Skipped" value={progress.skippedCount} />
            <StatItem label="Updated" value={formatDateTime(run?.updatedAt)} />
          </Box>
        </Stack>
      </Paper>
    </Stack>
  );
}
