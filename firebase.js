import * as myFun from "./functions.js"
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
import { getDatabase,set,update,ref,child, get} from "https://www.gstatic.com/firebasejs/9.9.1/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-analytics.js";
import { getAuth, signOut, createUserWithEmailAndPassword ,  signInWithEmailAndPassword , onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-auth.js";

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
let signOutBtn=document.querySelector("#sign-out")

if(signOutBtn)
{
    signOutBtn.addEventListener("click",signOutFun)
}

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
            // location.href="profile.html";
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
            location.href="profile.html";
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
   
        let updateInfo=document.querySelector("#save-info")
        if(updateInfo)
        {
            updateInfo.addEventListener("click",infoUpdate)
        }

        const uid = user.uid;
        const dbRef = ref(getDatabase());
        get(child(dbRef, `users/${uid}`)).then((snapshot) => {
            if (snapshot.exists()) 
            {
                const data=snapshot.val()

                let profileHead=document.querySelector("#pro-head")
                let profileBio=document.querySelector("#pro-bio")
                let profileSocialTw=document.querySelector("#social-tw")
                let profileSocialIn=document.querySelector("#social-in")
                let profileSocialGit=document.querySelector("#social-git")

                let profileUpdateName=document.querySelector("#profile-name")
                let profileUpdateSurname=document.querySelector("#profile-surname")
                let profileUpdateInstagram=document.querySelector("#profile-insta")
                let profileUpdateTwitter=document.querySelector("#profile-twt")
                let profileUpdateGitHub=document.querySelector("#profile-git")
                let profileUpdateBio=document.querySelector("#profile-bio")

                if(profileHead)
                {
                    profileHead.innerHTML=data.name+" "+data.surname
                    profileBio.innerHTML=data.bio
                    profileSocialTw.href=data.twitter;
                    profileSocialIn.href=data.insta;
                    profileSocialGit.href=data.github;

                    profileUpdateName.value=data.name
                    profileUpdateSurname.value=data.surname
                    profileUpdateGitHub.value=data.github
                    profileUpdateInstagram.value=data.insta
                    profileUpdateTwitter.value=data.twitter
                    profileUpdateBio.value=data.bio
                }

            } else 
            {
                console.log("No data available");
            }
        })
        .catch((error) => {
            console.error(error);
        });


        function infoUpdate()
        {
            let pname=document.querySelector("#profile-name").value
            let psurname=document.querySelector("#profile-surname").value
            let pinsta=document.querySelector("#profile-insta").value
            let ptwt=document.querySelector("#profile-twt").value
            let pgit=document.querySelector("#profile-git").value
            let pbio=document.querySelector("#profile-bio").value
            let error=document.querySelector(".error-profile-up")

              if(myFun.checkNameValid(pname,error)&&
                myFun.checkSurnameValid(psurname,error))
                {
                    update(ref(database, 'users/' + user.uid), {
                        name: pname,
                        surname:psurname,
                        bio:pbio,
                        insta:pinsta,
                        github:pgit,
                        twitter:ptwt,
                    })
                    .then(() => {
                        // Data saved successfully!
                        console.log("saved")
                    })
                    .catch((error) => {
                        // The write failed...
                        console.log(error)
                    });
                }
        }

    } 
    else {
        // User is signed out
        // ...
    }
})

function signOutFun()
{
    signOut(auth).then(() => {
        // Sign-out successful.
        console.log("out")
        window.location="index.html"
    }).catch((error) => {
        console.log(error)
    });
}