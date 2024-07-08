// cheatsheet-utils.js

function includeHTML() {
    var z, i, elmnt, file, xhttp;
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        elmnt.innerHTML = this.responseText;
                    }
                    if (this.status == 404) {
                        elmnt.innerHTML = "Page not found.";
                    }
                    elmnt.removeAttribute("w3-include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            return;
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Run includeHTML first
    includeHTML();

    // Find the header element
    const header = document.querySelector('h1');

    // Create and insert search box below the header
    let searchBox = document.createElement('div');
    searchBox.innerHTML = `
        <input type="text" id="searchInput" placeholder="Search commands..." onkeyup="searchCheatSheet()">
        <button onclick="clearSearch()">Clear</button>
    `;
    header.parentNode.insertBefore(searchBox, header.nextSibling);

    // Create and insert control buttons below the search box
    let controlButtons = document.createElement('div');
    controlButtons.innerHTML = `
        <button onclick="collapseAll()">Collapse All</button>
        <button onclick="expandAll()">Expand All</button>
    `;
    searchBox.parentNode.insertBefore(controlButtons, searchBox.nextSibling);

    // Make sections collapsible
    const headers = document.querySelectorAll('h2');
    headers.forEach(header => {
        header.innerHTML += ' <span class="toggle-icon">[-]</span>';
        header.style.cursor = 'pointer';
        header.nextElementSibling.style.display = 'none';
        header.addEventListener('click', function() {
            toggleSection(this);
        });
    });

    // Add "Copy to Clipboard" buttons
    const codeElements = document.querySelectorAll('code');
    codeElements.forEach(codeElement => {
        const copyButton = document.createElement('button');
        copyButton.textContent = 'Copy';
        copyButton.className = 'copy-button';
        copyButton.addEventListener('click', function() {
            navigator.clipboard.writeText(codeElement.textContent).then(() => {
                copyButton.textContent = 'Copied!';
                setTimeout(() => copyButton.textContent = 'Copy', 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
                copyButton.textContent = 'Failed to copy';
                setTimeout(() => copyButton.textContent = 'Copy', 2000);
            });
        });
        codeElement.parentNode.insertBefore(copyButton, codeElement.nextSibling);
    });

    // Apply syntax highlighting
    if (typeof hljs !== 'undefined') {
        hljs.highlightAll();
    }
});

function toggleSection(header) {
    const content = header.nextElementSibling;
    content.style.display = content.style.display === 'none' ? 'block' : 'none';
    header.querySelector('.toggle-icon').textContent = content.style.display === 'none' ? '[+]' : '[-]';
}

function collapseAll() {
    const headers = document.querySelectorAll('h2');
    headers.forEach(header => {
        header.nextElementSibling.style.display = 'none';
        header.querySelector('.toggle-icon').textContent = '[+]';
    });
}

function expandAll() {
    const headers = document.querySelectorAll('h2');
    headers.forEach(header => {
        header.nextElementSibling.style.display = 'block';
        header.querySelector('.toggle-icon').textContent = '[-]';
    });
}

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
