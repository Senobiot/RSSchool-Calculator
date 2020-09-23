let numBtn = document.querySelectorAll(".num"),
	operationBtn = document.querySelectorAll(".operation"),
	decimalBtn = document.querySelector("point"),
	result = document.querySelector(".result"),
	c = document.querySelector(".clear"),
	ac = document.querySelector(".all_clear");
console.log(pointBtn)

for (let i = 0; i < numBtn.length; i++) {
	let number = numBtn[i];
	number.addEventListener('click', function(){
		console.log('click number button')
	})
};
for (let i = 0; i < operationBtn.length; i++) {
	let operation = operationBtn[i];
	operation.addEventListener('click', function(){
		console.log('click operation button')
	})
};

pointBtn.addEventListener('click', function(){
	console.log('click decimal button')
	});

result.addEventListener('click', function(e){
		console.log('click result button');
	});
c.addEventListener('click', function(){
		console.log('click C button');
	});
ac.addEventListener('click', function(){
		console.log('click AC button');
	});


function number (argument) {
	// body...
}
function operation(argument) {
	// body...
}
function decimal(argument) {
	// body...
}
function clear(argument) {
	// body...
}