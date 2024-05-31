import Game from "@/components/Game";
import Image from "next/image";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Home() {
  return (
    <main className=" ">
       <ToastContainer position="bottom-right" autoClose={3000} />
     <Game />
    </main>
  );
}
