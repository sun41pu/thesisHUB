import {Helmet} from "react-helmet";
import { useIsAuthenticated, useSignOut } from "react-auth-kit";
import { SignUpForm } from "@fs/SignUpForm";
import { Link } from "react-router-dom";

export const SignupPage = () => {
  const isAuthenticated = useIsAuthenticated()
  const isLoggedIn = isAuthenticated()
  const signOut = useSignOut()

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Регистрация</title>
      </Helmet>
      <div className="CONTENT flex flex-col gap-12 justify-center h-screen">
        <div className="mt-16 sm:mt-24 lg:mt-0 lg:col-span-6">
          <div className="sm:max-w-md sm:w-full sm:mx-auto sm:rounded-lg">
            <Link to={'/home'} className={'text-sm mb-2 text-blue-500 hover:text-blue-600 tr'}>
              <p className={'mb-2 ml-1 tr hover:-translate-x-1 w-fit'}>
                ← назад на главную
              </p>
            </Link>
            <h2>Регистрация</h2>
          </div>
        </div>
        <SignUpForm/>
      </div>
    </>
  );
};
