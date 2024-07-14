import BlockMenu, {
  BlockMenuBlockType,
  BlockMenuProps,
} from "@/components/block-menu";
import Board, { BoardProps } from "@/components/board";
import { CellProps } from "@/components/cell";
import PauseButton from "@/components/pause-button";
import ScoreBoard from "@/components/score-board";
import boardController from "@/controllers/board.controller";
import { TouchEvent, useEffect, useRef, useState } from "react";

function ClassicGame() {
  const [cellSize, setCellSize] = useState(0);
  const boardRef = useRef<HTMLDivElement>(null);

  const [grid, setGrid] = useState<BoardProps["grid"]>(
    Array.from({ length: 9 }, (_) =>
      Array.from({ length: 9 }, (_) => ({ variant: "empty" }))
    )
  );

  const [blockMenuBlocks, setBlockMenuBlocks] = useState<
    BlockMenuProps["blocks"]
  >([
    { grid: [[1, 1, 1, 1, 1]], color: "red" },
    {
      grid: [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
      ],
      color: "blue",
    },
    {
      grid: [[1], [1], [1], [1], [1]],
      color: "yellow",
    },
  ]);

  useEffect(() => {
    if (!boardRef.current) return;
    const { width, height } = boardRef.current?.getBoundingClientRect();
    const rows = grid.length;
    const columns = grid[0].length;
    setCellSize(Math.min(width, height) / Math.max(rows, columns));
  }, []);

  function onBlockDrop(
    event: TouchEvent<HTMLDivElement>,
    block: BlockMenuBlockType,
    variant: CellProps["variant"] = "solid"
  ) {
    const selectedCell = document
      .elementsFromPoint(
        event.changedTouches[0].clientX -
          (block.grid[0].length / 2) * cellSize +
          cellSize / 2,
        event.changedTouches[0].clientY -
          (block.grid.length / 2) * cellSize +
          cellSize / 2
      )
      .find((ele) => ele?.id.includes("cell")) as HTMLDivElement;

    const gridWithoutHighlight = boardController.clearHighlight(grid);
    setGrid(gridWithoutHighlight);

    if (selectedCell?.id.includes("cell")) {
      const selectedCellPos = selectedCell.id
        .replace("cell-", "")
        .split("x")
        .map((ele) => Number(ele)) as [number, number];

      setGrid(
        boardController.addBlock(
          gridWithoutHighlight,
          selectedCellPos,
          variant,
          block.color,
          block.grid
        )
      );
    }
  }

  function onBlockDrag(
    event: TouchEvent<HTMLDivElement>,
    block: BlockMenuBlockType
  ) {
    onBlockDrop(event, block, "highlight");
  }

  return (
    <main className="page">
      <div className="flex gap-4">
        <ScoreBoard score={0} highScore={0} />
        <PauseButton />
      </div>
      <Board grid={grid} cellSize={cellSize} ref={boardRef} />
      <BlockMenu
        blocks={blockMenuBlocks}
        hoverSize={cellSize}
        onBlockDrop={onBlockDrop}
        onBlockDrag={onBlockDrag}
      />
    </main>
  );
}

export default ClassicGame;
