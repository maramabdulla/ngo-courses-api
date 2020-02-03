

const text=document.getElementById('text');
const contentNameCourse=document.getElementById('contentNameCourse');
const date=document.getElementById('dates');
const locations=document.getElementById('location');
const range_weight=document.getElementById('range_weight');
const desc=document.getElementById('desc');
const trinername =document.getElementById('trinername');
let but = document.getElementById("but");
let header=new Headers();
header.append("content-type", "application/json");



but.addEventListener("click" , addCoures);
function addCoures() {
    fetch ('http://localhost:3000/courses',{
method: 'post',
headers:header,
body:JSON.stringify({
    title:text.value,
    location:locations.value,
    desctiption:desc.value,
    dates:date,
    triner:trinername.value,
    number_of_seats:range_weight.value
})
    }   
    ).then(re=>{
        return re.json()
    }).then(data=>{
        console.log(data);
    })
}