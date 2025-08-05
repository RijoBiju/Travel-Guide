import { supabaseClient } from "@/lib/supabaseClient";

const redirectUrl = process.env.NEXT_PUBLIC_REDIRECT_URL;

export async function signInWithGoogle() {
  const { data, error } = await supabaseClient.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${redirectUrl}/auth/confirm`,
    },
  });

  if (error) {
    console.error("Google sign-in error:", error.message);
  } else if (data?.url) {
    window.location.href = data.url;
  }
}
