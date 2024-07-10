import BlockMenu, {
  BlockMenuBlockType,
  BlockMenuProps,
} from "@/components/block-menu";
import Board, { BoardProps } from "@/components/board";
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
    block: BlockMenuBlockType
  ) {
    const selectedCell = document.elementFromPoint(
      event.changedTouches[0].clientX -
        (block.grid[0].length / 2) * cellSize -
        5,
      event.changedTouches[0].clientY - (block.grid.length / 2) * cellSize - 5
    );
    if (selectedCell?.id.includes("cell")) {
      const selectedCellPos = selectedCell.id
        .replace("cell-", "")
        .split("x")
        .map((ele) => Number(ele)) as [number, number];

      setGrid(
        boardController.addBlock(
          grid,
          selectedCellPos,
          "solid",
          block.color,
          block.grid
        )
      );
    }
  }

  return (
    <main className="page">
      <ScoreBoard score={0} highScore={0} />
      <Board grid={grid} cellSize={cellSize} ref={boardRef} />
      <BlockMenu
        blocks={blockMenuBlocks}
        hoverSize={cellSize}
        onBlockDrop={onBlockDrop}
      />
    </main>
  );
}

export default ClassicGame;
