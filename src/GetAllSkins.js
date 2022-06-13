// ==UserScript==
// @name         Surviv.io plugin [5]
// @namespace    http://tampermonkey.net/
// @version      1.0
// @icon         https://static.wikia.nocookie.net/survivio/images/8/86/Awm.png/revision/latest?cb=20180728101224
// @description  Plugins for surviv.io
// @author       Me0w0
// @match        https://surviv.io
// @match        https://surviv.io/*
// @grant        none
// ==/UserScript==


(function() {
    'use strict';

    // Global variables
    let skin = null,
        targetSkin = null,
        isButtonVisible = true,
        isShopOpen = false;

    // Sets target to current skin in local storage or if it's your first time using it, to the developer skin
    const target = (window.localStorage.getItem("curSkin") !== null) ? window.localStorage.getItem("curSkin") : "outfitDev";

    // Get the skins module
    const func = {
        webpack_inject: (w, e, get) => { skin = get("63d67e9d") }
    };

    if (typeof window.webpackJsonp === 'function') window.webpackJsonp([0], func, ["webpack_inject"]);
    else window.webpackJsonp.push([ ["webpack_inject"], func, [["webpack_inject"]] ]);

    // DOM Elements

    // Wrapper for all skins
    const wrapper = document.createElement("div");
    wrapper.style.cssText = `
        position: absolute;
        width: 50%;
        height: 70%;
        left: 25%;
        top: 15%;
        background-image: linear-gradient(#20BF55, #01BAEF);
        overflow: auto;
        display: none;
        text-align: center;
        border-radius: 25px;
        border: 2px solid black;
    `;
    document.body.appendChild(wrapper);

    // Label for which skin you picked at top of container
    const s = document.createElement("p");
    s.style.cssText = `
        color: white;
        font-size: 25px;
        position: sticky;
    `;

    s.innerText = skin[target].name;
    wrapper.appendChild(s);

    // Button to open and close the container
    const b = document.createElement("button");
    b.innerText = "Skins";
    b.style.cssText = `
        position: absolute;
        width: 10%;
        height: 5%;
        top: 10%;
        left: 1%;
    `;
    document.body.appendChild(b);

    // Listen for button to be clicked to toggle the container's visibility
    b.addEventListener("click", () => {
        isShopOpen = !isShopOpen;

        if (isShopOpen) {
            wrapper.style.display = "block"; // Open
        } else if (!isShopOpen) {
            wrapper.style.display = "none"; // Close
        }
    })

    // The settings options ingame
    document.getElementById("ui-game-menu").style.overflow = "auto";

    // Add option to show/hide the button to toggle the container
    const opt = document.createElement("div");
    opt.className = "btn-fullscreen-toggle btn-game-menu btn-darken";
    opt.innerText = "Hide Custom Skins Button";
    opt.style.display = "block";
    document.getElementById("ui-game-menu").appendChild(opt);

    // Listen for the button to be clicked to toggle the button's visibility
    opt.addEventListener("click", () => {
        isButtonVisible = !isButtonVisible;

        if (isButtonVisible) {
            b.style.display = "block";
        } else if (!isButtonVisible) {
            b.style.display = "none";
        }
    })

    // Function to change skin
    const changeSkin = function(skinName) {
        targetSkin = skin[skinName];

        // Loop through every skin and change it to target skin
        Object.keys(skin).forEach(key => {
            if (skin[key].type === "outfit") { // Checks if it is a skin
                for (let i in skin[key].skinImg) {
                    skin[key].skinImg[i] = targetSkin.skinImg[i]; // Change all the of skin's properties to the target skin
                }

                if ("accessory" in targetSkin) skin[key].accessory = targetSkin.accessory; // If the target skin has accessories, add that too
            }
        })

        s.innerText = targetSkin.name;
        window.localStorage.setItem("curSkin", skinName); // Sets the current skin in local storage so you don't have to pick your skin every time
    }

    // Loop through every skin and add it to the container
    Object.keys(skin).forEach(key => {
        if (skin[key].type === "outfit") {
            const i = new Image(50, 50); // Creates image of the skin
            i.src = `https://surviv.io/img/loot/${skin[key].lootImg.sprite.slice(0,-3) + "svg"}`; // Sets the picture
            i.alt = key;
            wrapper.appendChild(i); // Add it to the container

            // Change the skin when it is clicked
            i.addEventListener("click", () => { changeSkin(key) });

            // Hover effects
            i.addEventListener("mouseover", () => { i.style.backgroundColor = "red" })
            i.addEventListener("mouseout", () => { i.style.backgroundColor = "" })
        }
    })

    // Change skin to curSkin in local storage or set it to "outfitDev" (Developer skin!)
    changeSkin(target);
})();
