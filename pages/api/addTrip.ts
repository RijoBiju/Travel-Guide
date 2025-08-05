import type { NextApiRequest, NextApiResponse } from "next";
import { supabaseClient } from "../../lib/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { user_id, trip_title, day_plans } = req.body;

  if (!trip_title || !day_plans || !user_id) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const { data, error } = await supabaseClient.from("trips").insert([
    {
      user_id: user_id,
      trip_title,
      day_plans,
    },
  ]);

  if (error) {
    return res.status(500).json({ error: "Failed to add trip" });
  }

  return res.status(200).json({ success: true, data });
}
