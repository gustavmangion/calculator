let screenText = "";
let calcOn = false;
const onText = "Let's Meow!";
const offText = "zzz ...";
const treatKeyOffText = "Give Treat";
const treatKeyOnText = "Give Catnip";
const buttons = document.querySelectorAll(".key");
const screen = document.querySelector(".screen");
const treatKey = document.querySelector("#treat");
const operators = ["*", "-", "/", "+"];

function buttonPressed(e) {
	if (e.target.id !== "") doFunctionKey(e.target.id);
	else doKeyPressed(e.target.innerText);
	screen.innerText = screenText;
}

function doFunctionKey(key) {
	switch (key) {
		case "treat":
			turnOnOff();
			break;
		case "clear":
			screenText = onText;
			break;
		case "bspace":
			backspace();
			break;
		case "equals":
			calculate();
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

function doKeyPressed(action) {
	if (screenText === onText) screenText = "";

	if (operators.includes(action) && operators.includes(screenText.slice(-1)))
		screenText = screenText.slice(0, -1);

	screenText += action;
}

function backspace() {
	if (screenText != onText && screenText.length > 0)
		screenText = screenText.slice(0, -1);
}

function calculate() {
	let toCalc = [];
	const textSplit = screenText.split("");
	if (operators.includes(textSplit[textSplit.length - 1]))
		textSplit.pop(textSplit.length - 1);
	toCalc.push(textSplit[0]);
	for (let i = 1; i < textSplit.length; i++) {
		if (operators.includes(textSplit[i])) toCalc.push(textSplit[i]);
		else if (operators.includes(toCalc[toCalc.length - 1]))
			toCalc.push(textSplit[i]);
		else {
			toCalc[toCalc.length - 1] = toCalc[toCalc.length - 1] + textSplit[i];
		}
	}
	console.log(toCalc);
}

function init() {
	buttons.forEach((x) => x.addEventListener("click", buttonPressed));
	treatKey.innerText = treatKeyOffText;
	screenText = offText;
	screen.innerText = screenText;
	calcOffGreyKeys();
}

init();
