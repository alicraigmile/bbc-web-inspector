// Can use
// chrome.devtools.*
// chrome.extension.*

// Create a tab in the devtools area
chrome.devtools.panels.create("Inspect BBC web", "toast.png", "panel.html", function(panel) {});