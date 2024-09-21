// import SettingButton from "@/components/settings-button";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { Link } from "react-router-dom";

const PlayButton = () => (
  <Link to="/game-classic">
    <Button size="xl">
      <Play />
    </Button>
  </Link>
);

function Home() {
  return (
    <main className="page items-center justify-center">
      <h1 className="text-foreground">Block Puzzle</h1>
      <PlayButton />
      {/* <SettingButton /> */}
    </main>
  );
}

export default Home;
