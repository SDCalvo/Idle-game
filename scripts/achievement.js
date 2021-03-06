var achievModalFillDone = false; //flag for filling modal achievement

//Show achievements

function achievementUnlocked(title, description) {

    let achievContainer = document.getElementById("achievementContainer");
    const toast = document.createElement("div");
    toast.innerHTML = `<div class="ach ">
    <div class="icon"><i class="fa fa-flag" aria-hidden="true"></i></div>
    <div class="text_wrap fw-bold">
        <p class="title">${title}</p>
        <span class="detail">${description}</span>
    </div>
</div>`

    let delay = achievContainer.childNodes.length * 100;

    setTimeout(function() {
        toast.childNodes[0].classList.add("achieved")
    }, delay)

    achievContainer.appendChild(toast);

    setTimeout(function() {
        toast.remove();
    }, 5000 + delay)
}

/* Gold achievements */

function poorMan() {

    if (!clicker.achievements.poorMan.unlocked && clicker.gold >= 10) {

        clicker.achievements.poorMan.unlocked = true;
        clicker.achievementsUnlocked++;
        achievementUnlocked(clicker.achievements.poorMan.title, clicker.achievements.poorMan.description);
    }
}

function stillKindaPoor() {

    if (!clicker.achievements.stillKindaPoor.unlocked && clicker.gold >= 100) {

        clicker.achievements.stillKindaPoor.unlocked = true;
        clicker.achievementsUnlocked++;
        achievementUnlocked(clicker.achievements.stillKindaPoor.title, clicker.achievements.stillKindaPoor.description);
    }
}

function gettingBy() {

    if (!clicker.achievements.gettingBy.unlocked && clicker.gold >= 1000) {

        clicker.achievements.gettingBy.unlocked = true;
        clicker.achievementsUnlocked++;
        achievementUnlocked(clicker.achievements.gettingBy.title, clicker.achievements.gettingBy.description);
    }
}

/* Upgrades achievements */

function noobMiner() {

    if (!clicker.achievements.noobMiner.unlocked && clicker.upgrades.upgradeOne.amount >= 1) {

        clicker.achievements.noobMiner.unlocked = true;
        clicker.achievementsUnlocked++;
        achievementUnlocked(clicker.achievements.noobMiner.title, clicker.achievements.noobMiner.description);
    }
}

function amateurMiner() {

    if (!clicker.achievements.amateurMiner.unlocked && clicker.upgrades.upgradeTwo.amount >= 1) {

        clicker.achievements.amateurMiner.unlocked = true;
        clicker.achievementsUnlocked++;
        achievementUnlocked(clicker.achievements.amateurMiner.title, clicker.achievements.amateurMiner.description);
    }
}

function Miner() {

    if (!clicker.achievements.Miner.unlocked && clicker.upgrades.upgradeThree.amount >= 1) {

        clicker.achievements.Miner.unlocked = true;
        clicker.achievementsUnlocked++;
        achievementUnlocked(clicker.achievements.Miner.title, clicker.achievements.Miner.description);
    }
}

/* Ore achievements */

function copperDigger() {

    if (!clicker.achievements.copperDigger.unlocked && clicker.materials.copper.amount >= 1) {

        clicker.achievements.copperDigger.unlocked = true;
        clicker.achievementsUnlocked++;
        achievementUnlocked(clicker.achievements.copperDigger.title, clicker.achievements.copperDigger.description);
    }
}

function silverDigger() {

    if (!clicker.achievements.silverDigger.unlocked && clicker.materials.silver.amount >= 1) {

        clicker.achievements.silverDigger.unlocked = true;
        clicker.achievementsUnlocked++;
        achievementUnlocked(clicker.achievements.silverDigger.title, clicker.achievements.silverDigger.description);
    }
}

function goldDigger() {

    if (!clicker.achievements.goldDigger.unlocked && clicker.materials.gold.amount >= 1) {

        clicker.achievements.goldDigger.unlocked = true;
        clicker.achievementsUnlocked++;
        achievementUnlocked(clicker.achievements.goldDigger.title, clicker.achievements.goldDigger.description);
    }
}

function achDebbug() {

    achievementUnlocked("This is a debbug achievement", "Weird achievement to get if you ask me...");
    achievementUnlocked("This is a debbug achievement", "Weird achievement to get if you ask me...");
    achievementUnlocked("This is a debbug achievement", "Weird achievement to get if you ask me...");
    achievementUnlocked("This is a debbug achievement", "Weird achievement to get if you ask me...");
    achievementUnlocked("This is a debbug achievement", "Weird achievement to get if you ask me...");
    achievementUnlocked("This is a debbug achievement", "Weird achievement to get if you ask me...");
    achievementUnlocked("This is a debbug achievement", "Weird achievement to get if you ask me...");

}


/* Achievements Update Function */

function checkAchievements() {

    poorMan();
    stillKindaPoor();
    gettingBy();
    noobMiner();
    amateurMiner();
    Miner();
    emptyAchievModal();
    fillAchievModal();
    copperDigger();
    silverDigger();
    goldDigger();
}

/* Achievement Modal */

function fillAchievModal() {

    var achievModal = document.getElementById("achievContainer");
    if (!achievModalFillDone) {

        for (i in clicker.achievements) {

            const achiev = document.createElement("div");
            achiev.classList.add("col-12", "col-lg-4", "d-flex", "justify-content-center", "p-0");
            if (clicker.achievements[i].unlocked === true) {

                achiev.innerHTML = `
                <div class="achModal">
                <div class="icon">${clicker.achievements[i].icon}</div>
                <div class="text_wrap fw-bold">
                    <p class="title">${clicker.achievements[i].title}</p>
                    <span class="detail">${clicker.achievements[i].feat}</span>
                </div>
                </div>`
            } else {

                achiev.innerHTML = `
                <div class="achModal">
                <div class="icon"><i class="fas fa-lock"></i></i></div>
                <div class="text_wrap fw-bold">
                    <p class="title ">Achievement Locked</p>
                    <span class="detail">You haven't got this Achievement yet!</span>
                </div>
                </div>`
            }

            achievModal.appendChild(achiev);
        }

        achievModalFillDone = true;
    }
}

function emptyAchievModal() {

    var achievModal = document.getElementById("achievContainer");

    while (achievModal.firstChild) {
        achievModal.removeChild(achievModal.lastChild);
    }

    achievModalFillDone = false;
}

function showAchievModal() {

    fillAchievModal();
    const achievCover = document.getElementById("modalCover");
    const achievModal = document.getElementById("achievModal");
    achievModal.classList.add("show-modal");
    achievCover.classList.add("cover");
}

function closeAchievModal() {

    const achievCover = document.getElementById("modalCover");
    const achievModal = document.getElementById("achievModal");
    achievModal.classList.remove("show-modal");
    achievCover.classList.remove("cover");
    emptyAchievModal();
}