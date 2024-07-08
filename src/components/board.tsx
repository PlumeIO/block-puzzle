import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import Cell, { CellProps } from "./cell";

export interface BoardProps extends React.HTMLAttributes<HTMLDivElement> {
  grid: Omit<CellProps, "size">[][];
}

const Board = React.forwardRef<HTMLDivElement, BoardProps>(
  ({ className, grid, ...props }, _ref) => {
    const boardRef = useRef<HTMLDivElement>(null);
    const [cellSize, setCellSize] = useState(0);

    useEffect(() => {
      if (!boardRef.current) return;
      const { width, height } = boardRef.current?.getBoundingClientRect();
      const rows = grid.length;
      const columns = grid[0].length;
      setCellSize(Math.min(width, height) / Math.max(rows, columns));
    }, []);

    return (
      <div
        className={cn(
          className,
          "w-full h-full flex flex-col items-center justify-center"
        )}
        ref={boardRef}
        {...props}
      >
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.map((cell, colIndex) => (
              <Cell key={colIndex} size={cellSize} {...cell} />
            ))}
          </div>
        ))}
      </div>
    );
  }
);

export default Board;
