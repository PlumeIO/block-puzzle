import { Settings } from "lucide-react";
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
import { ModeToggle } from "./mode-toggle";

function SettingButton() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="fixed bottom-4 right-4"
          variant={"outline"}
          size={"icon-lg"}
        >
          <Settings />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-md:max-w-[90vw] rounded-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Settings</AlertDialogTitle>
          <AlertDialogDescription className="hidden">
            App Settings
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex justify-between items-center">
          <span>Theme</span>
          <ModeToggle />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default SettingButton;
