import { BlockMenuProps } from "@/components/block-menu";

const blockPresets: {
  colors: BlockMenuProps["color"][];
  grids: BlockMenuProps["blocks"][number]["grid"][];
  randomBlock: () => BlockMenuProps["blocks"][number];
  blockFromGridId: (
    gridId: number,
    color?: string
  ) => BlockMenuProps["blocks"][number];
} = {
  colors: ["#ef4444", "#eab308", "#22c55e", "#3b82f6", "#8b5cf6"],
  grids: [
    // Single cell blocks
    [[1]],

    // Horizontal blocks
    [[1, 1]],
    [[1, 1, 1]],
    [[1, 1, 1, 1]],
    [[1, 1, 1, 1, 1]],

    // Vertical blocks
    [[1], [1]],
    [[1], [1], [1]],
    [[1], [1], [1], [1]],
    [[1], [1], [1], [1], [1]],

    // Box-shaped blocks
    [
      [1, 1],
      [1, 1],
    ],
    [
      [1, 1, 1],
      [1, 1, 1],
    ],
    [
      [1, 1],
      [1, 1],
      [1, 1],
    ],
    [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ],

    // T-shaped blocks
    [
      [0, 1, 0],
      [1, 1, 1],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 0],
    ],
    [
      [1, 1, 1],
      [0, 1, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [0, 1],
    ],

    // Z-shaped blocks
    [
      [1, 1, 0],
      [0, 1, 1],
    ],
    [
      [0, 1],
      [1, 1],
      [1, 0],
    ],
    [
      [0, 1, 1],
      [1, 1, 0],
    ],
    [
      [1, 0],
      [1, 1],
      [0, 1],
    ],

    // Custom shapes
    [
      [1, 0, 1],
      [1, 1, 1],
    ],
    [
      [1, 1],
      [1, 0],
      [1, 1],
    ],
    [
      [1, 1, 1],
      [1, 0, 1],
    ],
    [
      [1, 1],
      [0, 1],
      [1, 1],
    ],

    // L-shaped blocks
    [
      [1, 1],
      [1, 0],
      [1, 0],
    ],
    [
      [1, 1, 1],
      [0, 0, 1],
    ],
    [
      [0, 1],
      [0, 1],
      [1, 1],
    ],
    [
      [1, 0, 0],
      [1, 1, 1],
    ],

    // Reverse L-shaped blocks
    [
      [1, 1],
      [0, 1],
      [0, 1],
    ],
    [
      [0, 0, 1],
      [1, 1, 1],
    ],
    [
      [1, 0],
      [1, 0],
      [1, 1],
    ],
    [
      [1, 1, 1],
      [1, 0, 0],
    ],

    // Extended L-shaped blocks
    [
      [1, 1, 1],
      [1, 0, 0],
      [1, 0, 0],
    ],
    [
      [1, 1, 1],
      [0, 0, 1],
      [0, 0, 1],
    ],
    [
      [0, 0, 1],
      [0, 0, 1],
      [1, 1, 1],
    ],
    [
      [1, 0, 0],
      [1, 0, 0],
      [1, 1, 1],
    ],
  ],

  // Function to return a random block with a random color and grid
  randomBlock() {
    return {
      color: this.colors[Math.floor(Math.random() * this.colors.length)] ?? "",
      grid: this.grids[Math.floor(Math.random() * this.grids.length)],
    };
  },

  // Function to return a block based on gridId and optional color
  blockFromGridId(gridId: number, color: string | undefined = undefined) {
    return {
      color:
        color ??
        this.colors[Math.floor(Math.random() * this.colors.length)] ??
        "",
      grid: this.grids[gridId],
    };
  },
};

export default blockPresets;
