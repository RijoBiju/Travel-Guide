import { signUpUser } from "@/lib/db";
import { signInSchema } from "@/lib/zod";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const result = signInSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const { email, password } = req.body;

  const user = await signUpUser(email, password);
  if (!user) {
    return res.status(500).json({ error: "Signup failed" });
  }

  return res.status(200).json({ success: true });
}
