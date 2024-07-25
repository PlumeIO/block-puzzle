import { TouchEvent, useEffect, useRef, useState } from "react";
import BlockMenu, {
  BlockMenuBlockType,
  BlockMenuProps,
} from "@/components/block-menu";
import Board, { BoardProps } from "@/components/board";
import { CellProps } from "@/components/cell";
import EndMenu from "@/components/end-menu";
import PauseButton from "@/components/pause-button";
import ScoreBoard from "@/components/score-board";
import boardController from "@/controllers/board.controller";
import blockPresets from "@/lib/block-presets";

function ClassicGame() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(
    Number(localStorage.getItem("HIGH-SCORE")) ?? 0
  );
  const [cellSize, setCellSize] = useState(0);
  const [grid, setGrid] = useState<BoardProps["grid"]>(
    Array.from({ length: 9 }, () =>
      Array.from({ length: 9 }, () => ({ variant: "empty" }))
    )
  );
  const [blockMenuBlocks, setBlockMenuBlocks] = useState<
    BlockMenuProps["blocks"]
  >([
    blockPresets.randomBlock(),
    blockPresets.randomBlock(),
    blockPresets.randomBlock(),
  ]);

  const boardRef = useRef<HTMLDivElement>(null);
  const endGameButtonRef = useRef<HTMLButtonElement>(null);

  // Effect to set the cell size based on the board dimensions
  useEffect(() => {
    if (!boardRef.current) return;
    const { width, height } = boardRef.current.getBoundingClientRect();
    const rows = grid.length;
    const columns = grid[0].length;
    setCellSize(Math.min(width, height) / Math.max(rows, columns));
  }, [grid]);

  // Get the selected cell based on touch event and block dimensions
  const getSelectedCell = (
    event: TouchEvent<HTMLDivElement>,
    block: BlockMenuBlockType
  ): HTMLDivElement | null => {
    const { clientX, clientY } = event.changedTouches[0];
    const { length: blockRows } = block.grid;
    const { length: blockColumns } = block.grid[0];

    return document
      .elementsFromPoint(
        clientX - (blockColumns / 2) * cellSize + cellSize / 2,
        clientY - (blockRows / 2) * cellSize + cellSize / 2
      )
      .find((ele) => ele?.id.includes("cell")) as HTMLDivElement;
  };

  // Get the position of the selected cell
  const getSelectedCellPosition = (
    selectedCell: HTMLDivElement
  ): [number, number] => {
    return selectedCell.id.replace("cell-", "").split("x").map(Number) as [
      number,
      number
    ];
  };

  // Update the grid with the dropped block
  const updateGridWithBlock = (
    selectedCellPos: [number, number],
    block: BlockMenuBlockType,
    variant: CellProps["variant"]
  ) => {
    const gridWithoutHighlight = boardController.clearHighlight(grid);
    return boardController.addBlock(
      gridWithoutHighlight,
      selectedCellPos,
      variant,
      block.color,
      block.grid
    );
  };

  // Replace the block in the block menu with a new random block
  const replaceBlockInBlockMenu = (
    block: BlockMenuBlockType,
    newBlock: BlockMenuBlockType
  ) => {
    const blockId = blockMenuBlocks.indexOf(block);
    const newBlockMenuBlocks = [...blockMenuBlocks];
    newBlockMenuBlocks[blockId] = newBlock;
    setBlockMenuBlocks(newBlockMenuBlocks);
    return newBlockMenuBlocks;
  };

  // handle game end event
  const onGameEnd = () => {
    endGameButtonRef.current?.click();
    if (score > highScore) {
      localStorage.setItem("HIGH-SCORE", String(score));
      setHighScore(score);
    }
  };

  // Handle block drop event
  const onBlockDrop = (
    event: TouchEvent<HTMLDivElement>,
    block: BlockMenuBlockType
  ) => {
    const selectedCell = getSelectedCell(event, block);
    if (selectedCell?.id.includes("cell")) {
      const selectedCellPos = getSelectedCellPosition(selectedCell);
      const newGrid = updateGridWithBlock(selectedCellPos, block, "solid");

      if (newGrid) {
        const newBlockMenuBlocks = replaceBlockInBlockMenu(
          block,
          blockPresets.randomBlock()
        );

        // Clear filled rows and columns and update the grid
        const clearedGrid = [
          boardController.clearFilledRows(newGrid) ?? newGrid,
          boardController.clearFilledColumns(newGrid) ?? newGrid,
        ].reduce(boardController.combine);

        if (JSON.stringify(clearedGrid) !== JSON.stringify(newGrid)) {
          const { clearedRows, clearedColumns } = boardController.compare(
            newGrid,
            clearedGrid
          );
          console.log("yes");
          const newScore =
            score +
            clearedRows.length * 100 +
            clearedColumns.length * 100 +
            Math.floor(clearedRows.length / 2) * 200 +
            Math.floor(clearedColumns.length / 2) * 200;
          setScore(newScore);
        }

        setGrid(clearedGrid);

        // Check if the game is still playable
        if (!boardController.isGamePlayable(clearedGrid, newBlockMenuBlocks)) {
          onGameEnd();
        }
      }
    }
  };

  // Handle block drag event
  const onBlockDrag = (
    event: TouchEvent<HTMLDivElement>,
    block: BlockMenuBlockType
  ) => {
    const selectedCell = getSelectedCell(event, block);
    if (selectedCell?.id.includes("cell")) {
      const selectedCellPos = getSelectedCellPosition(selectedCell);
      updateGridWithBlock(selectedCellPos, block, "highlight");
    } else {
      setGrid(boardController.clearHighlight(grid));
    }
  };

  return (
    <main className="page">
      <div className="flex gap-4">
        <ScoreBoard score={score} highScore={highScore} />
        <PauseButton />
      </div>
      <Board grid={grid} cellSize={cellSize} ref={boardRef} />
      <BlockMenu
        blocks={blockMenuBlocks}
        hoverSize={cellSize}
        onBlockDrop={onBlockDrop}
        onBlockDrag={onBlockDrag}
      />
      <EndMenu ref={endGameButtonRef} />
    </main>
  );
}

export default ClassicGame;
