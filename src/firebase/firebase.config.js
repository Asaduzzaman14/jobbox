
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.REACt_APP_apiKey,
    authDomain: process.env.REACt_APP_authDomain,
    projectId: process.env.REACt_APP_projectId,
    storageBucket: process.env.REACt_APP_storageBucket,
    messagingSenderId: process.env.REACt_APP_messagingSenderId,
    appId: process.env.REACt_APP_appId,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export default auth 