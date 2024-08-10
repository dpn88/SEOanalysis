javascript:(function() {
    var w = window.open();
    var d = w.document;
    d.write('<html><head><title>Full Page Analysis</title>');
    d.write('<style>body { font-family: Arial, sans-serif; display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px; } h1 { grid-column: 1 / -1; color: #333; } h2 { margin-top: 0; } ul { list-style-type: none; padding: 0; } li { margin: 10px 0; } a { color: #06f; }</style>');
    d.write('</head><body>');
    d.write('<h1>Full Page Analysis</h1>');

    // Headings Analysis
    d.write('<div>'); // Start of the first column for headers
    ['h1', 'h2', 'h3', 'h4', 'h5'].forEach(function(tag) {
        var headings = document.querySelectorAll(tag);
        d.write('<h2>' + tag.toUpperCase() + ' - Count: ' + headings.length + '</h2>');
        if (headings.length > 0) {
            d.write('<ul>');
            headings.forEach(function(heading, index) {
                d.write('<li>' + (index + 1) + ': ' + heading.innerText.trim() + '</li>');
            });
            d.write('</ul>');
        } else {
            d.write('<p>No ' + tag.toUpperCase() + ' found.</p>');
        }
    });
    d.write('</div>'); // End of the first column

    // Link Analysis
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

    d.write('<div>'); // Start of the second column for links
    d.write('<h2>Internal Links (' + internalLinks.length + ')</h2><ul>');
    internalLinks.forEach(function(link) {
        d.write('<li><a href="' + link + '" target="_blank">' + link + '</a></li>');
    });
    d.write('</ul><h2>External Links (' + externalLinks.length + ')</h2><ul>');
    externalLinks.forEach(function(link) {
        d.write('<li><a href="' + link + '" target="_blank">' + link + '</a></li>');
    });
    d.write('</ul>');
    d.write('</div>'); // End of the second column

    d.write('</body></html>');
    d.close();
})();

