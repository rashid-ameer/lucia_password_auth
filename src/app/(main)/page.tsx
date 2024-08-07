import LogoutButton from "@/components/auth/logout-button";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-5">
      <h1 className="text-2xl font-bold">Welcome to Homepage</h1>
      <LogoutButton />
    </main>
  );
}
