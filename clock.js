const clockContainer = document.getElementById("clock");
const clockTitle = clockContainer.querySelector("h2");

function getTime(){
  const date = new Date();
  const month = date.getMonth();
  const day = date.getDay();
  const hour = date.getHours();
  const minute = date.getMinutes();
  clockTitle.innerText = `${month}월 ${day}일\t${hour <10 ? `0${hour}` : `${hour}`} : ${minute< 10 ? `0${minute}` : `${minute}`}`;
}

function init(){
  getTime();
  setInterval(getTime, 1000);
}

init();