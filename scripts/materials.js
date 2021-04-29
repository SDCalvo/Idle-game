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
            material.classList.add("row", "justify-content-center", "align-items-center");
            if (clicker.materials[i].amount >= 1) {

                var formatedQuantity = numberformat.formatShort(Number(clicker.materials[i].amount));
                material.innerHTML = `
                    <div class="col-12 color-1">        
                        <div class="row bg-4 m-2 p-4 rounded align-items-center justify-content-center">
                            <div class="col-lg-3 col-12 modal-text text-center"><img class="img-rounded" src="https://via.placeholder.com/128x80" alt=""></div>
                            <div class="col-lg-3 col-12 modal-text text-center">${clicker.materials[i].name}</div>
                            <div class="col-12 col-lg-3 modal-text text-center">Cantidad: ${formatedQuantity}</div>
                            <div class="col-12 col-lg-3 text-break text-center">${clicker.materials[i].description}</div>
                        </div>
                    </div>
                `
            } else {

                material.innerHTML = `

                <div class="col-12 color-1">        
                        <div class="row bg-4 m-2 p-4 rounded align-items-center justify-content-center">
                            <div class="achModal mt-2">
                                <div class="icon"><i class="fas fa-lock"></i></i></div>
                                <div class="text_wrap fw-bold">
                                    <p class="title ">Material locked</p>
                                    <span class="detail">You haven't got this Material yet!</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `
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