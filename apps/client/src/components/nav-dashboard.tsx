import { Link, linkOptions } from "@tanstack/react-router";
import { ChevronRight, type LucideIcon, SquareTerminal } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "~/components/ui/sidebar";

import { getSidebarNavs } from "~/components/app/dashboard/forms/route-navs";

export function NavDashboard() {
  const navs = getSidebarNavs();

  return (
    <SidebarGroup className="">
      <SidebarGroupLabel className="uppercase tracking-widest text-xs">
        FORM BUILDER
      </SidebarGroupLabel>
      <SidebarMenu>
        {navs.map((item) => (
          <Collapsible
            key={item.label}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.label}>
                  {item.icon && <item.icon />}
                  <Link to={item.to} className="flex items-center gap-2">
                    <span className="uppercase tracking-wider text-xs">
                      {item.label}
                    </span>
                  </Link>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.label}>
                      <SidebarMenuSubButton asChild>
                        <Link
                          to={subItem.to}
                          search={{ status: subItem.search.status }}
                          className="flex items-center gap-2"
                        >
                          <span className="uppercase tracking-wider text-xs">
                            {subItem.label}
                          </span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
