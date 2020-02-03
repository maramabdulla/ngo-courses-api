
const contentNameCourse=document.getElementById('contentNameCourse');
const date_begin=document.getElementById('date_begin');
const date_end=document.getElementById('date_end');
const locations=document.getElementById('location');
const range_weight=document.getElementById('range_weight');
const desc=document.getElementById('desc');
 const trinername =document.getElementById('trinername');
function GettrainerName(){
    fetch('http://localhost:3000/trainer', {
        method: 'GET',
      })
        .then(Response =>
          Response.json())
        .then(data => {
          console.log(data);
            const htmlArray = data.map(trainer => '<select class="input" ><option  value="'+ trainer.name +'">Volvo</option> </select>');
    
            document.getElementById("option_of_trainer").innerHTML += htmlArray.join('');
        });
    }


document.getElementById("save").addEventListener("click" , addCoures);
function addCoures() {
    const setOfNumder = /[0-9]/;
    const checkName = /^[a-z]|[0-9]/i;
    const dateformat = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
    if(checkName.test(contentNameCourse) == true && dateformat.test(dateBegin) == true  && dateformat.test(dateEnd) == true && setOfNumder.test(range_weight) == true ){

        let header=new Headers();
header.append("content-type", "application/json");
fetch ('http://localhost:3000/courses',{
method: 'POST',
headers:header,
body:JSON.stringify({
    title:contentNameCourse.value,
   location:locations.value,
    desctiption:desc.value,
    date_begin:date_begin.value,
    date_end:date_end.value,
    number_of_seats:range_weight.value
})
    }   
    ).then(res=>{
        res.jSON()
    })
    .then(data=>{
        console.log(data);
        
    });}
    else{
        console.log('error');
    }
}
    // trinername:trinername.value