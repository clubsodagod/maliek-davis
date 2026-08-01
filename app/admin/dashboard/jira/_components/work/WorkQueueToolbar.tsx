"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import {
  TASK_TYPE_OPTIONS,
  WORK_STATUS_OPTIONS,
  type TaskTypeSlug,
  type WorkStatusSlug,
} from "../../_config/workManagement";
import {
  projectWorkPath,
  statusWorkPath,
  // taskTypeWorkPath,
} from "../../_utils/workRouting";

export interface WorkQueueToolbarProps {
  projectKey: string;
  statusSlug: WorkStatusSlug;
  taskTypeSlug?: TaskTypeSlug;
  search?: string;
  sort: string;
}

export function WorkQueueToolbar({
  projectKey,
  statusSlug,
  taskTypeSlug,
  search,
  sort,
}: WorkQueueToolbarProps) {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState(search ?? "");
  const [sortValue, setSortValue] = useState(sort);

  function buildUrl(next: {
    taskTypeSlug?: TaskTypeSlug;
    statusSlug?: WorkStatusSlug;
    search?: string;
    sort?: string;
  }): string {
    const nextTaskType = next.taskTypeSlug ?? taskTypeSlug;
    const nextStatus = next.statusSlug ?? statusSlug;
    const params = new URLSearchParams();
    const nextSearch = next.search ?? searchValue;
    const nextSort = next.sort ?? sortValue;

    if (nextSearch.trim() !== "") params.set("search", nextSearch.trim());
    if (nextSort !== "recommended") params.set("sort", nextSort);

    const base = nextTaskType
      ? statusWorkPath(projectKey, nextTaskType, nextStatus)
      : projectWorkPath(projectKey);
    const query = params.toString();
    return query ? `${base}?${query}` : base;
  }

  function buildAllWorkUrl(): string {
    const params = new URLSearchParams();
    if (searchValue.trim() !== "") params.set("search", searchValue.trim());
    if (sortValue !== "recommended") params.set("sort", sortValue);
    const query = params.toString();
    const base = projectWorkPath(projectKey);
    return query ? `${base}?${query}` : base;
  }

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push(buildUrl({ search: searchValue }));
  }

  return (
    <Stack spacing={2}>
      <Box
        component="form"
        onSubmit={handleSearch}
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 220px auto" },
          gap: 1.5,
        }}
      >
        <TextField
          label="Search"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          size="small"
          fullWidth
        />
        <FormControl size="small" fullWidth>
          <InputLabel id="jira-work-sort-label">Sort</InputLabel>
          <Select
            labelId="jira-work-sort-label"
            label="Sort"
            value={sortValue}
            onChange={(event) => {
              const value = event.target.value;
              setSortValue(value);
              router.push(buildUrl({ sort: value }));
            }}
          >
            <MenuItem value="recommended">Recommended</MenuItem>
            <MenuItem value="priority">Priority</MenuItem>
            <MenuItem value="due-date">Due date</MenuItem>
            <MenuItem value="recent">Recent</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" startIcon={<Search aria-hidden="true" />}>
          Search
        </Button>
      </Box>

      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        <ToggleButtonGroup
          exclusive
          size="small"
          value={taskTypeSlug ?? "all"}
          onChange={(_event, value: TaskTypeSlug | "all" | null) => {
            if (value === null) return;
            if (value === "all") {
              router.push(buildAllWorkUrl());
              return;
            }
            router.push(buildUrl({ taskTypeSlug: value }));
          }}
          aria-label="Task type"
        >
          <ToggleButton value="all">All</ToggleButton>
          {TASK_TYPE_OPTIONS.map((option) => (
            <ToggleButton key={option.slug} value={option.slug}>
              {option.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        {taskTypeSlug ? (
          <ToggleButtonGroup
            exclusive
            size="small"
            value={statusSlug}
            onChange={(_event, value: WorkStatusSlug | null) => {
              if (value === null) return;
              router.push(buildUrl({ statusSlug: value }));
            }}
            aria-label="Status"
          >
            {WORK_STATUS_OPTIONS.map((option) => (
              <ToggleButton key={option.slug} value={option.slug}>
                {option.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        ) : null}
      </Stack>
    </Stack>
  );
}
