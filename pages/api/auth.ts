import { loginUser, registrarUser } from "@lib/authpirsma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const { user, password } = req.body;

  try {
    await loginUser(user, password, res);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err });
  }
}
