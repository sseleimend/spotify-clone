import { Route, Routes } from "react-router";
import { Home } from "./pages/home/Home";
import { AuthCallback } from "./pages/auth-callback/AuthCallback";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/sso-callback"
        element={
          <AuthenticateWithRedirectCallback signInForceRedirectUrl="/auth-callback" />
        }
      />
      <Route path="/auth-callback" element={<AuthCallback />} />
    </Routes>
  );
}

export default App;
