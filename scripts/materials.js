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

function addMaterials(material) {

    if (clicker.materials.hasOwnProperty(material)) {
        clicker.materials[material] += 1;
    }
}