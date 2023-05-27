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
const catMeow = new Audio("assets/sounds/meow.mp3");
const catPurr = new Audio("assets/sounds/purr.mp3");
const allowedKeys = [
	"1",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
	"0",
	"-",
	"+",
	"*",
	"/",
	"=",
	".",
	"Backspace",
	"Enter",
	"c",
	"t",
	"p",
];
let operationsCount = 0;
let petCount = 0;
let decimalSinceLastOperand = false;

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
	catPurr.play();
	if (petCount > 10) {
		operationsCount = 0;
		screenText = onText;
		equalKey.removeEventListener("mouseenter", catPet);
		screen.innerText = screenText;
	}
}

function doFunctionKey(key) {
	if (key === "treat") {
		turnOnOff();
		return;
	}
	if (!calcOn) return;
	switch (key) {
		case "clear":
			screenText = onText;
			decimalSinceLastOperand = false;
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
	// catMeow.play();
}

function calcOffGreyKeys() {
	buttons.forEach((x) => x.id !== "treat" && x.classList.add("key-off"));
}

function calcOnGreyKeys() {
	buttons.forEach((x) => x.classList.remove("key-off"));
}

function doKeyPressed(action) {
	if (!calcOn) return;
	if (screenText === onText) screenText = "";

	if (operators.includes(action)) {
		if (screenText === "") return;
		if (operators.includes(screenText.slice(-1))) {
			screenText = screenText.slice(0, -1);
		} else if (screenText.slice(-1) === ".") {
			screenText = screenText + "0";
		}
		decimalSinceLastOperand = false;
	} else if (action === ".") {
		if (decimalSinceLastOperand) return;
		decimalSinceLastOperand = true;
	}

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
	if (toCalc.length < 3) return;
	let result = doCalculate(toCalc, "*");
	result = doCalculate(result, "/");

	if (result === 0) {
		screenText = "Hiss at divide by 0";
		return;
	} else {
		result = doCalculate(result, "+");
		result = doCalculate(result, "-");
	}
	screenText = (+parseFloat(result[0]).toFixed(5)).toString();
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
			if (instructions[index + 1] === "0") {
				return 0;
			} else {
				calcResult =
					parseFloat(instructions[index - 1]) /
					parseFloat(instructions[index + 1]);
			}
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

function keyPressed(e) {
	if (allowedKeys.includes(e.key)) {
		switch (e.key) {
			case "=":
				doFunctionKey("equals");
				break;
			case "Backspace":
				doFunctionKey("bspace");
				break;
			case "Enter":
				doFunctionKey("equals");
				break;
			case "c":
				doFunctionKey("clear");
				break;
			case "t":
				doFunctionKey("treat");
				break;
			case "p":
				catPet();
				break;
			default:
				doKeyPressed(e.key);
		}
	}

	screen.innerText = screenText;
}

function init() {
	buttons.forEach((x) => x.addEventListener("click", buttonPressed));
	document.addEventListener("keydown", keyPressed);
	treatKey.innerText = treatKeyOffText;
	screenText = offText;
	screen.innerText = screenText;
	// calcOffGreyKeys();
}

init();
