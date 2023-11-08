import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/server/db";
import withHandler from "../../../lib/server/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await db.user.findUnique({
    where: {
      email: req.body.email,
    },
  });

  if (user) {
    return res.status(200).end();
  }
  await db.user.create({
    data: {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    },
  });
  return res.status(201).end();
}

export default withHandler({ methods: ["POST"], fn: handler });
