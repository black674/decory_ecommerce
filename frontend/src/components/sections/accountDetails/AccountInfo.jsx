import AccountDetailsForm from "./accountInfoForms/AccountDetailsForm";
import ChangePasswordForm from "./accountInfoForms/ChangePasswordForm";

export default function AccountInfo() {
  return (
    <div className="w-full space-y-10">
      <AccountDetailsForm />
      <ChangePasswordForm />
    </div>
  );
}
