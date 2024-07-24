import { BlockProps } from "@/components/block";
import { BlockMenuProps } from "@/components/block-menu";
import { BoardProps } from "@/components/board";
import { CellProps } from "@/components/cell";

const addBlock = (
  grid: BoardProps["grid"],
  pos: [number, number],
  variant: CellProps["variant"],
  color: string,
  blockGrid: BlockProps["grid"]
) => {
  let isBlockPlaceable = true;
  const [colIndex, rowIndex] = pos;
  const newGrid = JSON.parse(JSON.stringify(grid));

  outer: for (let i = rowIndex; i < rowIndex + blockGrid.length; i++) {
    for (let j = colIndex; j < colIndex + blockGrid[i - rowIndex].length; j++) {
      const blockCell = blockGrid[i - rowIndex][j - colIndex];
      const blockCellIsEmpty = blockCell === 0;

      const gridCell = grid[i] && grid[i][j];
      const gridCellIsEmpty = gridCell?.variant === "empty";

      if (!blockCellIsEmpty) {
        if (gridCellIsEmpty) {
          newGrid[i][j].variant = variant;
          newGrid[i][j].color = color;
        } else {
          isBlockPlaceable = false;
          break outer;
        }
      }
    }
  }

  if (isBlockPlaceable) return newGrid;
  else return undefined;
};

const clearHighlight = (grid: BoardProps["grid"]) => {
  const newGrid = JSON.parse(JSON.stringify(grid));

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const gridCell = grid[i][j];
      const gridCellIsHighlighted = gridCell.variant === "highlight";

      if (gridCellIsHighlighted) {
        newGrid[i][j].variant = "empty";
        newGrid[i][j].color = "";
      }
    }
  }

  return newGrid;
};

const clearFilledRows = (grid: BoardProps["grid"]) => {
  const newGrid = grid.map((row) => row.map((cell) => ({ ...cell })));
  let isModified = false;

  for (let i = 0; i < grid.length; i++) {
    if (grid[i].every((cell) => cell.variant === "solid")) {
      newGrid[i].forEach((cell) => {
        cell.variant = "empty";
        cell.color = "";
      });
      isModified = true;
    }
  }

  return isModified ? newGrid : undefined;
};

const clearFilledColumns = (grid: BoardProps["grid"]) => {
  const newGrid = grid.map((row) => row.map((cell) => ({ ...cell })));
  let isModified = false;

  const numRows = grid.length;
  const numCols = grid[0].length;

  for (let col = 0; col < numCols; col++) {
    let isColumnFilled = true;

    for (let row = 0; row < numRows; row++) {
      if (grid[row][col].variant !== "solid") {
        isColumnFilled = false;
        break;
      }
    }

    if (isColumnFilled) {
      for (let row = 0; row < numRows; row++) {
        newGrid[row][col].variant = "empty";
        newGrid[row][col].color = "";
      }
      isModified = true;
    }
  }

  return isModified ? newGrid : undefined;
};

const compare = (oldGrid: BoardProps["grid"], newGrid: BoardProps["grid"]) => {
  const clearedRows = [];
  const clearedColumns = [];

  for (let row = 0; row < oldGrid.length; row++) {
    if (
      oldGrid[row].every((cell) => cell.variant === "solid") &&
      newGrid[row].every((cell) => cell.variant === "empty")
    ) {
      clearedRows.push(row);
    }
  }

  for (let col = 0; col < oldGrid[0].length; col++) {
    let isColumnCleared = true;

    for (let row = 0; row < oldGrid.length && isColumnCleared; row++) {
      isColumnCleared =
        oldGrid[row][col].variant === "solid" &&
        newGrid[row][col].variant === "empty";
    }

    if (isColumnCleared) {
      clearedColumns.push(col);
    }
  }

  return {
    clearedRows,
    clearedColumns,
  };
};

const isGamePlayable = (
  grid: BoardProps["grid"],
  blockMenuBlocks: BlockMenuProps["blocks"]
) => {
  const numRows = grid.length;
  const numCols = grid[0].length;

  const canPlaceBlock = (
    grid: BoardProps["grid"],
    block: BlockMenuProps["blocks"][number],
    startRow: number,
    startCol: number
  ) => {
    const blockRows = block.grid.length;
    const blockCols = block.grid[0].length;

    if (startRow + blockRows > numRows || startCol + blockCols > numCols) {
      return false;
    }

    for (let i = 0; i < blockRows; i++) {
      for (let j = 0; j < blockCols; j++) {
        if (
          block.grid[i][j] === 1 &&
          grid[startRow + i][startCol + j].variant === "solid"
        ) {
          return false;
        }
      }
    }

    return true;
  };

  for (const block of blockMenuBlocks) {
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        if (canPlaceBlock(grid, block, row, col)) {
          return true;
        }
      }
    }
  }

  return false;
};

const combine = (grid_1: BoardProps["grid"], grid_2: BoardProps["grid"]) => {
  for (let i = 0; i < grid_1.length; i++) {
    for (let j = 0; j < grid_1[i].length; j++) {
      if (grid_2[i][j].variant === "empty") {
        grid_1[i][j] = { ...grid_2[i][j] };
      }
    }
  }

  return grid_1;
};

export default {
  addBlock,
  clearHighlight,
  clearFilledRows,
  clearFilledColumns,
  compare,
  isGamePlayable,
  combine,
};
