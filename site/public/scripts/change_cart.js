let botones= document.getElementsByClassName("cart-edit")

Array.from(botones).forEach(boton=> { 
  

    boton.addEventListener('click', function(e){ 
        e.preventDefault()
        // alert(this.parentElement.parentElement.href)
   
        console.log(boton.value)

        fetch(this.parentElement.parentElement.href, {
            method: 'put', 
            headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
        
            qty:boton.value,
            // price: this.parentElement.parentElement.value
        })
        
    })
   
    .then (json=>{
       
            console.log('aca')
        
    })
    location.reload();
    })
})

// let cart=document.querySelector('#cart')


// cart.addEventListener('click', function(e) {
// alert('ok')
// })

