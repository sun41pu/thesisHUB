import {Helmet} from "react-helmet";
import { Hero } from "./Hero";
import { Content } from "./Content";
import { Footer } from "../../entities/Footer";
import { Header } from "../../entities/Header";
import { useIsAuthenticated, useSignOut } from "react-auth-kit";

export const HomePage = () => {
  const isAuthenticated = useIsAuthenticated()
  const isLoggedIn = isAuthenticated()
  const signOut = useSignOut()

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>ThesisHub</title>
      </Helmet>
      <div className="mx-auto  relative overflow-hidden">
        <div className="relative pt-6 pb-16 sm:pb-24">
          <Header isLoggedIn={isLoggedIn}/>
          <Hero isLoggedIn={isLoggedIn}/>
        </div>
        <div
          className={'container mx-auto w-full px-3 sm:px-8 grid grid-cols-1 lg:grid-cols-2'}
        >
          <Content/>
        </div>
        <Footer/>
      </div>
    </>
  );
};
