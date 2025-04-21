import Button from "@/components/ui/button/Button";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TextArea, TextField } from "@radix-ui/themes";
import toast from "react-hot-toast";

const contactSchema = z.object({
  fullName: z.string().min(1, { message: "Full name is required" }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" })
    .min(1, { message: "Message is required" }),
});

const inputs = [
  {
    label: "Full Name",
    value: "fullName",
    placeholder: "Your Name",
    type: "text",
  },
  {
    label: "Email",
    value: "email",
    placeholder: "Your Email",
    type: "text",
  },
  {
    label: "Message",
    value: "message",
    placeholder: "Your Message",
    type: "textArea",
  },
];

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);

    // For now, we'll just generate a random success or failure message
    toast.loading("Sending message...", {
      id: "contact-form",
    });
    return new Promise((resolve) => {
      setTimeout(() => {
        const randomSuccess = Math.random() >= 0.7;
        if (randomSuccess) {
          toast.success("Message sent successfully!", {
            id: "contact-form",
          });
          reset();
        } else {
          toast.error("Message not sent!", {
            id: "contact-form",
          });
        }
        resolve();
      }, 4000);
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex-1 flex flex-col gap-6"
    >
      {inputs.map((input) => (
        <div key={input.value} className="space-y-3">
          <label className="text-sm !font-bold text-natural-600 lading-3 inline-block">
            {input.label}
          </label>

          {input.type === "textArea" ? (
            <TextArea
              size="3"
              rows="4"
              placeholder={input.placeholder}
              {...register(input.value)}
            />
          ) : (
            <TextField.Root
              type="text"
              size="3"
              placeholder={input.placeholder || ""}
              {...register(input.value)}
              className="!w-full"
            />
          )}
          {errors[input.value] && (
            <p className="text-sm !font-normal text-red-500 lading-5">
              {errors[input.value].message}
            </p>
          )}
        </div>
      ))}
      <Button
        type="submit"
        disabled={isSubmitting}
        loading={isSubmitting}
        className={`w-fit ${
          isSubmitting && "!cursor-not-allowed hover:!bg-black"
        }`}
      >
        Send Message
      </Button>
    </form>
  );
}
