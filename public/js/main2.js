const deleteBtn = document.querySelectorAll(".spell-del");
const editBtn = document.querySelectorAll(".spell-edit");
const spellItem = document.querySelectorAll("span.not");
const spellComplete = document.querySelectorAll("span.completed");
const modalOverlay = document.querySelectorAll(".modal-overlay");
const saveBtn = document.querySelector('.save')


//document.querySelector('.enterCustomSpell').addEventListener('click', enterCustomSpell)


// Spell CRUD Event Listeners

Array.from(deleteBtn).forEach((el) => {
  el.addEventListener("click", deleteSpell);
});

Array.from(editBtn).forEach((el) => {
  el.addEventListener("click", getSpell);
});

// Array.from(spellItem).forEach((el)=>{
//     el.addEventListener('click', markComplete)
// })

// Array.from(spellComplete).forEach((el)=>{
//     el.addEventListener('click', markIncomplete)
// })

//Overlay Event listeners
Array.from(modalOverlay).forEach((el) => {
  el.addEventListener("click", toggleModal);
});

if(saveBtn != null) {
    saveBtn.addEventListener('click', saveSpell)
}

// Spell CRUD Functions

// If there is no spell


async function deleteSpell() {
  //because the delete button is in wrapper you are going to need to go up two
  //levels to get to the li for the delete  Yay! same thing will be needed for editing as well
  console.log('is this delete function working?')
  
  const spellId = this.parentNode.parentNode.dataset.id;
  try {
    const response = await fetch("spells/deleteSpell", {
      method: "delete",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        spellIdFromJSFile: spellId,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}


//changed function name from editSpell to getSpell to send data to modal
async function getSpell() {
  //edit spell needs school added to it so it matches the model
  //also need to validate what the user enters
  const spellId = this.parentNode.parentNode.dataset.id;
  toggleModal();
  //Need to get the spell data and pass it to the modal somehow without reloading
  //Easiest way might be a route on the backend to get a spell by id
  
  const response = await fetch(`spells/getSpell/${spellId}`, {
            method: 'get',
            headers: {'Content-type': 'application/json'}
        })
    .then((res) => res.json())
  
  const modalSpellId = document.getElementById("spellId");
  const spellName = document.getElementById('spellName');
  const description = document.getElementById("description");
  const level = document.getElementById("level");
  
  modalSpellId.setAttribute('spellId',`${spellId}`)
  spellName.value = response.name
  description.value = response.description
  level.value = response.level
}

//Should be what happens when the modal button is clicked
async function saveSpell() {
  console.log('test')
  const spellId = document.getElementById("spellId").getAttribute("spellId");
  console.log(`spell id: ${spellId}`)
  const spellName = document.getElementById("spellName").value;
  const description = document.getElementById("description").value;
  const level = document.getElementById("level").value;

  try {
    if (spellId != "") {
      const response = await fetch(`/spells/saveSpell/${spellId}`, {
      method: "put",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        name: spellName,
        description: description,
        level: level,
      })
    })
    } 
    //If there is no ID, post new spell
    else {
      const response = await fetch('/spells/createCustomSpell', {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        name: spellName,
        description: description,
        //hardcoded until this field is added to modal
        school: 'testing',
        level: level,
      })
    })
    }
    location.assign("/spells");
  } catch (error) {
    console.log(error);
  }
}

function enterCustomSpell() {
  toggleModal()
}

async function toggleModal() {
  console.log("toggling the modal!");
  //get current classes of modal wrapper
  const classList = document.querySelector("#modal-wrapper").classList;

  //toggle class for modal and overlay
  if (classList.contains("show")) {
    classList.remove("show");
    classList.add("hide");
  } else {
    classList.remove("hide");
    classList.add("show");
  }
}

// async function markComplete(){
//     const spellId = this.parentNode.dataset.id
//     try{
//         const response = await fetch('spells/markComplete', {
//             method: 'put',
//             headers: {'Content-type': 'application/json'},
//             body: JSON.stringify({
//                 'spellIdFromJSFile': spellId
//             })
//         })
//         const data = await response.json()
//         console.log(data)
//         location.reload()
//     }catch(err){
//         console.log(err)
//     }
// }

// async function markIncomplete(){
//     const spellId = this.parentNode.dataset.id
//     try{
//         const response = await fetch('spells/markIncomplete', {
//             method: 'put',
//             headers: {'Content-type': 'application/json'},
//             body: JSON.stringify({
//                 'spellIdFromJSFile': spellId
//             })
//         })
//         const data = await response.json()
//         console.log(data)
//         location.reload()
//     }catch(err){
//         console.log(err)
//     }
// }
