import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Header from "../../components/Header";

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    mode: "onChange",
  });
  const router = useRouter();
  const onValid = async (data: LoginForm) => {
    const request = await fetch("/api/users/log-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (request.status === 200) {
      router.push("/");
    } else {
      alert("아이디 또는 비밀번호를 확인해주세요.");
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-screen-md mx-auto p-4">
        <form onSubmit={handleSubmit(onValid)} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-lg mb-1 font-semibold">
              Email
            </label>
            <input
              {...register("email", {
                required: "이메일은 필수로 작성해주세요!",
                validate: {
                  emailFormat: (value) =>
                    value.includes("@") || "이메일 형식을 지켜주세요!",
                },
              })}
              type="email"
              id="email"
              className="border p-2"
            />
            <span className="text-red-500 text-sm">
              {errors.email?.message}
            </span>
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-lg mb-1 font-semibold">
              Password
            </label>
            <input
              {...register("password", {
                required: "비밀번호는 필수로 작성해주세요!",
              })}
              type="password"
              id="password"
              className="border p-2"
            />
            <span className="text-red-500 text-sm">
              {errors.password?.message}
            </span>
          </div>
          <input
            type="submit"
            value="LOGIN"
            className="w-[100%] text-center font-bold mt-4 p-4 bg-yellow-300 rounded-md hover:bg-black hover:text-white transition-all duration-300 cursor-pointer"
          />
        </form>
        <div className="p-5 text-center">
          <span className="mr-2">아직 계정이 없으신가요?</span>
          <Link href="/create-account">
            <a className="text-blue-500 font-bold mt-4">CREATE ACCOUNT</a>
          </Link>
        </div>
      </div>
    </>
  );
}
