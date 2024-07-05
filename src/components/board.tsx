import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import Cell from "./cell";

export interface BoardProps extends React.HTMLAttributes<HTMLDivElement> {
  rows: number;
  columns: number;
}

const Board = React.forwardRef<HTMLDivElement, BoardProps>(
  ({ className, rows, columns, ...props }, ref) => {
    const boardRef = useRef<HTMLDivElement>(null);
    const [cellSize, setCellSize] = useState(0);

    useEffect(() => {
      if (!boardRef.current) return;
      const { width, height } = boardRef.current?.getBoundingClientRect();
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
        {Array.from({ length: rows }, (_, rowIndex) => (
          <div key={rowIndex} className="flex">
            {Array.from({ length: columns }, (_, colIndex) => (
              <Cell key={colIndex} size={cellSize} />
            ))}
          </div>
        ))}
      </div>
    );
  }
);

export default Board;
