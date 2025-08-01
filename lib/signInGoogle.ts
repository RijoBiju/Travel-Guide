import { supabaseClient } from "@/lib/supabaseClient";

export async function signInWithGoogle() {
  const { error } = await supabaseClient.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:3000/dashboard",
    },
  });

  if (error) {
    console.error("Google sign-up error:", error.message);
  }
}
