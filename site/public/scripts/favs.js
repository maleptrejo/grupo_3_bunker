let boton= document.querySelector(".heart")
    boton.addEventListener('click', function(e) {

        document.querySelector(".icono-fav-prod").classList.add('red');

        fetch("http://localhost:3000/api/products/favs/"+this.value, {
            method:'post',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                product_id:this.value
            })
        })
        .then(response=> response.json())
        .then(json=> console.log(json) )

        
        // document.querySelector(".fa-heart").style.color="red"
        //  let heart=document.getElementsByClassName('fa-heart')
        //  heart.style.color="#ff2d53"
        // alert(this.value)
    })