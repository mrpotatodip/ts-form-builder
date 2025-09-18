import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Row, flexRender } from "@tanstack/react-table";
import { z, ZodObject, ZodRawShape } from "zod";

import { TableCell, TableRow } from "@/components/ui/table";

type DraggableRowType<TSchema extends ZodRawShape> = {
  row: Row<z.infer<ZodObject<TSchema>>>;
};

export const DraggableRow = <TSchema extends ZodRawShape>({
  row,
}: DraggableRowType<TSchema>) => {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  });

  const isPendingDataWithOpacity = row.original.uuid ? false : " opacity-20";

  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      ref={setNodeRef}
      className={`relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80 ${isPendingDataWithOpacity}`}
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      {row.getVisibleCells().map((cell, index) => (
        <TableCell
          className={`min-w-10 py-4 ${
            index === 0
              ? "rounded-tl-lg rounded-bl-lg "
              : index === row.getVisibleCells().length - 1
                ? "rounded-tr-lg rounded-br-lg"
                : undefined
          }`}
          key={cell.id}
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
};
