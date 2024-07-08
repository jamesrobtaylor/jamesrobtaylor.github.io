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

    // Search functionality
    let searchBox = document.createElement('div');
    searchBox.innerHTML = `
        <input type="text" id="searchInput" placeholder="Search commands..." onkeyup="searchCheatSheet()">
        <button onclick="clearSearch()">Clear</button>
    `;
    document.body.insertBefore(searchBox, document.body.firstChild);

    // Make sections collapsible
    const headers = document.querySelectorAll('h2');
    headers.forEach(header => {
        header.innerHTML += ' <span class="toggle-icon">[-]</span>';
        header.style.cursor = 'pointer';
        header.nextElementSibling.style.display = 'block';
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            content.style.display = content.style.display === 'none' ? 'block' : 'none';
            this.querySelector('.toggle-icon').textContent = content.style.display === 'none' ? '[+]' : '[-]';
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
            });
        });
        codeElement.parentNode.insertBefore(copyButton, codeElement.nextSibling);
    });

    // Apply syntax highlighting
    if (typeof hljs !== 'undefined') {
        hljs.highlightAll();
    }
});

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
