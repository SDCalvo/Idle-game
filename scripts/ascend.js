//ascend

function ascend() {

    const { materials, achievements, achievementsUnlocked, ascension } = clicker;
    clicker = {...createClickerDefault(), materials, achievements, achievementsUnlocked, ascension };

    console.log(clicker);
    for (i in clicker.upgrades) {

        updateUI(i);
        clicker.upgrades[i].unlocked = false;
    }
}

function buyPerk(perkObject, perkName) {


    // console.log(perkObject);
    const { materialsPrice, perksRequired } = perkObject;

    console.log("Unlocked: " + perkObject.unlocked)

    if (perkObject.unlocked) return;

    for (material in materialsPrice) {

        if (clicker.materials[material].amount < materialsPrice[material]) {

            console.log("Material validation: " + clicker.materials[material].name + " amount: " + clicker.materials[material].amount);
            console.log("Perk: " + perkObject.name + " price: " + materialsPrice[material]);
            return;
        }


        console.log("-------------------------------------------------------");
    }


    for (perkRequired of perksRequired) {

        console.log("Condition validation: " + perkRequired + " " + clicker.ascension.perks[perkRequired].unlocked);
        console.log("---------------------------------------------------------");
        if (!clicker.ascension.perks[perkRequired].unlocked) return;
        console.log("im not returning")
    }

    for (material in materialsPrice) {

        console.log("Material: ", material)
        console.log("Materials Price: ", materialsPrice)
        console.log("Mat: ", clicker.materials[material])
        clicker.materials[material].amount -= materialsPrice[material];
        console.log("Mat substracted: ", materialsPrice[material])
        console.log("Mat result: ", clicker.materials[material].amount)
    }

    perksEffects[perkName]();
    perkObject.unlocked = true;

    const perkIcon = document.getElementById(perkName);
    perkIcon.classList.add("show-perk-bought");
}

function perkDebbug() {

    clicker.materials.copper.amount = 100;
    clicker.materials.silver.amount = 100;
    clicker.materials.gold.amount = 100;
    buyPerk(clicker.ascension.perks.silverMastery, "silverMastery");
    // console.log("Materials: ", clicker.materials);
    // console.log("Perks: ", clicker.ascension.perks);
    // console.log("Gold per click: " + clicker.goldPerClick);
}

function showAscensionModal() {

    const ascensionModal = document.getElementById("ascensionModal"),
        ascenModalHeader = document.getElementById("ascenModalHeader");
    ascensionModal.classList.add('show-ascen-modal');
    ascenModalHeader.classList.add('show-ascen-modal');
}

function closeAscensionModal() {

    const ascensionModal = document.getElementById("ascensionModal"),
        ascenModalHeader = document.getElementById("ascenModalHeader");
    ascensionModal.classList.remove('show-ascen-modal');
    ascenModalHeader.classList.remove('show-ascen-modal');
}

//perksFunctions

perksEffects = {

    clickOverdrive() {

        clicker.goldPerClick *= 2;
    },

    clickMastery() {

        clicker.goldPerClick += 10;
    },

    copperMastery() {

        clicker.upgrades.upgradeOne.gps *= 2;
        clicker.goldPerSecond += clicker.upgrades.upgradeOne.amount;
        updateUI("upgradeOne");
    },

    silverMastery() {

        clicker.upgrades.upgradeTwo.gps *= 2;
        clicker.goldPerSecond += clicker.upgrades.upgradeTwo.amount * 10;
        updateUI("upgradeTwo");
    },

    goldMastery() {

        clicker.upgrades.upgradeTwo.gps *= 2;
        clicker.goldPerSecond += clicker.upgrades.upgradeThree.amount * 100;
        updateUI("upgradeThree");
    },
    achieveGreatness() {

        clicker.goldPerSecond *= (1 * clicker.achievementsUnlocked);
    },
    insaneMining() {

        for (i in clicker.upgrades) {

            clicker.upgrades[i].mineChance *= 3;
            const domRef = clicker.upgrades[i].domRef;
            updateUI(domRef);
        }
    },
}