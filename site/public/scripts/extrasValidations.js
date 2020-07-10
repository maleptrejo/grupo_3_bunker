window.onload = () => {
    let categoryDelete = document.getElementById(`categoryDelete`)
    let categoryDeleteChk = document.getElementById(`categoryDeleteChk`)
    let categoryCreate = document.getElementById(`categoryCreate`)
    let categoryBtn = document.getElementById(`categoryBtn`)
    let categoryAlert = document.getElementById(`categoryAlert`)
    let categoryAlertDelete = document.getElementById(`categoryAlertDelete`)
    categoryDelete.addEventListener(`click`, (e) => {
        if (e.target.value != ``) {
            categoryDeleteChk.removeAttribute(`disabled`)
        }    
    })
    categoryDeleteChk.addEventListener(`click`, (e) => {
        if (e.target.checked) {
            categoryBtn.removeAttribute(`disabled`)
            categoryAlertDelete.style.display = `block`
        } else {
            categoryBtn.setAttribute(`disabled`, `disable`)
        }     
    })
    categoryCreate.addEventListener(`keyup`, (e) => {
        if (e.target.value.length > 0) {
            categoryBtn.removeAttribute(`disabled`)

        } else {
            categoryBtn.setAttribute(`disabled`, `disable`)
        }
    })
    categoryBtn.addEventListener(`click`, (e) => {
        categoryAlertDelete.style.display = `none`
        categoryAlert.style.display = `block`
        setTimeout(() => {
            location.reload()
        }, 3000)    
    })
    let brandDelete = document.getElementById(`brandDelete`)
    let brandDeleteChk = document.getElementById(`brandDeleteChk`)
    let brandCreate = document.getElementById(`brandCreate`)
    let brandBtn = document.getElementById(`brandBtn`)
    let brandAlert = document.getElementById(`brandAlert`)
    let brandAlertDelete = document.getElementById(`brandAlertDelete`)
    brandDelete.addEventListener(`click`, (e) => {
        if (e.target.value != ``) {
            brandDeleteChk.removeAttribute(`disabled`)
        }    
    })
    brandDeleteChk.addEventListener(`click`, (e) => {
        if (e.target.checked) {
            brandBtn.removeAttribute(`disabled`)
            brandAlertDelete.style.display = `block`
        } else {
            brandBtn.setAttribute(`disabled`, `disable`)
        }     
    })
    brandCreate.addEventListener(`keyup`, (e) => {
        if (e.target.value.length > 0) {
            brandBtn.removeAttribute(`disabled`)

        } else {
            brandBtn.setAttribute(`disabled`, `disable`)
        }
    })
    brandBtn.addEventListener(`click`, (e) => {
        brandAlertDelete.style.display = `none`
        brandAlert.style.display = `block`
        setTimeout(() => {
            location.reload()
        }, 3000)
    })
    let discountDelete = document.getElementById(`discountDelete`)
    let discountDeleteChk = document.getElementById(`discountDeleteChk`)
    let discountCreate = document.getElementById(`discountCreate`)
    let discountBtn = document.getElementById(`discountBtn`)
    let discountAlert = document.getElementById(`discountAlert`)
    let discountAlertDelete = document.getElementById(`discountAlertDelete`)
    discountDelete.addEventListener(`click`, (e) => {
        if (e.target.value != ``) {
            discountDeleteChk.removeAttribute(`disabled`)
        }    
    })
    discountDeleteChk.addEventListener(`click`, (e) => {
        if (e.target.checked) {
            discountBtn.removeAttribute(`disabled`)
            discountAlertDelete.style.display = `block`
        } else {
            discountBtn.setAttribute(`disabled`, `disable`)
        }     
    })
    discountCreate.addEventListener(`keyup`, (e) => {
        if (e.target.value.length > 0) {
            discountBtn.removeAttribute(`disabled`)

        } else {
            discountBtn.setAttribute(`disabled`, `disable`)
        }
    })
    discountBtn.addEventListener(`click`, (e) => {
        discountAlertDelete.style.display = `none`
        discountAlert.style.display = `block`
        setTimeout(() => {
            location.reload()
        }, 3000)
    })
}