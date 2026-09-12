import { Chrome, Facebook, Github } from "lucide-react";
import { useState } from "react";
import Button from "../button";
import Checkbox from "../input/checkbox";
import Input from "../input/input";

type SignUpFormProps = {
    onSubmit?: (
        name: string,
        email: string,
        password: string,
        confirmPassword: string,
        agreeTerms: boolean
    ) => any;

    handleGoogleSignUp?: () => any;
    handleFacebookSignUp?: () => any;
    handleGithubSignUp?: () => any;
};

const SignUpForm = ({
    onSubmit,
    handleGoogleSignUp,
    handleFacebookSignUp,
    handleGithubSignUp,
}: SignUpFormProps) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [agreeTerms, setAgreeTerms] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        onSubmit?.(
            name,
            email,
            password,
            confirmPassword,
            agreeTerms
        );
    };

    return (
        <div className="bg-foreground rounded-xl p-8 border border-slate-200 dark:border-slate-700/50">
            {/* Header */}
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-800 dark:text-white">
                    Sign Up
                </h2>

                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Create your account to get started.
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                    label="Full Name"
                    type="text"
                    placeholder="John Doe"
                    onChange={(e) => setName(e.target.value)}
                />

                <Input
                    label="Email"
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                    label="Password"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Input
                    label="Confirm Password"
                    type="password"
                    placeholder="Confirm Password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                {/* Terms */}
                <div className="flex items-center">
                    <Checkbox
                        size="md"
                        checked={agreeTerms}
                        onChange={(e) =>
                            setAgreeTerms(e.target.checked)
                        }
                    />

                    <label className="ml-2 block text-sm text-slate-600 dark:text-slate-400 cursor-pointer select-none">
                        I agree to the Terms & Conditions
                    </label>
                </div>

                <Button className="w-full">
                    Create Account
                </Button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
                </div>

                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-foreground text-slate-500">
                        OR sign up with
                    </span>
                </div>
            </div>

            {/* Social Buttons */}
            <div className="flex justify-center gap-3 mb-8">
                <button
                    type="button"
                    className="p-2.5 bg-background hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg transition-colors"
                    onClick={handleGoogleSignUp}
                >
                    <Chrome size={20} />
                </button>

                <button
                    type="button"
                    className="p-2.5 bg-background hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg transition-colors"
                    onClick={handleFacebookSignUp}
                >
                    <Facebook size={20} />
                </button>

                <button
                    type="button"
                    className="p-2.5 bg-background hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg transition-colors"
                    onClick={handleGithubSignUp}
                >
                    <Github size={20} />
                </button>
            </div>

            {/* Footer */}
            <div className="text-center text-sm text-slate-500 dark:text-slate-400">
                Already have an account?{" "}
                <a
                    href="#"
                    className="font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:underline"
                >
                    Sign In
                </a>
            </div>
        </div>
    );
};

export default SignUpForm;