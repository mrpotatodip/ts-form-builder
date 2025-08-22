export const BaseStatus = [
  { value: "active", label: "Active", isDefault: true },
  { value: "inactive", label: "Inactive" },
  { value: "pending", label: "Pending" },
  { value: "suspended", label: "Suspended" },
] as const;

export type BaseStatus = (typeof BaseStatus)[number]["value"];
export const BaseStatusDefault = BaseStatus[0].value;
export const BaseStatusEnum = BaseStatus.map((s) => s.value) as [
  BaseStatus,
  ...BaseStatus[]
];
