let numBtn = document.querySelectorAll(".num"),
	operationBtn = document.querySelectorAll(".operation"),
	decimalBtn = document.querySelector(".decimal"),
	resultBtn = document.querySelector(".result"),
	c = document.querySelector(".clear"),
	ac = document.querySelector(".all_clear"),
	negativeBtn = document.querySelector(".negative"),
	display = document.querySelector(".calculator_screen"),
	memoryCurrent = 0,
	oper = "",
	// memoryNewNumber = false,
	memoryPendingOperation = "";

for (let i = 0; i < numBtn.length; i++) {
	let number = numBtn[i];
	number.addEventListener('click', numberPress)
};

for (let i = 0; i < operationBtn.length; i++) {
	let operation = operationBtn[i];
	operation.addEventListener('click', operationPress)
};


function numberPress() {
	console.log(this.attr);
	if (+display.innerHTML === 0) {
		display.innerHTML = this.innerHTML
	} else {
		if (!memoryPendingOperation) {
			display.innerHTML += this.innerHTML;
		} else {
			memoryCurrent = display.innerHTML;
			oper = memoryPendingOperation;
			memoryPendingOperation = 0;
			display.innerHTML = this.innerHTML;
		}
	}
}

function operationPress() {
	memoryPendingOperation = this.innerHTML;
	if (oper === "+") {
		display.innerHTML = +display.innerHTML + +memoryCurrent;
		oper = "";
	} else if (oper === "*") {
		display.innerHTML = +display.innerHTML*(+memoryCurrent);
		oper = "";
	} else if (oper === "/") {
		display.innerHTML = +memoryCurrent / +display.innerHTML ;
		oper = "";
	} else if (oper === "-") {
		display.innerHTML = +memoryCurrent - +display.innerHTML ;
		oper = "";
	} else {

	}
}

decimalBtn.addEventListener('click', decimal);

c.addEventListener('click', function(e){
		clear(e.srcElement.classList[1])
	});

ac.addEventListener('click', function(e){
		clear(e.srcElement.classList[1])
	});

negativeBtn.addEventListener('click', function(){
	display.innerHTML = - display.innerHTML
});




function decimal(argument) {
	console.log('click decimal button')
}
function clear(classList) {
	display.innerHTML = 0;
	memoryCurrent = 0;
}
