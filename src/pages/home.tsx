import SettingButton from "@/components/settings-button";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="page items-center justify-center">
      <h1>Block Puzzle</h1>
      <Link to={"/game-classic"}>
        <Button size={"xl"}>
          <PlayCircle />
        </Button>
      </Link>
      <SettingButton />
    </main>
  );
}

export default Home;
