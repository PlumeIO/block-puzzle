import { cn } from "@/lib/utils";
import Cell from "./cell";
import React from "react";

export interface BlockProps extends React.HTMLAttributes<HTMLDivElement> {
  grid: Array<0 | 1>[];
  color: string;
  cellSize: number;
}

const Block = React.forwardRef<HTMLDivElement, BlockProps>(
  ({ className, grid, color, cellSize, ...props }, ref) => {
    return (
      <div
        className={cn(
          className,
          "w-fit flex flex-col items-start justify-center"
        )}
        ref={ref}
        {...props}
      >
        {grid.map((_, rowIndex) => (
          <div key={rowIndex} className="flex">
            {grid[rowIndex].map((val, colIndex) => (
              <Cell
                key={colIndex}
                size={cellSize}
                color={color}
                variant={val === 0 ? "hidden" : "solid"}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }
);

export default Block;
