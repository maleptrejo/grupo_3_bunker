let salir= document.getElementsByClassName("cart-quitar")
console.log('botones')
Array.from(salir).forEach(sal=> { 
    console.log(this.value)

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
    })
})

// let cart=document.querySelector('#cart')


// cart.addEventListener('click', function(e) {
// alert('ok')
// })

