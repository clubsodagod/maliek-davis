"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import {
  AccountTree,
  ExpandLess,
  ExpandMore,
  Link as LinkIcon,
  SubdirectoryArrowRight,
  TaskAlt,
} from "@mui/icons-material";
import type {
  JiraIssueLinkInput,
  JiraSubtaskInput,
  JiraTaskInput,
  JiraWorkstreamInput,
} from "../../_types";
import { jiraClassNames } from "../../_theme";

const INITIAL_WORKSTREAM_LIMIT = 3;

export interface JiraSetupPreviewHierarchyProps {
  workstreams: JiraWorkstreamInput[];
}

function itemCounts(workstream: JiraWorkstreamInput) {
  const tasks = workstream.tasks ?? [];
  const subtasks = tasks.reduce(
    (count, task) => count + (task.subtasks?.length ?? 0),
    0,
  );
  const taskLinks = tasks.reduce(
    (count, task) => count + (task.links?.length ?? 0),
    0,
  );

  return {
    tasks: tasks.length,
    subtasks,
    links: (workstream.links?.length ?? 0) + taskLinks,
  };
}

function RefChip({ refValue }: { refValue: string }) {
  return (
    <Chip
      label={refValue}
      size="small"
      variant="outlined"
      sx={{
        maxWidth: "100%",
        "& .MuiChip-label": {
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
      }}
    />
  );
}

function Description({ value }: { value?: string }) {
  if (!value) return null;

  return (
    <Typography
      variant="body2"
      sx={{
        whiteSpace: "pre-wrap",
      }}
    >
      {value}
    </Typography>
  );
}

function LinkList({ links }: { links?: JiraIssueLinkInput[] }) {
  if (!links || links.length === 0) return null;

  return (
    <Stack spacing={1}>
      <Typography
        variant="overline"
        sx={{ lineHeight: 1.4 }}
      >
        Links
      </Typography>
      <Stack spacing={1}>
        {links.map((link) => (
          <Box
            key={link.ref}
            className={jiraClassNames.panelCompact}
            sx={{
              p: 1.25,
            }}
          >
            <Stack spacing={1}>
              <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
                <LinkIcon fontSize="small" aria-hidden="true" />
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  {link.type}
                </Typography>
                <RefChip refValue={link.ref} />
              </Stack>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                <Chip size="small" label={`Inward ${link.inwardRef}`} />
                <Chip size="small" label={`Outward ${link.outwardRef}`} />
              </Stack>
            </Stack>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
}

function SubtaskAccordion({ subtask }: { subtask: JiraSubtaskInput }) {
  return (
    <Accordion
      disableGutters
      className={jiraClassNames.accordion}
      sx={{
        "&::before": { display: "none" },
      }}
    >
      <AccordionSummary expandIcon={<ExpandMore aria-hidden="true" />}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          alignItems={{ xs: "flex-start", sm: "center" }}
          sx={{ width: "100%" }}
        >
          <SubdirectoryArrowRight fontSize="small" aria-hidden="true" />
          <Typography variant="body2" sx={{ fontWeight: 700, flexGrow: 1 }}>
            {subtask.summary}
          </Typography>
          <RefChip refValue={subtask.ref} />
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Description value={subtask.description} />
      </AccordionDetails>
    </Accordion>
  );
}

function TaskAccordion({ task }: { task: JiraTaskInput }) {
  const subtasks = task.subtasks ?? [];

  return (
    <Accordion
      disableGutters
      className={jiraClassNames.accordion}
      sx={{
        "&::before": { display: "none" },
      }}
    >
      <AccordionSummary expandIcon={<ExpandMore aria-hidden="true" />}>
        <Stack spacing={1} sx={{ width: "100%" }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1}
            alignItems={{ xs: "flex-start", sm: "center" }}
          >
            <TaskAlt fontSize="small" aria-hidden="true" />
            <Typography variant="body1" sx={{ fontWeight: 700, flexGrow: 1 }}>
              {task.summary}
            </Typography>
            <RefChip refValue={task.ref} />
          </Stack>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Chip size="small" label={`${subtasks.length} subtasks`} />
            <Chip size="small" label={`${task.links?.length ?? 0} links`} />
          </Stack>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={2}>
          <Description value={task.description} />
          <LinkList links={task.links} />
          {subtasks.length > 0 ? (
            <Stack spacing={1}>
              <Typography
                variant="overline"
                sx={{ lineHeight: 1.4 }}
              >
                Subtasks
              </Typography>
              {subtasks.map((subtask) => (
                <SubtaskAccordion key={subtask.ref} subtask={subtask} />
              ))}
            </Stack>
          ) : (
            <Typography variant="body2">
              No subtasks saved for this task.
            </Typography>
          )}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}

function WorkstreamCard({ workstream }: { workstream: JiraWorkstreamInput }) {
  const tasks = workstream.tasks ?? [];
  const counts = itemCounts(workstream);

  return (
    <Paper
      component="article"
      className={jiraClassNames.panel}
      sx={{
        p: { xs: 2, md: 2.5 },
      }}
    >
      <Stack spacing={2.25}>
        <Stack spacing={1}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={1.25}
            alignItems={{ xs: "flex-start", md: "center" }}
          >
            <AccountTree aria-hidden="true" />
            <Typography component="h3" variant="h5" sx={{ flexGrow: 1 }}>
              {workstream.summary}
            </Typography>
            <RefChip refValue={workstream.ref} />
          </Stack>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Chip size="small" label={`${counts.tasks} tasks`} />
            <Chip size="small" label={`${counts.subtasks} subtasks`} />
            <Chip size="small" label={`${counts.links} links`} />
          </Stack>
        </Stack>

        <Description value={workstream.description} />
        <LinkList links={workstream.links} />

        <Divider />

        {tasks.length > 0 ? (
          <Stack spacing={1.25}>
            <Typography
              variant="overline"
              sx={{ lineHeight: 1.4 }}
            >
              Tasks
            </Typography>
            {tasks.map((task) => (
              <TaskAccordion key={task.ref} task={task} />
            ))}
          </Stack>
        ) : (
          <Typography variant="body2">
            No tasks saved for this workstream.
          </Typography>
        )}
      </Stack>
    </Paper>
  );
}

export function JiraSetupPreviewHierarchy({
  workstreams,
}: JiraSetupPreviewHierarchyProps) {
  const [showAll, setShowAll] = useState(false);
  const hasHiddenWorkstreams = workstreams.length > INITIAL_WORKSTREAM_LIMIT;
  const visibleWorkstreams =
    showAll || !hasHiddenWorkstreams
      ? workstreams
      : workstreams.slice(0, INITIAL_WORKSTREAM_LIMIT);

  if (workstreams.length === 0) {
    return (
      <Paper
        className={jiraClassNames.emptyState}
        sx={{
          p: 3,
        }}
      >
        <Typography variant="body2">
          This setup does not include any saved workstreams yet.
        </Typography>
      </Paper>
    );
  }

  return (
    <Stack spacing={2.5}>
      <Stack spacing={2}>
        {visibleWorkstreams.map((workstream) => (
          <WorkstreamCard key={workstream.ref} workstream={workstream} />
        ))}
      </Stack>

      {hasHiddenWorkstreams ? (
        <Button
          type="button"
          variant="outlined"
          onClick={() => setShowAll((current) => !current)}
          startIcon={
            showAll ? (
              <ExpandLess aria-hidden="true" />
            ) : (
              <ExpandMore aria-hidden="true" />
            )
          }
          sx={{ alignSelf: "flex-start" }}
        >
          {showAll
            ? "Show fewer"
            : `Show all workstreams (${workstreams.length})`}
        </Button>
      ) : null}
    </Stack>
  );
}
