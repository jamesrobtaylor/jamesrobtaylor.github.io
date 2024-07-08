// cheatsheet-enhancements.js

document.addEventListener('DOMContentLoaded', function() {
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
    hljs.highlightAll();
});
