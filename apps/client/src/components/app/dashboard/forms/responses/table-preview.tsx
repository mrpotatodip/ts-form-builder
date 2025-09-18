import { FormResponseSchema, FormResponse } from "shared";

import { DataTable } from "@/components/table/data-table";

// import { useInvoiceQuery } from "@/hooks/use-invoice";
// import { DataActionModal } from "../data-action-modal";
// import { DataAction } from "../data-action";
import { columns } from "./table-columns";

export const TablePreview = ({ data }: { data: FormResponse[] }) => {
  return (
    <DataTable data={data} schema={FormResponseSchema} columns={columns} />
  );
};
