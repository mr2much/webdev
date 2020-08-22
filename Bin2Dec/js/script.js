(function(){
    let binValInput = document.getElementById('binvalue');
    let submitBtn = document.getElementById('submit');
    let error = document.getElementById('error-msg');

    submitBtn.addEventListener("click", function(event) {
        event.preventDefault();
        error.innerHTML = "";
        let binval = binValInput.value;
        
        // check that the input value is not empty
        if(binval !== "") {
            // check that the input value is a valid binary value            
            if (isValidBinaryValue(binval)) {
                // convert the value
                let decval = convertFromBinToDecimal(binval);                

                // show the result
                let result = document.getElementById('result');

                // ensure that the result is empty
                result.innerHTML = "";
                result.innerHTML = result.innerHTML + " " + decval;            
            } else {
                error.innerHTML = "The Value <span>" + binval + "</span> Is Not A Valid Value!";
                console.log("Not A Valid Binary Value!");
                binValInput.value = "";
                binValInput.focus();
            }            
        } else {            
            error.innerHTML = "Please Enter A Value!";
            console.log("Empty Value!");         
            binValInput.focus();
        }
    });
})();

// testEquals(convertFromBinToDecimal("11100111"), 231);
// testEquals(convertFromBinToDecimal("11111111"), 255);
function isValidBinaryValue(binval) {
    return isNumberValue(binval) && isBinaryValue(binval);
}

// verify that the value is a number
function isNumberValue(numval) {
    for(i = 0; i < numval.length; i++) {
        let digit = Number.parseInt(numval[i]);
        console.log(digit, Number.isInteger(digit));
        if(!Number.isInteger(digit)) {
            return false;
        }
    }
    return true;
}

// verify that the value is a binary value
function isBinaryValue(binval) {
    for (i = 0; i < binval.length; i++) {
        let digit = Number.parseInt(binval[i]);

        if(digit != 0 && digit != 1) {
            return false;
        }
    }

    return true;
}

function convertFromBinToDecimal(value) {
    let rev = reverse(value);
    let result = convertToDecimal(rev);

    return result;
}

function reverse(binString) {
    let result = "";

    for (i = binString.length - 1; i >= 0; i--) {
        result += binString[i];
    }

    return result;    
}

function convertToDecimal(value) {
    let power = 0;    
    let result = 0;

    for(i = 0; i < value.length; i++) {        
        result += Math.pow(2, i) * Number.parseInt(value[i]);     
        power *= 2;
    }    

    return result;
}

function testEquals(value, compare) {
    console.log(value === compare);
}