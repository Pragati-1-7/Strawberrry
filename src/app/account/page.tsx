import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Header from "@/components/Header";
import AccountForm from "@/components/AccountForm";

export default async function AccountPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Auth Guard
  if (!user) {
    redirect("/");
  }

  // Fetch user profile data
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/30 flex flex-col">
      <Header userEmail={user.email || null} />
      
      <div className="flex-1 flex pt-32 pb-12 px-6 md:px-12 w-full max-w-4xl mx-auto">
        <AccountForm 
          email={user.email || ''} 
          initialData={{
            full_name: profile?.full_name || '',
            contact: profile?.contact || '',
            address: profile?.address || ''
          }} 
        />
      </div>
    </main>
  );
}
