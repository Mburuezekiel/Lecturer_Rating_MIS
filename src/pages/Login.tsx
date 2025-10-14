import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Lock, Mail } from "lucide-react";
import { toast } from "sonner";
import { demoAccounts } from "@/lib/dummyData";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const user = login(email, password);
      if (user) {
        toast.success(`Welcome ${user.name}!`);
        navigate("/dashboard");
      } else {
        toast.error("Invalid credentials. Please try the demo accounts.");
      }
      setLoading(false);
    }, 500);
  };

  const handleDemoLogin = (role: keyof typeof demoAccounts) => {
    const account = demoAccounts[role];
    setEmail(account.email);
    setPassword(account.password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left side - Branding */}
        <div className="hidden md:block space-y-6 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center shadow-elegant">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground">LRMIS</h1>
              <p className="text-muted-foreground">Lecturer Rating Management System</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">
              Empowering Excellence in Education
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              A comprehensive system for evaluating and improving teaching quality through 
              data-driven insights and student feedback.
            </p>
            
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-lg bg-card border border-border">
                <div className="text-3xl font-bold text-primary">5</div>
                <div className="text-sm text-muted-foreground">Departments</div>
              </div>
              <div className="p-4 rounded-lg bg-card border border-border">
                <div className="text-3xl font-bold text-secondary">15+</div>
                <div className="text-sm text-muted-foreground">Active Reviews</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Login Form */}
        <Card className="shadow-elegant animate-fade-in">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>Enter your credentials to access the system</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@mut.ac.ke"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>

            <div className="mt-6">
              <p className="text-sm text-muted-foreground mb-3">Demo Accounts:</p>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(demoAccounts).map(([role, account]) => (
                  <Button
                    key={role}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleDemoLogin(role as keyof typeof demoAccounts)}
                    className="text-xs"
                  >
                    {account.role.toUpperCase()}
                  </Button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Click any role to autofill credentials
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
