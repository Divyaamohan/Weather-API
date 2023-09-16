const weather_url="https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&exclude={part}&appid={API key}";
const geo_url="http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}";
const Apikey='446156e9fd39b6b0d9e83d8a431f47bb';
const Apikey2='66a9a5bab696331f963edd33598b7645';
const form=document.querySelector(".form");
const input=document.querySelector(".form-input");
const result=document.querySelector(".result");

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const value=input.value;
    if(!value){
        result.innerHTML='<div class="error">Please enter valid search Term';
        return;
        }
        fetchdata(value);
});

const fetchdata =async(searchvalue)=>{
    result.innerHTML='<div class="loading">Loading</div>';
    const url=geo_url
    .replace("{city name},{state code},{country code}", searchvalue)
    .replace('{limit}',5)
    .replace("{API key}", Apikey);
    try{
        const response =await fetch(`${url}`);
        const data =await response.json();
        const lat=data[0].lat;
        const lon=data[0].lon;
        fetchpage(lat,lon);
    }
    catch(error){
      result.iinerHTML='<div class="error">Wgfh</div>';
    }
};

const fetchpage=async(lat,lon)=>{
    const url2=weather_url
        .replace("{lat}", lat)
        .replace('{lon}',lon)
        .replace('{part}','current')
        .replace("{API key}", Apikey2);
        const response2 =await fetch(`${url2}`);
        const data2 =await response2.json();
        const {temp,temp_max,temp_min}=data2.list[0].main
        const{name,country}=data2.city
    result.innerHTML='<div class="result">City Name:'+name+ '<br> Country:'+country+'<br>Temperature:'+Math.floor(temp-273.15)+'<br>High:'+Math.round(temp_max-273.15)+'<br>Low:'+Math.round(temp_min-273.15)+'</div>';

}
