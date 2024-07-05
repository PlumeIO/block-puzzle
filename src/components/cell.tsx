import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { HTMLAttributes, forwardRef } from "react";

const cellVariants = cva("border-4 border-ring", {
  variants: {
    variant: {
      solid: "",
      highlight: "opacity-40 brightness-125",
      empty: "!bg-transparent border-border",
      hidden: "invisible",
    },
  },
  defaultVariants: {
    variant: "solid",
  },
});

export interface CellProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cellVariants> {
  size: number;
  color?: string;
}

const Cell = forwardRef<HTMLDivElement, CellProps>(
  ({ className, variant, size, color = "", ...props }, ref) => {
    return (
      <div
        className={cn(cellVariants({ variant: variant, className }))}
        ref={ref}
        style={{
          backgroundColor: color,
          width: `${size}px`,
          height: `${size}px`,
        }}
        {...props}
      />
    );
  }
);

export default Cell;
