let profileDisplay=document.querySelector(".display-profile")
let profileEdit=document.querySelector(".edit-profile")

let editProfileBtn=document.querySelector("#edit-profile-btn")
let cancelEdit=document.querySelector("#cancel-edit")
let saveBtn=document.querySelector("#save-info")

editProfileBtn.addEventListener("click",displayEditPage)
cancelEdit.addEventListener("click",displayProfilePage)
saveBtn.addEventListener("click",displayProfilePage)

function displayEditPage(){
    profileDisplay.style.display="none"
    profileEdit.style.display="block"
}

function displayProfilePage(){
    profileEdit.style.display="none"
    profileDisplay.style.display="block"
}