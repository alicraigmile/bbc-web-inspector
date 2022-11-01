// Can use
// chrome.devtools.*
// chrome.extension.*

// Create a tab in the devtools area
chrome.devtools.panels.create("Inspect BBC web", "detective..png", "panel.html", function(panel) {});
