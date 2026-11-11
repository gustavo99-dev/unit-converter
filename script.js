const categorySelect = document.getElementById("category");
const inputValue = document.getElementById("input-value");
const fromUnitSelect = document.getElementById("from-unit");
const toUnitSelect = document.getElementById("to-unit");
const resultText = document.getElementById("result-text");

const units = {
    length: [
        { label: "Metros (m)", value: "m" },
        { label: "Quilômetros (km)", value: "km" },
        { label: "Centímetros (cm)", value: "cm" },
        { label: "Milhas (mi)", value: "mi" }
    ],
    weight: [
        { label: "Quilogramas (kg)", value: "kg" },
        { label: "Gramas (g)", value: "g" },
        { label: "Libras (lb)", value: "lb" }
    ],
    temperature: [
        { label: "Celsius (°C)", value: "C" },
        { label: "Fahrenheit (°F)", value: "F" },
        { label: "Kelvin (K)", value: "K" }
    ]
};

function populateSelects() {
    const category = categorySelect.value;
    const currentUnits = units[category];

    fromUnitSelect.innerHTML = "";
    toUnitSelect.innerHTML = "";

    currentUnits.forEach((unit, index) => {
        const option1 = new Option(unit.label, unit.value);
        const option2 = new Option(unit.label, unit.value);
        fromUnitSelect.add(option1);
        toUnitSelect.add(option2);
    });

    if (currentUnits.length > 1) {
        toUnitSelect.selectedIndex = 1;
    }

    convert();
}

function convert() {
    const category = categorySelect.value;
    const value = parseFloat(inputValue.value);
    const from = fromUnitSelect.value;
    const to = toUnitSelect.value;

    if (isNaN(value)) {
        resultText.innerText = "---";
        return;
    }

    let result = 0;

    if (category === "length") {
        const toMeters = { m: 1, km: 1000, cm: 0.01, mi: 1609.34 };
        const meters = value * toMeters[from];
        result = meters / toMeters[to];
    } else if (category === "weight") {
        const toKg = { kg: 1, g: 0.001, lb: 0.453592 };
        const kg = value * toKg[from];
        result = kg / toKg[to];
    } else if (category === "temperature") {
        let celsius = 0;
        if (from === "C") celsius = value;
        else if (from === "F") celsius = (value - 32) * (5 / 9);
        else if (from === "K") celsius = value - 273.15;

        if (to === "C") result = celsius;
        else if (to === "F") result = (celsius * 9 / 5) + 32;
        else if (to === "K") result = celsius + 273.15;
    }

    resultText.innerText = `${result.toFixed(4)} ${to}`;
}

categorySelect.addEventListener("change", populateSelects);
inputValue.addEventListener("input", convert);
fromUnitSelect.addEventListener("change", convert);
toUnitSelect.addEventListener("change", convert);

populateSelects();