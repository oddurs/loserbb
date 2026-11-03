import { logIn } from "../actions";
import { AuthForm } from "../auth-form";

export const metadata = { title: "Log in · loserbb" };

export default function LogIn() {
  return (
    <>
      <h1 className="mb-4 text-xl font-bold">Log in</h1>
      <AuthForm action={logIn} submit="Log in" />
    </>
  );
}
