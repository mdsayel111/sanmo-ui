// NewPasswordForm.tsx

import { useState } from "react";
import Button from "../button";
import Input from "../input/input";

type NewPasswordFormProps = {
    onSubmit?: (
        password: string,
        confirmPassword: string
    ) => any;
};

const NewPasswordForm = ({
    onSubmit,
}: NewPasswordFormProps) => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] =
        useState("");

    const handleSubmit = (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        onSubmit?.(password, confirmPassword);
    };

    return (
        <div className="bg-foreground rounded-xl p-8 border border-slate-200 dark:border-slate-700/50">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-800 dark:text-white">
                    Create New Password
                </h2>

                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Your new password must be different from
                    previous passwords.
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >
                <Input
                    label="New Password"
                    type="password"
                    placeholder="New Password"
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />

                <Input
                    label="Confirm Password"
                    type="password"
                    placeholder="Confirm Password"
                    onChange={(e) =>
                        setConfirmPassword(
                            e.target.value
                        )
                    }
                />

                <Button className="w-full">
                    Update Password
                </Button>
            </form>
        </div>
    );
};

export default NewPasswordForm;