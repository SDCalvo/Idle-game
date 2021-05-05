//ascend

function ascend() {

    const { materials, achievements, achievementsUnlocked, ascension } = clicker;
    clicker = {...createClickerDefault(), materials, achievements, achievementsUnlocked, ascension };

    for (i in clicker.upgrades) {

        updateUI(i);
        clicker.upgrades[i].unlocked = false;
    }
}

function buyPerk(perkObject, perkName) {

    const { materialsPrice } = perkObject;

    if (!buyPerkValidation(perkObject)) return; //validate conditions for buying perks

    for (material in materialsPrice) {

        clicker.materials[material].amount -= materialsPrice[material];
    }

    perksEffects[perkName]();
    perkObject.unlocked = true;

    const perkIcon = document.getElementById(perkName);
    perkIcon.classList.add("show-perk-bought");
}

function buyPerkValidation(perkObject) {

    // console.log(perkObject);
    const { materialsPrice, perksRequired } = perkObject;

    if (perkObject.unlocked) return false;

    for (material in materialsPrice) {

        if (clicker.materials[material].amount < materialsPrice[material]) {

            return false;
        }
    }

    for (perkRequired of perksRequired) {


        if (!clicker.ascension.perks[perkRequired].unlocked) return false;
    }

    return true;
}

function enableBuyPerkBtn() {

    for (perkKey in clicker.ascension.perks) {

        const perkObject = clicker.ascension.perks[perkKey];
        if (buyPerkValidation(perkObject)) {

            var perkBtn = document.getElementById(perkObject.buttonId);
            perkBtn.disabled = false;
        }
    }
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