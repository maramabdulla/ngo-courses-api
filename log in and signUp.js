// for text onder the input Signup
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

let input = document.getElementsByTagName("input");
// for name rouls
let nn = /^[a-z]|[0-9]/i;
function naz() {
  if (Name_SignUp.value == "") {
    Name_SignUp_P.innerHTML = "the Name is empty";
    Name_SignUp.style.borderBottomColor = "red";
  }
  else if (nn.test(Name_SignUp.value) == false) {
    Name_SignUp_P.innerHTML = "enter your name right way";
    Name_SignUp.style.borderBottomColor = "red";
  }
  else {
    Name_SignUp.style.borderBottomColor = "green";
    Name_SignUp_P.innerHTML = "";
  }
}

// for email rouls
let ee = /[a-z0-9_\.\-]+@+[a-z_\.\-]+\.+[a-z]/i;
function ema() {
  if (Email_SignUp.value == "") {
    Email_SignUp_P.innerHTML = "the Email is empty";
    Email_SignUp.style.borderBottomColor = "red";
  }
  else if (ee.test(Email_SignUp.value) == false) {
    Email_SignUp_P.innerHTML = "the email is worng";
    Email_SignUp.style.borderBottomColor = "red";
  } else {
    Email_SignUp.style.borderBottomColor = "green";
    Email_SignUp_P.innerHTML = "";
  }
}

// for password rouls
let pp = /[a-z]+|[0-9]+|\!+|\@+|\#+|\$+|\%+|\&/i;
function pas() {
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
  } else if (pp.test(Pass_SignUp.value) === false) {
    Pass_SignUp_P.innerHTML = "the passowrd is worng";
    Pass_SignUp.style.borderBottomColor = "red";
  } else if (Pass_SignUp.value.length <= 10) {
    Pass_SignUp_P.innerHTML = "";
    Pass_SignUp.style.borderBottomColor = "green";
   
  }
}
// for Sign Up and create a new account 
function checkAndReges() {
  if(Pass_SignUp.value.length >= 8 && ee.test(Email_SignUp.value) == true && nn.test(Name_SignUp.value) == true) {
    naz();
    ema();
    pas();
    checkName();
    checkEmail();
    checkPass();
    postInfo();
  }else if(Pass_SignUp.value.length < 8 &&
     ee.test(Email_SignUp.value) == false
   && nn.test(Name_SignUp.value) == false){
    Name_SignUp_P.innerHTML = "the Name is empty";
    Name_SignUp.style.borderBottomColor = "red";
    Email_SignUp_P.innerHTML = "the Email is empty";
    Email_SignUp.style.borderBottomColor = "red";
    Pass_SignUp_P.innerHTML = "the passowrd is empty";
    Pass_SignUp.style.borderBottomColor = "red";
  }else if(Pass_SignUp.value.length < 8){
    Pass_SignUp_P.innerHTML = "must be more than 8 letters";
    Pass_SignUp.style.borderBottomColor = "red";
  }else if(ee.test(Email_SignUp.value) == false) {
    Email_SignUp_P.innerHTML = "the email is worng";
    Email_SignUp.style.borderBottomColor = "red";
  }else if(nn.test(Name_SignUp.value) == false) {
    Name_SignUp_P.innerHTML = "enter your name right way";
    Name_SignUp.style.borderBottomColor = "red";
  }
 
}

// for fetch and post the information

let hamza = new Headers();
hamza.append('content-type', 'application/json');
function postInfo() {

  fetch('http://localhost:3000/input', {
    method: 'post',
    headers: hamza,
    body: JSON.stringify({
      name: Name_SignUp.value,
      email: Email_SignUp.value,
      password: Pass_SignUp.value
    })
  }).then(re => {
    return re.json()
  }).then(data => {
    console.log(data)
  })

}


function checkName() {
  fetch('http://localhost:3000/name/' + Name_SignUp.value, {
    method: 'get'
  }).then(rre => {
    return rre.json()
  }).then(datar => {

    if(datar.length > 0) {
      Name_SignUp.style.borderBottomColor = 'red';
      Name_SignUp_P.innerHTML = "the Name used";
    }
 

    Name_SignUp.value = "";
  })
}


function checkEmail() {
  fetch('http://localhost:3000/email/' + Email_SignUp.value, {
    method: 'get'
  }).then(rre => {
    return rre.json()
  }).then(datar => {

    if(datar.length > 0) {
      Email_SignUp.style.borderBottomColor = 'red';
      Email_SignUp_P.innerHTML = "the Email used";
    }


    Email_SignUp.value = "";
  })
}


function checkPass() {
  fetch('http://localhost:3000/pass/' + Pass_SignUp.value, {
    method: 'get'
  }).then(rre => {
    return rre.json()
  }).then(datar => {

    if(datar.length > 0) {
      Pass_SignUp.style.borderBottomColor = 'red';
      Pass_SignUp_P.innerHTML = "the Password used";
    }


    Pass_SignUp.value = "";
  })
}
let div = document.getElementById("msg");
function getName() {
  
    fetch('http://localhost:3000/alert/' + Pass_LogIn.value ,{
      method: 'get'
    }).then(rre => {
      return rre.json()
    }).then(datar => {
      let obb = datar;
      for(x in obb) {
        div.innerHTML = `Wellcom : ${obb[x].name}`;
      }
    })
  }



  function showName() {
    let x = document.getElementById("msg");
    x.className = "show";
    setTimeout(function(){ x.className =
        x.className.replace("show","");} , 5000);  
}

function getEmail() {

  fetch('http://localhost:3000/email/' + Email_LogIn.value, {
    method: 'get'
  }).then(re => {
    return re.json()
  }).then(data => {

    if (data.length == 0) {
      Email_LogIn.style.borderBottomColor = 'red';
      Email_LogIn_p.innerHTML = "Your email does not exist";
    } else {
      Email_LogIn.style.borderBottomColor = 'green';
      Email_LogIn_p.innerHTML = "";
    }

  })



}
function getPass() {

  fetch('http://localhost:3000/pass/' + Pass_LogIn.value +"/"+ Email_LogIn.value, {
    method: 'get'
  }).then(rre => {
    return rre.json()
  }).then(datar => {

    if (datar == false) {
      Pass_LogIn.style.borderBottomColor = 'red';
      Pass_LogIn_p.innerHTML = "Your Password wrong or does not exist"
    } else {
      Pass_LogIn.style.borderBottomColor = 'green';
      Pass_LogIn_p.innerHTML = ""
      open("http://www.google.com")
    }
    Pass_LogIn.value = "";
  })
  getName();
  showName();
  Email_LogIn.value = "";
}

// function gett(ry) {
//   app.get('/pass/:pass', (req, res) => {
//       let pass = req.params.pass;
  
//       bcrypt.compare(pass, ry, (err, result) => {
//           console.log(result)
//           if (err) {
//               res.status(404).send("NOT found")
//               return false;
//           } else {
//               getpa = result;
//               res.status(200).send(getpa)
//           }
  
  
//       })
  
//   })
//   }