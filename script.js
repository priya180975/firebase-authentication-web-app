let passwordEye=document.querySelectorAll(".password-show-hide")

let signInBtn=document.querySelector("#sign-in-page-btn")
let signUpBtn=document.querySelector("#sign-up-page-btn")
let signUpPage=document.querySelector(".sign-up-page")   
let signInPage=document.querySelector(".sign-in-page")  

passwordEye.forEach(a=>a.addEventListener("click",toggleEye))

signInBtn.addEventListener("click",displaySignIn)
signUpBtn.addEventListener("click",displaySignUp)



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

    