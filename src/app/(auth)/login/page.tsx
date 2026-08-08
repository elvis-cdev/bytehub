import LoginForm from "@/components/auth/LoginForm";
import Logo from "@/components/Logo";

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-muted/40 px-4">

      {/* Background decoration */}
      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />

      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />


      <div className="relative w-full max-w-md space-y-8">

        {/* Brand */}
        <div className="text-center">
          <Logo />

          <h1 className="mt-6 text-3xl font-bold tracking-tight">
            Welcome back
          </h1>

          <p className="mt-2 text-muted-foreground">
            Login to your ByteHub account
          </p>
        </div>


        {/* Form card */}
        <div className="rounded-2xl border bg-background/80 p-8 shadow-xl backdrop-blur">

          <LoginForm />

        </div>


      </div>

    </main>
  );
}
