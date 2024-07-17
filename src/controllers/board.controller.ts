import { BlockProps } from "@/components/block";
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
  const newGrid = grid.map(row => row.map(cell => ({ ...cell })));
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


export default {
  addBlock,
  clearHighlight,
  clearFilledRows,
  clearFilledColumns,
};
