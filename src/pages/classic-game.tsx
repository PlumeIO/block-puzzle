import BlockMenu, {
  BlockMenuBlockType,
  BlockMenuProps,
} from "@/components/block-menu";
import Board, { BoardProps } from "@/components/board";
import { CellProps } from "@/components/cell";
import PauseButton from "@/components/pause-button";
import ScoreBoard from "@/components/score-board";
import boardController from "@/controllers/board.controller";
import blockPresets from "@/lib/block-presets";
import { TouchEvent, useEffect, useRef, useState } from "react";

function ClassicGame() {
  const [score, setScore] = useState(0);
  const [cellSize, setCellSize] = useState(0); // State to hold the size of each cell
  const boardRef = useRef<HTMLDivElement>(null); // Reference to the board element

  // State to hold the grid data
  const [grid, setGrid] = useState<BoardProps["grid"]>(
    Array.from({ length: 9 }, () =>
      Array.from({ length: 9 }, () => ({ variant: "empty" }))
    )
  );

  // State to hold the blocks data for the block menu
  const [blockMenuBlocks, setBlockMenuBlocks] = useState<
    BlockMenuProps["blocks"]
  >([
    blockPresets.randomBlock(),
    blockPresets.randomBlock(),
    blockPresets.randomBlock(),
  ]);

  // Effect to set the cell size based on the board dimensions
  useEffect(() => {
    if (!boardRef.current) return;
    const { width, height } = boardRef.current.getBoundingClientRect();
    const rows = grid.length;
    const columns = grid[0].length;
    setCellSize(Math.min(width, height) / Math.max(rows, columns));
  }, []);

  function getSelectedCell(
    event: TouchEvent<HTMLDivElement>,
    block: BlockMenuBlockType
  ): HTMLDivElement | null {
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
    return selectedCell;
  }

  function getSelectedCellPosition(
    selectedCell: HTMLDivElement
  ): [number, number] {
    return selectedCell.id.replace("cell-", "").split("x").map(Number) as [
      number,
      number
    ];
  }

  function updateGridWithBlock(
    selectedCellPos: [number, number],
    block: BlockMenuBlockType,
    variant: CellProps["variant"]
  ) {
    const gridWithoutHighlight = boardController.clearHighlight(grid);
    const newGrid = boardController.addBlock(
      gridWithoutHighlight,
      selectedCellPos,
      variant,
      block.color,
      block.grid
    );

    return newGrid;
  }

  function replaceBlockInBlockMenu(
    block: BlockMenuBlockType,
    newBlock: BlockMenuBlockType
  ) {
    const blockId = blockMenuBlocks.indexOf(block);
    const newBlockMenuBlocks = JSON.parse(JSON.stringify(blockMenuBlocks));
    newBlockMenuBlocks[blockId] = newBlock;
    setBlockMenuBlocks(newBlockMenuBlocks);
  }

  // Handle block drop event
  function onBlockDrop(
    event: TouchEvent<HTMLDivElement>,
    block: BlockMenuBlockType
  ) {
    const selectedCell = getSelectedCell(event, block);
    if (selectedCell?.id.includes("cell")) {
      const selectedCellPos = getSelectedCellPosition(selectedCell);
      const newGrid = updateGridWithBlock(selectedCellPos, block, "solid");

      if (newGrid) {
        replaceBlockInBlockMenu(block, blockPresets.randomBlock());
        const clearedRowGrid =
          boardController.clearFilledRows(newGrid) ?? newGrid;

        const clearedGrid =
          boardController.clearFilledColumns(clearedRowGrid) ?? clearedRowGrid;

        if (clearedGrid !== newGrid) {
          const { clearedRows, clearedColumns } = boardController.compare(
            newGrid,
            clearedGrid
          );
          const newScore =
            score +
            clearedRows.length * 100 +
            clearedColumns.length * 100 +
            Math.floor(clearedRows.length / 2) * 200 +
            Math.floor(clearedColumns.length / 2) * 200;

          setScore(newScore);
        }

        setGrid(clearedGrid);
      }
    }
  }

  // Handle block drag event
  function onBlockDrag(
    event: TouchEvent<HTMLDivElement>,
    block: BlockMenuBlockType
  ) {
    const selectedCell = getSelectedCell(event, block);
    if (selectedCell?.id.includes("cell")) {
      const selectedCellPos = getSelectedCellPosition(selectedCell);
      updateGridWithBlock(selectedCellPos, block, "highlight");
    } else {
      setGrid(boardController.clearHighlight(grid));
    }
  }

  return (
    <main className="page">
      <div className="flex gap-4">
        <ScoreBoard score={score} highScore={score} />
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
