window.onload = function(){    

    let btn = document.querySelector("#enviar");
    let form = document.querySelector("#formContact");

    btn.onclick= function(event){       
            
        if(checkname && checksname && checkemail && checkmessage) {
           
        }else{
           
            alert('Completá el formulario antes de continuar')
            event.preventDefault();
        }
    }

   
    let checkname, checksname, checkemail, checkmessage= false;

    form.name.addEventListener('keyup', function(event){
                
              if (event.target.value.length<3){
                  
                  event.target.classList.add('is-invalid')
                  checkname= false;
                  console.log(event.target.classList)
                 
              }else{
                  event.target.classList.replace('is-invalid', 'is-valid')
                  checkname= true;
                  console.log(event.target.classList)
              }
    })

    form.sName.addEventListener('keyup', function(event){
                
        if (event.target.value.length<3){
            
            event.target.classList.add('is-invalid')
            checksname= false;
            console.log(event.target.classList)
           
        }else{
            event.target.classList.replace('is-invalid', 'is-valid')
            checksname= true;
            console.log(event.target.classList)
        }
    })

    form.email.addEventListener('keyup', function(event){

        let exprMail= /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
        let inputMail=event.target.value;
        let matchMail= inputMail.match(exprMail);
                
        if (matchMail == null){
            
            event.target.classList.add('is-invalid')
            checkemail= false;
            console.log(event.target.classList)
           
        }else{
            event.target.classList.replace('is-invalid', 'is-valid')
            checkemail= true;
            console.log(event.target.classList)
        }
    })


    form.message.addEventListener ('keyup', function(event){
       
        if (event.target.value.length<10){
            event.target.classList.add('is-invalid')
            checkmessage= false;
           
        }else{
            event.target.classList.replace('is-invalid', 'is-valid')
            checkmessage = true;
        }
    })





}