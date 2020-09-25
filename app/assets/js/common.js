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
	powBtn = document.querySelector(".gt"),
	redoBtn = document.querySelector(".redo"),
	memPlusBtn = document.querySelector(".m_plus"),
	memMinusBtn = document.querySelector(".m_minus"),
	memReadBtn = document.querySelector(".mr"),
	memReadActive = 0;
	memClearBtn = document.querySelector(".mc"),
	memCalc = 0,
	display = document.querySelector(".calculator_screen"),
	memoryCurrent = 0,
	oper = "",
	memoryPendingOperation = "",
	myAudio = new Audio; 
	myAudio.src = "assets/libs/sound_2.mp3",
	allBtns = document.querySelectorAll(".button");
	let doubleClick;
	let doubleClickActive;


for (let i = 0; i < allBtns.length; i++) {
	let number = allBtns[i];
	number.addEventListener('click', function(){
		myAudio.play();
	})
};

for (let i = 0; i < numBtn.length; i++) {
	let number = numBtn[i];
	number.addEventListener('click', numberPress)
};

for (let i = 0; i < operationBtn.length; i++) {
	let operation = operationBtn[i];
	operation.addEventListener('click', operationPress)
};


function numberPress() {
	if (display.innerHTML === "0") {
		display.innerHTML = +this.innerHTML
	} else {
		if (!memoryPendingOperation &&  +display.innerHTML < 10**13) {
			display.innerHTML += this.innerHTML;
		} else if (memoryPendingOperation === "pow") {
			oper = memoryPendingOperation;
			display.innerHTML = this.innerHTML
			memoryPendingOperation = 0;
		} else if (memoryPendingOperation === ".") {
			display.innerHTML += this.innerHTML;
		}
		else if (memoryPendingOperation && +display.innerHTML < 10**13) {
			memoryCurrent = display.innerHTML;
			oper = memoryPendingOperation;
			memoryPendingOperation = 0;
			display.innerHTML = +this.innerHTML;
		}
	}
}
// функция обрезки до 14 разрядов, чтоб не вылазило из табло
function limit() {
	if (+display.innerHTML >= 10**14 ) {
		display.innerHTML = display.innerHTML.slice(0,14);
		display.classList.add("error");
	} else if (Math.abs(display.innerHTML) < 10e-7) {
		display.innerHTML = 0;
	} else if (display.innerHTML.length > 14) {
		display.innerHTML = display.innerHTML.slice(0,14);
		} 
	}

function operationPress() {
	limit();
	if (doubleClickActive) { //тут сброс для дабл клика =
		doubleClickActive = 0;
		oper = "";
	}

	memoryPendingOperation = this.innerHTML;
	if (oper === "+") {
		memReadActive ? display.innerHTML = +memCalc + +memoryCurrent :
		display.innerHTML = +parseFloat(+display.innerHTML + +memoryCurrent).toPrecision(14);
		oper = "";
		limit();	
	} else if (oper === "*") {
		memReadActive ? display.innerHTML = +memCalc*(+memoryCurrent) :
		display.innerHTML = +parseFloat(display.innerHTML*memoryCurrent).toPrecision(14);
		oper = "";
		limit();
	} else if (oper === "/") {
		memReadActive ? display.innerHTML = +memoryCurrent / +memCalc :
		display.innerHTML = +parseFloat(memoryCurrent / display.innerHTML).toPrecision(14); ;
		oper = "";
		limit();
	} else if (oper === "-") {
		memReadActive ? display.innerHTML = +memoryCurrent - +memCalc :
		display.innerHTML = +parseFloat(+memoryCurrent - +display.innerHTML ).toPrecision(14);
		oper = "";
		limit();
	} 
}

decimalBtn.addEventListener('click', function() {
	if (!display.innerHTML.includes(".") && !memoryPendingOperation) {
		display.innerHTML += ".";
		memoryPendingOperation = ".";
	} else if (memoryPendingOperation) {
		memoryCurrent = display.innerHTML;
		display.innerHTML = "0.";
		oper = memoryPendingOperation;
		memoryPendingOperation = ".";
	}
});

c.addEventListener('click', function(){
	display.innerHTML = memoryCurrent = memoryPendingOperation = oper = doubleClick = doubleClickActive = 0;
	display.classList.remove("error");
	});

