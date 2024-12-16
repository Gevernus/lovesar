import { setParams } from './banuba.sdk.js';

const products = [
    {
        "name": "Cosmetic Pencil (Black brown), AS company",
        "price": 5.00,
        "image": "public/shop-pencil.png",
        "description": "Cosmetic Pencil (Black brown), AS company",
        "colors": [
            "#CDC4C4", "#19191A", "#DBA683", "#793757", "#002E65",
            "#653F2A", "#0D0D0D", "#D38A57", "#404D43", "#78272D"
        ] // Colors for стрелки
    },
    {
        "name": "Green soap with disinfecting property (skin antiseptic)",
        "price": 10.00,
        "image": "public/shop-spray.png",
        "description": "Green soap with disinfecting property (skin antiseptic)",
        "colors": [] // No specific palette
    },
    {
        "name": "Concentrate cherry lip pigment, 12ml",
        "price": 39.80,
        "image": "public/shop-cherry.png",
        "description": "Concentrate cherry lip pigment",
        "colors": [
            "#7A1F26", "#B35560", "#690D0E", "#8C2631", "#D61111",
            "#CF0205", "#5E1625", "#B00731", "#C97E6D", "#F03A2C"
        ] // Colors for помада
    },
    {
        "name": "Eyeshadow Pencil, AS company",
        "price": 8.00,
        "image": "public/shop-eyeshadow.jpeg",
        "description": "Eyeshadow Pencil, AS company",
        "colors": [
            "#EDB789", "#A5A3A4", "#B24A2F", "#DEA98C", "#786834",
            "#266467", "#8E3F44", "#211F22", "#B73B6F", "#1E1B1B"
        ] // Colors for тени
    },
    {
        "name": "Blushes Pencil, AS company",
        "price": 4.00,
        "image": "public/shop-blushes.jpg",
        "description": "Blushes Pencil, AS company",
        "colors": [
            "#D8867B", "#D897B2", "#EF2B41", "#F48E7F", "#A13555",
            "#E7756B", "#EB4A6C", "#DA8A73", "#F25A59", "#F79792"
        ] // Colors for румяна
    },
    {
        "name": "Lashes Pencil, AS company",
        "price": 12.00,
        "image": "public/shop-lashes.webp",
        "description": "Lashes Pencil, AS company",
        "colors": [
            "#FFFFFF", "#000000", "#8B4513"
        ] // Colors for ресницы
    },
    {
        "name": "Eyeliner, AS company",
        "price": 14.00,
        "image": "public/shop-eyeliner.jpg",
        "description": "Eyeliner, AS company",
        "colors": [
            "#FFFFFF", "#000000", "#8B4513"
        ] // Colors for подводки
    }
];

let params = { lipsColor: "0 0 0 0", browsColor: "0 0 0 0", softlight: "0.0" }
updateProductInfo(products[2]);
// Attach event listeners
document.getElementById('lips').addEventListener('click', () => startAR('lips'));
document.getElementById('brows').addEventListener('click', () => startAR('brows'));
document.getElementById('care').addEventListener('click', () => startAR('care'));
document.getElementById('blushes').addEventListener('click', () => startAR('blushes'));
document.getElementById('eyeshadow').addEventListener('click', () => startAR('eyeshadow'));
document.getElementById('lashes').addEventListener('click', () => startAR('lashes'));
document.getElementById('eyeliner').addEventListener('click', () => startAR('eyeliner'));
document.getElementById('book').addEventListener('click', () => showList());
document.getElementById('brush').addEventListener('click', () => startAR('lips'));
document.getElementById('cart').addEventListener('click', () => showCart());

const sectionDropdown = document.getElementById("section-dropdown");
const colorPalette = document.getElementById("color-palette");
const careSlider = document.getElementById("care-slider");
const softlightSlider = document.getElementById("softlight-slider");
let productsInCart = 0;
updateCartBadge(productsInCart);

