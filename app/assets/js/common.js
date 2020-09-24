let numBtn = document.querySelectorAll(".num"),
	operationBtn = document.querySelectorAll(".operation"),
	decimalBtn = document.querySelector(".decimal"),
	resultBtn = document.querySelector(".result"),
	sqrtBtn = document.querySelector(".sqrt"),
	c = document.querySelector(".clear"),
	ac = document.querySelector(".all_clear"),
	on = document.querySelector(".on")
	negativeBtn = document.querySelector(".negative"),
	percentBtn = document.querySelector(".percent"),
	redoBtn = document.querySelector(".redo"),
	memCalc = 0,
	memPlusBtn = document.querySelector(".m_plus"),
	memMinusBtn = document.querySelector(".m_minus"),
	memReadBtn = document.querySelector(".mr"),
	memClearBtn = document.querySelector(".mc"),
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

c.addEventListener('click', function(){
	display.innerHTML = memoryCurrent = memoryPendingOperation = oper = 0;
	display.classList.remove("error");
	});

ac.addEventListener('click', function(){
	display.innerHTML = memoryCurrent = memoryPendingOperation = oper = memCalc = 0;
	display.classList.remove("memory");
	display.classList.remove("error");
	});

negativeBtn.addEventListener('click', function(){
	display.innerHTML = - display.innerHTML
});

sqrtBtn.addEventListener('click', function(){
	let sqrt = Math.sqrt(display.innerHTML);
	console.log(sqrt)
	if (sqrt >= 0) {
		display.innerHTML = Math.sqrt(display.innerHTML);
	} else {
		display.classList.add("error");
		display.innerHTML = 0;
	}
	
});

memPlusBtn.addEventListener('click', function(){
	memCalc += +display.innerHTML;
	display.classList.add("memory");
	memoryPendingOperation = "m";


});

memMinusBtn.addEventListener('click', function(){
	memCalc += +-display.innerHTML;
	display.classList.add("memory");
	memoryPendingOperation = "m";
});

memReadBtn.addEventListener('click', function(){
	display.innerHTML = memCalc;
});

memClearBtn.addEventListener('click', function(){
	display.classList.remove("memory");
	memCalc = 0;
});

on.addEventListener('click', function(){
	display.style.opacity = "1";
	display.innerHTML = "0"
});

redoBtn.addEventListener('click', function(){
	if (display.innerHTML.length >1) {
		display.innerHTML = display.innerHTML.slice(0,-1)
	}	else (display.innerHTML = 0)
	
});

percentBtn.addEventListener('click', function(){
	if (oper === "*") {
	display.innerHTML = memoryCurrent*display.innerHTML/100;
	} else if (oper === "+") {
		display.innerHTML = +memoryCurrent + memoryCurrent*display.innerHTML/100;
	} else if (oper === "-") {
		display.innerHTML = +memoryCurrent - memoryCurrent*display.innerHTML/100;
	} 
});




function decimal(argument) {
	console.log('click decimal button')
}
function clear(classList) {

}
