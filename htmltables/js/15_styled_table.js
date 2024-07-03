document.querySelectorAll("tr").forEach(function() {
        var ths = document.querySelectorAll('th');        

        ths[0].classList.add('first');
        ths[ths.length - 1].classList.add('last');

        var tds = document.querySelectorAll('td');

        tds[0].classList.add('first');
        tds[tds.length - 1].classList.add('last');
    }
);

var rows = document.querySelectorAll('table tr');
rows[0].classList.add('row-first');
rows[rows.length - 1].classList.add('row-last');
