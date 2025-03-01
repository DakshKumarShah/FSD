const apiKey = "eae403b71c1ea70dc4b8c12c";
const baseCurrencyDropdown = document.getElementById("base-currency");
const baseSearch = document.getElementById("base-search");
const targetCurrencyDropdown = document.getElementById("currency-dropdown");
const currencySearch = document.getElementById("currency-search");
const searchBtn = document.getElementById("search-btn");
const rateContainer = document.getElementById("rate-container");

async function fetchAndPopulateCurrencies() {
    const defaultBaseCurrency = "USD";
    const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${defaultBaseCurrency}`;
    console.log("API URL:", apiUrl);
    try {
        const response = await fetch(apiUrl);
        console.log("Response received:", response);
        if (!response.ok) throw new Error("Failed to fetch currency list.");
        const data = await response.json();
        console.log("Data from API:", data);

        if (data.result === "success") {
            populateDropdowns(Object.keys(data.conversion_rates));
        } else {
            throw new Error("Failed to load currency data.");
        }
    } catch (error) {
        console.error("Error fetching currencies:", error);
        rateContainer.innerHTML = "<p>Failed to load currencies. Please try again later.</p>";
    }
}

function populateDropdowns(currencies) {
    const options = currencies
        .map(currency => `<option value="${currency}">${currency}</option>`)
        .join("");
    baseCurrencyDropdown.innerHTML = `<option value="">Select Base Currency</option>` + options;
    targetCurrencyDropdown.innerHTML = `<option value="">Select Target Currency</option>` + options;
}

// Fetch and display rates for selected currencies
async function fetchExchangeRates(baseCurrency, targetCurrency) {
    const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${baseCurrency}`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to fetch exchange rates.");
        const data = await response.json();

        if (data.result === "success" && targetCurrency in data.conversion_rates) {
            displayExchangeRate(targetCurrency, data.conversion_rates[targetCurrency]);
        } else {
            rateContainer.innerHTML = `<p>No rates available for the selected currency.</p>`;
        }
    } catch (error) {
        console.error("Error fetching exchange rates:", error);
        rateContainer.innerHTML = "<p>Failed to load exchange rates. Please try again later.</p>";
    }
}

function displayExchangeRate(currency, rate) {
    const baseCurrency = baseCurrencyDropdown.value || baseSearch.value.toUpperCase();
    rateContainer.innerHTML = `
        <div class="rate">
            <strong>${baseCurrency}</strong> to <strong>${currency}:</strong> ${rate.toFixed(2)}
        </div>
    `;
}

// Event Listeners
searchBtn.addEventListener("click", () => {
    const baseCurrency = baseCurrencyDropdown.value || baseSearch.value.toUpperCase();
    const targetCurrency = targetCurrencyDropdown.value || currencySearch.value.toUpperCase();

    if (!baseCurrency) {
        rateContainer.innerHTML = "<p>Please select a base currency.</p>";
        return;
    }

    if (!targetCurrency) {
        rateContainer.innerHTML = "<p>Please select or enter a target currency.</p>";
        return;
    }

    fetchExchangeRates(baseCurrency, targetCurrency);
});

fetchAndPopulateCurrencies();
