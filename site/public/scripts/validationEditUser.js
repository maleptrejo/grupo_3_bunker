window.onload=function() {

    let btn= document.querySelector('.js-boton-editar');

   
    btn.onclick= function(event){
       


        console.log(checkname, checksurname, checkCountry, checkAdress, checkMail, checkPass, checkPass2 );

        if(checkname && checksurname && checkCountry && checkAdress && checkMail && checkPass && checkPass2 ) {

            // event.preventDefault();
            // alert('ok')
           
         }else{
    //    alert('Completá el formulario antes de continuar')
         event.preventDefault();




         let ed_user=document.querySelector('#edicion-usuario-valid')
         ed_user.classList.add('login')
         ed_user.innerHTML="Ingresá datos válidos para validar"
       
        }

    }

    let form= document.querySelector('.form-edit');

    let formMail=document.querySelector('#email');

    let formConfMail= document.querySelector('#cemail');

    let formPass=document.querySelector('#password');

    let formConfPass= document.querySelector('#cPassword');
 
    let checkname=true; 
    let checksurname=true;
    let checkCountry=true; 
    let checkAdress =true; 
    let checkMail= true;
    let checkPass=false;
    let checkPass2=false;

    // let checkname, checksurname, checkCountry, checkAdress, checkMail, checkPass, checkPass2=false;

    console.log(checkname, checksurname, checkCountry, checkAdress, checkMail, checkPass, checkPass2 );
    

    
    form.name.addEventListener('keyup', function(event){

            if (event.target.value.length<3){
                event.target.classList.add('is-invalid')
                checkname= false;
               
            }else{
                event.target.classList.replace('is-invalid', 'is-valid')
                checkname= true;
            }
        })
    
        form.sName.addEventListener('keyup', function(event){

            if (event.target.value.length<3){
                event.target.classList.add('is-invalid')
                checksurname=false;
               
            }else{
                event.target.classList.replace('is-invalid', 'is-valid')
                checksurname=true;
            }
        })

        form.adress.addEventListener('keyup', function(event){

            let inputAdress= event.target.value;
            if (event.target.value.length<3){
                event.target.classList.add('is-invalid')
                checkAdress=false;
               
            }else{
                event.target.classList.replace('is-invalid', 'is-valid')
                checkAdress=true;
            }
        })

        

        form.country.addEventListener('keyup', function(event){
            let inputCountry= event.target.value;
            if (event.target.value.length<3){
                event.target.classList.add('is-invalid')
                checkCountry=false;
               
            }else{
                event.target.classList.replace('is-invalid', 'is-valid')
                checkCountry=true;
            }
        })



        formMail.addEventListener('keyup', function(event){
           let exprMail= /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
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

        formConfMail.addEventListener('keyup', function (event) {
            
            let mail1= form.email.value;
            let mail2= form.cemail.value;
            let isMatch= mail1===mail2;

                if(!isMatch) {
                    event.target.classList.add('is-invalid')
                 
                }else{
                    event.target.classList.replace('is-invalid', 'is-valid')
                    
                }
        })

        formPass.addEventListener('keyup', function(event){

            if (event.target.value.length<8 | event.target.value.length>12 ){
                event.target.classList.add('is-invalid')
                checkPass=false;
            }else{
                event.target.classList.replace('is-invalid', 'is-valid')
                checkPass=true;
            }
        })

        formConfPass.addEventListener('keyup', function(event){
            let pass1= formPass.value;
            let pass2= formConfPass.value;
            let matchPass= pass1===pass2;

            if (!matchPass){
                event.target.classList.add('is-invalid')
                return false;
            }else{
                event.target.classList.replace('is-invalid', 'is-valid')
                checkPass2=true;
                
            }
        })

        
}





{/* <script>
// Example starter JavaScript for disabling form submissions if there are invalid fields
(function() {
    'use strict';
    window.addEventListener('load', function() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();
</script> */}