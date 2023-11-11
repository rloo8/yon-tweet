import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

interface TweetForm {
  text: string;
}

export default function Upload() {
  const { register, handleSubmit } = useForm<TweetForm>({
    mode: "onChange",
  });
  const router = useRouter();

  const onValid = async (data: TweetForm) => {
    await fetch("/api/tweets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
    router.push("/");
  };

  return (
    <div>
      <h1>글쓰기</h1>
      <form onSubmit={handleSubmit(onValid)}>
        <textarea {...register("text", { required: true })} />
        <button>업로드</button>
      </form>
    </div>
  );
}
