import { Chrome, Eye, EyeOff, Facebook, Github, Hexagon } from 'lucide-react';
import React, { useState } from 'react';
import Container from "../components/shared/container";
import SourceCode from "../components/shared/source-code";
import SignUpForm from "../../lib/components/shared/authentication/signup-form";

export default function SignUp() {
  return (
    <Container
      title="Registration"
      description="A clean, responsive sign-up form for user registration."
    >
      <div className="max-w-md mx-auto">
        <SignUpForm />
      </div>

      <div className="max-w-3xl mx-auto">
        <SourceCode code={`import SignUpForm from "sanmo-ui";

export default function SignUpPage() {
    const handleSignUp = async (
        name: string,
        email: string,
        password: string,
        confirmPassword: string,
        agreeTerms: boolean
    ) => {
        console.log({
            name,
            email,
            password,
            confirmPassword,
            agreeTerms,
        });

        // your signup logic here
    };

    const handleGoogleSignUp = () => {
        console.log("Google Sign Up");
    };

    const handleFacebookSignUp = () => {
        console.log("Facebook Sign Up");
    };

    const handleGithubSignUp = () => {
        console.log("Github Sign Up");
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
              <SignUpForm
                  onSubmit={handleSignUp}
                  handleGoogleSignUp={handleGoogleSignUp}
                  handleFacebookSignUp={handleFacebookSignUp}
                  handleGithubSignUp={handleGithubSignUp}
              />
        </div>
    );
}`} />
      </div>
    </Container>
  );
}