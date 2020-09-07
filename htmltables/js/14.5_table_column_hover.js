// Get a collection of all cells
var tds = document.querySelectorAll('td');
var ths = document.querySelectorAll('th');

// create an array of cells by splitting all tds and ths and
// concatenating them inside of cells array
var cells = Array.prototype.slice.call(tds).concat(
    Array.prototype.slice.call(ths)
);

var rows = document.querySelectorAll('tr');

// Bind a mouseover and mouseout event to all those cells
[].forEach.call(
    cells,
    function(el) {
        el.addEventListener(
            'mouseover',
            function() {
                // When the mouseover event fires, get the position in the row of that cell
                var index = getIndexInParent(this);

                // Loop through all rows and add a highlighting class to each cell in that row that matches that column position
                for (var i = 0; i < rows.length; i++) {
                    var cellsInThisRow = rows[i].getElementsByTagName('td');

                    // if this is the header row
                    if (cellsInThisRow.length === 0) {
                        cellsInThisRow = rows[i].getElementsByTagName('th');
                    }

                    cellsInThisRow[index]
                    .classList
                    .add('highlight');
                }
            },
            false
        );
    }
);

// When the mouseout event fires, remove the highlighting class from all cells
[].forEach.call(
    cells,
    function(el) {
        el.addEventListener(
            'mouseout',
            function() {
                for(var i = 0; i < cells.length; i++) {
                    cells[i]
                    .classList
                    .remove('highlight');
                }
            },
            false
        );
    }
);

function getIndexInParent(node) {
    var children = node.parentNode.childNodes;
    var num = 0;
    for(var i = 0; i < children.length; i++) {
        if(children[i] === node) {
            return num;
        }

        if(children[i].nodeType === 1) {
            num++;
        }
    }

    return -1;
}