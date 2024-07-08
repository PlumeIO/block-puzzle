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

      const gridCell = grid[i][j];
      const gridCellIsEmpty = gridCell.variant === "empty";

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
  else return grid;
};

export default {
  addBlock,
};
