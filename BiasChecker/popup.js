document.getElementById("checkBiasButton").addEventListener("click", function () {
    const inputText = document.getElementById("inputText").value;

    // Send the input text to the background script for API processing
    chrome.runtime.sendMessage({ action: "checkBias", text: inputText }, function(response) {
        if (response.result) {
            document.getElementById("outputText").innerText = response.result;
        } else {
            document.getElementById("outputText").innerText = "Error: Could not analyze the text.";
        }
    });
});
