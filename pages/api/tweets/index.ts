import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/server/db";
import withHandler from "../../../lib/server/withHandler";
import { withApiSession } from "../../../lib/server/withApiSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
  }

  if (req.method === "POST") {
    const { text } = req.body;
    const { user } = req.session;

    const tweet = await db.tweet.create({
      data: {
        text,
        user: {
          connect: { id: user?.id },
        },
      },
    });
    res.json({
      ok: true,
      tweet,
    });
    res.status(200).end();
  }
}

export default withApiSession(
  withHandler({ methods: ["GET", "POST"], fn: handler })
);
