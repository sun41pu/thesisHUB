import {useIsAuthenticated, useSignIn} from 'react-auth-kit'
import { useNavigate, Navigate, Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";

const bbqer = () => {
  alert('bbq bacon buger')
}

export const Login = () => {
  // function useQuery() {
  //   const { search } = useLocation();
  //
  //   return React.useMemo(() => new URLSearchParams(search), [search]);
  // }
  // let query = useQuery();
  //
  //
  // if (query.get('re') === 'signup') {
  //   setPrompt('Вы успешно зарегистрировались! Чтобы продолжить,')
  // }
  const [prompt, setPrompt] = useState('')
  const [params, setParams] = useState(null)


  const isAuthenticated = useIsAuthenticated()
  const signIn = useSignIn()
  const navigate = useNavigate()
  const [err, setErr] = useState('')
  const [isLoading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors } } = useForm({mode: 'onTouched'});
  // @ts-ignore
  const onSubmit = async (data) => {
    console.log(data);
    setErr('')
    setLoading(true)

    try {
      const response = await axios.post('/api/auth/signin', data)
      console.log(response)

      signIn({
        token: response.data.token,
        expiresIn: 36000,
        tokenType: "Bearer",
        authState: response.data.user
      })
      navigate('/profile?case=loginsuccess')

    } catch (e) {
      if (e && e instanceof AxiosError) {
        setErr(e.response?.data.message)
      } else if (e && e instanceof Error) {
        setErr(e.message)
      }

      console.log(e)
    } finally {
      setLoading(false)
    }

  };
  console.log(watch("email"))

  if (isAuthenticated()) {
    // If authenticated user, then redirect to home

    return (
      <Navigate to={'/profile?re=authorized'} replace/>
    )
  } else {

  return (
    <>
      <div className="min-h-full flex flex-row justify-end mx-auto">
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div className={'mb-9 sm:mb-[50%]'}>
              <h1 className={"text-3xl md:text-5xl font-bold"}>
                Thesis<span className={"text-blue-500 font-bold"} onClick={bbqer}>Hub</span>
              </h1>
            </div>
            <div>
              <Link to={'/home'} className={'text-sm mb-2 text-blue-500 hover:text-blue-600 tr'}>
                <p className={'ml-1 tr hover:-translate-x-1 w-fit'}>
                  ← назад на главную
                </p>
              </Link>
            </div>
            <div>
              {/*<img*/}
              {/*    className="h-12 w-auto"*/}
              {/*    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"*/}
              {/*    alt="Workflow"*/}
              {/*/>*/}

              <p>{prompt}</p>
              <h2 className="mt-2 text-3xl font-extrabold text-gray-900">
                войдите в профиль
              </h2>
              {/*<p className="mt-2 text-sm text-gray-600">*/}
              {/*    или{' '}*/}
              {/*    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">*/}
              {/*        зарегистрируйтесь*/}
              {/*    </a>*/}
              {/*</p>*/}
            </div>

            <div className="mt-8">
              <div>
                {/*<div>*/}
                {/*  <p className="text-sm font-medium text-gray-700">Войти с</p>*/}

                {/*  <div className="mt-1 grid grid-cols-2 gap-3">*/}

                {/*    <div>*/}
                {/*      <a*/}
                {/*        href="#"*/}
                {/*        className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"*/}
                {/*      >*/}

                {/*        <svg  className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="16" height="16"*/}
                {/*              fill="currentColor"*/}
                {/*              viewBox="0 0 16 16">*/}
                {/*          <path*/}
                {/*            d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>*/}
                {/*        </svg>*/}

                {/*      </a>*/}
                {/*    </div>*/}

                {/*    <div>*/}
                {/*      <a*/}
                {/*        href="#"*/}
                {/*        className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"*/}
                {/*      >*/}
                {/*        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">*/}
                {/*          <path*/}
                {/*            fillRule="evenodd"*/}
                {/*            d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"*/}
                {/*            clipRule="evenodd"*/}
                {/*          />*/}
                {/*        </svg>*/}
                {/*      </a>*/}
                {/*    </div>*/}
                {/*  </div>*/}
                {/*</div>*/}

                {/*<div className="mt-6 relative">*/}
                {/*  <div className="absolute inset-0 flex items-center" aria-hidden="true">*/}
                {/*    <div className="w-full border-t border-gray-300" />*/}
                {/*  </div>*/}
                {/*  <div className="relative flex justify-center text-sm">*/}
                {/*    <span className="px-2 bg-white text-gray-500">или</span>*/}
                {/*  </div>*/}
                {/*</div>*/}
              </div>

              <div className="mt-6">
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Электронная почта
                    </label>
                    <div className="mt-1">
                      <input
                        {...register("email", { required: "Введите Email" })}
                        onClick={() => setErr('')}
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        placeholder={"example@email.com"}
                        className={`${
                          errors.email && "input-error"
                        } primary-input `}
                      />
                      {/*@ts-ignore*/}
                      {errors.email && (
                        <span className={"text-red-500 text-sm"}>
                          {/*@ts-ignore*/}
                          {errors.email.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Пароль
                    </label>
                    <div className="mt-1">
                      <input
                        {...register("password", {
                          required: "Введите пароль",
                        })}
                        onClick={() => setErr('')}
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        placeholder={""}
                        className={`${
                          errors.password && "input-error"
                        } primary-input `}
                      />
                      {/*@ts-ignore*/}
                      {errors.password && (
                        <span className={"text-red-500 text-sm"}>
                          {/*@ts-ignore*/}
                          {errors.password.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className={"text-red-500"}>{err}</div>

                  <div className="flex items-center justify-between">
                    {/*<div className="flex items-center">*/}
                    {/*  <input*/}
                    {/*    id="remember-me"*/}
                    {/*    name="remember-me"*/}
                    {/*    type="checkbox"*/}
                    {/*    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"*/}
                    {/*  />*/}
                    {/*  <label*/}
                    {/*    htmlFor="remember-me"*/}
                    {/*    className="ml-2 block text-sm text-gray-900"*/}
                    {/*  >*/}
                    {/*    Запомнить меня*/}
                    {/*  </label>*/}
                    {/*</div>*/}

                    {/*<div className="text-sm">*/}
                    {/*    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">*/}
                    {/*        Forgot your password?*/}
                    {/*    </a>*/}
                    {/*</div>*/}
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={isLoading ? "loading-button" : "primary-button"}
                    >
                      {isLoading ? 'Подождите...' : 'Войти'}
                    </button>
                  </div>
                </form>
                <div>
                  <p className="text-sm text-gray-500 text-center mt-6">
                    Нет аккаунта?{" "}
                    <Link
                      to="/signup"
                      className="font-medium text-blue-500 hover:text-blue-600"
                    >
                      Зарегистрироваться
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:block relative w-0 flex-1  max-w-[1770px]">
          <div
            className={
              "flex flex-row content-stretch items-stretch w-full h-full rounded-[2rem] p-6 pl-0 "
            }
          >
            <div
              className={
                "bg-neutral-200 relative w-full h-full rounded-3xl overflow-hidden "
              }
            >
              <img
                className="absolute inset-0 h-full w-full object-cover"
                src="https://mobimg.b-cdn.net/v3/fetch/9a/9a99e799cf63e68dd821e8816e839d03.jpeg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );}
};
