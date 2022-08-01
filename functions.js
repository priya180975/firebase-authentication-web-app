export function checkNameValid(name,error)
{
    var validRegex=/^[a-zA-Z\-]+$/;
    if(name==="")
    {
        error.style.display="block"
        error.innerHTML="Name cannot be empty"
        return false;
    }
    else if(!validRegex.test(name))
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


export function checkSurnameValid(surname,error)
{
    let validRegex=/^[a-zA-Z\-]+$/;
    if(surname==="")
    {
        error.style.display="block"
        error.innerHTML="Surname cannot be empty"
        return false;
    }
    else if(!validRegex.test(surname))
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


export function checkEmailValid(email,error)
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


export function checkPasswordValid(password,error)
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


