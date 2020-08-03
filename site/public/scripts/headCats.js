let elemento=document.querySelector('.categories')

fetch("http://localhost:3000/api/products/categories/")
.then(function(respuesta) {
    
    if (respuesta.status==200) {
        return respuesta.json();
    }
    return Promise.reject('Error...')
    
})
.then(function(json){
    
    let data=json.data
    let categorias=[]
    data.forEach(d=>{
        let a= {name: d.name, id: d.id}
        categorias.push(a)
    })

    
    categorias.forEach(cat=>{
        let a=document.createElement('a')
        a.setAttribute(`href`, `/products/categories/${cat.id}`)
        a.innerHTML+=cat.name
        let li=document.createElement('li')
        li.appendChild(a)
        elemento.appendChild(li)
    })

    
})
