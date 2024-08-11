javascript:(function() {
    var w = window.open();
    var d = w.document;
    d.write('<html><head><title>Full Page Analysis</title>');
    d.write('<style>');
    d.write('body { font-family: Arial, sans-serif; margin: 20px; }');
    d.write('.container { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }');
    d.write('.container > div { padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9; }');
    d.write('h1 { grid-column: 1 / -1; color: #333; font-size: 24px; }');
    d.write('h2 { margin-top: 0; font-size: 20px; }');
    d.write('ul { list-style-type: none; margin: 0; padding: 0; }');
    d.write('li { margin: 10px 0; }');
    d.write('a { color: #06f; text-decoration: none; }');
    d.write('a:hover { text-decoration: underline; }');
    d.write('.dropdown { margin-bottom: 15px; }');
    d.write('.dropdown-button { background-color: #0066cc; color: white; padding: 10px; border: none; cursor: pointer; width: 100%; text-align: left; font-size: 16px; }');
    d.write('.dropdown-content { display: none; padding: 10px 0; }');
    d.write('.dropdown-button.active + .dropdown-content { display: block; }');
    d.write('</style>');
    d.write('</head><body>');
    d.write('<h1>Full Page Analysis</h1>');
    d.write('<div class="container">'); // Start container for the grid layout

    // Headings Analysis with Dropdowns
    d.write('<div>'); // Start of the first column for headers
    ['h1', 'h2', 'h3', 'h4', 'h5'].forEach(function(tag) {
        var headings = document.querySelectorAll(tag);
        d.write('<div class="dropdown">');
        d.write('<button class="dropdown-button" onclick="toggleDropdown(this)">' + tag.toUpperCase() + ' (' + headings.length + ')</button>');
        d.write('<div class="dropdown-content">');
        if (headings.length > 0) {
            d.write('<ul>');
            headings.forEach(function(heading, index) {
                d.write('<li>' + (index + 1) + ': ' + heading.textContent.trim() + '</li>');
            });
            d.write('</ul>');
        } else {
            d.write('<p>No ' + tag.toUpperCase() + ' found.</p>');
        }
        d.write('</div></div>'); // End of Dropdown
    });
    d.write('</div>'); // End of the first column

    // Link Analysis with Dropdowns
    d.write('<div>'); // Start of the second column for links
    var links = document.querySelectorAll('a[href]');
    var internalLinks = [];
    var externalLinks = [];
    var domain = window.location.hostname.replace('www.', '');
    links.forEach(function(link) {
        if (link.hostname.replace('www.', '') === domain || link.href.startsWith('/') || link.href.startsWith('#')) {
            internalLinks.push(link.href);
        } else {
            externalLinks.push(link.href);
        }
    });

    // Internal Links Dropdown
    d.write('<div class="dropdown">');
    d.write('<button class="dropdown-button" onclick="toggleDropdown(this)">Internal Links (' + internalLinks.length + ')</button>');
    d.write('<div class="dropdown-content">');
    if (internalLinks.length > 0) {
        d.write('<ul>');
        internalLinks.forEach(function(link) {
            d.write('<li><a href="' + link + '" target="_blank">' + link + '</a></li>');
        });
        d.write('</ul>');
    } else {
        d.write('<p>No internal links found.</p>');
    }
    d.write('</div></div>'); // End of Internal Links Dropdown

    // External Links Dropdown
    d.write('<div class="dropdown">');
    d.write('<button class="dropdown-button" onclick="toggleDropdown(this)">External Links (' + externalLinks.length + ')</button>');
    d.write('<div class="dropdown-content">');
    if (externalLinks.length > 0) {
        d.write('<ul>');
        externalLinks.forEach(function(link) {
            d.write('<li><a href="' + link + '" target="_blank">' + link + '</a></li>');
        });
        d.write('</ul>');
    } else {
        d.write('<p>No external links found.</p>');
    }
    d.write('</div></div>'); // End of External Links Dropdown

    d.write('</div>'); // End of the second column
    d.write('</div>'); // End of container

    d.write('<script>');
    d.write('function toggleDropdown(button) {');
    d.write('button.classList.toggle("active");');
    d.write('var content = button.nextElementSibling;');
    d.write('if (content.style.display === "block") { content.style.display = "none"; } else { content.style.display = "block"; }');
    d.write('}');
    d.write('</script>');

    d.write('</body></html>');
    d.close();
})();
