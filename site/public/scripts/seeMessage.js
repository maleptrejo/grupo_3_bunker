let idMessage= ((window.location.pathname).split('/')).pop()
console.log(idMessage)

fetch(`http://localhost:3000/api/contact/${idMessage}`)
.then(function(respuesta) {

    
    if (respuesta.status==200) {
        return respuesta.json();
    } 
    // else {
    //     return Promise.reject('Error...') 
    // }
   
})
.then(function(json){

     let nombre= json.data.name+" "+json.data.surname
     
     let title=document.querySelector('#name_user')
    title.innerHTML=nombre

    let message=document.querySelector('#mensaje-api')
    message.innerHTML=json.data.message

    // let archivar=document.querySelector('#archivar-botons')
    // archivar.setAttribute('value',json.data.id )

    let archivar=document.getElementById('archivar-boton')
    archivar.setAttribute('value',json.data.id )
   
    // let responder= document.getElementById('respuesta')
    // console.log(responder)
    // responder.location.href=`mailto:${json.data.email}?subject = Respuesta a su consulta`

    let respuesta=document.querySelector('.espacio-respuesta')
    respuesta.innerHTML=`<a href= mailto:${json.data.email}?subject = Respuesta a su consulta id="respuesta"><i class="far fa-paper-plane"></i></a>`

 })
//  .catch(error => {
//     console.log('error')
    
//     let jumbo=document.querySelector('.jumbo-user-detail')
//     jumbo.innerHTML+="Error!"

   
// })