let nav = document.querySelector("nav");
let scrollBtn = document.querySelector(".scroll-button a");
console.log(scrollBtn);
let val;
window.onscroll = function() {
  if(document.documentElement.scrollTop > 20){
    nav.classList.add("sticky");
    scrollBtn.style.display = "block";
  }else{
    nav.classList.remove("sticky");
    scrollBtn.style.display = "none";
  }

}


window.addEventListener("scroll",function(){
  var header = document.querySelector("header");
  header.classList.toggle('sticky', window.scrollY > 0 )
});

var menu = document.querySelector('.menu');
var menuBtn = document.querySelector('.menu-btn');
var closeBtn = document.querySelector('.close-btn');
menuBtn.addEventListener("click",() =>{
  menu.classList.add('active');
});

closeBtn.addEventListener("click",() =>{
  menu.classList.remove('active');
});


