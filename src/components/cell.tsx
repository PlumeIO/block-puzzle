import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { HTMLAttributes, forwardRef } from "react";

const cellVariants = cva("rounded-[25%]", {
  variants: {
    variant: {
      solid: "",
      highlight: "opacity-40 brightness-125",
      empty: "bg-transparent",
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
        data-variant={variant}
        ref={ref}
        style={{
          backgroundColor: color,
          width: `${size}px`,
          height: `${size}px`,
          borderWidth: `${size / 20}px`,
        }}
        {...props}
      />
    );
  }
);

export default Cell;
