import { Link } from "@tanstack/react-router";

import {
  IconCircleCheckFilled,
  IconDotsVertical,
  IconLoader,
} from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";
import { z, ZodObject, ZodRawShape } from "zod";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TableCellViewer } from "@/components/table/data-table-cell-viewer";
import { DragHandle } from "@/components/table/data-table-drag-handle";

import { FormResponseSchema } from "shared";

import { shortUUID } from "@/utils/string-shortener";
// import { currencyFormatter } from "@/utils/currency-formatter";
import { dateToTimeAgo, dateToFormat } from "~/utils/date-formatter";
// import { ColumnStatus } from "./statuses";

export const columns: ColumnDef<z.infer<typeof FormResponseSchema>>[] = [
  {
    accessorKey: "id",
    header: () => (
      <div>
        <p className="text-xs uppercase tracking-wider">Response #</p>
      </div>
    ),
    cell: ({ row }) => {
      const { uuid } = row.original;
      const id = shortUUID(uuid);

      return (
        <div className="">
          <p className="text-primary">{id}</p>
        </div>
      );
    },
  },

  {
    accessorKey: "json",
    header: () => (
      <div>
        <p className="text-xs uppercase tracking-wider">Responses</p>
      </div>
    ),
    cell: ({ row }) => {
      const { json } = row.original;
      const object = JSON.parse(JSON.stringify(json));

      return (
        <div className="text-left">
          <ul className="flex flex-wrap gap-1">
            {Object.keys(object).map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 bg-muted px-2 py-1 rounded-xl"
              >
                <span className="text-xs text-primary">{item}</span>
                <span className="text-xs">{object[item]}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    },
  },

  {
    accessorKey: "response date",
    header: () => (
      <div>
        <p className="text-xs w-full text-right uppercase tracking-wider pr-4">
          Response Date
        </p>
      </div>
    ),
    cell: ({ row }) => {
      const { createdAt } = row.original;

      return (
        <div className="flex justify-end pr-4">
          <div>
            <p className="text-xs text-right uppercase tracking-wider">
              {dateToTimeAgo(createdAt)}
            </p>
            <p className="text-xs  text-muted-foreground text-right">
              {dateToFormat(createdAt)}
            </p>
          </div>
        </div>
      );
    },
  },

  // {
  //   id: "actions",
  //   cell: () => (
  //     <DropdownMenu>
  //       <DropdownMenuTrigger asChild>
  //         <Button
  //           variant="ghost"
  //           className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
  //           size="icon"
  //         >
  //           <IconDotsVertical />
  //           <span className="sr-only">Open menu</span>
  //         </Button>
  //       </DropdownMenuTrigger>
  //       <DropdownMenuContent align="end" className="w-32">
  //         <DropdownMenuItem>Edit</DropdownMenuItem>
  //         <DropdownMenuItem>Make a copy</DropdownMenuItem>
  //         <DropdownMenuItem>Favorite</DropdownMenuItem>
  //         <DropdownMenuSeparator />
  //         <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
  //       </DropdownMenuContent>
  //     </DropdownMenu>
  //   ),
  // },
];
