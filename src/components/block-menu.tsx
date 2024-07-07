import { cn } from "@/lib/utils";
import React from "react";
import Block from "./block";

export interface BlockMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  blocks: {
    grid: Array<0 | 1>[];
    color: string;
  }[];
}

const BlockMenu = React.forwardRef<HTMLDivElement, BlockMenuProps>(
  ({ className, blocks, ...props }, ref) => {
    return (
      <div
        className={cn(
          className,
          "w-full flex items-center justify-evenly h-20 bg-secondary rounded-md"
        )}
        ref={ref}
        {...props}
      >
        {blocks.map((block, i) => (
          <div className="w-16 h-16 flex items-center justify-center" key={i}>
            <Block cellSize={12} {...block} />
          </div>
        ))}
      </div>
    );
  }
);

export default BlockMenu;
