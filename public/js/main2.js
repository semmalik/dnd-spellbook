const deleteBtn = document.querySelectorAll('.spell-del')
const editBtn = document.querySelectorAll('.spell-edit')
const spellItem = document.querySelectorAll('span.not')
const spellComplete = document.querySelectorAll('span.completed')
const modalOverlay = document.querySelectorAll('.modalOverlay')

// Spell CRUD Event Listeners
Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteSpell)
})

Array.from(editBtn).forEach((el)=>{
    el.addEventListener('click', editSpell)
})

// Array.from(spellItem).forEach((el)=>{
//     el.addEventListener('click', markComplete)
// })

// Array.from(spellComplete).forEach((el)=>{
//     el.addEventListener('click', markIncomplete)
// })

//Overlay Event listeners 
Array.from(modalOverlay).forEach((el)=>{
    el.addEventListener('click', toggleModal)
})

// Spell CRUD Functions
async function deleteSpell(){
    //because the delete button is in wrapper you are going to need to go up two
    //levels to get to the li for the delete  Yay! same thing will be needed for editing as well
    const spellId = this.parentNode.parentNode.dataset.id
    try{
        const response = await fetch('spells/deleteSpell', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'spellIdFromJSFile': spellId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function editSpell(){
    const spellId = this.parentNode.parentNode.dataset.id
    try{
        const response = await fetch('spells/editSpell', {
            method: 'update', //update?
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'spellIdFromJSFile': spellId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

const toggleModal = () => {
  //get current class
  
  //toggle class for modal and overlay
};

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