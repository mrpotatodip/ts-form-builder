import { zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";

export const QueryArray = {
  lists: {
    status: [
      { value: "all", label: "All" },
      { value: "published", label: "Published" },
      { value: "draft", label: "Draft" },
    ],
    modal: [{ value: "create", label: "Create Form Information" }],
  },
  edit: {
    modal: [{ value: "update", label: "Update Form Information" }],
  },
} as const;

// ROUTE: /forms/lists

export type RouteListsStatusOptions =
  (typeof QueryArray.lists.status)[number]["value"];
export const [{ value: RouteListsStatusDefault }] = QueryArray.lists.status;
export const RouteListsStatusEnum = QueryArray.lists.status.map(
  (s) => s.value,
) as [RouteListsStatusOptions];

export type RouteListsModalOptions =
  (typeof QueryArray.lists.modal)[number]["value"];
export const [{ value: RouteListsModalDefault }] = QueryArray.lists.modal;
export const RouteListsModalEnum = QueryArray.lists.modal.map(
  (s) => s.value,
) as [RouteListsModalOptions];

export const RouteListsQuerySchema = z.object({
  status: z.enum(RouteListsStatusEnum).optional(),
  modal: z.enum(RouteListsModalEnum).optional(),
});

export const validateRouteListsQuery = zodValidator(RouteListsQuerySchema);

// ROUTE: /forms/edit

export type RouteEditModalOptions =
  (typeof QueryArray.edit.modal)[number]["value"];
export const [{ value: RouteEditModalDefault }] = QueryArray.edit.modal;
export const RouteEditModalEnum = QueryArray.edit.modal.map((s) => s.value) as [
  RouteEditModalOptions,
];

export const RouteEditQuerySchema = z.object({
  modal: z.enum(RouteEditModalEnum).optional(),
});

export const validateRouteEditQuery = zodValidator(RouteEditQuerySchema);
