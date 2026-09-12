import { Chrome, Facebook, Github } from "lucide-react";
import { useState } from "react";
import Button from "../button";
import Checkbox from "../input/checkbox";
import Input from "../input/input";

type SignInFormProps = {
    onSubmit?: (email: string, password: string, rememberMe: boolean) => any;
    handleGoogleSignIn?: () => any;
    handleFacebookSignIn?: () => any;
    handleGithubSignIn?: () => any;
}

const SignInForm = ({ onSubmit, handleGoogleSignIn, handleFacebookSignIn, handleGithubSignIn }: SignInFormProps) => {
    const [email, setEmail] = useState('test@techzaa.in');
    const [password, setPassword] = useState('12345678');
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit && onSubmit(email, password, rememberMe);
    };

    return (
        <div className="bg-foreground rounded-xl p-8 border border-slate-200 dark:border-slate-700/50 max-w-md mx-auto">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-800 dark:text-white">Sign In</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Enter your email address and password sign in.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <Input label="Email" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <Input label="Password" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

                {/* Checkbox */}
                <div className="flex items-center">
                    <Checkbox size="md" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                    <label htmlFor="remember-me" className="ml-2 text-sm block text-slate-600 dark:text-slate-400 cursor-pointer select-none">
                        Remember me
                    </label>
                </div>
                <Button className="w-full">
                    Sign In
                </Button>
            </form>

            {/* Social Login Separator */}
            <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-foreground text-slate-500">OR sign with</span>
                </div>
            </div>

            {/* Social Buttons */}
            <div className="flex justify-center gap-3 mb-8">
                <button
                    className="p-2.5 bg-background hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg transition-colors"
                    onClick={handleGoogleSignIn}
                >
                    <Chrome size={20} />
                </button>
                <button
                    className="p-2.5 bg-background hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg transition-colors"
                    onClick={handleFacebookSignIn}
                >
                    <Facebook size={20} />
                </button>
                <button
                    className="p-2.5 bg-background hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg transition-colors"
                    onClick={handleGithubSignIn}
                >
                    <Github size={20} />
                </button>
            </div>

            {/* Footer */}
            <div className="text-center text-sm text-slate-500 dark:text-slate-400">
                New here? <a href="#" className="font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:underline">Sign Up</a>
            </div>
        </div>
    );
};

export default SignInForm;
