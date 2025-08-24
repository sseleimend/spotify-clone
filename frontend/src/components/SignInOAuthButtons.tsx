import { useSignIn } from "@clerk/clerk-react";
import { Button } from "./ui/button";

export const SignInOAuthButtons = () => {
  const { isLoaded, signIn } = useSignIn();

  if (!isLoaded) {
    return null;
  }

  const signInWithGoogle = () => {
    signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/auth-callback",
    });
  };

  return (
    <Button
      variant="secondary"
      className="px-4 py-2"
      onClick={signInWithGoogle}
    >
      <img src="/google.png" alt="Google" className="size-5" />
      Continue with Google
    </Button>
  );
};
