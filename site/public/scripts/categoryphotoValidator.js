window.onload = () => {
    let categorySelect = document.getElementById(`categorySelect`)
    let categoryImage = document.getElementById(`categoryImage`)
    let categoryBtn = document.getElementById(`categoryBtn`)
    let categoryAlert = document.getElementById(`categoryAlert`)
    categorySelect.addEventListener(`change`, () => {
        categoryImage.removeAttribute(`disabled`)
    })
    categoryImage.addEventListener(`change`, () => {
        categoryBtn.removeAttribute(`disabled`)
    })
    categoryBtn.addEventListener(`click`, (e) => {
        categoryAlert.style.display = `block`
        setTimeout(() => {
            location.reload()
        }, 3000)    
    })
}