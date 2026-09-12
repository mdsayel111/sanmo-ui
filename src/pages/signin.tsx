import Container from "../components/shared/container";
import SourceCode from "../components/shared/source-code";
import SigninForm from "../../lib/components/shared/authentication/signin-form";


export default function SignIn() {
    return (
        <Container
            title="Authentication"
            description="A clean, responsive sign-in form with social login options."
        >
            <SigninForm />

            <div className="max-w-3xl mx-auto">
                <SourceCode code={`import SignInForm from "sanmo-ui";

export default function SignInPage() {
    const handleSignIn = async (
        email: string,
        password: string,
        rememberMe: boolean
    ) => {
        console.log({
            email,
            password,
            rememberMe,
        });

        // your auth logic here
    };

    const handleGoogleSignIn = () => {
        console.log("Google Sign In");
    };

    const handleFacebookSignIn = () => {
        console.log("Facebook Sign In");
    };

    const handleGithubSignIn = () => {
        console.log("Github Sign In");
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <SignInForm
                onSubmit={handleSignIn}
                handleGoogleSignIn={handleGoogleSignIn}
                handleFacebookSignIn={handleFacebookSignIn}
                handleGithubSignIn={handleGithubSignIn}
            />
        </div>
    );
}`} />
            </div>
        </Container>
    );
}