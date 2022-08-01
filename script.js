let passwordEye=document.querySelectorAll(".password-show-hide")

let signUpFormBtn=document.querySelector("#sign-up")
let signInFormBtn=document.querySelector("#sign-in")

let signInBtn=document.querySelector("#sign-in-page-btn")
let signUpBtn=document.querySelector("#sign-up-page-btn")
let signUpPage=document.querySelector(".sign-up-page")   
let signInPage=document.querySelector(".sign-in-page")  

passwordEye.forEach(a=>a.addEventListener("click",toggleEye))

signInBtn.addEventListener("click",displaySignIn)
signUpBtn.addEventListener("click",displaySignUp)

signUpFormBtn.addEventListener("click",signup)
signInFormBtn.addEventListener("click",signin)

function toggleEye(e)
{
    let eye=e.target;
    if(eye.classList.contains("fa-eye-slash"))
    {
        eye.classList.add("fa-eye");
        let data=eye.getAttribute("data-name")
        document.querySelector(`#${data}password`).setAttribute("type","text")
        eye.classList.remove("fa-eye-slash")
    }
    else
    {   
        eye.classList.remove("fa-eye")
        let data=eye.getAttribute("data-name")
        document.querySelector(`#${data}password`).setAttribute("type","password")
        eye.classList.add("fa-eye-slash")
    }

}

function displaySignUp()
{
    signUpPage.style.display="block"
    signInPage.style.display="none"
}

function displaySignIn()
{
    signUpPage.style.display="none"
    signInPage.style.display="block"
}

function checkNameValid(error)
{
    let signUpName=document.querySelector("#sign-up-name").value
    var validRegex=/^[a-zA-Z\-]+$/;
    if(signUpName==="")
    {
        error.style.display="block"
        error.innerHTML="Name cannot be empty"
        return false;
    }
    else if(!validRegex.test(signUpName))
    {
        error.style.display="block"
        error.innerHTML="Invalid Name format"
        return false;
    }
    else{
        error.style.display="none"
        return true;
    }
}


function checkSurnameValid(error)
{
    let signUpSurname=document.querySelector("#sign-up-surname").value
    let validRegex=/^[a-zA-Z\-]+$/;
    if(signUpSurname==="")
    {
        error.style.display="block"
        error.innerHTML="Surname cannot be empty"
        return false;
    }
    else if(!validRegex.test(signUpSurname))
    {
        error.style.display="block"
        error.innerHTML="Invalid Surname format"
        return false;
    }
    else
    {
        error.style.display="none"
        return true;
    }
}


function checkEmailValid(email,error)
{
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if(email==="")
    {
        error.style.display="block"
        error.innerHTML="Email cannot be empty" 
        return false;
    }
    else if(!validRegex.test(email))
    {
        error.style.display="block"
        error.innerHTML="Invalid Email" 
        return false;
    }
    else
    {
        error.style.display="none"    
        return true; 
    }
}


function checkPasswordValid(password,error)
{
    var validRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if(password==="")
    {
        error.style.display="block"
        error.innerHTML="Password cannot be empty" 
        return false;
    }
    else if(!validRegex.test(password))
    {
        error.style.display="block"
        error.innerHTML="Invalid Password Format"
        return false;
    }
    else
    {
        error.style.display="none"   
        return true;
    }
}


function signup()
{
    let signUpEmail=document.querySelector("#sign-up-email").value
    let signUpPassword=document.querySelector("#sign-up-password").value
    let error=document.querySelector(".error-sign-up")

    if(checkNameValid(error)&&checkSurnameValid(error)&&checkEmailValid(signUpEmail,error)&&checkPasswordValid(signUpPassword,error))
    {
        console.log("done")
    }
    else
    {
        console.log("err")
    }
}


function signin()
{
    let signInEmail=document.querySelector("#sign-in-email").value
    let signInPassword=document.querySelector("#sign-in-password").value
    let error=document.querySelector(".error-sign-in")
    if(checkEmailValid(signInEmail,error)&&checkPasswordValid(signInPassword,error))
    {
        console.log("done")
    }
    else
    {
        console.log("err")
    }
}



