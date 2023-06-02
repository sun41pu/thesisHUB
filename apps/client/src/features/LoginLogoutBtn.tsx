import { Link } from "react-router-dom";

export const LoginLogoutBtn = ({loginState, signOut}) => {

  if (loginState) {
    return (
      <button
        onClick={() => signOut()}
        className="inline-flex items-center px-4 py-2 border-2 border-blue-500 text-sm font-medium rounded-md text-blue-500 hover:bg-gray-100 tr"
      >
        Выйти
      </button>
    )
  } else {
    return (
      <Link
        to="/login"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 tr"
      >
        Войти
      </Link>
    )
  }
}
