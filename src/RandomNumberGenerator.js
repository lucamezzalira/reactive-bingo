export function generateNumbers(arr, totalNums){
	let num;
	
	if(arr.length < totalNums){
		num = checkDuplicate(generateRandomValue(), arr);
		if(num)
			arr.push(num);
			
		generateNumbers(arr, totalNums);
	}
}

function checkDuplicate(value, arr){
	if(arr.indexOf(value) >= 0)
		return;
		
	return value;
}

function generateRandomValue(){
	return Math.trunc(Math.random()*99) + 1;
}