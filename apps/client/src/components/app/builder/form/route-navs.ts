import { SquareTerminalIcon as BuilderFormIcon } from "lucide-react";
import { linkOptions } from "@tanstack/react-router";

export const getSidebarNavs = () =>
  linkOptions([
    {
      label: "Form Builder",
      to: "/playground/forms",
      icon: BuilderFormIcon,
      isActive: true,
      items: linkOptions([
        {
          label: "All",
          to: "/playground/forms",
          search: { section: "all" },
        },
        {
          label: "Zod Schema",
          to: "/playground/forms",
          search: { section: "form-schema-zod" },
        },
      ]),
    },
  ]);
