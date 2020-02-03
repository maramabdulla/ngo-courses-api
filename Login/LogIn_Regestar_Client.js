// for text under the input Signup
let Name_SignUp_P = document.getElementById("name-p");
let Email_SignUp_P = document.getElementById("email-p");
let Pass_SignUp_P = document.getElementById("pass-p");

// for input text Signup
let Name_SignUp = document.getElementById("name");
let Email_SignUp = document.getElementById("email-S");
let Pass_SignUp = document.getElementById("password-S");

// for input Log In
let Email_LogIn = document.getElementById("email");
let Pass_LogIn = document.getElementById("password");

// for input text Log in
let Email_LogIn_p = document.getElementById("email-pp");
let Pass_LogIn_p = document.getElementById("pass-pp");

let ShowPassword_SignUp = document.getElementById("show-sign");
let HidePassword_SignUp = document.getElementById("hide-sign");
let ShowPassword_LogIn = document.getElementById("show-login");
let HidePassword_LogIn = document.getElementById("hide-login");

let input = document.getElementsByTagName("input");

let URL = 'http://localhost:3000/ngo/';

// for check Name By RegExp  .............
const checkName = /^[a-z]|[0-9]/i;
function checkNameRegExp() {
  if (Name_SignUp.value == "") {
    Name_SignUp_P.innerHTML = "the Name is empty";
    Name_SignUp.style.borderBottomColor = "red";
  }
  else if (checkName.test(Name_SignUp.value) == false) {
    Name_SignUp_P.innerHTML = "enter your name right way";
    Name_SignUp.style.borderBottomColor = "red";
  }
  else {
    Name_SignUp.style.borderBottomColor = "green";
    Name_SignUp_P.innerHTML = "";
  }
}

// for check Email By RegExp ........................
const checkEmail = /[a-z0-9_\.\-]+@+[a-z_\.\-]+\.+[a-z]/i;
function checkEmailRegExp() {
  if (Email_SignUp.value == "") {
    Email_SignUp_P.innerHTML = "the Email is empty";
    Email_SignUp.style.borderBottomColor = "red";
  }
  else if (checkEmail.test(Email_SignUp.value) == false) {
    Email_SignUp_P.innerHTML = "the email is worng";
    Email_SignUp.style.borderBottomColor = "red";
  } else {
    Email_SignUp.style.borderBottomColor = "green";
    Email_SignUp_P.innerHTML = "";
  }
}

// for check Password By RegExp ........................
const checkPassword = /[a-z]+|[0-9]+|\!+|\@+|\#+|\$+|\%+|\&/i;
function checkPasswordRegExp() {
  if (Pass_SignUp.value == "") {
    Pass_SignUp_P.innerHTML = "the passowrd is empty";
    Pass_SignUp.style.borderBottomColor = "red";
  } else if (Pass_SignUp.value.length <= 7) {
    Pass_SignUp_P.innerHTML = "must be more than 8 letters";
    Pass_SignUp.style.borderBottomColor = "red";
  } else if (Pass_SignUp.value.length <= 8) {
    Pass_SignUp_P.innerHTML = "your password good";
    Pass_SignUp.style.borderBottomColor = "orange";
    Pass_SignUp_P.style.color = "orange";
  } else if (Pass_SignUp.value.length <= 9) {
    Pass_SignUp_P.innerHTML = "very good";
    Pass_SignUp.style.borderBottomColor = "rgb(255, 196, 0)";
    Pass_SignUp_P.style.color = "rgb(255, 196, 0)";
  } else if (checkPassword.test(Pass_SignUp.value) === false) {
    Pass_SignUp_P.innerHTML = "the passowrd is worng";
    Pass_SignUp.style.borderBottomColor = "red";
  } else if (Pass_SignUp.value.length <= 10) {
    Pass_SignUp_P.innerHTML = "";
    Pass_SignUp.style.borderBottomColor = "green";
   
  }
}
// for Sign Up and create a new account 
let header = new Headers();
header.append('content-type', 'application/json');
// header.append('authorization' , 'Bearer '+ localStorage.getItem('token'))


function RegestarNewAccount() {
    fetch( URL + 'register', {
      method: 'post',
      headers: header,
      body: JSON.stringify({
        name: Name_SignUp.value,
        email: Email_SignUp.value,
        password: Pass_SignUp.value
      })
    }).then(re => {
      return re.json()
    }).then(data => {
      console.log(data)
      localStorage.setItem("token",data.token)
      if(data.status == 226) {
        Email_SignUp_P.innerHTML = "your Email is Exists"
        Email_SignUp.style.borderBottomColor = "red" 
      }else{
        Email_SignUp_P.innerHTML = ""
        Email_SignUp.style.borderBottomColor = "green" 
        window.location.replace("../NGO/ProfileNGO.html")
      }
      })
  Name_SignUp.value = "";
  Email_SignUp.value = "";
  Pass_SignUp.value = "";
  }
  let div = document.getElementById("msg");
  function LogIn() {

    fetch( URL + 'login', {
        method: 'post',
        headers: header,
        body: JSON.stringify({
            email: Email_LogIn.value,
            password: Pass_LogIn.value
        })
    }).then(re => re.json()).then(data => {
      console.log(data)
      localStorage.setItem("token" , data.token)
      localStorage.setItem("id" , data.id)
        if(data.status == 200) {
          Pass_LogIn.style.borderBottomColor = 'green';
          Email_LogIn.style.borderBottomColor = 'green';
          Pass_LogIn.value = "";
          Email_LogIn.value = "";      
        
          window.location.replace("../Course/index.html")
        }else if(data.status == 400) {
          Pass_LogIn_p.innerHTML = "your password dosen't exists";
          Pass_LogIn.style.borderBottomColor = 'red';
          Pass_LogIn.value = "";
        }else if(data.status == 404){
          Email_LogIn_p.innerHTML = "your email wrong or dosen't exists";
          Email_LogIn.style.borderBottomColor = 'red';
        }


    })
 
}

  function showName() {
    let x = document.getElementById("msg");
    x.className = "show";
    setTimeout(function(){ x.className =
        x.className.replace("show","");} , 3000);  
      
}

function ShowPasswordSignUp() {
ShowPassword_SignUp.style.display = 'none';
HidePassword_SignUp.style.display = 'block';
Pass_SignUp.setAttribute('type' , 'text');
}
function HidePasswordSignUp() {
  ShowPassword_SignUp.style.display = 'block';
  HidePassword_SignUp.style.display = 'none';
  Pass_SignUp.setAttribute('type' , 'password');
  }
function ShowPasswordLogIn() {
    ShowPassword_LogIn.style.display = 'none';
    HidePassword_LogIn.style.display = 'block';
    Pass_LogIn.setAttribute('type' , 'text');
    }
function HidePasswordLogIn() {
      ShowPassword_LogIn.style.display = 'block';
      HidePassword_LogIn.style.display = 'none';
      Pass_LogIn.setAttribute('type' , 'password');
      }
