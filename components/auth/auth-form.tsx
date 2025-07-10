"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Sparkles,
  Brain,
  Chrome,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FloatingCard from "@/components/floating-card";
import {
  loginSchema,
  registerSchema,
  type LoginFormData,
  type RegisterFormData,
} from "@/lib/validations/auth";

interface AuthFormProps {
  mode: "login" | "register";
  onToggleMode: () => void;
}

export default function AuthForm({ mode, onToggleMode }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData | RegisterFormData>({
    resolver: zodResolver(mode === "login" ? loginSchema : registerSchema),
  });

  const onSubmit = async (data: LoginFormData | RegisterFormData) => {
    setIsLoading(true);
    setError("");

    try {
      if (mode === "register") {
        const registerData = data as RegisterFormData;

        // First register the user
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: registerData.name,
            email: registerData.email,
            password: registerData.password,
          }),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Registration failed");
        }

        // Auto-login after successful registration
        const signInResult = await signIn("credentials", {
          email: registerData.email,
          password: registerData.password,
          redirect: false,
          callbackUrl: "/",
        });

        if (signInResult?.error) {
          // Instead of throwing an error, just redirect to sign in
          router.push("/auth/signin");
          return;
        }

        // If sign in was successful, redirect to home
        if (signInResult?.url) {
          router.push(signInResult.url);
        } else {
          router.push("/");
        }
        router.refresh();
      } else {
        const loginData = data as LoginFormData;
        const result = await signIn("credentials", {
          email: loginData.email,
          password: loginData.password,
          redirect: false,
          callbackUrl: "/",
        });

        if (result?.error) {
          throw new Error("Invalid email or password");
        }

        // If sign in was successful, redirect to the callback URL or home
        if (result?.url) {
          router.push(result.url);
        } else {
          router.push("/");
        }
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError("");
    try {
      const result = await signIn("google", {
        callbackUrl: "/",
        redirect: false,
      });

      if (result?.error) {
        throw new Error("Google sign-in failed");
      }

      if (result?.url) {
        router.push(result.url);
      } else {
        router.push("/");
      }
    } catch (err) {
      setError("Google sign-in failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleModeToggle = () => {
    reset();
    setError("");
    onToggleMode();
  };

  return (
    <FloatingCard className="w-full max-w-md mx-auto">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="inline-block"
          >
            <div className="relative">
              <Brain className="h-12 w-12 text-blue-400 mx-auto" />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl"
              />
            </div>
          </motion.div>

          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {mode === "login" ? "Welcome Back" : "Join Neural3D"}
            </h1>
            <p className="text-blue-100">
              {mode === "login"
                ? "Sign in to continue your AI journey"
                : "Create your account and start generating 3D models"}
            </p>
          </div>
        </div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-red-500/20 border border-red-500/30 rounded-xl p-4"
            >
              <p className="text-red-300 text-sm text-center">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {mode === "register" && (
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-300" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-blue-200/60 focus:border-blue-400 focus:ring-blue-400/20"
                  {...register(
                    "name" as keyof (LoginFormData | RegisterFormData)
                  )}
                />
              </div>
              {errors.name && (
                <p className="text-red-300 text-sm">{errors.name.message}</p>
              )}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">
              Email Address
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-300" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-blue-200/60 focus:border-blue-400 focus:ring-blue-400/20"
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="text-red-300 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-300" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-blue-200/60 focus:border-blue-400 focus:ring-blue-400/20"
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-blue-200"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-300 text-sm">{errors.password.message}</p>
            )}
          </div>

          {mode === "register" && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-white">
                Confirm Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-300" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-blue-200/60 focus:border-blue-400 focus:ring-blue-400/20"
                  {...register(
                    "confirmPassword" as keyof (
                      | LoginFormData
                      | RegisterFormData
                    )
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-blue-200"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-300 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center space-x-2">
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                >
                  <Sparkles className="h-5 w-5" />
                </motion.div>
              ) : (
                <Sparkles className="h-5 w-5" />
              )}
              <span>
                {isLoading
                  ? "Processing..."
                  : mode === "login"
                  ? "Sign In"
                  : "Create Account"}
              </span>
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
          </Button>
        </form>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/20" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-transparent text-blue-200">
              or continue with
            </span>
          </div>
        </div>

        {/* Google Sign In */}
        <Button
          type="button"
          variant="outline"
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30 py-3 rounded-xl transition-all duration-300"
        >
          <Chrome className="h-5 w-5 mr-2" />
          Continue with Google
        </Button>

        {/* Toggle Mode */}
        <div className="text-center">
          <p className="text-blue-200">
            {mode === "login"
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={handleModeToggle}
              className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
            >
              {mode === "login" ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </FloatingCard>
  );
}
