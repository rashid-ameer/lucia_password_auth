import LoginForm from "@/components/auth/login-form";

function LoginPage() {
  return (
    <main className="min-h-screen p-5 flex flex-col">
      <div className="w-full m-auto max-w-[400px] space-y-7 py-5">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-center">Login Form</h1>
          <p className="text-gray-500 text-center">
            Welcome back. Enter your details.
          </p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
export default LoginPage;
