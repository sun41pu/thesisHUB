import {Helmet} from "react-helmet";
import { Footer } from "@en/Footer";
import { Header } from "@en/Header";
import { useIsAuthenticated, useSignOut } from "react-auth-kit";
import { Navigate, useParams } from "react-router-dom";
import { Content } from "@pg/Thesis/Content";

export const ThesisPage = () => {
  const isAuthenticated = useIsAuthenticated()
  const isLoggedIn = isAuthenticated()
  const signOut = useSignOut()


  const { id, title, ajhbf: string } = useParams()



  return (
    <>
      {/*Helmet title в Content'e*/}
      <Helmet>
        <meta charSet="utf-8" />
      </Helmet>

      <div className="relative overflow-hidden">
        <div className="relative pt-6 pb-16 sm:pb-24">
          <Header isLoggedIn={isLoggedIn}/>
        </div>
        <div className={'bg-neutral-200 h-fit py-12 px-3 sm:px-6'}>
            <Content id={id}/>
        </div>
        <Footer/>
      </div>
    </>
  );
};
