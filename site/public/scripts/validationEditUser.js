window.onload=function() {

    let btn= document.querySelector('.js-boton-editar');

   
    btn.onclick= function(event){
       


        console.log(checkname, checksurname, checkCountry, checkAdress, checkMail);

        if(checkname && checksurname && checkCountry && checkAdress && checkMail) {
           
         }else{
       alert('Completá el formulario antes de continuar')
         event.preventDefault();
        }

    }

    let form= document.querySelector('.form-edit');

    let formMail=document.querySelector('#email');

    let formConfMail= document.querySelector('#cemail');
 
    let checkname=true; 
    let checksurname=true;
    let checkCountry=true; 
    let checkAdress =true; 
    let checkMail= true;

    console.log(checkname, checksurname, checkCountry, checkAdress, checkMail);
    

    
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