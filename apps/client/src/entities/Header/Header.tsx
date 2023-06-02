import { Popover, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { navigation } from "../../shared/navigation";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { LoginLogoutBtn, MobileLoginLogoutBtn } from "../../features";
import { Fragment } from "react";
import { useSignOut } from "react-auth-kit";

export const Header = ({isLoggedIn}) => {
  const signOut = useSignOut()
  const navigate = useNavigate()

  const handlesignOut = () => {
    // alert('sign out')
    navigate('/login')
    signOut()
  }


  return (
    <>
      <Popover>
      <nav
        className="relative max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6"
        aria-label="Global"
      >
        <div className="flex flex-row items-center flex-1">
          <div className="flex items-center justify-between w-full md:w-auto">
            <Link to={'/'}>
              <p className="text-xl tracking-tight font-extrabold text-neutral-800 sm:leading-none lg:text-2xl xl:text-3xl">
                <span className="">T</span>
                <span className="text-blue-500">Hub</span>
              </p>
            </Link>
            <div className="-mr-2 flex items-center md:hidden">
              <Popover.Button className="bg-gray-800 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-700 focus:outline-none focus:ring-2 focus-ring-inset focus:ring-white">
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>
          </div>
          <div className="hidden space-x-5 md:flex md:ml-10">
            {navigation.main.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({isActive}) => `${isActive ? "bg-gray-100" : ""} font-medium text-neutral-700 hover:text-gray-800 hover:bg-gray-100 tr rounded-lg px-4 py-1`}
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
        <div className="hidden md:flex">
          <LoginLogoutBtn loginState={isLoggedIn} signOut={handlesignOut}/>
        </div>
      </nav>

      <Transition
        as={Fragment}
        enter="duration-150 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
        >
          <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
            <div className="px-5 pt-4 flex items-center justify-between">
              <Link to={'/'}>
                <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-neutral-800 sm:mt-5 sm:leading-none lg:mt-6 lg:text-5xl xl:text-6xl">
                  <span className="">T</span>
                  <span className="text-blue-500">Hub</span>
                </h1>
              </Link>
              <div className="-mr-2">
                <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.main.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({isActive}) => `${isActive ? "bg-gray-100" : ""} block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100`}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
            <MobileLoginLogoutBtn loginState={isLoggedIn} signOut={handlesignOut}/>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
    </>
  );
};
