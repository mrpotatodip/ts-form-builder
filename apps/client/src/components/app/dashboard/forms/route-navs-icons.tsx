import { SquareTerminalIcon as BuilderFormIcon } from "lucide-react";
import { linkOptions } from "@tanstack/react-router";
import { AnimateIcon } from "~/components/animate-ui/icons/icon";
import { Terminal } from "~/components/animate-ui/icons/terminal";

export const AnimatedTerminalIcon = ({
  animate = false,
  className,
}: {
  animate?: boolean;
  className?: string;
}) => {
  return (
    <>
      <div className={className}>
        <AnimateIcon
          animate={animate}
          animation="path-loop"
          loopDelay={1000}
          loop
        >
          <Terminal size={20} />
        </AnimateIcon>
      </div>
    </>
  );
};
