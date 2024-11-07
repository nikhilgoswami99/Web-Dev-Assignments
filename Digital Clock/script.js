
let hours = document.querySelector(".hours");
let mins = document.querySelector(".mins");
let secs = document.querySelector(".secs");
let am_pm = document.querySelector(".am_pm"); 

function updateClock() {
  let h = new Date().getHours();
  let m = new Date().getMinutes();
  let s = new Date().getSeconds();
  am_pm.innerText = "AM";

  if(h > 12)
  {
    h = h - 12;
    am_pm.innerText = "PM" 
  }

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  hours.innerText = h;
  mins.innerText = m;
  secs.innerText = s;
}
setInterval(() => {
  updateClock();
}, 1000);
