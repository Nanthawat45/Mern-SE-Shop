import { createContext, useState, useEffect } from "react";
export const AuthContext = createContext();
import app from "../configs/firebase.configs";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  FacebookAuthProvider,
  updateProfile,
  // linkWithPopup,
} from "firebase/auth";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const auth = getAuth(app);
  // const googleProvider = new GoogleAuthProvider();
  // const githubProvider = new GithubAuthProvider();
const getTokens = () => {
  const token = cookies.get("token") || null;
  //decode token ???
  const userInfor = {
    email: "",
    role: "",
  };
  return userInfor;
};

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logout = () => {
    return signOut(auth);
  };
  const signUpWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };
  const signUpWithGithub = () => {
    const provider = new GithubAuthProvider();
    return signInWithPopup(auth, provider);
  };
  const signUpWithFacebook = () => {
    const provider = new FacebookAuthProvider();
    return signInWithPopup(auth, provider);
  };
  const updateUserProfile = ({ name, photoURL }) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  };
  // const linkAccount = (currentUser) => {
  //   linkWithPopup(currentUser, googleProvider)
  //     .then((result) => {
  //       const credential = GoogleAuthProvider.credentialFromResult(result);
  //       console.log(credential);
  //       const user = result.user;
  //       console.log(user);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  const authInfo = {
    user,
    createUser,
    login,
    logout,
    signUpWithGoogle,
    signUpWithGithub,
    signUpWithFacebook,
    updateUserProfile,
    isLoading,
    // linkAccount,
  };
  //check if user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setUser(currentUser);
        setIsLoading(false);
        const {email} = currentUser;
        const response = await UserService.signJwt(email);
        // console.log(data);

        if(response.data){
          console.log(response.data);
          cookies.set("user", response.data);
        }
      }else{
        cookies.remove("user");
      }
      setIsLoading(false);
    });
    return () => {
      return unsubscribe();
    };
  }, [auth]);

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};
export default AuthProvider;
