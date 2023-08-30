document.getElementById("button").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];

    const printTitle = () => {
      const title = document.title;

      // https://developer.chrome.com/docs/extensions/mv3/messaging/
      (async () => {
        const response = await chrome.runtime.sendMessage({ title });
        // do something with response here, not outside the function
        console.log(response);
      })();
    };

    chrome.scripting
      .executeScript({
        target: { tabId: tab.id },
        func: printTitle,
        // files : ['contentScript.js']
      })
      .then(() => console.log("executed"));
  });
});

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  console.log({ req, sender });

  const { title } = req;
  document.getElementById("metaTitle").innerHTML = title;
});
