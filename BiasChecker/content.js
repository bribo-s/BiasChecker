chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === "highlightBias") {
        let text = document.body.innerText;

        // Replace the biased text with a highlighted version
        let biasedText = text.replace(/bias/gi, "<span style='background-color: yellow;'>bias</span>");

        // Replace the body’s content with the highlighted version
        document.body.innerHTML = biasedText;
        sendResponse({ result: "Bias highlighted" });
    }
});
