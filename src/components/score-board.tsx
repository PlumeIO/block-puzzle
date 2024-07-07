import { cn } from "@/lib/utils";
import React from "react";

export interface ScoreBoardProps extends React.HTMLAttributes<HTMLDivElement> {
  score: number;
  highScore: number;
}

const ScoreBoard = React.forwardRef<HTMLDivElement, ScoreBoardProps>(
  ({ className, highScore, score, ...props }, ref) => {
    return (
      <div
        className={cn(className, "w-full flex items-center gap-4")}
        ref={ref}
        {...props}
      >
        <div className="border-2 border-border p-4 rounded-md w-full flex justify-center">
          <span className="fixed -translate-y-8 bg-background px-2">Score</span>
          <h3 className="m-0">{score}</h3>
        </div>
        <div className="border-2 border-border p-4 rounded-md w-full flex justify-center">
          <span className="fixed -translate-y-8 bg-background px-2">
            High Score
          </span>
          <h3 className="m-0">{highScore}</h3>
        </div>
      </div>
    );
  }
);

export default ScoreBoard;
