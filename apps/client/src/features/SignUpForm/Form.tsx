import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { signUp } from "@sh/api/auth/POST.signup";

export const Form = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch } = useForm(
    {
      defaultValues: {
        username: "",
        email: "",
        password: "",
      },
      mode: "onTouched",
    }
  );

  const onSubmit = async (data: any) => {
    console.log(data);
    setLoading(true)
    try {
      const res = await signUp(data);
      console.log(res);
      if (!res) {
        throw new Error("Что-то пошло не так");
      }
      navigate("/login?re=signup");


    } catch (e) {
      console.log(e)
      toast.error(e.message)
    } finally {
      setLoading(false)
    }
  }
  const [isLoading, setLoading] = useState(false)


  return (
    <>
      <Toaster/>
      <form className="space-y-6"
            onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label htmlFor="name" className="sr-only">
            Ваше имя
          </label>
          <input
            {...register("username", { required: "Пожалуйста, укажите ваше имя" })}
            type="text"
            name="username"
            id="username"
            autoComplete="name"
            placeholder="Ваше имя"
            className="block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="mobile-or-email" className="sr-only">
            Email
          </label>
          <input
            {...register("email", { required: "Укажите ваш email" })}
            type="email"
            name="email"
            id="email"
            autoComplete="email"
            placeholder="Почта"
            className="block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            {...register("password", { required: "Придуймате пароль" })}
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
            autoComplete="current-password"
            className="block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className={isLoading ? "loading-button" : "primary-button"}
          >
            {isLoading ? 'Подождите...' : 'Зарегистрироваться'}
          </button>
        </div>
      </form>

      <div className={'flex flex-row gap-2 items-center justify-center mt-6 text-sm'}>
        <p className={'font-light'}>Уже зарегистрированы?</p>
        <Link to={'/login'}>
          <p className={'text-blue-500 tr resp font-normal'}>Войдите <span className={'font-bold'}>›</span></p>
        </Link>
      </div>
    </>
  );
};
