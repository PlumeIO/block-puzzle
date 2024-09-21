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
          "w-full h-full flex flex-col items-center justify-center transition-opacity"
        )}
        ref={ref}
        {...props}
      >
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.map((cell, colIndex) => {
              const id = "cell-" + colIndex + "x" + rowIndex;
              const lastVariant =
                document.getElementById(id)?.dataset.variant ?? "empty";
              const cellDroppedIn =
                lastVariant === "highlight" && cell.variant === "solid";
              const cellDroppedOut =
                (lastVariant === "solid" || lastVariant === "highlight") &&
                cell.variant === "empty";
              if (cellDroppedOut) console.log(cell);
              return (
                <Cell
                  size={cellSize}
                  id={"cell-" + colIndex + "x" + rowIndex}
                  className={`${
                    cellDroppedIn
                      ? "animate-drop-in"
                      : cellDroppedOut
                      ? "animate-drop-out"
                      : ""
                  }`}
                  {...cell}
                />
              );
            })}
          </div>
        ))}
      </div>
    );
  }
);

export default Board;
