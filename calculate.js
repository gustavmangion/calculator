let screenText = "";
let calcOn = false;
const onText = "Let's Meow!";
const offText = "zzz ...";
const petMeText = "Pet me!";
const treatKeyOffText = "Give Treat";
const treatKeyOnText = "Give Catnip";
const buttons = document.querySelectorAll(".key");
const screen = document.querySelector(".screen");
const treatKey = document.querySelector("#treat");
const equalKey = document.querySelector("#equals");
const operators = ["*", "-", "/", "+"];
let operationsCount = 0;
let petCount = 0;

function buttonPressed(e) {
	if (operationsCount >= 3) activatePetting();
	else if (e.target.id !== "") doFunctionKey(e.target.id);
	else doKeyPressed(e.target.innerText);
	screen.innerText = screenText;
}

function activatePetting() {
	screenText = petMeText;
	equalKey.addEventListener("mouseenter", catPet);
}

function catPet(e) {
	++petCount;
	if (petCount > 10) {
		operationsCount = 0;
		screenText = onText;
		equalKey.removeEventListener("mouseenter", catPet);
		screen.innerText = screenText;
	}
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

	let result = doCalculate(toCalc, "*");
	result = doCalculate(result, "/");
	result = doCalculate(result, "+");
	result = doCalculate(result, "-");

	screenText = result[0];
	++operationsCount;
}

function doCalculate(instructions, action) {
	const index = instructions.indexOf(action);
	if (index === -1) return instructions;

	let calcResult = 0;
	switch (action) {
		case "*":
			calcResult =
				parseFloat(instructions[index - 1]) *
				parseFloat(instructions[index + 1]);
			break;
		case "/":
			calcResult =
				parseFloat(instructions[index - 1]) /
				parseFloat(instructions[index + 1]);
			break;
		case "+":
			calcResult =
				parseFloat(instructions[index - 1]) +
				parseFloat(instructions[index + 1]);
			break;
		case "-":
			calcResult =
				parseFloat(instructions[index - 1]) -
				parseFloat(instructions[index + 1]);
			break;
	}
	let newInstructions = [];

	if (index > 1)
		newInstructions = newInstructions.concat(instructions.slice(0, index - 1));

	newInstructions.push(calcResult);

	if (index + 2 < instructions.length)
		newInstructions = newInstructions.concat(instructions.slice(index + 2));

	return doCalculate(newInstructions, action);
}

function init() {
	buttons.forEach((x) => x.addEventListener("click", buttonPressed));
	treatKey.innerText = treatKeyOffText;
	screenText = offText;
	screen.innerText = screenText;
	// calcOffGreyKeys();
}

init();
