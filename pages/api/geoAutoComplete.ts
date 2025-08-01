import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { text } = req.query;
  if (!text || typeof text !== "string")
    return res.status(400).json({ error: "Missing text" });
  const key = process.env.GEOAPIFY_KEY;

  const response = await fetch(
    `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
      text
    )}&limit=5&apiKey=${key}`
  );
  const data = await response.json();
  res.status(response.ok ? 200 : response.status).json(data);
}
