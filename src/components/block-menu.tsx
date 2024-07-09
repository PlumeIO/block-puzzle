import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import Block from "./block";

export interface BlockMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  blocks: {
    grid: Array<0 | 1>[];
    color: string;
  }[];
  hoverSize?: number;
}

type BlockType = BlockMenuProps["blocks"][number];
interface DraggedBlock extends BlockType {
  id: number;
}

const BlockMenu = React.forwardRef<HTMLDivElement, BlockMenuProps>(
  ({ className, blocks, hoverSize = 48, ...props }, ref) => {
    const [draggedBlock, setDraggedBlock] = useState<DraggedBlock | undefined>(
      undefined
    );

    const [dragPos, setDragPos] = useState<[number, number] | undefined>(
      undefined
    );

    useEffect(() => {
      const handleTouchMove = (e: TouchEvent) => {
        setDragPos([e.touches[0].clientX, e.touches[0].clientY]);
      };

      document.addEventListener("touchmove", handleTouchMove);

      return () => {
        document.removeEventListener("touchmove", handleTouchMove);
      };
    });

    return (
      <>
        <div
          className={cn(
            className,
            "w-full flex items-center justify-evenly h-20 bg-secondary rounded-md"
          )}
          ref={ref}
          {...props}
        >
          {blocks.map((block, i) => (
            <div
              className="w-16 h-16 flex items-center justify-center"
              onTouchStart={(e) => {
                setDraggedBlock({ ...block, id: i });
                setDragPos([e.touches[0].clientX, e.touches[0].clientY]);
              }}
              onTouchEnd={() => {
                setDraggedBlock(undefined);
                setDragPos(undefined);
              }}
              key={i}
            >
              <Block
                cellSize={12}
                {...block}
                className={draggedBlock?.id === i ? "invisible" : "visible"}
              />
            </div>
          ))}
        </div>
        {draggedBlock && dragPos && (
          <Block
            cellSize={hoverSize}
            style={{
              left: dragPos[0] + "px",
              top: dragPos[1] + "px",
            }}
            className="fixed -translate-x-1/2 -translate-y-1/2"
            {...draggedBlock}
            id={"block-menu-#" + draggedBlock.id}
          />
        )}
      </>
    );
  }
);

export default BlockMenu;
