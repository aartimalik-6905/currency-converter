const BASE_URL="https://api.frankfurter.dev/v1/latest?";

const dropdownselect = document.querySelectorAll(".dropdown select");
const btn=document.querySelector("button");
const fromcode=document.querySelector(".from select");
const tocode=document.querySelector(".to select");
const ExchangedAmount=document.querySelector(".exchanged-amount");


for (let select of dropdownselect) {
  for (let code in countryList) {
    let newoption = document.createElement("option");
    newoption.innerText = code;
    newoption.value = code;
    if(select.name==="from" && code==="USD"){
        newoption.selected="selected";
    }else if(select.name==="to" && code==="INR"){
        newoption.selected="selected";
    }
    select.append(newoption);
  }
  select.addEventListener("change",(evt)=>{
    updateFlag(evt.target);
  });
}
const updateFlag=(element)=>{
    let code=element.value;
    let countrycode=countryList[code];
    let newSrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;

}
btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();
    let amount=document.querySelector("form input");
    let amt=parseFloat(amount.value);
    if(isNaN(amt) || amt<1){
        amt=1;
        amount.value = 1;
    }
    const URL = `${BASE_URL}base=${fromcode.value}&symbols=${tocode.value}`;

    let response=await fetch(URL);
    let data=await response.json();
    let rate = data.rates[tocode.value];
    let finalAmount=rate*amt;
    ExchangedAmount.querySelector("input").value=finalAmount.toFixed(2);


});
