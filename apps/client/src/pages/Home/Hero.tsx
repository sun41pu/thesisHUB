import { ChevronRightIcon } from '@heroicons/react/24/solid'
import { Link, } from "react-router-dom";
import { BgElement } from "./UI/BgElement";
import { SignUpForm } from "@fs/SignUpForm";

//TODO: - добавить модаль для подтверждения выхода
//	    - сделать регистрацию с помощью react-hook-form
//      - сделать дропдаун с юзером вместо "выйти"
// 			- добавить RQ постов на главную


export const Hero = ({isLoggedIn}) => {

  return (
    <>
        <BgElement/>
        <main className="mt-16 sm:mt-24 ">
          <div className="mx-auto max-w-7xl">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="mb-16 sm:mb-24 lg:mb-0  px-6 sm:px-12 sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left lg:flex lg:items-center">
                <div>
                  <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-neutral-800 sm:mt-5 sm:leading-none lg:mt-6 lg:text-5xl xl:text-6xl">
                    <span className="">Thesis</span>
                    <span className="text-blue-500">Hub</span>
                  </h1>
                  <p className="mt-3 text-base text-primaryText sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                    Здесь студенты и преподаватели могут сотрудничать и
                    совершенствоваться в процессе написания дипломных проектов
                  </p>

                  {!isLoggedIn && (
                    <Link
                      to="/login"
                      className="mt-4 inline-flex items-center text-primaryText bg-gray-300 rounded-full p-1 pr-2 sm:text-base lg:text-sm xl:text-base hover:bg-gray-400 tr"
                    >
                    <span className="px-3 py-0.5 text-white text-xs font-semibold leading-5 uppercase tracking-wide bg-blue-500 rounded-full">
                      Уже с нами?
                    </span>
                      <span className="ml-4 text-sm">войдите в профиль</span>
                      <ChevronRightIcon
                        className="ml-2 w-5 h-5 text-gray-500"
                        aria-hidden="true"
                      />
                    </Link>
                  )}

                  {/*<p className="mt-8 text-sm text-primaryText uppercase tracking-wide font-semibold sm:mt-10">*/}
                  {/*  */}
                  {/*</p>*/}
                  {/*<div className="mt-5 w-full sm:mx-auto sm:max-w-lg lg:ml-0">*/}
                  {/*  <div className="flex flex-wrap items-start justify-between">*/}
                  {/*    <div className="flex justify-center px-1">*/}
                  {/*      <img*/}
                  {/*        className="h-9 sm:h-10"*/}
                  {/*        src="https://tailwindui.com/img/logos/tuple-logo-gray-400.svg"*/}
                  {/*        alt="Tuple"*/}
                  {/*      />*/}
                  {/*    </div>*/}
                  {/*    <div className="flex justify-center px-1">*/}
                  {/*      <img*/}
                  {/*        className="h-9 sm:h-10"*/}
                  {/*        src="https://tailwindui.com/img/logos/workcation-logo-gray-400.svg"*/}
                  {/*        alt="Workcation"*/}
                  {/*      />*/}
                  {/*    </div>*/}
                  {/*    <div className="flex justify-center px-1">*/}
                  {/*      <img*/}
                  {/*        className="h-9 sm:h-10"*/}
                  {/*        src="https://tailwindui.com/img/logos/statickit-logo-gray-400.svg"*/}
                  {/*        alt="StaticKit"*/}
                  {/*      />*/}
                  {/*    </div>*/}
                  {/*  </div>*/}
                  {/*</div>*/}
                </div>
              </div>

              <SignUpForm />

            </div>
          </div>
        </main>
    </>
  );
}
