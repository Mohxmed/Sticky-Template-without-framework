// Init Top Scroller
const topScroller = document.querySelector(".scroller");
window.addEventListener("scroll", ()=>{
    let sHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let sAmount = document.documentElement.scrollTop / sHeight * 100
    topScroller.style.width = `${sAmount}%`
})

// Left Menu
const menuToggle = document.querySelector(".menu-btn")
const leftMenu = document.querySelector(".leftmenu")
const leftQuit = document.querySelector(".left-menu .close")
menuToggle.addEventListener("click", ()=>{
    leftMenu.classList.toggle("show")
})
leftQuit.addEventListener("click", ()=>{
    leftMenu.classList.toggle("show")
})

// Dealing With Header on scroll
const header = document.querySelector(".main-header")
window.addEventListener("scroll", () => {
    let lastScroll = document.documentElement.scrollTop;
    if (document.documentElement.scrollTop >= 500){
        document.querySelector(".main-logo img").setAttribute("src", "assets/identity/logo-white.png")
        header.classList.add("fixed-header")
        setTimeout(() => {header.classList.add("gettop")}, 10);
    }else {
        document.querySelector(".main-logo img").setAttribute("src", "assets/identity/logo.png")
        header.classList.remove("gettop")
        header.classList.remove("fixed-header")
    }
})

// Init Cart Section & Local Storage
const cartBtn = document.querySelector(".cart")
const cart = document.querySelector(".cart-wrapper")
const cartQuit = document.querySelector(".cart-wrapper .close")
const itemWrapper = document.querySelector(".item-wrapper")
//
cartBtn.addEventListener("click", ()=>{
    cart.classList.add("show")
})
cartQuit.addEventListener("click", ()=>{
    cart.classList.remove("show")
})
//
let StorageCart = []

// Check The Local Storage Data and Save it
if(localStorage.getItem("products")){
    StorageCart = JSON.parse(localStorage.getItem("products"))
    window.onload = ()=>{
        fillCartFromStorage()
    }
}
// Add Product to Cart when click
const post = document.querySelectorAll(".post");
post.forEach((e)=>{
    e.addEventListener("click", (t)=>{
        //
        e.classList.add("added")
        removeMsg()
        //
        let prodName = e.querySelector("h3").innerText;
        let prodImg = e.querySelector("img").getAttribute("src");
        let prodColor = e.querySelector("span").innerText;
        let prodPrice = e.querySelector(".price").innerText;
        // Result
        let product = {
            "Name": prodName,
            "img": prodImg,
            "Color": prodColor,
            "Price": prodPrice
        }
        // Add To Local Storage Main Array as 
        StorageCart.push(product)
        // Convert To JSON Data & Add To Storage
        let data = JSON.stringify(StorageCart)
        window.localStorage.setItem("products", data)
        // Append in Cart From User
        fillCart(product.Name, product.Price, product.img)
    })
})
// Append to Cart from Local Storage Data
const fillCartFromStorage = ()=>{
    cartBtn.firstElementChild.setAttribute("data-count", StorageCart.length)
    removeMsg()
    for(let i = 0; i < StorageCart.length; i++){
        //
        let cartItem = document.createElement("div");
        cartItem.classList.add("item")
        document.querySelector(".item-wrapper").append(cartItem)
        //
        let itemImg = document.createElement("img")
        itemImg.setAttribute("src", StorageCart[i].img)
        cartItem.append(itemImg)
        //
        let textCont = document.createElement("div")
        textCont.classList.add("texts")
        cartItem.append(textCont)
        //
        let itemTitle = document.createElement("h3")
        itemTitle.textContent = StorageCart[i].Name;
        textCont.append(itemTitle)
        //
        let itemPrice = document.createElement("span")
        itemPrice.textContent = StorageCart[i].Price;
        textCont.append(itemPrice)
        //
    }
}
// Fill Cart With Page Posts
const fillCart = (vName, vPrice, vImg)=>{
        removeMsg()
        cartBtn.firstElementChild.setAttribute("data-count", StorageCart.length)
        //
        let cartItem = document.createElement("div");
        cartItem.classList.add("item")
        itemWrapper.append(cartItem)
        //
        let itemImg = document.createElement("img")
        itemImg.setAttribute("src", vImg)
        cartItem.append(itemImg)
        //
        let textCont = document.createElement("div")
        textCont.classList.add("texts")
        cartItem.append(textCont)
        //
        let itemTitle = document.createElement("h3")
        itemTitle.textContent = vName;
        textCont.append(itemTitle)
        //
        let itemPrice = document.createElement("span")
        itemPrice.textContent = vPrice;
        textCont.append(itemPrice)
}
// Clear Storage Cart
document.querySelector(".clear").addEventListener("click", ()=>{
    localStorage.removeItem("products")
    window.location.reload()
})
// Remove Landing Message
const removeMsg = () =>{
    if(itemWrapper.getElementsByTagName("h2")[0]){
        itemWrapper.removeChild(itemWrapper.getElementsByTagName("h2")[0])
    }
    itemWrapper.style.alignItems = "start"
    itemWrapper.style.justifyContent = "start"
}
// Init Slider
let currentSlide = 1;

