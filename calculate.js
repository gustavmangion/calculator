function buttonPressed(e) {
	console.log("moew");
}

const buttons = document.querySelectorAll(".key");
buttons.forEach((x) => x.addEventListener("click", buttonPressed));
