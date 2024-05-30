import Game from "@/components/Game";
import Image from "next/image";

export default function Home() {
  return (
    <main className=" ">
     <Game initialScore={1500}/>
    </main>
  );
}
