import { signInWithRedirect } from "firebase/auth";
import { auth, provider } from "../firebaseSetup";

type Props = {

}

const LoginPage: React.FC<Props> = (props) => {
    const googleSignIn = async () => {
        await signInWithRedirect(auth, provider);
    }
    return (
        <>
            <div>
                <button onClick={googleSignIn}>Sign in with Google</button>
            </div>
        </>
    );
}

export default LoginPage;