let name = prompt("Adınız nedir?")

let nameInHtml = document.querySelector("#myName")

nameInHtml.innerHTML = ` ${name} `

let days = ['Pazartesi','Salı','Çarşamba','Perşembe','Cuma','Cumartesi','Pazar'];

function showTime() {

    let date = new Date(); 
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();
    let day = days[date.getDay() - 1];

    hh = (hh < 10) ? "0" + hh : hh;
    mm = (mm < 10) ? "0" + mm : mm;
    ss = (ss < 10) ? "0" + ss : ss;
    
    let time = ` ${hh} : ${mm} : ${ss} ${day}`
    
    let timeHtml = document.querySelector("#myClock")
    timeHtml.innerHTML = time
    
    let t = setTimeout(function(){ showTime() }, 1000); 
}
    
showTime();