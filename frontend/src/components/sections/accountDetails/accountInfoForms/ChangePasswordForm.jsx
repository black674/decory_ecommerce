import Button from "@/components/ui/button/Button";
import { TextField } from "@radix-ui/themes";
import axios from "@/utils/axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ChangePasswordForm() {
  const [loading, setLoading] = useState(false);
  const [passwordInfo, setPasswordInfo] = useState({
    currentPassword: "",
    password: "",
    passwordConfirmation: "",
  });

  const passwordInputs = [
    {
      label: "Current Password",
      value: "currentPassword",
      placeholder: "Enter your current password",
    },
    {
      label: "New Password",
      value: "password",
      placeholder: "Enter your new password",
    },
    {
      label: "Confirm Password",
      value: "passwordConfirmation",
      placeholder: "Confirm your new password",
    },
  ];

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    toast.loading("Changing password...", {
      id: "change-password",
    });
    try {
      await axios.post(
        "/auth/change-password",
        passwordInfo,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("jwt"))}`,
          },
        }
      );
      setPasswordInfo({
        currentPassword: "",
        password: "",
        passwordConfirmation: "",
      });
      toast.success("Password changed successfully", {
        id: "change-password",
      });
    } catch (error) {
      console.error("error happend whild changed api", error);
      toast.error(error.response.data.error.message, {
        id: "change-password",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <h3 className="text-xl !font-semibold leading-8">Password</h3>
      {passwordInputs.map((input) => (
        <div key={input.value} className="space-y-3">
          <label className="text-sm !font-bold text-natural-600 lading-3 inline-block">
            {input.label}
          </label>
          <TextField.Root
            placeholder={input.placeholder || ""}
            size="3"
            type="password"
            onChange={(e) =>
              setPasswordInfo({
                ...passwordInfo,
                [input.value]: e.target.value,
              })
            }
            value={passwordInfo[input.value]}
            className="!w-full"
          />
          {input.note && (
            <p className="text-sm !font-normal text-natural-600 lading-5">
              {input.note}
            </p>
          )}
        </div>
      ))}
      <Button
        disabled={
          loading ||
          !passwordInfo.password ||
          !passwordInfo.passwordConfirmation ||
          !passwordInfo.currentPassword
        }
        loading={loading}
        className={`w-fit ${loading && "!cursor-not-allowed hover:!bg-black"}`}
      >
        Change Password
      </Button>
    </form>
  );
}
