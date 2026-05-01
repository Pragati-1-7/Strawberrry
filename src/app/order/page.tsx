import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import OrderForm from "./OrderForm";
import Header from "@/components/Header";

export default async function OrderPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Auth Guard
  if (!user) {
    redirect("/");
  }

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/30 flex flex-col">
      <Header userEmail={user.email || null} />
      
      <div className="flex-1 flex pt-24 pb-12 px-6 md:px-12 w-full max-w-[1600px] mx-auto">
        <OrderForm userEmail={user.email || null} />
      </div>
    </main>
  );
}
