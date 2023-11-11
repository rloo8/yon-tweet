import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Header from "../../components/Header";

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
    <>
      <Header />
      <div className="container mx-auto mt-5 p-4 bg-white shadow-lg rounded-md">
        <form onSubmit={handleSubmit(onValid)}>
          <textarea
            {...register("text", { required: true })}
            className="w-full h-32 border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
          />
          <button
            type="submit"
            className="mt-4 px-6 py-2 bg-yellow-300 font-semibold text-black rounded-md hover:bg-black hover:text-white focus:outline-none"
          >
            UPLOAD
          </button>
        </form>
      </div>
    </>
  );
}
