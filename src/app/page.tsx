import CanvasSequence from "@/components/CanvasSequence";
import Particles from "@/components/Particles";
import Footer from "@/components/Footer";
import HomeClient from "@/components/HomeClient";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <main className="relative w-full text-foreground selection:bg-primary/30">
      <Particles />
      <CanvasSequence />
      <HomeClient userEmail={user?.email || null} />
      <Footer />
    </main>
  );
}
