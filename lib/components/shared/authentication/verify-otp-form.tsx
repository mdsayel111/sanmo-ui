// VerifyOtpForm.tsx

import { useState } from "react";
import Button from "../button";
import Input from "../input/input";

type VerifyOtpFormProps = {
    onSubmit?: (otp: string) => any;
};

const VerifyOtpForm = ({
    onSubmit,
}: VerifyOtpFormProps) => {
    const [otp, setOtp] = useState("");

    const handleSubmit = (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        onSubmit?.(otp);
    };

    return (
        <div className="bg-foreground rounded-xl p-8 border border-slate-200 dark:border-slate-700/50">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-800 dark:text-white">
                    Verify OTP
                </h2>

                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Enter 6 digit OTP sent to your email.
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >
                <Input
                    label="OTP Code"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => {
                        if (e.target.value.length > 6) {
                            return;
                        }
                        const numericValue = e.target.value.replace(/\D/g, "");
                        setOtp(numericValue);
                    }}
                />

                <Button className="w-full">
                    Verify OTP
                </Button>
            </form>
        </div>
    );
};

export default VerifyOtpForm;