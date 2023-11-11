import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "../../../../lib/server/withApiSession";
import withHandler from "../../../../lib/server/withHandler";
import db from "../../../../lib/server/db";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const { user } = req.session;

  const tweet = await db.tweet.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });
  const isLiked = Boolean(
    await db.like.findFirst({
      where: {
        tweetId: tweet?.id,
        userId: user?.id,
      },
      select: {
        id: true,
      },
    })
  );

  res.json({
    ok: true,
    tweet,
    isLiked,
  });
}

export default withApiSession(withHandler({ methods: ["GET"], fn: handler }));
