import type {
  JiraIssueLinkInput,
  JiraProjectSetupRequest,
  JiraSubtaskInput,
  JiraTaskInput,
  JiraWorkstreamInput,
} from "@/app/admin/dashboard/jira/_types";

type CanonicalIssueLinkInput = {
  targetRef: string;
  linkType: string;
  direction?: "inward";
  relationship?: string;
  reason?: string;
  category?: string;
};

type CanonicalSubtaskInput = Omit<JiraSubtaskInput, "labels"> & {
  labels?: readonly string[];
};

type CanonicalTaskInput = Omit<JiraTaskInput, "links" | "subtasks" | "labels"> & {
  labels?: readonly string[];
  links?: readonly CanonicalIssueLinkInput[];
  subtasks?: readonly CanonicalSubtaskInput[];
};

type CanonicalWorkstreamInput = Omit<JiraWorkstreamInput, "links" | "tasks" | "labels"> & {
  labels?: readonly string[];
  links?: readonly CanonicalIssueLinkInput[];
  tasks?: readonly CanonicalTaskInput[];
};

export type CanonicalJiraProjectSetupRequest = Omit<JiraProjectSetupRequest, "workstreams"> & {
  workstreams: readonly CanonicalWorkstreamInput[];
};

export function toAutomationProjectSetupRequest(
  request: JiraProjectSetupRequest,
): CanonicalJiraProjectSetupRequest {
  return {
    ...request,
    workstreams: request.workstreams.map(toCanonicalWorkstream),
  };
}

function toCanonicalWorkstream(
  workstream: JiraWorkstreamInput,
): CanonicalWorkstreamInput {
  return {
    ...workstream,
    links: toCanonicalLinks(workstream.ref, workstream.links),
    tasks: workstream.tasks?.map(toCanonicalTask),
  };
}

function toCanonicalTask(task: JiraTaskInput): CanonicalTaskInput {
  return {
    ...task,
    links: toCanonicalLinks(task.ref, task.links),
    subtasks: task.subtasks?.map(toCanonicalSubtask),
  };
}

function toCanonicalSubtask(subtask: JiraSubtaskInput): CanonicalSubtaskInput {
  return { ...subtask };
}

function toCanonicalLinks(
  sourceRef: string,
  links: readonly JiraIssueLinkInput[] | undefined,
): readonly CanonicalIssueLinkInput[] | undefined {
  if (links === undefined) return undefined;

  return links.map((link) => toCanonicalLink(sourceRef, link));
}

function toCanonicalLink(
  sourceRef: string,
  link: JiraIssueLinkInput,
): CanonicalIssueLinkInput {
  const source = sourceRef.trim();
  const inwardRef = link.inwardRef.trim();
  const outwardRef = link.outwardRef.trim();
  const sourceIsOutward = outwardRef === source;
  const targetRef = sourceIsOutward ? inwardRef : outwardRef;
  const mappedLinkType = mapJiraLinkType(link.type);
  const relationship = link.relationship ?? (
    mappedLinkType === link.type ? undefined : link.type
  );

  return {
    targetRef,
    linkType: mappedLinkType,
    ...(sourceIsOutward ? {} : { direction: "inward" as const }),
    ...(relationship === undefined ? {} : { relationship }),
    ...(link.reason === undefined ? {} : { reason: link.reason }),
    ...(link.category === undefined ? {} : { category: link.category }),
  };
}

function mapJiraLinkType(linkType: string): string {
  if (linkType === "Informs" || linkType === "Implemented By") {
    return "Relates";
  }

  return linkType;
}
