import { Tweet, User } from "@prisma/client";
import { useRouter } from "next/router";
import useSWR from "swr";
import Header from "../../components/Header";

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
    <>
      <Header />
      <div className="flex justify-between items-start container mx-auto mt-8 p-5 bg-white shadow-lg rounded-md">
        <div>
          <span className="text-lg font-bold">{data?.tweet?.user?.name}</span>
          <span className="block text-sm text-gray-600">
            {data?.tweet?.user?.email}
          </span>
          <span className="block mt-7">{data?.tweet.text}</span>
        </div>
        <button
          onClick={onFavClick}
          className={cls(
            "p-2 flex items-center justify-center rounded-md focus:outline-none",
            data?.isLiked ? "text-red-500" : "text-gray-400"
          )}
        >
          <svg
            className="h-6 w-6"
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
    </>
  );
}
