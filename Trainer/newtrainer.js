//Validate Functions

let Trainer_name_P=document.getElementById("Trainer_name_P");
let name=document.getElementById("name");
let Email_P=document.getElementById("Email_P");
let Email=document.getElementById("email");
let Contact_number_P=document.getElementById("Contact_number_P");
let Contact_number=document.getElementById("num");
let Address=document.getElementById("address");
let Adress_P=document.getElementById("Adress_P");
// let cancle_btn=document.getElementById('cancle');
// let save_btn=document.getElementById('save');
// save_btn.addEventListener('click',goBack);
// cancle_btn.addEventListener('click',goBack);
//  function goBack() {
// window.location = "trainers.html"; //specify the url to redirect
// }
const checkName = /^[a-z]|[0-9]/i;
function checkNameRegExp() {
if (name.value == "") {
    Trainer_name_P.innerHTML = "the Filed is empty";
    name.style.borderBottomColor ="red";
}
else if (checkName.test(name.value) == false) {
    Trainer_name_P.innerHTML="Name is Falied";
    name.style.borderBottomColor="red";
}
else {
    name.style.borderBottomColor="green";
Trainer_name_P.innerHTML="";
}
}

const checkEmail = /[a-z0-9_\.\-]+@+[a-z_\.\-]+\.+[a-z]/i;
function checkEmailRegExp() {
  if (Email.value == "") {
    Email_P.innerHTML = "the Email is empty";
    Email.style.borderBottomColor = "red";
  }
  else if (checkEmail.test(Email.value) == false) {
    Email_P.innerHTML = "the email is worng";
    Email.style.borderBottomColor = "red";
  } else {
    Email.style.borderBottomColor = "green";
    Email_P.innerHTML = "";
  }
}

function ValidateAddress() {
const Location_regex = /^[a-z]|[0-9]/i;
if (Address.value == "") {
    Adress_P.innerHTML = "the Address is empty";
Address.style.borderBottomColor = "red";
}
else if (checkName.test(Address.value) == false) {
    Adress_P.innerHTML="Address is Falied";
Address.style.borderBottomColor="red";
}
else {
Address.style.borderBottomColor="green";
Adress_P.innerHTML="";
}
}
 
function ValidateNumber(){
const Phone_regex = /^\d{10}$/;;
if (Contact_number.value == "" ) {
    Contact_number_P.innerHTML = "the Filed is empty";
    Contact_number.style.borderBottomColor = "red";
}
else if (Phone_regex.test( Contact_number.value)==false) {
    Contact_number_P.innerHTML="Phone Number is falied";
    Contact_number.style.borderBottomColor="red";} 

else {
    Contact_number.style.borderBottomColor="green";
    Contact_number_P.innerHTML="";
} 
} 
//////
var fileTag = document.getElementById("filetag");
preview = document.getElementById("preview"); 
fileTag.addEventListener("change", function() {
 changeImage(this);
});
function changeImage(input) {
 var reader;
 if (input.files && input.files[0]) {
   reader = new FileReader();
   reader.onload = function(e) {
     preview.setAttribute('src', e.target.result);
   }
   reader.readAsDataURL(input.files[0]);
 }}
 document.getElementById('save').addEventListener('click',add);

/////////


input   = document.getElementById("filetag");
let b64 = "";

input.onchange = function () {

  var file = input.files[0],
    img = new FileReader();


  img.onloadend = function () {
    b64 = img.result.replace(/^data:.+;base64,/, '');

    
  };

  img.readAsDataURL(file);
};


/////
function add(){
name    = document.getElementById("name").value;
email   = document.getElementById("email").value;
num     = document.getElementById("num").value;
address = document.getElementById("address").value;
// photo   = document.getElementById("filetag").value
bio     = document.getElementById("bio").value;
console.log(b64)
if (name === "" ){
  alert("add some information")
}else{

    const myheader = new Headers();

    myheader.append('Content-Type', 'application/json');

    fetch('http://localhost:3000/trainer',{
        method :'post',
        headers : myheader,
        body : JSON.stringify({
          name : name,
          email : email,
          num : num ,
          address : address,
          photo : b64,
          bio : bio
        })

})
        .then(response=>response)
        .then((data) => {
        console.log(data);
        })


}}