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
  grids: [
    [[1]],
    [[1, 1]],
    [[1, 1, 1]],
    [[1, 1, 1, 1]],
    [[1, 1, 1, 1, 1]],

    [[1], [1]],
    [[1], [1], [1]],
    [[1], [1], [1], [1]],
    [[1], [1], [1], [1], [1]],

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
    [
      [1, 1, 1],
      [1, 0, 0],
      [1, 0, 0],
    ],
  ],

  colors: ["#ef4444", "#eab308", "#22c55e", "#3b82f6", "#8b5cf6"],

  randomBlock() {
    return {
      color: this.colors[Math.floor(Math.random() * this.colors.length)] ?? "",
      grid: this.grids[Math.floor(Math.random() * this.grids.length)],
    };
  },

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
