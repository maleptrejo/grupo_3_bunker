let salir= document.getElementsByClassName("cart-quitar")
console.log('botones')
Array.from(salir).forEach(sal=> { 
    console.log(salir.length)

    sal.addEventListener('click', function(e){ 
        
        e.preventDefault()
       console.log(this.href)
        fetch(this.href, {
            method: 'delete', 
            headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
        
            product_id:this.value
        })
        
    }).then(response=> response.json())
    .then (json=>{

        
        // sal.parentElement.parentElement.remove()
        
    })
   
    let salir2= document.getElementsByClassName("cart-quitar")
    console.log(salir2.length)
    if(salir2.length==0){
        
        // let final= document.getElementsByClassName('final-cart')
        // final.forEach(f=>{
        //     f.innerHTML=""
        // })
        let final= document.querySelector('#final-cart')
        final.innerHTML="";
        let td=document.createElement('td')
        td.innerHTML+='Tu carrito quedó vacío.'
        final.append(td)

     
    }
    })
})

// let cart=document.querySelector('#cart')


// cart.addEventListener('click', function(e) {
// alert('ok')
// })

