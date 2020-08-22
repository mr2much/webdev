var charInfo = document.getElementById("charinfo");
var characters = document.getElementById("characters");
var showInfo = document.getElementById("show-info");

var charInfo = [{name:"Simon", description:"Pirate wizard"},
                {name:"Golorlun", description:"Trash talker"},
                {name:"Arjshedinn", description:"Manipulator"}];

                console.log(charInfo);
var liElements = Array.prototype.slice.call(characters.children);

for(var i = 0; i < characters.children.length; i++) {
    characters.children[i].onclick = function() {        
        displaySelectedElement(liElements.indexOf(this));        
    };
}

function displaySelectedElement(index) {
    var header = showInfo.getElementsByTagName("h1")[0];
    header.innerHTML = charInfo[index].name;

    var description = showInfo.getElementsByTagName("p")[0];
    description.innerHTML = charInfo[index].description;

    var img = showInfo.getElementsByTagName("img")[0];
    img.src = "res/img/" + charInfo[index].name;
}
