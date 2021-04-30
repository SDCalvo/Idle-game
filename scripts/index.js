let goldElem = document.getElementById('gold'),
    goldPerSecondElem = document.getElementById('goldPerSecond'),
    mineElem = document.getElementById('mine'),
    pickaxeElem = document.getElementById('pickaxe'),
    delay = 0;

function createClickerDefault() {

    return {
        gold: 0,
        goldPerSecond: 0,
        goldPerClickMultiplier: 1,
        goldPerClick: 1,
        achievementsUnlocked: 0,

        upgrades: {

            upgradeOne: {

                amount: 0,
                price: 10,
                priceGrowth: 1.15,
                gps: 1 / 20,
                /* updates 20 times per second*/
                name: "Copper Mine",
                mineOre: "copper",
                mineChance: 0.001 / 20,
                unlocked: false,
                domRef: "upgradeOne",
            },
            upgradeTwo: {

                amount: 0,
                price: 100,
                priceGrowth: 1.2,
                gps: 10 / 20,
                /* updates 20 times per second*/
                name: "Silver Mine",
                mineOre: "silver",
                mineChance: 0.001 / 20,
                unlocked: false,
                domRef: "upgradeTwo",
            },
            upgradeThree: {

                amount: 0,
                price: 1000,
                priceGrowth: 1.25,
                gps: 100 / 20,
                /* updates 20 times per second*/
                name: "Gold Mine",
                mineOre: "gold",
                mineChance: 0.001 / 20,
                unlocked: false,
                domRef: "upgradeThree",
            },
        },
        achievements: {

            poorMan: {

                unlocked: false,
                title: "Poor Man",
                description: "Nice! you got your first ten coins",
                feat: "Getting ten coins",
                icon: '<i class="far fa-money-bill-alt"></i>',
            },
            stillKindaPoor: {

                unlocked: false,
                title: "Still Kinda Poor",
                description: "Great! but you're still kinda poor tough",
                feat: "Getting one hundred coins",
                icon: '<i class="far fa-money-bill-alt"></i>',
            },
            gettingBy: {

                unlocked: false,
                title: "Getting By",
                description: "Finally! Enough money to get a dishwasher!",
                feat: "Getting one thousand coins",
                icon: '<i class="far fa-money-bill-alt"></i>',
            },
            noobMiner: {

                unlocked: false,
                title: "Noob Miner",
                description: "Gotta try harder if you want to impress me...",
                feat: "Getting your first Copper mine",
                icon: '<i class="fas fa-hard-hat"></i>',
            },
            amateurMiner: {

                unlocked: false,
                title: "Amateur Miner",
                description: "You are getting better at this mining thing",
                feat: "Getting your first Silver mine",
                icon: '<i class="fas fa-hard-hat"></i>',
            },
            Miner: {

                unlocked: false,
                title: "Miner",
                description: "Cool! Now you are a proper miner",
                feat: "Getting your first Gold mine",
                icon: '<i class="fas fa-hard-hat"></i>',
            },
            copperDigger: {

                unlocked: false,
                title: "Copper Digger",
                description: "What a weird kind of gold this is...",
                feat: "Getting your first Copper ore.",
                icon: '<i class="far fa-gem"></i>',
            },
            silverDigger: {

                unlocked: false,
                title: "Silver Digger",
                description: "Great for making a very toxic ring!",
                feat: "Getting your first Silver ore.",
                icon: '<i class="far fa-gem"></i>',
            },
            goldDigger: {

                unlocked: false,
                title: "Gold Digger",
                description: "You could make a pretty collar with this!",
                feat: "Getting your first Gold ore.",
                icon: '<i class="far fa-gem"></i>',
            },
        },
        materials: {

            copper: {

                amount: 0,
                description: "'The first metal to ever being worked by man, it has a distinctive redish color.'",
                name: "Copper",
            },
            silver: {

                amount: 0,
                description: "'One of the first metals to ever be discovered. Great for scaring werewolves... if only they existed'",
                name: "Silver",
            },
            gold: {

                amount: 0,
                description: "'A very noble metal, not only because it's very unreactive but also because nobles love it!'",
                name: "Gold",
            }
        },
        ascension: {

            unlocked: false,
            perks: {

                clickOverdrive: {

                    name: "Click overdrive",
                    description: "Doubles gold per click",
                    unlocked: false,
                    materialsPrice: {

                        copper: 10,
                        silver: 5,
                    },
                    perksRequired: [],
                },
                clickMastery: {

                    name: "Click Mastery",
                    description: "Adds ten gold per click",
                    unlocked: false,
                    materialsPrice: {

                        copper: 5,
                        silver: 3,
                        gold: 1,
                    },
                    perksRequired: [],
                },
                copperMastery: {

                    name: "Copper Mastery",
                    description: "Copper mines are 10% more efficient",
                    unlocked: false,
                    materialsPrice: {

                        copper: 20,
                    },
                    perksRequired: ["clickMastery"],
                },
                silverMastery: {

                    name: "Silver Mastery",
                    description: "Silver mines are 10% more efficient",
                    unlocked: false,
                    materialsPrice: {

                        silver: 20,
                    },
                    perksRequired: ["clickOverdrive"],
                },
                goldMastery: {

                    name: "Gold Mastery",
                    description: "Gold mines are 10% more efficient",
                    unlocked: false,
                    materialsPrice: {

                        gold: 20,
                    },
                    perksRequired: ["clickOverdrive", "clickMastery"],
                },
                achieveGreatness: {

                    name: "Achieve greatness",
                    description: "Gain 1% gold per second per achievement unlocked",
                    unlocked: false,
                    materialsPrice: {

                        copper: 30,
                        silver: 20,
                        gold: 20,
                    },
                    perksRequired: ["silverMastery", "goldMastery"],
                },
                insaneMining: {

                    name: "Insane Mining",
                    description: "Triple chance of mining ore",
                    unlocked: false,
                    materialsPrice: {

                        copper: 25,
                        silver: 25,
                        gold: 25,
                    },
                    perksRequired: ["copperMastery"],
                },
            },
        }
    }
}


