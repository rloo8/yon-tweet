import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "../../../lib/server/withApiSession";
import withHandler from "../../../lib/server/withHandler";
import db from "../../../lib/server/db";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (!req.session?.user?.id) {
      return res.send({ ok: false, error: "Not logged in" });
    }

    const loginUser = await db.user.findUnique({
      where: { id: req.session.user.id },
    });

    if (!loginUser) {
      return res.status(401).json({ ok: false, error: "User not found" });
    }

    return res.status(200).json({ ok: true, user: loginUser });
  } catch (error) {
    console.error("Error in user API:", error);
    return res.status(500).json({ ok: false, error: "Internal server error" });
  }
}

export default withApiSession(withHandler({ methods: ["GET"], fn: handler }));
