import { signUp } from "../actions";
import { AuthForm } from "../auth-form";

export const metadata = { title: "Sign up · loserbb" };

export default function SignUp() {
  return (
    <>
      <h1 className="mb-4 text-xl font-bold">Sign up</h1>
      <AuthForm action={signUp} submit="Sign up" newPassword />
    </>
  );
}