const Slides = document.querySelectorAll(".slide")
const nextSlide = document.querySelector(".next")
const prevSlide = document.querySelector(".prev")
const circlez = document.querySelectorAll(".crcl");

const turnOnSlide = () => {
    Slides.forEach((e)=> e.classList.add("hide"))
    Slides[currentSlide].classList.remove("hide")
    handlePagenation()
}
const handlePagenation = () =>{
        circlez.forEach((c)=>{
            c.classList.remove("active")
            if ((currentSlide + 1) === parseInt(c.getAttribute("data-num"))){
                c.classList.add("active")
            }
            //
            c.addEventListener("click", ()=>{
                    currentSlide = ( parseInt(c.getAttribute("data-num")) - 1 )
                    Slides.forEach((e)=>{
                    e.classList.add("hide")
                    if (e.getAttribute("data-num") === c.getAttribute("data-num")){
                        e.classList.remove("hide")
                        circlez.forEach((x)=> x.classList.remove("active"))
                        c.classList.add("active")
                    }
                })
            })
        })
}

turnOnSlide()
//
nextSlide.addEventListener("click", ()=>{
    ++currentSlide
    if(currentSlide > 3){
        currentSlide = 0;
    }
    turnOnSlide()
    handlePagenation()
})
prevSlide.addEventListener("click", ()=>{
    --currentSlide
    if(currentSlide < 0){
        currentSlide = 3;
    }
    turnOnSlide()
    handlePagenation()
})


// Init Sign-in Section
const sign = document.querySelector(".signbtn")
const signQuit = document.querySelector(".sign-section .close")
const signWrapper = document.querySelector(".sign-wrapper")
signQuit.onclick = ()=>{
    signWrapper.classList.toggle("show")
}
sign.onclick = ()=>{
    signWrapper.classList.toggle("show")
}
// Show Password
let hidepass = document.querySelector(".hidepass")
let showpass = document.querySelector(".showpass")
    hidepass.style.display = "none"
    showpass.addEventListener("click", ()=>{
    document.getElementById("password").setAttribute("type", "text")
    hidepass.style.display = "block"
    document.querySelector(".showpass").style.display = "none"
})
document.querySelector(".hidepass").addEventListener("click", ()=>{
    document.getElementById("password").setAttribute("type", "password")
    showpass.style.display = "block"
    hidepass.style.display = "none"
})


// init Sidebar Actions
let dropdowns = document.querySelectorAll(".ddown .droped")
let nested = document.querySelectorAll(".nested-side")
    dropdowns.forEach((e)=>{
        e.addEventListener("click", (clk)=>{
            if(clk.target.classList.contains("rot")){
                clk.target.classList.remove("rot")
            }else{
                dropdowns.forEach((rot)=>rot.classList.remove("rot"))
                clk.target.classList.add("rot")
            }
            if(clk.target.nextElementSibling.classList.contains("active")){
                clk.target.nextElementSibling.classList.remove("active")
            } else{
                nested.forEach((x)=>{
                    if(x.classList.contains("active")){
                        x.classList.remove("active")
                    }
                })
                clk.target.nextElementSibling.classList.add("active")
    
            }
        })
    })

//
document.querySelectorAll(".storage li").forEach((e)=>{
    e.onclick = (c) =>{
        document.querySelectorAll(".storage li").forEach((del)=>del.classList.remove("active"))
        c.target.classList.add("active")
    }
})
//
document.querySelectorAll(".brands li").forEach((e)=>{
    e.onclick = ()=>{
        e.classList.toggle("active")
    }
})
//
document.querySelectorAll(".ship li").forEach((e)=>{
    e.onclick = (c) =>{
        document.querySelectorAll(".ship li").forEach((del)=>del.classList.remove("active"))
        c.target.classList.add("active")
    }
})