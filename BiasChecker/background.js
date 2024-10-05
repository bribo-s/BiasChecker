chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "checkBias") {
        const inputText = request.text;

        // Call the actual bias checking API
        checkForBiasAPI(inputText).then(response => {
            sendResponse({ result: response });
        }).catch(error => {
            sendResponse({ result: "Error: Could not analyze the text." });
        });

        // This ensures that the sendResponse callback is kept alive until the async API call is complete
        return true;
    }
});

async function checkForBiasAPI(text) {
    const url = "https://political-bias-database.p.rapidapi.com/bias";
    
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            '2a661b209emshf301aba0e2a1b79p1e4b29jsn3219a3e4a2bb': '2a661b209emshf301aba0e2a1b79p1e4b29jsn3219a3e4a2bb',
            'X-RapidAPI-Host': 'political-bias-database.p.rapidapi.com'
        },
        body: JSON.stringify({
            "text": text
        })
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();

        if (response.ok && data && data.bias) {
            return `Bias detected: ${data.bias}`;
        } else {
            return "No bias detected.";
        }
    } catch (error) {
        console.error("API call error: ", error);
        return "Error analyzing text.";
    }
}
