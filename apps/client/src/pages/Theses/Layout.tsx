import { useAuthUser, useIsAuthenticated, useSignOut } from "react-auth-kit";
import { Helmet } from "react-helmet";
import { Header } from "@en/Header";
import { Footer } from "@en/Footer";
import { List } from "./UI/List";

export const Theses = () => {
  const isAuthenticated = useIsAuthenticated()
  const isLoggedIn = isAuthenticated()

  const signOut = useSignOut()
  const User = useAuthUser()
  const ROLEID = User().roleId
  const canApprove = ROLEID >= 2
  const canManageDrafts = ROLEID >= 3

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Работы</title>
      </Helmet>
      <div className="relative overflow-hidden">
        <div className="relative pt-6 pb-16 sm:pb-24">
          <Header isLoggedIn={isLoggedIn}/>
        </div>
        <div className={'CONTENT'}>
          <h2 className={'ml-1 mb-4'}>Список работ</h2>
          <List statusId={3}/>
          {
            canApprove &&
            <>
              <h3 className={'ml-1 mb-4'}>Ожидает подтверждения</h3>
              <List statusId={2}/>
            </>
          }
          {
            canManageDrafts &&
            <>
              <h3 className={'ml-1 mb-4'}>Драфты пользователей</h3>
              <List statusId={1}/>
            </>
          }
        </div>
        <Footer/>
      </div>

    </>
  )
}

