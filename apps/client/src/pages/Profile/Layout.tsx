import { useAuthUser, useIsAuthenticated, useSignOut } from "react-auth-kit";
import { Helmet } from "react-helmet";
import { Header } from "@en/Header";
import { Footer } from "@en/Footer";
import { Content } from "@pg/Profile/Content";
import { useLocation, useParams } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import React, { useEffect } from "react";




export const ProfilePage = () => {

  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  const isAuthenticated = useIsAuthenticated()
  const isLoggedIn = isAuthenticated()

  const signOut = useSignOut()
  const User = useAuthUser()

    let query = useQuery();

    if (query.get('re') === 'authorized') {
      toast.success('Вы уже авторизованы')
    }


  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{User().username || 'профиль'}</title>
      </Helmet>
      <Toaster/>
      <div className="relative overflow-hidden">
        <div className="relative pt-6 pb-16 sm:pb-24">
          <Header isLoggedIn={isLoggedIn}/>
        </div>
        <div className={'CONTENT'}>

          <div className={'bg-white p-6'}>
            <Content/>
          </div>

        </div>
        <Footer/>
      </div>

    </>
  )
}

