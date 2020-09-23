console.log("Connected");
//IIFE - Immediately Invoked Function Expression
(function() {
    var saveButton = document.getElementById('savebutton');

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
        var tdInputName = document.createElement('input');
        tdInputName.setAttribute('id', 'contact-name');
        tdInputName.setAttribute('type', 'text');
        tdInputName.setAttribute('value', name);
        tdName.appendChild(tdInputName);

        var tdLastName = document.createElement('td');
        var tdInputLastName = document.createElement('input');
        tdInputLastName.setAttribute('id', 'contact-lastName');
        tdInputLastName.setAttribute('type', 'text');
        tdInputLastName.setAttribute('value', lastName);
        tdLastName.appendChild(tdInputLastName);

        var tdCPhoneNumber = document.createElement('td');
        var tdInputPhoneNumber = document.createElement('input');
        tdInputPhoneNumber.setAttribute('id', 'contact-phone');
        tdInputPhoneNumber.setAttribute('type', 'text');
        tdInputPhoneNumber.setAttribute('value', phoneNumber);
        tdCPhoneNumber.appendChild(tdInputPhoneNumber);

        var removeContact = document.createElement('button');
        removeContact.innerText = "X";
        removeContact.classList.add('button-delete');
        removeContact.addEventListener('click', deleteEvent);
        var tdButtonRemoveContact = document.createElement('td');

        tdButtonRemoveContact.appendChild(removeContact);

        newTableRow.appendChild(tdName);
        newTableRow.appendChild(tdLastName);
        newTableRow.appendChild(tdCPhoneNumber);
        newTableRow.appendChild(tdButtonRemoveContact);

        tableBody.appendChild(newTableRow);
    });

    var delButton = document.querySelector(".button-delete");

    delButton.addEventListener('click', deleteEvent);
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

function deleteEvent(event) {
    console.log("Clicked!");
}