import Button from "@/components/ui/button/Button";
import Input from "@/components/ui/input/Input";
import Link from "@/components/ui/link/Link";
import { useAuth } from "@/provider/authProvider";
import { Checkbox, Flex, Text } from "@radix-ui/themes";
import axios from "@/utils/axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { replace, useNavigate } from "react-router-dom";

export default function SignupForm({ toggleView }) {
  const [loading, setLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [termsError, setTermsError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const { setUser } = useAuth();

  const onSubmit = async (userData) => {
    const api = "/auth/local/register";
    if (!agreedToTerms)
      return setTermsError("You must agree to the Terms and Conditions");
    setTermsError("");
    setLoading(true);
    const loadingToast = toast.loading("Creating Account...");
    try {
      const { data } = await axios.post(api, userData);
      const { jwt, user } = data;
      localStorage.setItem("jwt", JSON.stringify(jwt));
      setUser(user);
      toast.success("Account created successfully", {
        id: loadingToast,
      });
      navigate("/", replace);
    } catch (error) {
      console.error(error.message);
      toast.error(error.response?.data?.error?.message || "Signup failed", {
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
          Sign up
        </h1>
        <p className="text-base leading-[26px]">
          <span className="text-natural-600">Already have an account? </span>
          <button
            type="button"
            onClick={() => toggleView(true)}
            className="text-secondary-green !font-semibold cursor-pointer"
          >
            Sign in
          </button>
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <Input
          placeholder="Your name"
          {...register("name", {
            required: "Name is required",
            pattern: {
              value: /^[A-Za-z]+(?:\s[A-Za-z]+)?$/,
              message: "Name must be one or two words only",
            },
          })}
          error={errors.name?.message}
        />
        <Input
          placeholder="Username"
          {...register("username", { required: "Username is required" })}
          error={errors.username?.message}
        />
        <Input
          type="email"
          placeholder="Email address"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
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

        <div>
          <Flex align="center" gap="2">
            <Checkbox
              size="3"
              className="!cursor-pointer"
              checked={agreedToTerms}
              onCheckedChange={(checked) => {
                setAgreedToTerms(checked);
                setTermsError("");
              }}
              aria-label="Agree to Terms and Conditions"
            />
            <span className="text-sm !font-normal text-natural-600">
              Agree to{" "}
              <Link
                style={false}
                addArrow={false}
                to="/"
                className="!font-semibold text-black"
              >
                Terms
              </Link>{" "}
              and{" "}
              <Link
                style={false}
                addArrow={false}
                to="/"
                className="!font-semibold text-black"
              >
                Conditions
              </Link>
            </span>
          </Flex>
          {termsError && (
            <Text color="red" size="2" className="mt-1">
              {termsError}
            </Text>
          )}
        </div>
      </div>

      <Button loading={loading} disabled={loading} type="submit">
        Sign Up
      </Button>
    </form>
  );
}
