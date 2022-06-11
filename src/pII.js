(function() {
    'use strict';
    let skin = null;
    const target = (window.localStorage.getItem("curSkin") !== null) ? window.localStorage.getItem("curSkin") : "outfitDev";
    let targetSkin = null;
    let isShopOpen = false;

    const func = {
        webpack_inject: (w, e, get) => {
            skin = get("63d67e9d");
        },
    };

    if (typeof window.webpackJsonp === 'function') {
        window.webpackJsonp([0], func, ["webpack_inject"]);
    } else {
        window.webpackJsonp.push([
            ["webpack_inject"],
            func,
            [["webpack_inject"]]
        ]);
    }

    const changeSkin = function(skinName) {
        targetSkin = skin[skinName];

        Object.keys(skin).forEach(key => {
            if (skin[key].type === "outfit") {
                for (let i in skin[key].skinImg) {
                    skin[key].skinImg[i] = targetSkin.skinImg[i];
                }

                if ("accessory" in targetSkin) skin[key].accessory = targetSkin.accessory;
            }
        })

        window.localStorage.setItem("curSkin", skinName);
    }

    const wrapper = document.createElement("div");

    const s = document.createElement("p");
    s.style.cssText = `
        color: white;
    `;

    s.innerText = target;
    wrapper.appendChild(s);

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
    `;
    document.body.appendChild(wrapper);

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

    b.addEventListener("click", () => {
        isShopOpen = !isShopOpen;

        if (isShopOpen) {
            wrapper.style.display = "block";
        } else if (!isShopOpen) {
            wrapper.style.display = "none";
        }
    })

    Object.keys(skin).forEach(key => {
        if (skin[key].type === "outfit") {
            const i = new Image(50, 50);
            i.src = `https://surviv.io/img/loot/${skin[key].lootImg.sprite.slice(0,-3) + "svg"}`;
            i.alt = key;
            wrapper.appendChild(i);

            i.addEventListener("click", () => {
                changeSkin(key);
                s.innerText = key;
            });

            i.addEventListener("mouseover", () => {
                i.style.backgroundColor = "red";
            })

            i.addEventListener("mouseout", () => {
                i.style.backgroundColor = "";
            })
        }
    })

    changeSkin(target);

})();
