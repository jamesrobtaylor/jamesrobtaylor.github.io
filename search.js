// search.js

function searchCheatSheet() {
    let input = document.getElementById('searchInput').value.toLowerCase();
    let tables = document.getElementsByTagName('table');
    
    for (let table of tables) {
        let rows = table.getElementsByTagName('tr');
        for (let row of rows) {
            let cells = row.getElementsByTagName('td');
            let found = false;
            
            for (let cell of cells) {
                if (cell.textContent.toLowerCase().indexOf(input) > -1) {
                    found = true;
                    break;
                }
            }
            
            if (found) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        }
    }
}

function clearSearch() {
    document.getElementById('searchInput').value = '';
    searchCheatSheet();
}

document.addEventListener('DOMContentLoaded', function() {
    let searchBox = document.createElement('div');
    searchBox.innerHTML = `
        <input type="text" id="searchInput" placeholder="Search commands..." onkeyup="searchCheatSheet()">
        <button onclick="clearSearch()">Clear</button>
    `;
    document.body.insertBefore(searchBox, document.body.firstChild);
});
