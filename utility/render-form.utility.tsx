import LoginForm from "@/app/admin/_components/login/LoginForm";
import RegisterForm from "@/app/admin/_components/register/RegisterForm";

export function renderForm(label: string) {
    switch (label) {
        case 'Register':
            return <RegisterForm />;
        case 'Login':
            return <LoginForm />;
        case 'Forgot Password':
        case 'Reset Password':
        case 'Verify Email':
        case 'Resend Verification Email':
        default:
            return <div>Form not found </div>;
    }
}