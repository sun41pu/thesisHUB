import { RequireAuth } from "react-auth-kit";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from "@pg/Home";
import { Login } from "@pg/Login";
import { ProfilePage } from "@pg/Profile";
import { Theses } from "@pg/Theses";
import { ThesesNew } from "@pg/New";
import { ThesisPage } from "@pg/Thesis/Layout";
import { SignupPage } from "@pg/Signup/Layout";

const RoutesComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/*главная страница*/}
        <Route path={'/*'} element={<HomePage/>}/>
        {/*логин*/}
        <Route path={'/login' } element={<Login/>}/>
        {/*регистрация*/}
        <Route path={'/signup' } element={<SignupPage/>}/>
        {/*все тезисы*/}
        <Route path={'/thesis/:id'} element={<ThesisPage/>}/>
        <Route path={'/theses' } element={<Theses/>}/>
          <Route path={'/new-thesis'} element={
            // создать новый тезис, роут требующий авторизации
            <RequireAuth loginPath={'/login?required=true&for=new'}>
              <ThesesNew/>
            </RequireAuth>
          }/>
        <Route path={'/profile'} element={
          /*профиль пользователя, роут требующий авторизации*/
          <RequireAuth loginPath={'/login?required=true&for=profile'}>
            <ProfilePage/>
          </RequireAuth>
        }/>
      </Routes>
    </BrowserRouter>
  )
}

export default RoutesComponent
