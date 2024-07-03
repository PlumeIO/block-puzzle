import SettingButton from "@/components/settings-button";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";

function Home() {
  return (
    <main className="page items-center justify-center">
      <h1>Block Puzzle</h1>
      <Button size={"xl"}>
        <PlayCircle />
      </Button>
      <SettingButton />
    </main>
  );
}

export default Home;
