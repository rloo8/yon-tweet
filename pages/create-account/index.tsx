import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

interface CreateAccountForm {
  name: string;
  email: string;
  password: string;
}

export default function CreateAccount() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAccountForm>({
    mode: "onChange",
  });
  const onValid = async (data: CreateAccountForm) => {
    const request = await fetch("/api/users/create-account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (request.status === 200) {
      alert("계정이 이미 있군요! 로그인 해주세요!");
      router.push("/log-in");
    } else if (request.status === 201) {
      alert("계정을 만들었습니다! 로그인 해주세요!");
      router.push("/log-in");
    }
  };

  return (
    <div>
      <h1>CREATE ACCOUNT</h1>
      <form onSubmit={handleSubmit(onValid)}>
        <div>
          <label htmlFor="name">이름: </label>
          <input
            {...register("name", { required: "이름은 필수로 작성해주세요!" })}
            type="text"
            id="name"
          />
          {errors.name?.message}
        </div>
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
        <input type="submit" value="CREATE ACCOUNT" />
      </form>
      <Link href="/log-in">LOG-IN 바로가기</Link>
    </div>
  );
}
