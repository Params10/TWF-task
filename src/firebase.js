import firebase from "firebase/app"
import "firebase/auth"

const app = firebase.initializeApp({
  apiKey: "AIzaSyDO8azoszz-Pc922QJki4ijHjbWsWmrArA",
    authDomain: "twf-final.firebaseapp.com",
    projectId: "twf-final",
    storageBucket: "twf-final.appspot.com",
    messagingSenderId: "666895497104",
    appId: "1:666895497104:web:223f597dd81b734800a515",
    databaseURL : "https://twf-final-default-rtdb.firebaseio.com/"
})


export const auth = app.auth()
export default app
