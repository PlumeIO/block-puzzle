import { BlockProps } from "@/components/block";
import { BlockMenuProps } from "@/components/block-menu";
import { BoardProps } from "@/components/board";
import { CellProps } from "@/components/cell";

/**
 * Adds a block to the grid if it can be placed without overlapping existing blocks.
 * @param grid - The current grid state.
 * @param pos - The position to place the block [colIndex, rowIndex].
 * @param variant - The variant of the cell (e.g., "solid", "highlight").
 * @param color - The color of the block.
 * @param blockGrid - The grid representation of the block.
 * @returns The new grid state if the block is placeable, otherwise undefined.
 */
const addBlock = (
  grid: BoardProps["grid"],
  pos: [number, number],
  variant: CellProps["variant"],
  color: string,
  blockGrid: BlockProps["grid"]
): BoardProps["grid"] | undefined => {
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

  return isBlockPlaceable ? newGrid : undefined;
};

/**
 * Clears highlighted cells in the grid by setting them to empty.
 * @param grid - The current grid state.
 * @returns The new grid state with cleared highlights.
 */
const clearHighlight = (grid: BoardProps["grid"]): BoardProps["grid"] => {
  const newGrid = JSON.parse(JSON.stringify(grid));

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const gridCell = grid[i][j];
      if (gridCell.variant === "highlight") {
        newGrid[i][j].variant = "empty";
        newGrid[i][j].color = "";
      }
    }
  }

  return newGrid;
};

/**
 * Clears filled rows in the grid.
 * @param grid - The current grid state.
 * @returns The new grid state with cleared rows if any were filled, otherwise undefined.
 */
const clearFilledRows = (
  grid: BoardProps["grid"]
): BoardProps["grid"] | undefined => {
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

/**
 * Clears filled columns in the grid.
 * @param grid - The current grid state.
 * @returns The new grid state with cleared columns if any were filled, otherwise undefined.
 */
const clearFilledColumns = (
  grid: BoardProps["grid"]
): BoardProps["grid"] | undefined => {
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

/**
 * Combines two grids by copying empty cells from the second grid to the first grid.
 * @param grid1 - The first grid.
 * @param grid2 - The second grid.
 * @returns The combined grid.
 */
const combine = (
  grid1: BoardProps["grid"],
  grid2: BoardProps["grid"]
): BoardProps["grid"] => {
  const newGrid = JSON.parse(JSON.stringify(grid1));

  for (let i = 0; i < newGrid.length; i++) {
    for (let j = 0; j < newGrid[i].length; j++) {
      if (grid2[i][j].variant === "empty") {
        newGrid[i][j] = { ...grid2[i][j] };
      }
    }
  }

  return newGrid;
};

/**
 * Compares the old grid with the new grid to identify cleared rows and columns.
 * @param oldGrid - The previous grid state.
 * @param newGrid - The new grid state.
 * @returns An object containing arrays of cleared rows and cleared columns.
 */
const compare = (oldGrid: BoardProps["grid"], newGrid: BoardProps["grid"]) => {
  const clearedRows: number[] = [];
  const clearedColumns: number[] = [];

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

/**
 * Checks if the game is playable by determining if any block can be placed on the grid.
 * @param grid - The current grid state.
 * @param blockMenuBlocks - The blocks available in the block menu.
 * @returns True if the game is playable, otherwise false.
 */
const isGamePlayable = (
  grid: BoardProps["grid"],
  blockMenuBlocks: BlockMenuProps["blocks"]
): boolean => {
  const numRows = grid.length;
  const numCols = grid[0].length;

  const canPlaceBlock = (
    grid: BoardProps["grid"],
    block: BlockMenuProps["blocks"][number],
    startRow: number,
    startCol: number
  ): boolean => {
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

export default {
  addBlock,
  clearHighlight,
  clearFilledRows,
  clearFilledColumns,
  combine,
  compare,
  isGamePlayable,
};
