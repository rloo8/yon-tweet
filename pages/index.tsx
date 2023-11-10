import { Tweet } from "@prisma/client";
import Link from "next/link";
import React from "react";
import useSWR from "swr";

interface TweetWithUser extends Tweet {
  user: { name: string };
}

interface TweetsResponse {
  ok: boolean;
  tweets: TweetWithUser[];
}

export default function Home() {
  const { data } = useSWR<TweetsResponse>("/api/tweets");

  return (
    <div>
      <ul>
        {data?.tweets?.map((tweet) => (
          <li key={tweet.id}>
            <span>{tweet.text}</span>
            <span>{tweet.user.name}</span>
          </li>
        ))}
      </ul>
      <Link href="/tweet/upload">
        <svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </Link>
    </div>
  );
}
