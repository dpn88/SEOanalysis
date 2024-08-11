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

    // Meta Description Check
    var metaDescription = document.querySelector('meta[name="description"]');
    var metaDescriptionContent = metaDescription ? metaDescription.getAttribute('content') : 'No meta description found.';
    d.write('<h2>Meta Description</h2>');
    d.write('<p>' + metaDescriptionContent + '</p>');

    // Word Count
    var bodyText = document.body.innerText || document.body.textContent;
    var wordCount = bodyText.split(/\s+/).filter(function(word) {
        return word.length > 0;
    }).length;
    d.write('<h2>Word Count</h2>');
    d.write('<p>' + wordCount + ' words</p>');

    // Headings Analysis with Dropdowns
    d.write('<div class="container">'); // Start container for the grid layout
    var headingsText = '';

    d.write('<div>'); // Start of the first column for headers
    ['h1', 'h2', 'h3', 'h4', 'h5'].forEach(function(tag) {
        var headings = document.querySelectorAll(tag);
        d.write('<div class="dropdown">');
        d.write('<button class="dropdown-button" onclick="toggleDropdown(this)">' + tag.toUpperCase() + ' (' + headings.length + ')</button>');
        d.write('<div class="dropdown-content">');
        if (headings.length > 0) {
            d.write('<ul>');
            headings.forEach(function(heading, index) {
                var headingText = heading.textContent.trim();
                headingsText += ' ' + headingText;
                d.write('<li>' + (index + 1) + ': ' + headingText + '</li>');
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

    // 3 Most Common Words/Phrases
    var titleText = document.title;
    var focusKeyphraseCandidates = headingsText + ' ' + metaDescriptionContent + ' ' + titleText + ' ' + bodyText;
    var words = focusKeyphraseCandidates.toLowerCase().match(/\b\w+\b/g);
    
    // Common stop words and prepositions to ignore
    var stopWords = ['the', 'and', 'a', 'an', 'in', 'on', 'at', 'of', 'for', 'to', 'is', 'with', 'by', 'this', 'that', 'it', 'as', 'be', 'are', 'was', 'were', 'will', 'would', 'can', 'could', 'has', 'have', 'had', 'from', 'or', 'but', 'not', 'so', 'if', 'you', 'your', 'yours', 'us', 'ours', 'our'];
    var wordFrequency = {};
    
    words.forEach(function(word) {
        if (stopWords.indexOf(word) === -1) { // Exclude stop words
            wordFrequency[word] = (wordFrequency[word] || 0) + 1;
        }
    });

    var sortedWords = Object.keys(wordFrequency).sort(function(a, b) {
        return wordFrequency[b] - wordFrequency[a];
    });

    d.write('<h2>3 Most Common Words/Phrases on the Webpage</h2>');
    d.write('<p>1. ' + (sortedWords[0] || 'N/A') + '</p>');
    d.write('<p>2. ' + (sortedWords[1] || 'N/A') + '</p>');
    d.write('<p>3. ' + (sortedWords[2] || 'N/A') + '</p>');

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
