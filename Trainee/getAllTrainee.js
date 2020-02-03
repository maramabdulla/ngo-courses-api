let div = document.getElementById("div1");
if(localStorage.getItem("token")==undefined){
    window.location="../Login/Login.html"
  
  }
   function LogOut() {
    localStorage.removeItem('token');
    window.location = "../Login/LogIn.html"
  }
  
let page = 1;
op();
window.addEventListener('scroll' , ()=>{
    let hh = document.documentElement.scrollHeight - window.innerHeight;
    let hamza = window.scrollY;
    if(Math.ceil(hamza) === hh) {
        op();
    }
});
function op() {
    fetch('http://localhost:3000/trainee/getTrainee/page/' + page, {
        method: 'GET'
    }).then(re => {
        return re.json();
    }).then(data => {
        console.log(data)
        let trainee = data.result;
        page++
        for (let i = 0; i < 9; i++) {
            div.innerHTML +=   `<div id = ${trainee[i].id} class="list">
    <div id = ${trainee[i].id} class="im">
    </div><div id = ${trainee[i].id} class="im contnt desc">
    <h3 id = ${trainee[i].id} >${trainee[i].name} </h3>
    <p id = ${trainee[i].id} > ${trainee[i].email} </p>
    <p id = ${trainee[i].id} > ${trainee[i].address} </p>
    <p id = ${trainee[i].id} > ${trainee[i].phone} </p>
    </div></div></a></div>`
        }
    });
} 