//повесить запрет на использование кнопки включения и обновить справку + что-то с отрицательными степениями с отрицательных чисел минус текстовый

let numBtn = document.querySelectorAll(".num"),
	operationBtn = document.querySelectorAll(".operation"),
	decimalBtn = document.querySelector(".decimal"),
	resultBtn = document.querySelector(".result"),
	sqrtBtn = document.querySelector(".sqrt"),
	c = document.querySelector(".clear"),
	ac = document.querySelector(".all_clear"),
	on = document.querySelector(".on"),
	negativeBtn = document.querySelector(".negative"),
	percentBtn = document.querySelector(".percent"),
	powBtn = document.querySelector(".gt"),
	redoBtn = document.querySelector(".redo"),
	helpBtn = document.querySelector(".mu"),
	memPlusBtn = document.querySelector(".m_plus"),
	memMinusBtn = document.querySelector(".m_minus"),
	memReadBtn = document.querySelector(".mr"),
	memReadActive = 0,
	memClearBtn = document.querySelector(".mc"),
	memCalc = 0,
	display = document.querySelector(".calculator_screen"),
	blocked = document.querySelector(".calculator"),
	memoryCurrent = 0,
	oper = "",
	memoryPendingOperation = "",
	myAudio = new Audio;
	let allBtns = document.querySelectorAll(".button"),
	exp;
	let doubleClick;
	let doubleClickActive;
	myAudio.src = "assets/libs/sound_3.mp3";


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
		} else if (memoryPendingOperation === "." &&  display.innerHTML.length < 14) {
			display.innerHTML += this.innerHTML;
		}
		else if (memoryPendingOperation === "." &&  display.innerHTML.length >= 14) {
		}
		else if (memoryPendingOperation && +display.innerHTML <= (10**14 - 1)) {
			memoryCurrent = +display.innerHTML;
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
		blocked.classList.add("blocked");
	} else if (display.innerHTML.includes("e-")) { // тут чтобы небыло экспоненциального вида
		exp = display.innerHTML.replace(/.*e-/, "");
		if (exp <= 12) {display.innerHTML = (+display.innerHTML).toFixed(+exp + 1)}
			else {display.innerHTML = 0}
		if (display.innerHTML[display.innerHTML.length - 1] === "0" && display.innerHTML.length > 1) display.innerHTML = display.innerHTML.slice(0, -1); // тут обрезка если после операции на конце 0
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
	blocked.classList.remove("blocked");
	});

ac.addEventListener('click', function(){
	display.innerHTML = memoryCurrent = memoryPendingOperation = oper = memCalc = doubleClick = doubleClickActive =0;
	display.classList.remove("memory");
	display.classList.remove("error");
	blocked.classList.remove("blocked");
	});

negativeBtn.addEventListener('click', function(){
	display.innerHTML = - display.innerHTML
});

resultBtn.addEventListener('click', function(){
	if (oper === "pow" && !doubleClickActive) {
		let pow = String(Math.pow(memoryCurrent, +display.innerHTML));
		if (pow === "Infinity" || pow === "NaN") {
			display.classList.add("error");
			blocked.classList.add("blocked");
			display.innerHTML = 0;
		} else if (pow > 10**13 ) { 
			display.classList.add("error");
			blocked.classList.add("blocked");
			display.innerHTML = pow.slice(0, 15)
		}
		else if (pow < 10e-7 ) { 
			display.innerHTML = pow;
			limit()
		}
		else {
			display.innerHTML = +pow.slice(0, 15);
		}
		memoryPendingOperation = "pow";
	}
	memoryPendingOperation = oper;
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
		blocked.classList.add("blocked");
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

on.addEventListener('click', function off(){
	display.innerHTML = memoryCurrent = memoryPendingOperation = oper = memCalc = doubleClick = doubleClickActive = 0;
	display.classList.remove("memory");
	display.classList.remove("error");
	blocked.classList.remove("blocked");
	document.querySelector(".boot_block").classList.add("active");
	setTimeout(function(){ 
	display.innerHTML = memoryCurrent = memoryPendingOperation = oper = memCalc = doubleClick = doubleClickActive = 0;
	display.classList.remove("memory");
	display.classList.remove("error");
	blocked.classList.remove("blocked");
	display.style.opacity = "1";
	display.innerHTML = "0";
	on.removeEventListener('click', off); // после клика удаляем его
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

helpBtn.addEventListener('click', function(){
	document.querySelector(".faq").classList.toggle ("active");
});

document.querySelector(".faq .close").addEventListener('click', function(){
	document.querySelector(".faq").classList.remove ("active");
});