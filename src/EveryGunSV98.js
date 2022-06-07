(function() {
    'use strict';
    let gun = null;
    let ammo = null;
    const target = ["SV-98", "sv98"];

    const func = {
        webpack_inject: (w, e, get) => {
            gun = get("ad1c4e70")
            ammo = get("764654e6")
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

    Object.keys(gun).forEach(key => {
        if(gun[key].type === "gun") {
            gun[key].dualWieldType = target[0];
            gun[key].lootImg.sprite = `loot-weapon-${target[1]}.img`;
            gun[key].name = target[0];

            for (let i in gun[key].worldImg) {
                gun[key].worldImg[i] = gun[target[1]].worldImg[i];
            }

            for (let i in gun[key].sound) {
                gun[key].sound[i] = gun[target[1]].sound[i];
            }
        }
    })

    const ammoType = gun[target[1]].ammo;

    Object.keys(ammo).forEach(key => {
        if(ammo[key].type === "ammo") {
            ammo[key].lootImg.tint = ammo[ammoType].lootImg.tint;
            ammo[key].lootImg.tintDark = ammo[ammoType].lootImg.tintDark;
        }
    })
})();
