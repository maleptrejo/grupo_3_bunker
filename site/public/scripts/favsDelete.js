let botones= document.getElementsByClassName("fav-quitar")

    Array.from(botones).forEach(boton=> {
        console.log(this.value)
        boton.addEventListener('click', function(e){
            e.preventDefault()
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
            boton.parentElement.parentElement.remove()
          
        })
        })

    })




  