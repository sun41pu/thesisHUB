import { Link } from "react-router-dom";

export const MobileLoginLogoutBtn = ({loginState, signOut}) => {

  if (loginState) {
    return (
      <button
        onClick={() => signOut()}
        className="block w-full px-5 py-3 text-center font-medium text-indigo-600 bg-gray-50 hover:bg-gray-100"
      >
        Выйти
      </button>
    )
  } else {
    return (
      <Link
        to="/login"
        className="block w-full px-5 py-3 text-center font-medium text-indigo-600 bg-gray-50 hover:bg-gray-100"
      >
        Войти
      </Link>
    )
  }
}
