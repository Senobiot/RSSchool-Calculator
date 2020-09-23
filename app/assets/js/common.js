let numBtn = document.querySelectorAll(".num"),
	operationBtn = document.querySelectorAll(".operation"),
	decimalBtn = document.querySelector(".decimal"),
	resultBtn = document.querySelector(".result"),
	c = document.querySelector(".clear"),
	ac = document.querySelector(".all_clear"),
	negativeBtn = document.querySelector(".negative"),
	memoryCurrent = "0",
	memoryNewNumber = false,
	memoryPendingOperation = "";
//console.log()

for (let i = 0; i < numBtn.length; i++) {
	let number = numBtn[i];
	number.addEventListener('click', function(e){
		numberPress(e.target.textContent)
	})
};
for (let i = 0; i < operationBtn.length; i++) {
	let operation = operationBtn[i];
	operation.addEventListener('click', function (e){
		operationPress(e.target.textContent)
	})
};

decimalBtn.addEventListener('click', decimal);

resultBtn.addEventListener('click', result);

c.addEventListener('click', function(e){
		clear(e.srcElement.classList[1])
	});

ac.addEventListener('click', function(e){
		clear(e.srcElement.classList[1])
	});

negativeBtn.addEventListener('click', negative);



function numberPress (symbol) {
	console.log(`click ${symbol}`)
}
function operationPress(symbol) {
	console.log(`click ${symbol}`)
}
function decimal(argument) {
	console.log('click decimal button')
}
function clear(classList) {
	console.log(`click ${classList}`);
}
function result(argument) {
	console.log('click result button');
}
function negative(argument) {
	console.log('click negative button');
}