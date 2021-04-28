var materialsModalFillDone = false;

//Gather materials function

function gatherMaterials() {

    let upgrades = clicker.upgrades
    rng = Math.random();

    for (i in upgrades) {

        if (upgrades[i].amount > 0) {

            if (upgrades[i].mineChance > rng) {

                var ore = upgrades[i].mineOre;
                addMaterials(ore);
                emptyMaterialsModal();
                fillMaterialsModal();
            }
        }
    }
}

//Add material to the materials count inside clicker

function addMaterials(material) {

    if (clicker.materials.hasOwnProperty(material)) {
        clicker.materials[material].amount += 1;
    }
}

function materialsDebbug() {

    for (i in clicker.upgrades) {

        clicker.upgrades[i].mineChance = 0.5;
    }
    clicker.gold = 10000;
    console.log("Materials: ", clicker.materials);
}


//materials modal

function fillMaterialsModal() {

    var materialsModal = document.getElementById("materialsContainer");
    if (!materialsModalFillDone) {

        for (i in clicker.materials) {

            const material = document.createElement("div");
            material.classList.add("col-12", "p-3", "d-flex", "bg-4", "rounded", "color-1", "justify-content-center", "align-items-center", "my-2")
            if (clicker.materials[i].amount >= 1) {

                var formatedQuantity = numberformat.formatShort(Number(clicker.materials[i].amount));
                material.innerHTML = `<div class="col-3 modal-text"><img class="img-rounded" src="https://via.placeholder.com/128x64" alt=""></div>
                        <div class="col-3 modal-text">${clicker.materials[i].name}</div>
                        <div class="col-3 modal-text">Cantidad: ${formatedQuantity}</div>
                        <div class="col-3">${clicker.materials[i].description}</div>`
            } else {

                material.innerHTML = `
                <div class="achModal">
                <div class="icon"><i class="fas fa-lock"></i></i></div>
                <div class="text_wrap fw-bold">
                    <p class="title ">Material locked</p>
                    <span class="detail">You haven't got this Material yet!</span>
                </div>
                </div>`
            }

            materialsModal.appendChild(material);
        }

        materialsModalFillDone = true;
    }
}

function emptyMaterialsModal() {

    var materialsModal = document.getElementById("materialsContainer");

    while (materialsModal.firstChild) {
        materialsModal.removeChild(materialsModal.lastChild);
    }

    materialsModalFillDone = false;
}

function showMaterialsModal() {

    fillMaterialsModal();
    const materialsCover = document.getElementById("modalCover");
    const materialsModal = document.getElementById("materialsModal");
    materialsModal.classList.add("show-modal");
    materialsCover.classList.add("cover");
}

function closeMaterialsModal() {

    const materialsCover = document.getElementById("modalCover");
    const materialsModal = document.getElementById("materialsModal");
    materialsModal.classList.remove("show-modal");
    materialsCover.classList.remove("cover");
    emptyMaterialsModal();
}