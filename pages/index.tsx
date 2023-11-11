import { Tweet } from "@prisma/client";
import Link from "next/link";
import React from "react";
import useSWR from "swr";
import Header from "../components/Header";

interface TweetWithUser extends Tweet {
  user: { name: string };
}

interface TweetsResponse {
  ok: boolean;
  tweets: TweetWithUser[];
}

export default function Home() {
  const { data } = useSWR<TweetsResponse>("/api/tweets");
  const reversedTweets = data?.tweets ? [...data.tweets].reverse() : [];

  return (
    <>
      <Header />
      <div className="max-w-screen-md mx-auto p-4">
        <ul className="space-y-4">
          {reversedTweets.map((tweet) => (
            <Link href={`/tweets/${tweet.id}`} key={tweet.id}>
              <li className="p-4 border border-gray-300 rounded-md flex justify-between items-center hover:bg-gray-100 transition-all duration-300 cursor-pointer">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold">{tweet.text}</span>
                  <span className="text-gray-500 text-sm">
                    @{tweet.user.name}
                  </span>
                </div>
                <svg
                  width="24px"
                  height="24px"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  color="#000000"
                >
                  <path
                    d="M9 6L15 12L9 18"
                    stroke="#000000"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </li>
            </Link>
          ))}
        </ul>
        <Link href="/tweets/upload">
          <a className="block text-center font-bold mt-4 p-4 bg-yellow-300 rounded-md hover:bg-black hover:text-white transition-all duration-300">
            UPLOAD TWEET
          </a>
        </Link>
      </div>
    </>
  );
}
