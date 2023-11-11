import { Tweet, User } from "@prisma/client";
import { useRouter } from "next/router";
import useSWR from "swr";

function cls(...classnames: string[]) {
  return classnames.join(" ");
}

interface TweetWithUser extends Tweet {
  user: User;
}

interface TweetDetailResponse {
  ok: boolean;
  tweet: TweetWithUser;
  isLiked: boolean;
}

export default function TweetDetail() {
  const router = useRouter();
  const { data, mutate } = useSWR<TweetDetailResponse>(
    router.query.id ? `/api/tweets/${router.query.id}` : null
  );
  const toggleLike = async (data: any) => {
    await fetch(`/api/tweets/${router.query.id}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  };

  const onFavClick = async () => {
    if (!data) return;
    mutate({ ...data, isLiked: !data.isLiked }, false);
    await toggleLike({});
  };

  return (
    <div>
      <span>{data?.tweet?.user?.name}</span>
      <span>{data?.tweet.text}</span>
      <button
        onClick={onFavClick}
        className={data?.isLiked ? "text-red-500" : "text-gray-400"}
      >
        <svg
          className="h-6 w-6 "
          xmlns="http://www.w3.org/2000/svg"
          fill={data?.isLiked ? "currentColor" : "none"}
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>
    </div>
  );
}
