import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

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
      alert("계정이 존재하지 않습니다!");
    }
  };

  return (
    <div>
      <h1>LOGIN</h1>
      <form onSubmit={handleSubmit(onValid)}>
        <div>
          <label htmlFor="email">이메일: </label>
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
          />
          {errors.email?.message}
        </div>
        <div>
          <label htmlFor="password">비밀번호: </label>
          <input
            {...register("password", {
              required: "비밀번호는 필수로 작성해주세요!",
            })}
            type="text"
            id="password"
          />
          {errors.password?.message}
        </div>
        <input type="submit" value="LOGIN" />
      </form>
      <Link href="/create-account">CREATE-ACCOUNT 바로가기</Link>
    </div>
  );
}
