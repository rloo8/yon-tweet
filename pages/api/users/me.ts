import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "../../../lib/server/withApiSession";
import withHandler from "../../../lib/server/withHandler";
import db from "../../../lib/server/db";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const loginUser = await db.user.findUnique({
    where: { id: req.session.user?.id },
  });
  if (!loginUser) {
    return res.status(404).end();
  }
  return res.send({ ...loginUser });
}

export default withApiSession(withHandler({ methods: ["GET"], fn: handler }));
