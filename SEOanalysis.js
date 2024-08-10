function loadPageAnalysis() {
    var w = window.open();
    var d = w.document;
    d.write('<title>Full Page Analysis</title><h1>Full Page Analysis</h1>');

    // Headings Analysis
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

    d.write('<h2>Internal Links (' + internalLinks.length + ')</h2><ul>');
    internalLinks.forEach(function(link) {
        d.write('<li><a href="' + link + '" target="_blank">' + link + '</a></li>');
    });
    d.write('</ul><h2>External Links (' + externalLinks.length + ')</h2><ul>');
    externalLinks.forEach(function(link) {
        d.write('<li><a href="' + link + '" target="_blank">' + link + '</a></li>');
    });
    d.write('</ul>');

    d.close();
}
