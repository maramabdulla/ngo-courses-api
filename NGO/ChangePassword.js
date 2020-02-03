let cancle_btn=document.getElementById('cancle');
let save_btn=document.getElementById('save');
save_btn.addEventListener('click',goBack);
cancle_btn.addEventListener('click',goBack);
 function goBack() {
    let OldPassword=document.getElementById('OldPassword').value;
    let NewPassword=document.getElementById('NewPassword').value;
    let header=new Headers()
    header.append("authorization","Bearer:"+localStorage.getItem("token"))
    header.append("content-type" , "application/json")
    fetch("http://localhost:3000/ngo/password",{
      method:"PUT",
      headers:header,
      body:JSON.stringify({new_password:NewPassword,old_password:OldPassword})
    }).then(res=>res.json()).then(data=>{
      console.log(data)
    })
// window.location = "ProfileNGO.html"; 
}