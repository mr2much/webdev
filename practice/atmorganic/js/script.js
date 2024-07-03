var txtaAtmList = document.getElementById('lista-atms');
var btnRemove = document.getElementById('space-rem');
// var btnClear = document.getElementById('clear-all');

btnRemove.addEventListener("click", function() {
    event.preventDefault();
    txtaAtmList.focus();
    var text = txtaAtmList.value;

    // find tab, new line, carriage return characters and replace them with a simple space
    text = text.replace(/[\t\r\n]+/g, " ");

    // delete original text from textarea
    txtaAtmList.value = '';

    // replace textarea's contents with new string
    txtaAtmList.value = text.trim();
});

btnClear.addEventListener("click", function() {
    event.preventDefault();    
    txtaAtmList.value = '';    
    txtaAtmList.focus();
});