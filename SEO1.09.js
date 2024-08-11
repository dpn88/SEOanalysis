javascript:(function() {
    var w = window.open();
    var d = w.document;
    d.write('<html><head><title>Full Page Analysis</title>');
    d.write('<style>');
    
    // General body and font styling
    d.write('body { font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333; margin: 20px; }');
    d.write('.container { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px; }');
    d.write('.container > div { padding: 20px; border: 1px solid #ddd; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); }');
    
    // Header styles
    d.write('h1 { grid-column: 1 / -1; color: #003366; font-size: 28px; margin-bottom: 20px; text-align: center; }');
    d.write('h2 { margin-top: 0; font-size: 22px; color: #004488; border-bottom: 2px solid #ddd; padding-bottom: 10px; margin-bottom: 20px; }');
    
    // List and link styles
    d.write('ul { list-style-type: none; margin: 0; padding: 0; }');
    d.write('li { margin: 10px 0; }');
    d.write('a { color: #0077cc; text-decoration: none; font-weight: bold; }');
    d.write('a:hover { text-decoration: underline; }');
    
    // Dropdown button and content styling
    d.write('.dropdown { margin-bottom: 20px; }');
    d.write('.dropdown-button { background-color: #0077cc; color: white; padding: 12px; border: none; cursor: pointer; width: 100%; text-align: left; font-size: 18px; border-radius: 4px; transition: background-color 0.3s ease; }');
    d.write('.dropdown-button:hover { background-color: #005fa3; }');
    d.write('.dropdown-content { display: none; padding: 10px 0; margin-top: 10px; }');
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
    
    // Common stop words, prepositions, prepositions of possession, and pronouns to ignore
    var stopWords = [
        'the', 'and', 'a', 'an', 'in', 'on', 'at', 'of', 'for', 'to', 'is', 'with', 'by', 'this', 'that', 'it', 
        'as', 'be', 'are', 'was', 'were', 'will', 'would', 'can', 'could', 'has', 'have', 'had', 'from', 'or', 
        'but', 'not', 'so', 'if', 'up', 'down', 'over', 'under', 'between', 'among', 'into', 'through', 
        'during', 'before', 'after', 'above', 'below', 'off', 'on', 'onto', 'beside', 'by', 'near', 'past', 
        'beyond', 'without', 'within', 'my', 'your', 'his', 'her', 'its', 'our', 'their', 'i', 'you', 'he', 
        'she', 'it', 'we', 'they', 'me', 'him', 'us', 'them'
    ];
    var wordFrequency = {};
    
    words.forEach(function(word) {
        if (stopWords.indexOf(word) === -1) { // Exclude common words, prepositions, prepositions of possession, and pronouns
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
