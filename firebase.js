import * as myFun from "./functions.js"
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
import { getDatabase,set,ref,child, get} from "https://www.gstatic.com/firebasejs/9.9.1/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword ,  signInWithEmailAndPassword , onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDQs1uL7nNmUCE1gj15woJoV4S9ap4kNtA",
    authDomain: "fir-auth-6ed98.firebaseapp.com",
    databaseURL: "https://fir-auth-6ed98-default-rtdb.firebaseio.com",
    projectId: "fir-auth-6ed98",
    storageBucket: "fir-auth-6ed98.appspot.com",
    messagingSenderId: "787784602234",
    appId: "1:787784602234:web:5bb2728d18b88264cfe1c3",
    measurementId: "G-8TQDDQKDS1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const analytics = getAnalytics(app);

const database =getDatabase(app);

let signUpFormBtn=document.querySelector("#sign-up")
let signInFormBtn=document.querySelector("#sign-in")
if(signUpFormBtn || signInFormBtn)
{
    signUpFormBtn.addEventListener("click",signup)
    signInFormBtn.addEventListener("click",signin)
}

function signup()
{
    let email=document.querySelector("#sign-up-email").value
    let password=document.querySelector("#sign-up-password").value
    let surname=document.querySelector("#sign-up-surname").value
    let name=document.querySelector("#sign-up-name").value
    let error=document.querySelector(".error-sign-up")

    if(myFun.checkNameValid(name,error)&&
    myFun.checkSurnameValid(surname,error)&&
    myFun.checkEmailValid(email,error)&&
    myFun.checkPasswordValid(password,error))
    {

        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            
            set(ref(database, 'users/' + user.uid), {
                name: name,
                surname:surname,
                email: email,
                bio:"",
                twitter:"",
                github:"",
                insta:""
            });

            console.log("user created")
        })
        .catch((err) => {
            const errorCode = err.code;
            const errorMessage = err.message;
            error.style.display="block"
            let errorSplit=errorCode.split("/")[1]
            let errorDisplay=errorSplit.split("-")
            error.innerHTML=errorDisplay.join(" ")
        });
    
    }
}


function signin()
{
    let signInEmail=document.querySelector("#sign-in-email").value
    let signInPassword=document.querySelector("#sign-in-password").value
    let error=document.querySelector(".error-sign-in")
    if(myFun.checkEmailValid(signInEmail,error)&&
    myFun.checkPasswordValid(signInPassword,error))
    {
        console.log("done")

        signInWithEmailAndPassword(auth, signInEmail, signInPassword)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("logged in");        
            window.location = "profile.html"
            console.log(user)
        })
        .catch((err) => {
            const errorCode = err.code;
            const errorMessage = err.message;
            error.style.display="block"
            let errorSplit=errorCode.split("/")[1]
            let errorDisplay=errorSplit.split("-")
            error.innerHTML=errorDisplay.join(" ")
        });

    }
}


const user = auth.currentUser;
onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;

        const dbRef = ref(getDatabase());
        get(child(dbRef, `users/${uid}`)).then((snapshot) => {
            if (snapshot.exists()) 
            {
                const data=snapshot.val()
                console.log(data);

                let profileHead=document.querySelector("#pro-head")
                let profileBio=document.querySelector("#pro-bio")
                let profileSocialTw=document.querySelector("#social-tw")
                let profileSocialIn=document.querySelector("#social-in")
                let profileSocialGit=document.querySelector("#social-git")

                profileHead.innerHTML=data.name+" "+data.surname
                profileBio.innerHTML=data.bio
                profileSocialTw.href=data.twitter;
                profileSocialIn.href=data.insta;
                profileSocialGit.href=data.github;

            } else 
            {
                console.log("No data available");
            }
        })
        .catch((error) => {
            console.error(error);
        });

    } else {
        // User is signed out
        // ...
    }
})

