// ResetPasswordForm.tsx

import { useState } from "react";
import Button from "../button";
import Input from "../input/input";

type ResetPasswordFormProps = {
    onSubmit?: (email: string) => any;
};

const ResetPasswordForm = ({
    onSubmit,
}: ResetPasswordFormProps) => {
    const [email, setEmail] = useState("");

    const handleSubmit = (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        onSubmit?.(email);
    };

    return (
        <div className="bg-foreground rounded-xl p-8 border border-slate-200 dark:border-slate-700/50">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-800 dark:text-white">
                    Reset Password
                </h2>

                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Enter your email to receive a reset code.
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >
                <Input
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                <Button className="w-full">
                    Send OTP
                </Button>
            </form>
        </div>
    );
};

export default ResetPasswordForm;