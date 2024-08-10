javascript:(function() {
    var w = window.open();
    var d = w.document;
    d.write('<html><head><title>Full Page Analysis</title>');
    // Ensure the grid layout fills the window and columns are defined properly
    d.write('<style>body { font-family: Arial, sans-serif; display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; padding: 20px; } h1 { grid-column: 1 / -1; color: #333; font-size: 24px; } h2 { margin-top: 0; font-size: 20px; } ul { list-style-type: none; margin: 0; padding: 0; } li { margin: 10px 0; } a { color: #06f; text-decoration: none; } a:hover { text-decoration: underline; }</style>');
    d.write('</head><body>');
    d.write('<h1>Full Page Analysis</h1>');

    // Start the first column for headers
    d.write('<div>');
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
    d.write('</div>'); // End the first column

    // Start the second column for links
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

    d.write('<div>');
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
    d.write('</div>'); // End the second column

    d.write('</body></html>');
    d.close();
})();
