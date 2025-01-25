
const API_KEY = "fca_live_gRCidpaXdG4yjwfahysFW3m7pd2OrgmwjjnKOV7K";

const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");

const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

const msg = document.querySelector(".msg");

const API_URL = `https://api.freecurrencyapi.com/v1/latest?apikey=${API_KEY}`;

window.addEventListener("load", () => {
    updateExchangeRate();
});

dropdown.forEach(select => {
    for (let currCode in countryList) {
        let newOpt = document.createElement("option");
        newOpt.innerText = currCode;
        newOpt.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOpt.selected = "selected";
        } else {
            if (select.name === "to" && currCode === "INR") {
                newOpt.selected = "selected";
            }
        }
        select.append(newOpt);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
});

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }

    const URL = `${API_URL}&base_currency=${fromCurr.value.toUpperCase()}&currencies=${toCurr.value.toUpperCase()}`;

    try {
        let response = await fetch(URL);

        if (!response.ok) {
            throw new Error("Failed to fetch exchange rate data");
        }

        let data = await response.json();

        let rate = data.data[toCurr.value.toUpperCase()];

        let finalAmt = Math.floor(amtVal * rate);
        msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
    } catch (error) {
        msg.innerText = `Error: ${error.message}`;
    }
};





















