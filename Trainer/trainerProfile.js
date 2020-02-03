url = window.location.href;
console.log( getParameterByName("id", url));
if(localStorage.getItem("token")==undefined){
  window.location="../Login/Login.html"

}
 function LogOut() {
  localStorage.removeItem('token');
  window.location = "../Login/LogIn.html"
}

function getParameterByName(name, url) {
    
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function renderTrainees(data) {
  const htmlArray = data.map(
    trainer => {
      const photoUrl = trainer.picture === ''
        ? '/imeges/trainers/user_icon.jpg'
        : trainer.picture;

      return ' <div class="profile"  ><div class="profileImg"><label><img src="http://localhost:3000'+photoUrl+'" alt="" id="preview" ><input type="file" id="filetag" style="visibility: hidden;"></label></div><div  class="infoProfile" id="infoProfile" ><input class="input" type="text" value="'+ trainer.name+'" id="name"><br><br><input class="input" type="email" id="email" value="'+ trainer.email +'"><p></p><input class="input" type="tel" id="phone" value="'+ trainer.mobile + '"><br><br><input class="input" type="text"id="address" value="'+ trainer.address +'"></div></div><div class="Bio"><h2>'+ trainer.name+'<img id="EditId" class="EditIcon" src="img/iconfinder_edit.png" onclick="change_value()" ></h2><h3>Bio: </h3><textarea style="border-style: none;" id="BioId" class="input" class="BioId" style="height: 300px;">'+ trainer.short_bio + '</textarea><div class="btn"><button type="submit" id="save"  onclick="edit()"  class="savebtn" >save</button><button type="submit" id="cancle" class="Canclebtn" onclick="cancle()" >Cancle</button></div>';
    }
  );

  document.getElementById("container").innerHTML += htmlArray.join('');
  let save_btn=document.getElementById('save');
  save_btn.addEventListener("click",save);
    save_btn.style.display="none";
    let cancle_btn=document.getElementById('cancle');
    cancle_btn.style.display="none";
    let inputs=document.getElementsByClassName("input");
    for(let i=0;i<inputs.length;i++){
      inputs[i].setAttribute("readonly","");
      inputs[i].style.backgroundColor="transparent";
      };
      document.getElementById("EditId").addEventListener("click",change_value);
}

show();
let b64 = "";


    function show(){
      let id =  getParameterByName("id", url);
      fetch('http://localhost:3000/trainer/'+id, {
             method: 'GET',
         })
         .then(response => response.json())
         .then(data => {
            renderTrainees(data);
          });
    
     }
      
    function change_value(){
      let save_btn=document.getElementById('save');
      save_btn.style.display="block";

      let cancle_btn=document.getElementById('cancle');
      cancle_btn.style.display="block";
      let inputs=document.getElementsByClassName("input");

      for(let i=0;i<inputs.length;i++){
          inputs[i].removeAttribute("readonly");
          inputs[i].style.backgroundColor="white";
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
}

input   = document.getElementById("filetag");
// let b64 = "";

input.onchange = function () {

  var file = input.files[0],

    img = new FileReader();


  img.onloadend = function () {
    b64 = img.result.replace(/^data:.+;base64,/, '');
    

  };  

  img.readAsDataURL(file);
};


    };
    function save(){
      let inputs=document.getElementsByClassName("input");
       for(let i=0;i<inputs.length;i++){
      inputs[i].setAttribute("readonly","");
      inputs[i].style.backgroundColor="transparent";
      }
      let save_btn=document.getElementById('save');
      save_btn.style.display="none";
      let cancle_btn=document.getElementById('cancle');
      cancle_btn.style.display="none";
    }
    function cancle(){
        let inputs=document.getElementsByClassName("input");
        let save_btn=document.getElementById('save');
        let cancle_btn=document.getElementById('cancle');


    for(let i=0;i<inputs.length;i++){
      inputs[i].setAttribute("readonly","");
      inputs[i].style.backgroundColor="transparent";
      };

      save_btn.style.display="none";
      cancle_btn.style.display="none";
    }
    
 
    function edit(){
      name    = document.getElementById("name").value;
      email   = document.getElementById("email").value;
      num     = document.getElementById("phone").value;
      address = document.getElementById("address").value;
      // photo   = document.getElementById("filetag").value
      bio     = document.getElementById("BioId").value;
      console.log(num)
      let Id =  getParameterByName("id", url);

      console.log(Id);
      
      if (name === "" ){
        alert("add some information")
      }else{
      
          const myheader = new Headers();
      
          myheader.append('Content-Type', 'application/json');
          const body = {
            name : name,
            email : email,
            num : num ,
            address : address,
            bio : bio
          }

          if (b64 !== '') {
            body.photo = b64;
          }
      
          fetch('http://localhost:3000/trainer/' + Id ,{
              method :'put',
              headers : myheader,
              body : JSON.stringify(body)
      
      })
              .then(response=>response)
              .then((data) => {
              console.log(data);
              })
      
      
      }}