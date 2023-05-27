let screenText = "";
let calcOn = false;
const onText = "Let's Meow!";
const offText = "zzz ...";
const treatKeyOffText = "Give Treat";
const treatKeyOnText = "Give Catnip";
const screen = document.querySelector(".screen");
const treatKey = document.querySelector("#treat");

function buttonPressed(e) {
	if (e.target.id !== "") doFunctionKey(e.target.id);
	else doKeyPressed(e.target);
	screen.innerText = screenText;
}

function doFunctionKey(key) {
	switch (key) {
		case "treat":
			turnOnOff();
			break;
		default:
			break;
	}
}

function turnOnOff() {
	if (!calcOn) {
		calcOn = true;
		screenText = onText;
		treatKey.innerText = treatKeyOnText;
	} else {
		calcOn = false;
		screenText = offText;
		treatKey.innerText = treatKeyOffText;
	}
}

function doKeyPressed(e) {
	if (!calcOn) return;

	const action = e.target.innerText;
	console.log(action);
	// switch (action) {
	//     case
	// }
}

function init() {
	const buttons = document.querySelectorAll(".key");
	buttons.forEach((x) => x.addEventListener("click", buttonPressed));
	treatKey.innerText = treatKeyOffText;
	screenText = offText;
	screen.innerText = screenText;
}

init();
