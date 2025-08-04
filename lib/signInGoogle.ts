import { supabaseClient } from "@/lib/supabaseClient";

export async function signInWithGoogle() {
  const { data, error } = await supabaseClient.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/auth/confirm`,
    },
  });

  if (error) {
    console.error("Google sign-in error:", error.message);
  } else if (data?.url) {
    window.location.href = data.url;
  }
}
