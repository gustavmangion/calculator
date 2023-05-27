let screenText = "";
let calcOn = false;
const onText = "Let's Meow!";
const offText = "zzz ...";
const treatKeyOffText = "Give Treat";
const treatKeyOnText = "Give Catnip";
const buttons = document.querySelectorAll(".key");
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
		calcOnGreyKeys();
	} else {
		calcOn = false;
		screenText = offText;
		treatKey.innerText = treatKeyOffText;
		calcOffGreyKeys();
	}
}

function calcOffGreyKeys() {
	buttons.forEach((x) => x.id !== "treat" && x.classList.add("key-off"));
}

function calcOnGreyKeys() {
	buttons.forEach((x) => x.classList.remove("key-off"));
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
	buttons.forEach((x) => x.addEventListener("click", buttonPressed));
	treatKey.innerText = treatKeyOffText;
	screenText = offText;
	screen.innerText = screenText;
	calcOffGreyKeys();
}

init();
