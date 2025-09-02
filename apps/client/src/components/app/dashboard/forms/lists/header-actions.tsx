import { Link, useSearch } from "@tanstack/react-router";

import { Button } from "~/components/ui/button";

export const HeaderActions = () => {
  const search = useSearch({
    from: "/(app)/dashboard/forms/",
  });

  return (
    <div className="flex items-center gap-6">
      <Button
        size={"sm"}
        className="uppercase tracking-widest text-xs cursor-pointer"
      >
        <Link
          to="/dashboard/forms"
          search={{ ...search, modal: "create" }}
          className="text-xs uppercase tracking-widest px-2 py-1"
        >
          Create A Form
        </Link>
      </Button>
    </div>
  );
};
