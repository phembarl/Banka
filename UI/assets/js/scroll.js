var navbar = document.querySelector("nav");
var brand = document.querySelector(".brand");
var links = document.querySelectorAll(".user");
var tog = document.querySelectorAll(".tog");

	window.addEventListener("scroll", function(){
		if(this.scrollY <= 10){
			navbar.style.background = "";
            brand.style.color = "#00ffff";

            for(var i = 0; i < links.length; i++){
                links[i].style.color = "#fff";
            }
            
            for(var i = 0; i < tog.length; i++){
                tog[i].style.background = "#fff";
            }
		}
		else{
			navbar.style.background = "#f2f2f2";
            brand.style.color = "#000";
            
            for(var i = 0; i < links.length; i++){
                links[i].style.color = "#000";
            }
            
            for(var i = 0; i < tog.length; i++){
                tog[i].style.background = "#000";
            }
		}
	});