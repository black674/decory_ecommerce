import { TextField } from "@radix-ui/themes";

export default function CustomInput({ label, error, ...rest }) {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-3 inline-block text-natural-600">{label}</label>
      )}
      <TextField.Root size="3" {...rest} />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
