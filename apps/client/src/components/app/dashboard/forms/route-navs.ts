import { SquareTerminalIcon as BuilderFormIcon } from "lucide-react";
import { AnimatedTerminalIcon } from "./route-navs-icons";
import { linkOptions } from "@tanstack/react-router";

export const getSidebarNavs = () =>
  linkOptions([
    {
      label: "Forms",
      to: "/dashboard/forms",
      icon: AnimatedTerminalIcon,
      isActive: true,
      items: linkOptions([
        {
          label: "All",
          to: "/dashboard/forms",
          search: { status: "all" },
        },
        {
          label: "Draft",
          to: "/dashboard/forms",
          search: { status: "draft" },
        },
        {
          label: "Published",
          to: "/dashboard/forms",
          search: { status: "published" },
        },
      ]),
    },
  ]);
