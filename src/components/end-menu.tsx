import { GoalIcon, Home } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { ResetIcon } from "@radix-ui/react-icons";
import React from "react";

const EndMenu = React.forwardRef<HTMLButtonElement>((_, ref) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="rounded-md hidden"
          variant={"outline"}
          size={"icon-lg"}
          ref={ref}
        >
          <GoalIcon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-md:max-w-[90vw] rounded-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Game Over</AlertDialogTitle>
          <AlertDialogDescription className="hidden">
            Game Over Screen
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Link to={"/"} className="w-full">
          <Button className="w-full">
            <Home /> | Go back home
          </Button>
        </Link>
        <Button
          className="w-full"
          onClick={() => {
            window.location.reload();
          }}
        >
          <ResetIcon /> | Restart
        </Button>
      </AlertDialogContent>
    </AlertDialog>
  );
});

export default EndMenu;
