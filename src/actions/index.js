import { provider, auth, storage ,db} from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { SET_USER ,SET_LOADING_STATUS,GET_ARTICLES} from '../actions/actionType';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore"; // Import Firestore collection and addDoc functions
import { query, getDocs,orderBy } from "firebase/firestore";
export const setUser = (payload) => ({
    type: SET_USER,
    user: payload,
});
export const setLoading=(status)=>(
    {
        type:SET_LOADING_STATUS,
        status:status,
    }
)
export const getArticles=(payload)=>({
    type:GET_ARTICLES,
    payload:payload,
})
export function signInAPI() {
    return (dispatch) => {
        signInWithPopup(auth, provider)
            .then((payload) => {
               dispatch(setUser(payload.user));
            })
            .catch((error) => {
                alert(error.message);
            });
    };
}
export function getUserAuth(){
    return (dispatch)=>{
        auth.onAuthStateChanged(async (user)=>{
            if(user){
                dispatch(setUser(user));
            }
        })
    }
}
export function signOutAPI(){
    return (dispatch)=>{
        auth.signOut().then(()=>{
            dispatch(setUser(null));
        }).catch((error)=>{
            console.log(error);
        })
    }
}
// export function postArticleAPI(payload) {
//     return (dispatch) => {
//         console.log('hello');
//         if (payload.image != "") {
//             console.log('hi');
//             const upload = ref(storage,`images/${payload.image.name}`)
//                 .put(payload.image);

//             upload.on('state_changed', (snapshot) => {
//                 const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//                 console.log(`Progress :${progress}%`)
//                 if(snapshot.state==="RUNNING"){
//                     console.log(`progress:${progress}%`)
//                 }
//             },error=>console.log(error.code),
//             async()=>{
//                 const downloadURL=await upload.snapshot.ref.getDownloadURL();
//                 db.collection("articles").add({
//                     actor:{
//                         description:payload.user.email,
//                         title:payload.user.displayName,
//                         data:payload.timestamp,
//                         image:payload.user.photoURL
//                     },
//                     video:payload.video,
//                     sharedImg:downloadURL,
//                     comments:0,
//                     description:payload.description
//                 })
//             });
           
//         }   
//         console.log('error');
//     }
// }

export function postArticleAPI(payload) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        if (payload.image !== "") {
            const storageRef = ref(storage, `images/${payload.image.name}`);
            const uploadTask = uploadBytesResumable(storageRef, payload.image);

            uploadTask.on('state_changed', 
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Progress: ${progress}%`);
                    if (snapshot.state === "running") {
                        console.log(`Progress: ${progress}%`);
                    }
                },
                (error) => {
                    console.log(error.code);
                },
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    try {
                        const docRef = await addDoc(collection(db, "articles"), { // Use firestoreDB reference here
                            actor: {
                                description: payload.user.email,
                                title: payload.user.displayName,
                                data: payload.timestamp,
                                image: payload.user.photoURL,
                            },
                            video: payload.video,
                            sharedImg: downloadURL,
                            comments: 0,
                            description: payload.description
                        });
                        dispatch(setLoading(false));
                        console.log("Document written with ID: ", docRef.id);
                    } catch (e) {
                        console.error("Error adding document: ", e);
                    }
                }
            );
        } else if(payload.video){
            const docRef = await addDoc(collection(db, "articles"), { // Use firestoreDB reference here
                actor: {
                    description: payload.user.email,
                    title: payload.user.displayName,
                    date: payload.timestamp,
                    image: payload.user.photoURL
                },
                video: payload.video,
                sharedImg: "",
                comments: 0,
                description: payload.description
            });
            dispatch(setLoading(false));
            console.log("Document written with ID: ", docRef.id);
        }
        
        else {
            console.log('No image to upload');
        }
    };
}
// export function getArticlesAPI(){
//     return async (dispatch)=>{
//         let payload;
//         // const q=query(collection(db,"articles"),orderBy("name", "desc"));
//         const querySnapshot=await getDocs(collection(db,"articles"),orderBy("name", "desc"));
//         // console.log(querySnapshot);
//         querySnapshot.forEach((doc)=>{
//             // console.log(doc.data());
//            console.log(doc.id,"=>",doc);
//             // payload=snapshot.docs.map((doc) => doc.data());
//         })
//         db.collection("articles").orderBy('actor.date',"desc").onSnapshot((snapshot)=>{
//             payload=snapshot.docs.map((doc)=>doc.data());
//         })
//         // console.log(payload);
//         // payload = querySnapshot.docs.map((doc) => doc.data());
//         // console.log(payload);
        
        
//     }
// }
export function getArticlesAPI() {
    return async (dispatch) => {
      try {
        // let payload;
        // const q = query(collection(db, 'articles'));
        const q = query(collection(db, 'articles'), orderBy("actor.data", "desc"));
        const querySnapshot = await getDocs(q);
  
        // payload = querySnapshot.docs.map((doc) => {
        //     // return doc.data();
        //     payload=doc.data();
        //     dispatch(getArticles(payload));
        // });
        const payload = querySnapshot.docs.map((doc) => {
            const documentData = doc.data();
           // Dispatch an action for each document
            return documentData;
          });
          dispatch(getArticles(payload)); 
           
        
        
       
  
        // If you want to dispatch the payload to the Redux store, you can do so here
        // dispatch({ type: 'SET_ARTICLES', payload });
  
      } catch (error) {
        console.error('Error fetching articles:', error);
        // Handle errors here if needed
      }
    };
  }