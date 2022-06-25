import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import { createUserFromAuth, signInWithGooglePopup } from "../../utils/firebase/firebase.utils";

const SignIn = () => {
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserFromAuth(user);
    }

    return (
        <div>
            <h1>Sign In</h1>
            <button onClick={logGoogleUser}>
                Sign in with Google
            </button>
            <SignUpForm/>
        </div>
    )
}

export default SignIn;