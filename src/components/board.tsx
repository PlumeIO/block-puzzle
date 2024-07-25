import { cn } from "@/lib/utils";
import React from "react";
import Cell, { CellProps } from "./cell";

export interface BoardProps extends React.HTMLAttributes<HTMLDivElement> {
  grid: Omit<CellProps, "size">[][];
  cellSize?: number;
}

const Board = React.forwardRef<HTMLDivElement, BoardProps>(
  ({ className, grid, cellSize = 48, ...props }, ref) => {
    return (
      <div
        className={cn(
          className,
          "w-full h-full flex flex-col items-center justify-center"
        )}
        ref={ref}
        {...props}
      >
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.map((cell, colIndex) => (
              <Cell
                key={colIndex}
                size={cellSize}
                id={"cell-" + colIndex + "x" + rowIndex}
                {...cell}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }
);

export default Board;
