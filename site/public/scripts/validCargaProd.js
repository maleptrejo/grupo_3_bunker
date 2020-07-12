window.onload = function(){
    let btn= document.querySelector('#butenv');

    btn.onclick= function(event){

       
            
        if(checknombre && checkdescripcion && checkprice && checkcantidad) {
           
        }else{
           
            alert('Completá el formulario antes de continuar')
            event.preventDefault();
        }

    }

    let form= document.querySelector('#formProd');

   
    let checknombre, checkdescripcion, checkprice, checkcantidad= false;

    form.nombre.addEventListener('keyup', function(event){
                
              if (event.target.value.length<3){
                  
                  event.target.classList.add('is-invalid')
                  checknombre= false;
                  console.log(event.target.classList)
                 
              }else{
                  event.target.classList.replace('is-invalid', 'is-valid')
                  checknombre= true;
                  console.log(event.target.classList)
              }
          })


    form.descripcion.addEventListener ('keyup', function(event){
       
        if (event.target.value.length<3){
            event.target.classList.add('is-invalid')
            checkdescripcion= false;
           
        }else{
            event.target.classList.replace('is-invalid', 'is-valid')
            checkdescripcion= true;
        }
    })

    form.precio.addEventListener ('input', function(event){

        if (event.target.value<1){
            event.target.classList.add('is-invalid')
            checkprice= false;
           
        }else{
            event.target.classList.replace('is-invalid', 'is-valid')
            checkprice= true;
        }
    })

    form.cantidad.addEventListener ('input', function(event){

        if (event.target.value<1){
            event.target.classList.add('is-invalid')
            checkcantidad= false;
           
        }else{
            event.target.classList.replace('is-invalid', 'is-valid')
            checkcantidad= true;
        }
    })
  
  
 
    //categoria ??

    //marca ??

    //descuento??

    //imagenes ??



}



    // let formProd = document.getElementById("formProd");
    // let prod = document.getElementById("nombre");    
    // let price = document.getElementById("precio");    
    // let desc = document.getElementById("descripcion");    
    // let stock = document.getElementById("cantidad");    
    // let btnenv = document.getElementById("butenv");
      
   
    // let checkProd;
    // let checkPrice; 
    // let checkDesc; 
    // let checkStock;
    // let errors = [];

    // prod.addEventListener("keyup", function(event){
        
    //     if(event.target.value.length < 3){
    //         event.target.classList.add("is-invalid");
    //         checkProd = false; 
    //         // errors.push("El campo nombre debe tener al menos 3 caracteres");
    //     } 
    //     else{     
    //         event.target.classList.replace("is-invalid", 'is-valid');
    //         checkProd = true; 
            
    //     }
        
      
    //     // return checkProd;
    // })



    // price.addEventListener("blur", function(event){
        
    //     if(event.target.value < 1){
    //         event.target.classList.add('is-invalid');
    //         errors.push("El stock debe ser mayor a 0");
    //         checkPrice = false;
    //     } 
    //     else{
    //         event.target.classList.add("is-valid");
    //         checkPrice = true;         
    //     }   
    //     console.log(checkPrice)
    //     return checkPrice;
    // })




    // formProd.descripcion.addEventListener("keyup", function(event){
    //     if(event.target.value.length < 20){
    //         event.target.classList.add('is-invalid');
    //         errors.push("La descripción debe tener al menos 20 caracteres");
    //         checkDesc = false;
    //     }
    //     else{
            
    //         event.target.classList.replace('is-invalid', 'is-valid');
    //         checkDesc = true;  

    //     }    
       
    //     console.log(checkDesc)
    //     return checkDesc;
    // })




    // formProd.cantidad.addEventListener("blur", function(event){
        
    //     if(event.target.value < 1){
    //         event.target.classList.add('is-invalid');
    //         errors.push("El stock debe ser mayor a 0");
    //         checkStock = false;
    //     } 
    //     else{
    //           event.target.classList.add("is-valid");
    //           checkStock = true;         
    //     }   
    //     console.log(checkStock)
    //     return checkStock;
    // })


          
       
    // console.log(checkStock)
    // console.log(checkDesc)
    // console.log(checkProd)
    // console.log(checkPrice)
            
    // if((checkDesc && checkProd && checkPrice && checkStock)== true){        
    //     butenv.removeAttribute("disabled");
    // }

   
       