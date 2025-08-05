import type { NextApiRequest, NextApiResponse } from "next";
import { supabaseClient } from "@/lib/supabaseClient";

type ResponseJSON = { data?: null; error? };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseJSON>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Invalid HTTP method" });
  }

  const { email } = req.body;

  if (!email || typeof email !== "string") {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const { error } = await supabaseClient.auth.signInWithOtp({
      email,
      options: {
        // shouldCreateUser: false,
        emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/confirm`,
      },
    });

    if (error) throw error;

    return res.status(200).json({ data: {} });
  } catch (err) {
    console.error("Magic link error:", err);
    return res
      .status(500)
      .json({ error: err.message ?? "An internal error occurred" });
  }
}
