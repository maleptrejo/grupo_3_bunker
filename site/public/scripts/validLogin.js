window.onload=function() { 

    let login=document.querySelector('button.login')

    login.onclick=function(e){
       

//ciclo if
if( checkMail && checkPass ) {
     $.alert('continuamos')
     event.preventDefault();
}else{
    let message=document.querySelector('.message')
    let p=document.createElement('p')
    p.innerHTML+="Ingresá datos válidos para loguearte"
    p.classList.add('login')
    message.append(p)

  
    event.preventDefault();
}

    }

    let formMail=document.querySelector('#email');
    let password=document.querySelector('#password');

    let checkMail, checkPass= false;

    formMail.addEventListener('keyup', function(event){
        let exprMail=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/;
        // let exprMail= /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
        let inputMail=event.target.value;
        let matchMail= inputMail.match(exprMail);

        if(matchMail==null) {
         event.target.classList.add('is-invalid')
         checkMail=false;
     }else{
         event.target.classList.replace('is-invalid', 'is-valid')
         checkMail=true;
     }
     })

     password.addEventListener('keyup', function(event){

        if (event.target.value.length<8 | event.target.value.length>12 ){
            event.target.classList.add('is-invalid')
            checkPass=false;
        }else{
            event.target.classList.replace('is-invalid', 'is-valid')
            checkPass=true;
        }
    })



}