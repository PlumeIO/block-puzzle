import { cn } from "@/lib/utils";
import React, { HTMLAttributes, TouchEvent, useEffect, useState } from "react";
import Block, { BlockProps } from "./block";

export type BlockMenuBlockType = Omit<BlockProps, "cellSize">;

export interface BlockMenuProps extends HTMLAttributes<HTMLDivElement> {
  blocks: BlockMenuBlockType[];
  hoverSize?: number;
  onBlockDrop?: (
    e: TouchEvent<HTMLDivElement>,
    block: BlockMenuBlockType
  ) => void;
  onBlockDrag?: (
    e: TouchEvent<HTMLDivElement>,
    block: BlockMenuBlockType
  ) => void;
}

interface DraggedBlock extends Omit<BlockMenuBlockType, "id"> {
  id: number;
}

const BlockMenu = React.forwardRef<HTMLDivElement, BlockMenuProps>(
  (
    {
      className,
      blocks,
      hoverSize = 48,
      onBlockDrop = () => {},
      onBlockDrag = () => {},
      ...props
    },
    ref
  ) => {
    const [draggedBlock, setDraggedBlock] = useState<DraggedBlock | undefined>(
      undefined
    );

    const [dragPos, setDragPos] = useState<[number, number] | undefined>(
      undefined
    );

    return (
      <>
        <div
          className={cn(
            className,
            "w-full flex items-center justify-evenly min-h-20 bg-secondary rounded-md"
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
                onBlockDrag(e, block);
              }}
              onTouchMove={(e) => {
                setDragPos([e.touches[0].clientX, e.touches[0].clientY]);
                onBlockDrag(e, block);
              }}
              onTouchEnd={(e) => {
                setDraggedBlock(undefined);
                setDragPos(undefined);
                onBlockDrop(e, block);
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
