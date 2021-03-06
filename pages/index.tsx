import { myFireauth } from "../services/Firebase";
import ChatScreen from "../components/ChatScreen";
import Landing from "../components/Landing";
import { useEffect, useState } from "react";
import firebase from "firebase/app";
import Head from "next/head";
import { NextPage } from "next";

const Home: NextPage = () => {
  const [user, setUser] = useState(() => myFireauth.currentUser);
  const [init, setInit] = useState(true);

  useEffect(() => {
    const unsuscribe = myFireauth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      if (init) {
        setInit(false);
      }
    });

    return unsuscribe;
  }, [init]);

  const signInWithGoogle = async () => {
    console.log("D");

    const provider = new firebase.auth.GoogleAuthProvider();
    myFireauth.useDeviceLanguage();
    try {
      await myFireauth.signInWithPopup(provider);
    } catch (err) {
      console.log(err);
    }
    console.log("S");
  };

  if (init) return <div>Loading</div>;
  return (
    <>
      <Head>
        <title>C Y N E F I N</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user ? <ChatScreen /> : <Landing signIn={() => signInWithGoogle()} />}
    </>
  );
};
export default Home;