sectionDropdown.addEventListener("change", (event) => {
    const selectedSection = event.target.value;

    // Show/Hide elements based on selection
    if (selectedSection === "lips") {
        updateProductInfo(products[2]);
        colorPalette.style.display = "flex";
        careSlider.style.display = "none";
    } else if (selectedSection === "care") {
        updateProductInfo(products[1]);
        colorPalette.style.display = "none";
        careSlider.style.display = "block";
    } else if (selectedSection === "brows") {
        updateProductInfo(products[0]);
        colorPalette.style.display = "flex";
        careSlider.style.display = "none";
    } else if (selectedSection === "blushes") {
        updateProductInfo(products[4]);
        colorPalette.style.display = "flex";
        careSlider.style.display = "none";
    } else if (selectedSection === "eyeshadow") {
        updateProductInfo(products[3]);
        colorPalette.style.display = "flex";
        careSlider.style.display = "none";
    } else if (selectedSection === "lashes") {
        updateProductInfo(products[5]);
        colorPalette.style.display = "flex";
        careSlider.style.display = "none";
    } else if (selectedSection === "eyeliner") {
        updateProductInfo(products[6]);
        colorPalette.style.display = "flex";
        careSlider.style.display = "none";
    }
});

colorPalette.addEventListener("click", (event) => {
    const colorElement = event.target;
    if (colorElement.classList.contains("color-circle")) {
        const selectedColor = colorElement.getAttribute("data-color");
        const bgColor = window.getComputedStyle(colorElement).backgroundColor;

        const selectedSection = sectionDropdown.value;
        // Update params based on selected section
        if (selectedSection === "lips") {
            params.lipsColor = convertColorToNormalized(bgColor);
        } else if (selectedSection === "brows") {
            params.browsColor = convertColorToNormalized(bgColor);
        } else if (selectedSection === "blushes") {
            params.blushes = convertColorToNormalized(bgColor);
        } else if (selectedSection === "eyeshadow") {
            params.eyeShadow = convertColorToNormalized(bgColor);
        } else if (selectedSection === "lashes") {
            params.eyeLashes = convertColorToNormalized(bgColor);
        } else if (selectedSection === "eyeliner") {
            params.eyeLiner = convertColorToNormalized(bgColor);
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
    const event = new Event("change");
    sectionDropdown.dispatchEvent(event);
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
    } else if (color.startsWith("rgb")) {
        // Extract RGB values from rgb(R, G, B)
        const rgbMatch = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (rgbMatch) {
            r = parseInt(rgbMatch[1], 10);
            g = parseInt(rgbMatch[2], 10);
            b = parseInt(rgbMatch[3], 10);
            a = 1; // Fully opaque if no alpha
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

// Function to create product element and append it to the cart
function addProductToCart(product) {
    const cartContent = document.querySelector('.cart-content');

    const productElement = document.createElement('div');
    productElement.classList.add('product');

    productElement.innerHTML = `
    <div class="product-image">
      <img src="${product.image}" alt="${product.name}">
    </div>
    <div class="product-details">
      <h3>${product.name}</h3>
      <p>${product.price}</p>
      <button class="remove-button">X</button>
    </div>
  `;
    updateCartBadge(++productsInCart);
    // Append the new product element to the cart-content container
    cartContent.appendChild(productElement);
    const removeButton = productElement.querySelector('.remove-button');
    removeButton.addEventListener('click', function () {
        cartContent.removeChild(productElement);
        updateCartBadge(--productsInCart);
    });
}

function updateCartBadge(value) {
    const badge = document.getElementById("badge");
    badge.textContent = value; // Update badge number
    badge.style.display = value > 0 ? "block" : "none"; // Hide badge if value is 0
}

function updateProductInfo(product) {
    const productInfo = document.querySelector('.product-info');
    productInfo.innerHTML = `
    <img class="product-image" src="${product.image}" alt="Product Image" />
    <div class="product-details">
      <div class="product-title">${product.name}</div>
      <img class="recipe-button" src="public/buy.png" alt="Buy button" />
    </div>
  `;

    const colorPalette = document.querySelector('#color-palette');

    if (product.colors && product.colors.length > 0) {
        colorPalette.innerHTML = `
        <div class="color-circle" style="background-color: transparent; border: 1px dashed #ccc;" title="No Color"></div>
        ${product.colors.map(color => `
            <div class="color-circle" style="background-color: ${color};" title="${color}">
            </div>
        `).join('')}`;
    } else {
        colorPalette.innerHTML = '<p>No colors available for this product.</p>';
    }

    // Add event listener to the "Buy" button inside product-info
    const buyButton = productInfo.querySelector('.recipe-button');
    buyButton.addEventListener('click', function () {
        addProductToCart(product);
    });
}
