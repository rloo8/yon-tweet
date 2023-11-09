import { NextApiRequest, NextApiResponse } from "next";

type method = "GET" | "POST" | "DELETE";

interface ConfigType {
  methods: method[];
  fn: (req: NextApiRequest, res: NextApiResponse) => void;
}

export default function withHandler({ methods, fn }: ConfigType) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method && !methods.includes(req.method as any)) {
      return res.status(405).end();
    }
    try {
      await fn(req, res);
    } catch (error) {
      return res.status(500).json({ success: false, message: error });
    }
  };
}
