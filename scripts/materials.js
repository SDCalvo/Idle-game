//Gather materials function

function gatherMaterials() {

    let upgrades = clicker.upgrades
    rng = Math.random();

    for (i in upgrades) {

        if (upgrades[i].unlocked) {

            if (upgrades[i].mineChance > rng) {

                var ore = upgrades[i].mineOre;
                addMaterials(ore);
            }
        }
    }
}

//Add material to the materials count inside clicker

function addMaterials(material) {

    if (clicker.materials.hasOwnProperty(material)) {
        clicker.materials[material] += 1;
    }
}

function materialsDebbug() {

    for (i in clicker.upgrades) {

        clicker.upgrades[i].mineChance = 0.5;
    }
    clicker.gold = 10000;
    console.log("Materials: ", clicker.materials);
}