let clicker = createClickerDefault();

/* Pickaxe button */
function pickaxeRotate() {

    pickaxeElem.classList.remove('button-pickaxe-rotate');
    setTimeout(() => pickaxeElem.classList.add('button-pickaxe-rotate'));
}

function mine() {

    clicker.gold += clicker.goldPerClick;
    pickaxeRotate();
}

/* Update functions */

function goldUpdate() {

    clicker.gold += clicker.goldPerSecond / 20;

    goldElem.innerHTML = numberformat.format(Number(String(clicker.gold).split(".")[0]));
}

function updateUI(id) {

    document.getElementById("goldPerSecond").innerHTML = clicker.goldPerSecond;
    document.getElementById(id + 'Name').innerHTML = clicker.upgrades[id].name;
    document.getElementById(id + 'Gps').innerHTML = "Gold per second: " + clicker.upgrades[id].gps * 20 * clicker.upgrades[id].amount;
    document.getElementById(id + 'MineChance').innerHTML = clicker.upgrades[id].mineOre + " mine chance: " + clicker.upgrades[id].mineChance * 20 + "%";
    document.getElementById(id + 'Amount').innerHTML = "Amount: " + clicker.upgrades[id].amount;
    document.getElementById(id + 'Price').innerHTML = "Price: " + numberformat.formatShort(Number(clicker.upgrades[id].price));
}

// Buy function

function buy(id) {

    if (clicker.gold >= clicker.upgrades[id].price) {

        clicker.gold -= clicker.upgrades[id].price;
        clicker.upgrades[id].amount += 1;
        clicker.goldPerSecond += clicker.upgrades[id].gps * 20;
        clicker.upgrades[id].price = Math.ceil(clicker.upgrades[id].price * clicker.upgrades[id].priceGrowth);

        updateUI(id);
    }
}

//reset game function

function gameReset() {

    clicker = createClickerDefault();

    for (i in clicker.upgrades) {

        updateUI(i);
        clicker.upgrades[i].unlocked = false;
    }
}

//Load and Save

function saveGame() {

    delay++;
    if (delay >= 40) {

        localStorage.setItem("clicker", JSON.stringify(clicker));
        delay = 0;
    }
}

function loadGame() {

    const saveFile = localStorage.getItem("clicker")
    if (saveFile != null && saveFile != undefined) {

        var clickerCompare = JSON.parse(saveFile);

        for (i in clicker.upgrades) {

            if (clickerCompare.upgrades[i] == null || clickerCompare.upgrades[i] == undefined) {


                clickerCompare.upgrades[i] = clicker.upgrades[i];
            }
        }

        clicker = clickerCompare;
    }
    for (i in clicker.upgrades) {

        updateUI(i); /* Make sure UI element's info gets updates every time you load the game */
        if (clicker.upgrades[i].unlocked) { /* Make sure opacity class is taken out of upgrades dom element every time you load the game */

            var domRef = document.getElementById(clicker.upgrades[i].domRef);
            domRef.classList.remove("upgrade-opacity");
            domRef.classList.add("size-animation");
        }
    }
}

//Make upgrades visible

function unlockUpgrades() {

    for (i in clicker.upgrades) {

        var domRef = document.getElementById(clicker.upgrades[i].domRef);

        if (clicker.gold >= clicker.upgrades[i].price && !clicker.upgrades[i].unlocked) {

            domRef.classList.remove("upgrade-opacity");
            domRef.classList.add("size-animation");
            clicker.upgrades[i].unlocked = true;
        } else if (!clicker.upgrades[i].unlocked && clicker.gold < clicker.upgrades[i].price) {

            domRef.classList.add("upgrade-opacity");
            domRef.classList.remove("size-animation");
        }
    }
}

//Game Update

function gameUpdate() {

    setInterval(() => {

        goldUpdate();
        unlockUpgrades();
        saveGame();
        checkAchievements();
        gatherMaterials();
    }, 50);

    loadGame();
}