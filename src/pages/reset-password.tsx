// import { Check, Hexagon } from 'lucide-react';
// import React, { useState } from 'react';
// import Container from "../components/shared/container";
// import SourceCode from "../components/shared/source-code";

// export const ResetPasswordForm = () => {
//     const [email, setEmail] = useState('');
//     const [submitted, setSubmitted] = useState(false);

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         if (email) {
//             setSubmitted(true);
//             // Logic to send reset email would go here
//         }
//     };

//     return (
//         <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl p-8 border border-slate-200 dark:border-slate-800">

//             {/* Brand Logo */}
//             <div className="flex justify-center items-center gap-2 mb-6">
//                 <div className="w-8 h-8 bg-gradient-to-tr from-emerald-400 to-blue-500 rounded-lg flex items-center justify-center text-white">
//                     <Hexagon size={20} fill="currentColor" />
//                 </div>
//                 <span className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Rasket</span>
//             </div>

//             <div className="text-center mb-8">
//                 <h2 className="text-xl font-semibold text-slate-800 dark:text-white">Reset Password</h2>
//                 <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xs mx-auto">
//                     Enter your email address and we'll send you an email with instructions to reset your password.
//                 </p>
//             </div>

//             {!submitted ? (
//                 <form onSubmit={handleSubmit} className="space-y-5">
//                     {/* Email Field */}
//                     <div>
//                         <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">Email</label>
//                         <input
//                             type="email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             className="w-full px-4 py-2.5 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder-slate-400"
//                             placeholder="Enter your email"
//                             required
//                         />
//                     </div>

//                     {/* Submit Button */}
//                     <button
//                         type="submit"
//                         className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg shadow-blue-900/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all"
//                     >
//                         Reset Password
//                     </button>
//                 </form>
//             ) : (
//                 <div className="text-center py-4 space-y-4">
//                     <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
//                         <Check size={32} />
//                     </div>
//                     <div className="text-slate-300">
//                         If an account exists for <span className="font-semibold text-white">{email}</span>, you will receive password reset instructions shortly.
//                     </div>
//                     <button
//                         onClick={() => setSubmitted(false)}
//                         className="text-sm text-blue-500 hover:text-blue-400"
//                     >
//                         Try different email
//                     </button>
//                 </div>
//             )}

//             {/* Footer */}
//             <div className="text-center text-sm text-slate-500 dark:text-slate-400 mt-8">
//                 Back to <a href="#" className="font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:underline">Sign In</a>
//             </div>
//         </div>
//     );
// };

// /**
//  * =========================================================================
//  * DOCUMENTATION PAGE
//  * =========================================================================
//  */

// export default function ResetPassword() {
//     return (
//         <Container
//             title="Recover Password"
//             description="A clean, responsive form for initiating the password recovery process."
//         >
//             <div className="max-w-md mx-auto">
//                 <ResetPasswordForm />
//             </div>

//             <div className="max-w-3xl mx-auto">
//                 <SourceCode code={`<div className="p-8 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
//   <div className="text-center mb-8">
//     <h2 className="text-xl font-bold">Reset Password</h2>
//     <p>Enter your email to receive instructions.</p>
//   </div>

//   <form>
//     <label>Email</label>
//     <input type="email" className="form-input" />

//     <button type="submit" className="btn-primary w-full">
//       Reset Password
//     </button>
//   </form>

//   <div className="text-center mt-8">
//     Back to <a href="#">Sign In</a>
//   </div>
// </div>`} />
//             </div>
//         </Container>
//     );
// }


import Container from "../components/shared/container";
import SourceCode from "../components/shared/source-code";

import ResetPasswordForm from "../../lib/components/shared/authentication/reset-password-form";
import VerifyOtpForm from "../../lib/components/shared/authentication/verify-otp-form";
import NewPasswordForm from "../../lib/components/shared/authentication/new-password-form";

export default function ForgotPasswordExamples() {
    return (
        <Container
            title="Forgot Password"
            description="Beautiful authentication recovery forms including reset password, OTP verification, and new password setup."
        >
            {/* Reset Password */}
            <div className="space-y-6 mb-20">
                <div className="max-w-md mx-auto">
                    <ResetPasswordForm
                        onSubmit={(email: string) => {
                            console.log(email);
                        }}
                    />
                </div>

                <div className="max-w-3xl mx-auto">
                    <SourceCode
                        code={`import ResetPasswordForm from "sanmo-ui";

export default function ResetPasswordPage() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <ResetPasswordForm
                onSubmit={(email: string) => {
                    console.log(email);
                }}
            />
        </div>
    );
}`}
                    />
                </div>
            </div>

            {/* Verify OTP */}
            <div className="space-y-6 mb-20">
                <div className="max-w-md mx-auto">
                    <VerifyOtpForm
                        onSubmit={(otp: string) => {
                            console.log(otp);
                        }}
                    />
                </div>

                <div className="max-w-3xl mx-auto">
                    <SourceCode
                        code={`import VerifyOtpForm from "sanmo-ui";

export default function VerifyOtpPage() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <VerifyOtpForm
                onSubmit={(otp: string) => {
                    console.log(otp);
                }}
            />
        </div>
    );
}`}
                    />
                </div>
            </div>

            {/* New Password */}
            <div className="space-y-6">
                <div className="max-w-md mx-auto">
                    <NewPasswordForm
                        onSubmit={(
                            password: string,
                            confirmPassword: string
                        ) => {
                            console.log({
                                password,
                                confirmPassword,
                            });
                        }}
                    />
                </div>

                <div className="max-w-3xl mx-auto">
                    <SourceCode
                        code={`import NewPasswordForm from "sanmo-ui";

export default function NewPasswordPage() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <NewPasswordForm
                onSubmit={(
                    password: string,
                    confirmPassword: string
                ) => {
                    console.log({
                        password,
                        confirmPassword,
                    });
                }}
            />
        </div>
    );
}`}
                    />
                </div>
            </div>
        </Container>
    );
}