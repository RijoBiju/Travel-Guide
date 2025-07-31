import { supabaseAdmin } from "./supabaseAdmin";

export async function signUpUser(email: string, password: string) {
  const { data, error } = await supabaseAdmin.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: "http://localhost:3000/auth/confirm",
    },
  });

  if (error || !data) return null;
  return { id: data.user.id, email: data.user.email };
}

export async function verifyUser(email: string, password: string) {
  const { data, error } = await supabaseAdmin.auth.signInWithPassword({
    email,
    password,
  });
  if (error || !data) return null;
  return { id: data.user.id, email: data.user.email };
}
