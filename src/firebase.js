import { initializeApp } from 'firebase/app';
import { getFirestore} from 'firebase/firestore'
import { getAuth ,GoogleAuthProvider} from "firebase/auth";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyBCFppxNWFoucOsDpKKuF0emwb8gbU0bWo",
    authDomain: "linkedin-clone-a908a.firebaseapp.com",
    projectId: "linkedin-clone-a908a",
    storageBucket: "linkedin-clone-a908a.appspot.com",
    messagingSenderId: "610167149677",
    appId: "1:610167149677:web:7444de658fa3d3aa61db64"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider(); // Note: Correct instantiation of GoogleAuthProvider
const storage = getStorage(firebaseApp);

export { auth, provider, storage ,db};
// export default db;
