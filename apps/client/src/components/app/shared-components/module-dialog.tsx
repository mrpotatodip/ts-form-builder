import { ReactNode, useCallback, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const useHodleDialog = () => {
  const [open, openSet] = useState(false);

  const onOpenChange = useCallback(() => {
    openSet(!open);
  }, [open, openSet]);

  return {
    open,
    onOpenChange,
  };
};

export const ModuleDialog = ({
  title,
  description,
  open,
  onOpenChange,
  children,
  size = "sm",
  isCloseIcon = true,
}: {
  title: string;
  description?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  isCloseIcon?: boolean;
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* <DialogTrigger asChild>
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              onClick={handleOpenCloseToggle}
              tooltip="Quick Create"
              className=" flex justify-center items-center cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear w-full"
            >
              <QuickCreateIcon className="text-white" />
              <span className="uppercase tracking-wider text-sm">
                Quick Create
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </DialogTrigger> */}

      <DialogContent
        isCloseIcon={isCloseIcon}
        className={`${size !== "sm" ? "min-w-2xl" : ""}`}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description ? (
            <DialogDescription>{description}</DialogDescription>
          ) : null}
        </DialogHeader>

        {children}
      </DialogContent>
    </Dialog>
  );
};
