let idUser= ((window.location.pathname).split('/')).pop()

console.log(idUser)
fetch(`http://localhost:3000/api/users/${idUser}`)
.then(function(respuesta) {

    console.log(respuesta)
    if (respuesta.status==200) {
        return respuesta.json();
    } else {
        return Promise.reject('Error...') 
    }
   
})
.then(function(json){
    console.log(json.data.name)
    let title=document.querySelector('#name_user')
    title.innerHTML=json.data.name

    let avatar=document.querySelector('#avatar_user')
    avatar.src=`../../images/usuarios/${json.data.avatar_plain}`

    let name_card=document.querySelector('#name_user_card')
    name_card.innerHTML=json.data.name

    let email_user=document.querySelector('#email_user')
    email_user.innerHTML=json.data.email

    let address_user=document.querySelector('#address_user')
    address_user.innerHTML=json.data.address

    let country_user=document.querySelector('#country_user')
    country_user.innerHTML=json.data.country
 
    let escribir=document.querySelector('#espacio-escribir')
    escribir.innerHTML=`<a href= mailto:${json.data.email}?subject = Estimado cliente id="respuesta"><i class="far fa-paper-plane" style="font-size:1.2em"></i></a>`



 })
 .catch(error => {
    console.log('error')
    
    let jumbo=document.querySelector('.jumbo-user-detail')
    jumbo.innerHTML+="Error!"

   
})