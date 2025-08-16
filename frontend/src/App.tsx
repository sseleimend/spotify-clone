import { Route, Routes } from "react-router";
import { Home } from "./pages/home/Home";
import { AuthCallback } from "./pages/auth-callback/AuthCallback";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import { MainLayout } from "./layout/MainLayout";
import { Chat } from "./pages/chat/Chat";
import { Album } from "./pages/album/Album";

function App() {
  return (
    <Routes>
      <Route
        path="/sso-callback"
        element={
          <AuthenticateWithRedirectCallback signInForceRedirectUrl="/auth-callback" />
        }
      />
      <Route path="/auth-callback" element={<AuthCallback />} />
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/album/:albumId" element={<Album />} />
      </Route>
    </Routes>
  );
}

export default App;
