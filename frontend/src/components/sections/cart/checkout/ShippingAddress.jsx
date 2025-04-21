import CustomInput from "@/components/ui/input/CustomInput";

export default function ShippingAddress({ register, errors }) {
  return (
    <div className="py-6 px-4 border rounded-lg">
      <h4 className="leading-6.5 !font-semibold mb-6">Shipping Address</h4>
      <div className="space-y-6">
        <CustomInput
          label="Street Address *"
          size="3"
          placeholder="Street Address"
          {...register("streetAddress")}
          error={errors.streetAddress?.message}
        />
        <CustomInput
          label="Country *"
          size="3"
          placeholder="Country"
          {...register("country")}
          error={errors.country?.message}
        />
        <CustomInput
          label="Town / City *"
          size="3"
          placeholder="Town / City"
          {...register("city")}
          error={errors.city?.message}
        />
        <div className="flex items-center gap-2">
          <CustomInput
            label="State"
            size="3"
            placeholder="State"
            className="!w-full"
            {...register("state")}
            error={errors.state?.message}
          />
          <CustomInput
            label="Zip Code"
            size="3"
            placeholder="Zip Code"
            className="!w-full"
            {...register("zip")}
            error={errors.zip?.message}
          />
        </div>
      </div>
    </div>
  );
}
