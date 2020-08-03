let archivar=document.getElementById('archivar-boton')


    archivar.addEventListener('click', function(e){ 
        e.preventDefault() 
       

        fetch("http://localhost:3000/api/contact/"+this.value, {
            method: 'delete', 
            headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
        
            id:this.value
        })
        
    }).then(response=> response.json())
   
   
    let espacio=document.querySelector('.espacio-archivo')

    let p=document.createElement('p')
    espacio.classList.add('exito')
    // espacio.style.fontSize="2em"
    p="El mensaje se archivó con éxito"
    espacio.innerHTML=p

    window.setTimeout(function(){

        // Move to a new location or you can do something else
        window.location.href = "http://localhost:3000/admins/contact ";

    }, 2000);




     })


