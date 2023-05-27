let screenText = "zzz ...";
const screen = document.querySelector(".screen");

function buttonPressed(e) {
	console.log("moew");
}

function init() {
	const buttons = document.querySelectorAll(".key");
	buttons.forEach((x) => x.addEventListener("click", buttonPressed));
	screen.innerText = screenText;
}

init();
