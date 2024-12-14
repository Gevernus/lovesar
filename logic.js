import { setParams } from './banuba.sdk.js';

let params = { lipsColor: "0 0 0 0", browsColor: "0 0 0 0", softlight: "0.0" }

// Attach event listeners
document.getElementById('lips').addEventListener('click', () => startAR('lips'));
document.getElementById('brows').addEventListener('click', () => startAR('brows'));
document.getElementById('care').addEventListener('click', () => startAR('care'));
document.getElementById('book').addEventListener('click', () => showList());
document.getElementById('brush').addEventListener('click', () => startAR('lipsColor'));
document.getElementById('cart').addEventListener('click', () => showCart());

const sectionDropdown = document.getElementById("section-dropdown");
const colorPalette = document.getElementById("color-palette");
const careSlider = document.getElementById("care-slider");
const softlightSlider = document.getElementById("softlight-slider");

sectionDropdown.addEventListener("change", (event) => {
    const selectedSection = event.target.value;

    // Show/Hide elements based on selection
    if (selectedSection === "lips" || selectedSection === "brows") {
        colorPalette.style.display = "flex";
        careSlider.style.display = "none";
    } else if (selectedSection === "care") {
        colorPalette.style.display = "none";
        careSlider.style.display = "block";
    }
});

colorPalette.addEventListener("click", (event) => {
    const colorElement = event.target;
    if (colorElement.classList.contains("color-circle")) {
        const selectedColor = colorElement.getAttribute("data-color");
        const selectedSection = sectionDropdown.value;
        // Update params based on selected section
        if (selectedSection === "lips") {
            params.lipsColor = convertColorToNormalized(selectedColor);
        } else if (selectedSection === "brows") {
            params.browsColor = convertColorToNormalized(selectedColor);
        }
        setParams(params);
        console.log("Updated Params:", params);
    }
});

softlightSlider.addEventListener("input", (event) => {
    params.softlight = event.target.value;
    setParams(params);
    console.log("Updated Params:", params);
});

function showList() {
    document.querySelector('.content').style.display = 'block';
    document.querySelector('.ar-content').style.display = 'none';
    document.querySelector('.cart-content').style.display = 'none';
}

function showCart() {
    document.querySelector('.content').style.display = 'none';
    document.querySelector('.ar-content').style.display = 'none';
    document.querySelector('.cart-content').style.display = 'flex';
}

function startAR(selection) {
    sectionDropdown.value = selection;
    document.querySelector('.content').style.display = 'none';
    document.querySelector('.ar-content').style.display = 'block';
    document.querySelector('.cart-content').style.display = 'none';
}

function convertColorToNormalized(color) {
    let r = 0, g = 0, b = 0, a = 1; // Default to black with full opacity
    if (color.startsWith("#")) {
        // Convert HEX format to RGBA
        if (color.length === 7) {
            // #RRGGBB
            r = parseInt(color.slice(1, 3), 16);
            g = parseInt(color.slice(3, 5), 16);
            b = parseInt(color.slice(5, 7), 16);
        } else if (color.length === 4) {
            // #RGB (short-hand notation)
            r = parseInt(color[1] + color[1], 16);
            g = parseInt(color[2] + color[2], 16);
            b = parseInt(color[3] + color[3], 16);
        }
    } else if (color.startsWith("rgba")) {
        // Extract RGBA values from rgba(R, G, B, A)
        const rgbaMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*(\d?.?\d+)?\)/);
        if (rgbaMatch) {
            r = parseInt(rgbaMatch[1], 10);
            g = parseInt(rgbaMatch[2], 10);
            b = parseInt(rgbaMatch[3], 10);
            a = rgbaMatch[4] !== undefined ? parseFloat(rgbaMatch[4]) : 1;
        }
    } else if (/^\d+\s\d+\s\d+(\s\d?.?\d+)?$/.test(color)) {
        // Parse space-separated format: "R G B A" or "R G B"
        const parts = color.split(" ");
        r = parseInt(parts[0], 10);
        g = parseInt(parts[1], 10);
        b = parseInt(parts[2], 10);
        a = parts[3] !== undefined ? parseFloat(parts[3]) : 1;
    }

    // Normalize each value
    const rNormalized = (r / 255).toFixed(2);
    const gNormalized = (g / 255).toFixed(2);
    const bNormalized = (b / 255).toFixed(2);
    const aNormalized = a.toFixed(2);

    return `${rNormalized} ${gNormalized} ${bNormalized} ${aNormalized}`;
}
