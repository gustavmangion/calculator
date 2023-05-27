let screenText = "zzz ...";
const screen = document.querySelector(".screen");

function buttonPressed(e) {
	console.log(e);
	if (e.id !== "") doFunctionKey(e.target.id);
	else doKeyPressed(e.target);
	screen.innerText = screenText;
}

function doFunctionKey(key) {
	console.log(key);
}

function getKeyType(key) {
	console.log(key.id);
}

function doKeyPressed(e) {
	const action = e.target.innerText;
	console.log(action);
	// switch (action) {
	//     case
	// }
}

function init() {
	const buttons = document.querySelectorAll(".key");
	buttons.forEach((x) => x.addEventListener("click", buttonPressed));
	screen.innerText = screenText;
}

init();
