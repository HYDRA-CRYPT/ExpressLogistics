import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LoginFormProps {
  email: string;
  password: string;
  loading?: boolean;
  error?: string | null;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function LoginForm({
  email,
  password,
  loading,
  error,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}: LoginFormProps) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="text-center">
        <h1 className="text-4xl mb-4 font-semibold">Admin's Login</h1>
        <p className="text-xl text-muted-foreground">
          Enter your email and password to continue
        </p>
      </div>

      {error && (
        <div className="rounded bg-red-100 p-2 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="grid gap-4">
        <div className="grid gap-1 mt-2">
          <Label className="text-xl" htmlFor="email">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={onEmailChange}
            placeholder="you@example.com"
            required
            className="h-14 text-xl"
          />
        </div>

        <div className="grid gap-1 mt-4">
          <Label className="text-xl" htmlFor="password">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={onPasswordChange}
            required
            className="h-14 text-xl"
            placeholder="Enter Password"
          />
        </div>
      </div>

      <Button className="h-14 mt-6 text-xl" type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}
