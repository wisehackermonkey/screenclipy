// // Create context menu on extension load
// chrome.runtime.onInstalled.addListener(() => {
//     chrome.contextMenus.create({
//       id: "copyAndScreenshot",
//       title: "Copy and Screenshot",
//       contexts: ["page"]
//     });
//   });
  
//   // Listen for context menu click
//   chrome.contextMenus.onClicked.addListener((info, tab) => {
//     if (info.menuItemId === "copyAndScreenshot") {
//       // Send a message to the content script
//       chrome.scripting.executeScript({
//         target: { tabId: tab.id },
//         function: copyUrlsAsMarkdownScreenshot
//       });
//     }
//   });
  
// Create context menu on extension load
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "copyAndScreenshot",
      title: "Copy and Screenshot",
      contexts: ["page"]
    });
  });
  
  // Listen for context menu click
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "copyAndScreenshot") {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
          const pageTitle = document.title;
          const pageURL = window.location.href;
          
          const markdownText = `[${pageTitle}](${pageURL})`;
  
          // Copy Markdown link to clipboard
          navigator.clipboard.writeText(markdownText).then(() => {
            console.log("Copied to clipboard:", markdownText);
          }).catch(err => {
            console.error("Failed to copy text: ", err);
          });
          console.log("Screenshot")
          // Send request to local server for screenshot
          fetch('http://localhost:8000/screenshot')
            .then(response => response.text())
            .then(data => {
              console.log("Screenshot data:", data);
            })
            .catch(error => {
              console.error("Failed to fetch screenshot:", error);
            });
        }
      });
    }
  });
  