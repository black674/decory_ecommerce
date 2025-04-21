import Button from "@/components/ui/button/Button";
import Input from "@/components/ui/input/Input";
import { useAuth } from "@/provider/authProvider";
import { Checkbox, Flex } from "@radix-ui/themes";
import axios from "@/utils/axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { replace, useNavigate } from "react-router-dom";

export default function LoginForm({ toggleView }) {
  const [loading, setLoading] = useState(false);
  const [RememberUser, setRememberUser] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const { setUser } = useAuth();

  const onSubmit = async (userData) => {
    setLoading(true);
    const loadingToast = toast.loading("Logging in...");
    const api = "/auth/local";
    try {
      const { data } = await axios.post(api, {
        identifier: userData.email,
        password: userData.password,
      });
      const { jwt, user } = data;
      localStorage.setItem("jwt", JSON.stringify(jwt));
      setUser(user);
      toast.success("Login successful!", {
        id: loadingToast,
      });
      navigate("/", replace);
    } catch (error) {
      console.error(error.message);
      toast.error(error.response?.data?.error?.message || "Login failed", {
        id: loadingToast,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[456px] max-w-full flex flex-col gap-8"
    >
      <div className="flex flex-col gap-6">
        <h1 className="text-[40px] leading-[44px] tracking-[-0.4px] text-natural-900">
          Sign In
        </h1>
        <p className="text-base leading-[26px]">
          <span className="text-natural-600">Don’t have an accout yet? </span>
          <button
            type="button"
            onClick={() => toggleView(false)}
            className="text-secondary-green !font-semibold cursor-pointer"
          >
            Sign Up
          </button>
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <Input
          placeholder="Your username or email address"
          {...register("email", {
            required: "Email or username is required",
            validate: (value) => {
              const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
              const usernamePattern = /^[a-zA-Z0-9_]{3,20}$/;
              return (
                emailPattern.test(value) ||
                usernamePattern.test(value) ||
                "Please enter a valid email or username"
              );
            },
          })}
          error={errors.email?.message}
        />
        <Input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
          error={errors.password?.message}
        />

        <Flex align="end" gap="2">
          <Checkbox
            size="3"
            className="!cursor-pointer"
            checked={RememberUser}
            onCheckedChange={(checked) => {
              setRememberUser(checked);
            }}
            aria-label="Remember me"
          />
          <span className="text-natural-600 !font-normal">Remember me</span>
        </Flex>
      </div>

      <Button loading={loading} disabled={loading} type="submit">
        Sign In
      </Button>
    </form>
  );
}
