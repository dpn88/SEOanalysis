javascript:(function() {
    var w = window.open();
    var d = w.document;
    d.write('<html><head><title>Full Page Analysis</title>');
    // Set up the CSS to define a grid with two columns
    d.write('<style>body { font-family: Arial, sans-serif; margin: 20px; } .container { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; } .container > div { padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9; } h1 { grid-column: 1 / -1; color: #333; font-size: 24px; } h2 { margin-top: 0; font-size: 20px; } ul { list-style-type: none; margin: 0; padding: 0; } li { margin: 10px 0; } a { color: #06f; text-decoration: none; } a:hover { text-decoration: underline; }</style>');
    d.write('</head><body>');
    d.write('<h1>Full Page Analysis</h1>');
    d.write('<div class="container">'); // Start container for the grid layout

    // Headings Analysis
    d.write('<div>'); // Start of the first column for headers
    ['h1', 'h2', 'h3', 'h4', 'h5'].forEach(function(tag) {
        var headings = document.querySelectorAll(tag);
        d.write('<h2>' + tag.toUpperCase() + ' - Count: ' + headings.length + '</h2>');
        if (headings.length > 0) {
            d.write('<ul>');
            headings.forEach(function(heading, index) {
                d.write('<li>' + (index + 1) + ': ' + heading.textContent.trim() + '</li>');
            });
            d.write('</ul>');
        } else {
            d.write('<p>No ' + tag.toUpperCase() + ' found.</p>');
        }
    });
    d.write('</div>'); // End of the first column

    // Link Analysis
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

    d.write('<h2>Internal Links (' + internalLinks.length + ')</h2><ul>');
    internalLinks.forEach(function(link) {
        d.write('<li><a href="' + link + '" target="_blank">' + link + '</a></li>');
    });
    d.write('</ul>');
    d.write('<h2>External Links (' + externalLinks.length + ')</h2><ul>');
    externalLinks.forEach(function(link) {
        d.write('<li><a href="' + link + '" target="_blank">' + link + '</a></li>');
    });
    d.write('</ul>');
    d.write('</div>'); // End of the second column

    d.write('</div>'); // End of container
    d.write('</body></html>');
    d.close();
})();
