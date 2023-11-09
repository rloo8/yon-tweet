import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "../../../lib/server/withHandler";
import { withApiSession } from "../../../lib/server/withApiSession";
import db from "../../../lib/server/db";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await db.user.findUnique({
    where: {
      email: req.body.email,
    },
  });

  if (!user || req.body.password !== user.password) {
    return res.status(404).end();
  }

  req.session.user = {
    id: user.id,
  };
  await req.session.save();
  return res.status(200).end();
}

export default withApiSession(withHandler({ methods: ["POST"], fn: handler }));
