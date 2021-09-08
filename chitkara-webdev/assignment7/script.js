const form=document.querySelector('form');
const datadiv=document.getElementById('fetcheddata');
console.log(datadiv);
console.log(form);
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function makediv(data)
{
    // console.log(data.main.temp);
    const name=document.createElement('h1');
    const weather=document.createElement('h1');
    const weather1=document.createElement('h1');
    const temp=document.createElement('h1');
    const tempminmax=document.createElement('h1');
    const day=document.createElement('h2');
    temp.innerHTML=data.main.temp+' &#x2103';
    name.innerHTML=data.name;
    tempminmax.innerHTML=data.main.temp_min+' &#x2103'+' (min)';
    tempminmax.innerHTML+=' / ';
    tempminmax.innerHTML+=data.main.temp_max+' &#x2103'+' (max)';
    const date=Date().split(' ');
    const d=new Date();
    for(let i=1;i<4;i++)
    {
        //console.log(date[i]);
        day.innerHTML+=date[i]+' ';
        if(i==1)
        {
            day.innerHTML+='('+days[d.getDay()]+')';
        }
        if(i!=3 && i!=1)
        {
            day.innerHTML+=' / ';  
        }
    }
    weather.innerHTML=data.weather[0].description;
    weather1.innerHTML=data.weather[0].main;
    datadiv.append(name);
    datadiv.append(day);
    datadiv.append(temp);
    datadiv.append(tempminmax);
    datadiv.append(weather);
    console.log(data.weather[0].icon);
    console.log(weather.innerText);
   
    const imglink=`images/${weather1.innerText}.jpg`;
    
    console.log(imglink);
    document.body.style.backgroundImage = `url(${imglink})`;
    // document.body.style.backgroundImage = `url(images/thunderstorm.jpg)`;
    name.classList.add("mystyle","al");
    temp.classList.add("t");
    day.classList.add("mystyle","al");
    temp.classList.add("mystyle");
    tempminmax.classList.add("mystyle","al");
    weather.classList.add("mystyle","al");
}
function findcity(searchtext)
{
    while (datadiv.firstChild) {
        datadiv.removeChild(datadiv.firstChild);
    }
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${searchtext}&units=metric&appid=effde06618baecba4693c8a3b909b345`;
    console.log(url);
    fetch(url)
     .then((res)=>{
         return res.json();
     })
     .then((data)=>{
         console.log(data);
         makediv(data);
     })
     .catch((err)=>{
         console.log(err.message);
     })
}
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const searchtext=e.target[0].value;
    console.log(searchtext);
   
    findcity(searchtext);

    e.target[0].value="";
});

function showTime(){
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var s = date.getSeconds(); // 0 - 59
    var session = "AM";
    
    if(h == 0){
        h = 12;
    }
    
    if(h > 12){
        h = h - 12;
        session = "PM";
    }
    
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;
    
    var time = h + ":" + m + ":" + s + " " + session;
    document.getElementById("MyClockDisplay").innerText = time;
    document.getElementById("MyClockDisplay").textContent = time;
    
    setTimeout(showTime, 1000);
    
}

showTime();