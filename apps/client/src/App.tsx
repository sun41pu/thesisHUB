import { useEffect, useState } from "react";
import './App.css'
import {AuthProvider} from 'react-auth-kit'
import RoutesComponent from "./Routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    fetch('/api')
      .then((res) => res.text())
      .then(setGreeting)
  }, [])

  console.log(greeting)

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider
        authType={"cookie"}
        authName={"_auth"}
        cookieDomain={window.location.hostname}
        cookieSecure={false}
      >
        <RoutesComponent/>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App
