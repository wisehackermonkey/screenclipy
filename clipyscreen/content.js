function copyUrlsAsMarkdownScreenshot() {
  const pageTitle = document.title;
  const pageURL = window.location.href;
  
  const markdownText = `[${pageTitle}](${pageURL})`;

  // Copy Markdown link to clipboard
  navigator.clipboard.writeText(markdownText).then(() => {
    console.log("Copied to clipboard:", markdownText);
  }).catch(err => {
    console.error("Failed to copy text: ", err);
  });

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
