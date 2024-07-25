import { Home, Pause } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { ResetIcon } from "@radix-ui/react-icons";

function PauseButton() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="rounded-md" variant={"outline"} size={"icon-lg"}>
          <Pause />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-md:max-w-[90vw] rounded-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Game Paused</AlertDialogTitle>
          <AlertDialogDescription className="hidden">
            Pause Menu
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Link to={"/"} className="w-full">
          <Button className="w-full flex justify-center gap-2">
            <Home size={16} />{" "}
            <span className="translate-y-[1px]">Go back home</span>
          </Button>
        </Link>
        <Button
          className="w-full flex justify-center gap-2"
          onClick={() => {
            window.location.reload();
          }}
        >
          <ResetIcon /> <span className="translate-y-[1px]">Restart</span>
        </Button>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default PauseButton;
