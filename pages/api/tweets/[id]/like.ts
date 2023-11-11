import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "../../../../lib/server/withApiSession";
import withHandler from "../../../../lib/server/withHandler";
import db from "../../../../lib/server/db";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const { user } = req.session;

  const isExists = await db.like.findFirst({
    where: {
      tweetId: Number(id),
      userId: user?.id,
    },
  });

  if (isExists) {
    await db.like.delete({
      where: {
        id: isExists.id,
      },
    });
  } else {
    await db.like.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        tweet: {
          connect: {
            id: Number(id),
          },
        },
      },
    });
  }

  res.json({
    ok: true,
  });
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    fn: handler,
  })
);
