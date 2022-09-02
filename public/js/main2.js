const deleteBtn = document.querySelectorAll('.del')
const spellItem = document.querySelectorAll('span.not')
const spellComplete = document.querySelectorAll('span.completed')

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteSpell)
})

// Array.from(spellItem).forEach((el)=>{
//     el.addEventListener('click', markComplete)
// })

// Array.from(spellComplete).forEach((el)=>{
//     el.addEventListener('click', markIncomplete)
// })

async function deleteTodo(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('spells/deleteSpell', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markComplete(){
    const spellId = this.parentNode.dataset.id
    try{
        const response = await fetch('spells/markComplete', {
            method: 'put',
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

async function markIncomplete(){
    const spellId = this.parentNode.dataset.id
    try{
        const response = await fetch('spells/markIncomplete', {
            method: 'put',
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