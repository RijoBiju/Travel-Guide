import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { place_id } = req.query;
  if (!place_id || typeof place_id !== "string")
    return res.status(400).json({ error: "Missing place_id" });
  const key = process.env.GEOAPIFY_KEY;

  const response = await fetch(
    `https://api.geoapify.com/v2/place-details?id=${encodeURIComponent(
      place_id
    )}&apiKey=${key}`
  );
  const data = await response.json();
  res.status(response.ok ? 200 : response.status).json(data);
}
