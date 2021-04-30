//ascend

function ascend() {

    const { materials, achievements, achievementsUnlocked } = clicker;
    clicker = {...createClickerDefault(), materials, achievements, achievementsUnlocked };

    console.log(clicker);
    for (i in clicker.upgrades) {

        updateUI(i);
        clicker.upgrades[i].unlocked = false;
    }
}