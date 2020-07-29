let cartEdit= document.getElementsByClassName("cart-edit")

Array.from(cartEdit).forEach(cartEd=> { 
  

    cartEd.addEventListener('click', function(e){ 
        e.preventDefault()
        // alert(this.parentElement.parentElement.href)
   
        console.log(cartEd.value)

        fetch(this.dataset.url, {
            method: 'put', 
            headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
        
            qty:cartEd.value,
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

