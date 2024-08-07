import SignupForm from "@/components/auth/signup-form";

function SignupPage() {
  return (
    <main className="min-h-screen p-5 flex flex-col">
      <div className="w-full m-auto max-w-[400px] space-y-7 py-5">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-center">Signup Form</h1>
          <p className="text-gray-500 text-center">
            Enter your details to create an account
          </p>
        </div>
        <SignupForm />
      </div>
    </main>
  );
}
export default SignupPage;
