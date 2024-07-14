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
          <Button className="w-full">
            <Home /> | Go back home
          </Button>
        </Link>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default PauseButton;
