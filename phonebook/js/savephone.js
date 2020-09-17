console.log("Connected");
//IIFE - Immediately Invoked Function Expression
(function() {
    var saveButton = document.getElementById('savebutton');
    // var btnRemoveContact = document.getElementsByClassName('button-delete')[0];
    // var removeContact = btnRemoveContact.cloneNode(true);

    saveButton.addEventListener('click', function(event) {        
        event.preventDefault();
        // get the name        
        var name = getTextValueOfElementWithID('name', true);

        // get the last name
        var lastName = getTextValueOfElementWithID('lastname', false);

        // get the phone number
        var phoneNumber = getTextValueOfElementWithID('phonenumber', false);

        // create a new contact object

        // get body of the table with the contacts
        var tableBody = document.getElementById('contact-data');

        // create new table row
        var newTableRow = document.createElement('tr');

        // add name, last name and phone number to the table as a new row                
        var tdName = document.createElement('td');
        tdName.textContent = name;

        var tdLastName = document.createElement('td');
        tdLastName.textContent = lastName;

        var tdCPhoneNumber = document.createElement('td');
        tdCPhoneNumber.textContent = phoneNumber;

        var removeContact = document.createElement('button');
        removeContact.innerText = "X";
        removeContact.classList.add('button-delete');
        var tdButtonRemoveContact = document.createElement('td');

        tdButtonRemoveContact.appendChild(removeContact);

        newTableRow.appendChild(tdName);
        newTableRow.appendChild(tdLastName);
        newTableRow.appendChild(tdCPhoneNumber);
        newTableRow.appendChild(tdButtonRemoveContact);

        tableBody.appendChild(newTableRow);
    });
})();

function getTextValueOfElementWithID(id, focus) {
    var element = document.getElementById(id);
    var textValue = element.value;
    element.value = "";

    if(focus) {
        element.focus();
    }

    return textValue;
}