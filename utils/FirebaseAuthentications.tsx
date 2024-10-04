import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Auth } from "./firebase.config";
export const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(Auth, provider);
        // User info if sign-in is successful
        const user = result.user;
        console.log("User signed in: ", user);
        // Additional logic can go here (e.g., redirect or store user)
    } catch (error) {
        console.error("Error signing in with Google: ", error);
    }
};
export const registerWithEmail = async (email: string, password: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(Auth, email, password);
        const user = userCredential.user;
        console.log("User registered: ", user);
    } catch (error) {
        console.error("Error registering user: ", error);
    }
};
export const signInWithEmail = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(Auth, email, password);
        const user = userCredential.user;
        console.log("User signed in: ", user);
    } catch (error) {
        console.error("Error signing in: ", error);
    }
};

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
