// ====== DOM Elements Selector Cache ======
const topScroller = document.querySelector(".scroller");
const header = document.querySelector(".main-header");
const mainLogo = document.querySelector(".main-logo img");
const menuToggle = document.querySelector(".menu-btn");
const leftMenu = document.querySelector(".leftmenu");
const leftQuit = document.querySelector(".left-menu .close");
const cartBtn = document.querySelector(".cart");
const cart = document.querySelector(".cart-wrapper");
const cartQuit = document.querySelector(".cart-wrapper .close");
const itemWrapper = document.querySelector(".item-wrapper");
const sign = document.querySelector(".signbtn");
const signQuit = document.querySelector(".sign-section .close");
const signWrapper = document.querySelector(".sign-wrapper");
const passwordInput = document.getElementById("password");
const hidepass = document.querySelector(".hidepass");
const showpass = document.querySelector(".showpass");

// ====== 1. Combined Window Scroll Management ======
window.addEventListener("scroll", () => {
    const scrollTop = document.documentElement.scrollTop;
    
    // Top Scroller Progress
    const sHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const sAmount = (scrollTop / sHeight) * 100;
    topScroller.style.width = `${sAmount}%`;

    // Header Stickiness & Logo Toggle
    if (scrollTop >= 500) {
        if (!header.classList.contains("fixed-header")) {
            mainLogo.setAttribute("src", "assets/identity/logo-white.png");
            header.classList.add("fixed-header", "gettop");
        }
    } else {
        if (header.classList.contains("fixed-header")) {
            mainLogo.setAttribute("src", "assets/identity/logo.png");
            header.classList.remove("fixed-header", "gettop");
        }
    }
});

// ====== 2. Left Menu Navigation ======
[menuToggle, leftQuit].forEach(btn => {
    btn?.addEventListener("click", () => leftMenu.classList.toggle("show"));
});

// ====== 3. Cart & Local Storage Management ======
let StorageCart = JSON.parse(localStorage.getItem("products")) || [];

// Unified Function to Render Cart Items
const renderCartItem = (product) => {
    removeMsg();
    
    const cartItem = document.createElement("div");
    cartItem.classList.add("item");

    cartItem.innerHTML = `
        <img src="${product.img}" alt="${product.Name}">
        <div class="texts">
            <h3>${product.Name}</h3>
            <span>${product.Price}</span>
        </div>
    `;
    itemWrapper.append(cartItem);
    
    // Update Badge Count
    cartBtn.firstElementChild.setAttribute("data-count", StorageCart.length);
};

// Initial Load From Storage
if (StorageCart.length > 0) {
    window.addEventListener("DOMContentLoaded", () => {
        StorageCart.forEach(product => renderCartItem(product));
    });
}

// Open/Close Cart
cartBtn.addEventListener("click", () => cart.classList.add("show"));
cartQuit.addEventListener("click", () => cart.classList.remove("show"));

// Add Product Event
document.querySelectorAll(".post").forEach((postElement) => {
    postElement.addEventListener("click", () => {
        postElement.classList.add("added");

        const product = {
            Name: postElement.querySelector("h3").innerText,
            img: postElement.querySelector("img").getAttribute("src"),
            Color: postElement.querySelector("span").innerText,
            Price: postElement.querySelector(".price").innerText
        };

        StorageCart.push(product);
        localStorage.setItem("products", JSON.stringify(StorageCart));
        
        renderCartItem(product);
    });
});

// Clear Cart
document.querySelector(".clear").addEventListener("click", () => {
    localStorage.removeItem("products");
    window.location.reload();
});

// Remove Landing Message Empty State
const removeMsg = () => {
    const emptyHeading = itemWrapper.querySelector("h2");
    if (emptyHeading) emptyHeading.remove();
    itemWrapper.style.alignItems = "start";
    itemWrapper.style.justifyContent = "start";
};

// ====== 4. Optimized Slider Engine ======
let currentSlide = 1;
const Slides = document.querySelectorAll(".slide");
const nextSlide = document.querySelector(".next");
const prevSlide = document.querySelector(".prev");
const circlez = document.querySelectorAll(".crcl");

const updateSliderUI = () => {
    Slides.forEach((slide, idx) => {
        slide.classList.toggle("hide", idx !== currentSlide);
    });

    circlez.forEach((circle) => {
        const circleNum = parseInt(circle.getAttribute("data-num")) - 1;
        circle.classList.toggle("active", circleNum === currentSlide);
    });
};

// Setup Navigation Dots Click Events Once
circlez.forEach((circle) => {
    circle.addEventListener("click", () => {
        currentSlide = parseInt(circle.getAttribute("data-num")) - 1;
        updateSliderUI();
    });
});

nextSlide.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % Slides.length;
    updateSliderUI();
});

prevSlide.addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + Slides.length) % Slides.length;
    updateSliderUI();
});

// Initialize First View
updateSliderUI();

// ====== 5. Sign-in Section & Password Visibility ======
[sign, signQuit].forEach(btn => {
    btn?.addEventListener("click", () => signWrapper.classList.toggle("show"));
});

hidepass.style.display = "none";

showpass.addEventListener("click", () => {
    passwordInput.setAttribute("type", "text");
    hidepass.style.display = "block";
    showpass.style.display = "none";
});

hidepass.addEventListener("click", () => {
    passwordInput.setAttribute("type", "password");
    showpass.style.display = "block";
    hidepass.style.display = "none";
});

// ====== 6. Sidebar Actions & Filter Toggles ======
const dropdowns = document.querySelectorAll(".ddown .droped");
const nested = document.querySelectorAll(".nested-side");

dropdowns.forEach((dropBtn) => {
    dropBtn.addEventListener("click", (e) => {
        const target = e.currentTarget;
        const targetNextEl = target.nextElementSibling;
        const isCurrentlyRotated = target.classList.contains("rot");

        // Reset all other dropdowns
        dropdowns.forEach(el => el.classList.remove("rot"));
        nested.forEach(el => el.classList.remove("active"));

        // Toggle current dropdown state
        if (!isCurrentlyRotated) {
            target.classList.add("rot");
            targetNextEl?.classList.add("active");
        }
    });
});

// Generic Toggle/Active Handler for List Filters (Storage, Brands, Ship)
const setupListFilters = (selector, isMultiple = false) => {
    const listItems = document.querySelectorAll(selector);
    listItems.forEach(item => {
        item.addEventListener("click", (e) => {
            if (!isMultiple) {
                listItems.forEach(el => el.classList.remove("active"));
            }
            e.currentTarget.classList.toggle("active", !isMultiple || undefined);
        });
    });
};

setupListFilters(".storage li", false);
setupListFilters(".brands li", true); // Multi-select allowed
setupListFilters(".ship li", false);
