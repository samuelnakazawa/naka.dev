import { BackgroundBeamsWithCollision } from "../components/ui/background-beams-with-collision";
import { Footer, Header } from "@/components";

export default function Home() {
  return (
    <BackgroundBeamsWithCollision>
      <div className="w-full h-screen grid grid-rows-[auto_1fr_auto] bg-black">
<Header />
        {/* Body */}
        <main className="flex flex-col items-center justify-center p-8">
          <div>teste</div>
        </main>

        <Footer />
      </div>
    </BackgroundBeamsWithCollision>
  );
}