ac.addEventListener('click', function(){
	display.innerHTML = memoryCurrent = memoryPendingOperation = oper = memCalc = doubleClick = doubleClickActive =0;
	display.classList.remove("memory");
	display.classList.remove("error");
	});

negativeBtn.addEventListener('click', function(){
	display.innerHTML = - display.innerHTML
});

resultBtn.addEventListener('click', function(){
	if (oper === "pow") {
		let pow = String(Math.pow(memoryCurrent, +display.innerHTML));
		if (pow === "Infinity") {
			display.classList.add("error");
			display.innerHTML = 0;
		} else if (pow > 10**13 ) { 
			display.classList.add("error");
			display.innerHTML = pow.slice(0, 15)
		}
		else {
			display.innerHTML = pow;
		}
		memoryPendingOperation = "pow";
	}

	//doubleClick = memoryCurrent;
	// тут логика работы дабл клика =, 
	//что  дает повторять операции с первичным результатом + последняя операция со вторичным числом
		if (oper === "+") {
		//memReadActive ? display.innerHTML = +memCalc + +memoryCurrent :
		if (doubleClickActive) {
			display.innerHTML = +parseFloat(+display.innerHTML + +doubleClick).toPrecision(14);
			limit();
		} else {
			doubleClick = +display.innerHTML;
			display.innerHTML = +parseFloat(+display.innerHTML + +memoryCurrent).toPrecision(14);
			limit();
		}
	} else if (oper === "*") {
		if (doubleClickActive) {
			display.innerHTML = +parseFloat(+display.innerHTML*(+doubleClick)).toPrecision(14);
			limit();
		} else {
			doubleClick = +display.innerHTML;
			display.innerHTML = +parseFloat(display.innerHTML*(+memoryCurrent)).toPrecision(14);
			limit();
		}
		//memReadActive ? display.innerHTML = +memCalc*(+memoryCurrent) :
	} else if (oper === "/") {
		if (doubleClickActive) {
			display.innerHTML = +parseFloat(+display.innerHTML / (+doubleClick)).toPrecision(14);
			limit();
		}
		//memReadActive ? display.innerHTML = +memoryCurrent / +memCalc :
		 else{
		 	doubleClick = +display.innerHTML;
		 	display.innerHTML = +parseFloat(+memoryCurrent / (+display.innerHTML)).toPrecision(14);
		 	limit();
		 }
		//oper = "";
	} else if (oper === "-") {
	if (doubleClickActive) {
			display.innerHTML = +parseFloat(+display.innerHTML - +doubleClick).toPrecision(14);
			limit();
		} else {
			doubleClick = display.innerHTML;
			display.innerHTML = +parseFloat(+memoryCurrent - +display.innerHTML ).toPrecision(14);
			limit();
		}
		//memReadActive ? display.innerHTML = +memoryCurrent - +memCalc :
		
		//oper = "";
	} 
	doubleClickActive = 1;
	memReadActive = 0;

});


sqrtBtn.addEventListener('click', function(){
	let sqrt = Math.sqrt(display.innerHTML);
	if (sqrt >= 0) {
		display.innerHTML = String(Math.sqrt(display.innerHTML)).slice(0,15);
	} else {
		display.classList.add("error");
		display.innerHTML = 0;
	}
});

powBtn.addEventListener('click', function(){
	memoryPendingOperation = "pow";
	oper = "pow"
	memoryCurrent = +display.innerHTML;
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
	memoryCurrent = +display.innerHTML;
	display.innerHTML = memCalc;
	oper = memoryPendingOperation;
	memReadActive = 1;
});

memClearBtn.addEventListener('click', function(){
	display.classList.remove("memory");
	memCalc = 0;
});

on.addEventListener('click', function(){
	document.querySelector(".boot_block").classList.add("active");
	setTimeout(function(){ 
	display.innerHTML = memoryCurrent = memoryPendingOperation = oper = memCalc = doubleClick = doubleClickActive = 0;
	display.classList.remove("memory");
	display.classList.remove("error");
	display.style.opacity = "1";
	display.innerHTML = "0"
	}, 3000);

});

redoBtn.addEventListener('click', function(){
	if (display.innerHTML.length === 2 && display.innerHTML.includes("-")) {
		display.innerHTML = 0;
	}
	else if (display.innerHTML.length >1) {
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

