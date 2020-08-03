/*console.log("Corriendo");
let deleteMessages= document.getElementsByClassName("message-borrar");
console.log(deleteMessages);

Array.from(botones).forEach(boton=> {
    deleteMessages.addEventListener("onClick", function (e){
        e.preventDefault()  
    
        fetch("http://localhost:3000/api/contact/"+this.value,{
            method: 'DELETE',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                status : this.value,
            })
        })
        .then(response=> response.json())

    })
})      

/*Array.from(deleteMessages).forEach(del=> { 
    console.log(deleteMessages.length)

    del.addEventListener('click', function(e){ 
        console.log("Toque el boton")  
        e.preventDefault()
       console.log(this.href)
        fetch(this.href, {
            method: 'delete',
            headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            name: this.value
        })
        
    }).then(response=> response.json())
    .then (json=>{

        
    //deleteMessages.parentElement.parentElement.remove()
        
    })*/

   /* let deleteMessages2= document.getElementsByClassName("message-borrar")
    console.log(deleteMessages2.length)
    if(deleteMessages2.length==0){
        
        let final1= document.getElementsByClassName('final-cart')
         final1.forEach(f=>{
             f.innerHTML=""
         })
        let final= document.querySelector('#final-cart')
        final.innerHTML="";
        let td=document.createElement('td')
        td.innerHTML+='Consulta Borrada.'
        final.append(td)

     
    }
   // })
//})

