import Link from "next/link";
import React from "react";
import useSWR from "swr";

export default function Home() {
  const { data } = useSWR("/api/users/me");

  return (
    <div>
      <h1>Hello {data?.name}</h1>
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
