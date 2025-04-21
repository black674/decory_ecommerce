import Button from "@/components/ui/button/Button";
import { useAuth } from "@/provider/authProvider";
import { TextField } from "@radix-ui/themes";
import axios from "@/utils/axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const accountSchema = z.object({
  first: z
    .string()
    .min(1, "First name is required")
    .regex(/^[a-zA-Z]+$/, "First name must contain only letters")
    .refine((val) => !val.includes(" "), "First name must be a single word"),
  last: z
    .string()
    .regex(/^[a-zA-Z]*$/, "Last name must contain only letters")
    .refine((val) => !val.includes(" "), "Last name must be a single word")
    .optional(),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .min(1, "Username is required")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username must contain only letters, numbers, and underscores"
    )
    .refine((val) => !val.includes(" "), "Username must not contain spaces"),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
});

export default function AccountDetailsForm() {
  const { user, setUser } = useAuth();
  const defaultValues = {
    first: user.name.split(" ")[0]?.toLowerCase() || "",
    last: user.name.split(" ")[1]?.toLowerCase() || "",
    username: user.username,
    email: user.email,
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(accountSchema),
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [user]);

  const inputs = [
    {
      label: "First Name",
      value: "first",
      placeholder: "Enter your first name",
    },
    {
      label: "Last Name",
      value: "last",
      placeholder: "Enter your last name",
    },
    {
      label: "Username",
      value: "username",
      placeholder: "Enter your Username",
    },
    {
      label: "Email",
      value: "email",
      placeholder: "Enter your email address",
    },
  ];

  const onSubmit = async (formData) => {
    toast.loading("Updating...", {
      id: "updating",
    });
    try {
      const { data } = await axios.put(
        `/users-permissions/user/profile`,
        {
          name: `${formData.first} ${formData.last}`.trim(),
          username: formData.username,
          email: formData.email,
        },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("jwt"))}`,
          },
        }
      );
      setUser(data);
      toast.success("Updated successfully!", {
        id: "updating",
      });
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.error.message, {
        id: "updating",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <h3 className="text-xl !font-semibold leading-8">Account Details</h3>
      {inputs.map((input) => (
        <div key={input.value} className="space-y-3">
          <label className="text-sm !font-bold text-natural-600 lading-3 inline-block">
            {input.label}
          </label>
          <TextField.Root
            placeholder={input.placeholder || ""}
            size="3"
            {...register(input.value)}
            className="!w-full"
          />
          {errors[input.value] && (
            <p className="text-sm !font-normal text-red-500 lading-5">
              {errors[input.value].message}
            </p>
          )}
          {input.note && (
            <p className="text-sm !font-normal text-natural-600 lading-5">
              {input.note}
            </p>
          )}
        </div>
      ))}
      <Button
        disabled={!isDirty || isSubmitting}
        loading={isSubmitting}
        className={`w-fit ${
          isSubmitting && "!cursor-not-allowed hover:!bg-black"
        }`}
      >
        Save Changes
      </Button>
    </form>
  );
}
