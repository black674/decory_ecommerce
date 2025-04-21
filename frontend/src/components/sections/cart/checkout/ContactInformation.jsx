import CustomInput from "@/components/ui/input/CustomInput";

export default function ContactInformation({ register, errors }) {
  return (
    <div className="py-6 px-4 border rounded-lg">
      <h4 className="leading-6.5 !font-semibold mb-6">Contact Information</h4>
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <CustomInput
            label="First Name"
            size="3"
            placeholder="First Name"
            className="!w-full"
            {...register("firstName")}
            error={errors.firstName?.message}
          />
          <CustomInput
            label="Last Name"
            size="3"
            placeholder="Last Name"
            className="!w-full"
            {...register("lastName")}
            error={errors.lastName?.message}
          />
        </div>
        <CustomInput
          label="Email"
          size="3"
          placeholder="Email"
          {...register("email")}
          error={errors.email?.message}
        />
        <CustomInput
          label="Phone Number"
          size="3"
          placeholder="Phone Number"
          {...register("phoneNumber")}
          error={errors.phoneNumber?.message}
        />
      </div>
    </div>
  );
}
