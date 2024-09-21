import { Home, RedoIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import React from "react";

const EndMenu = React.forwardRef<HTMLButtonElement>((_, ref) => {
  return (
    <section id="end-game-menu" className="hidden" ref={ref}>
      <div className="fixed top-0 left-0 w-screen h-screen"></div>
      <h1 className="text-center fixed w-screen left-0 top-[16vh] text-foreground z-10">
        Game Over
      </h1>
      <div className="flex w-full justify-evenly fixed bottom-[16vh] left-0 z-10">
        <Link to={"/"} className="">
          <Button size={"icon-xl"}>
            <Home />
          </Button>
        </Link>
        <Button
          className="text-3xl"
          size={"icon-xl"}
          onClick={() => {
            window.location.reload();
          }}
        >
          <RedoIcon />
        </Button>
      </div>
    </section>
  );
});

export default EndMenu;
