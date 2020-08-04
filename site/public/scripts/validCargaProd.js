window.onload = function(){
    let btn= document.querySelector('#butenv');

    btn.onclick= function(event){

       
            
        if(checkname && checkdescription && checkprice && checkstock) {
           
        }else{
           
            alert('Completá el formulario antes de continuar')
            event.preventDefault();
        }

    }

    let form= document.querySelector('#formProd');

   
    let checkname, checkdescription, checkprice, checkstock= false;

    form.name.addEventListener('keyup', function(event){
                
              if (event.target.value.length<5){
                  
                  event.target.classList.add('is-invalid')
                  checkname= false;
                  console.log(event.target.classList)
                 
              }else{
                  event.target.classList.replace('is-invalid', 'is-valid')
                  checkname= true;
                  console.log(event.target.classList)
              }
          })


    form.description.addEventListener ('keyup', function(event){
       
        if (event.target.value.length<15){
            event.target.classList.add('is-invalid')
            checkdescription= false;
           
        }else{
            event.target.classList.replace('is-invalid', 'is-valid')
            checkdescription= true;
        }
    })

    form.price.addEventListener ('input', function(event){

        if (event.target.value<1){
            event.target.classList.add('is-invalid')
            checkprice= false;
           
        }else{
            event.target.classList.replace('is-invalid', 'is-valid')
            checkprice= true;
        }
        if(event.target.value>0.1){
            event.target.classList.add('is-valid')
            checkprice = true;
        }
    })

    form.stock.addEventListener ('input', function(event){

        if (event.target.value<1){
            event.target.classList.add('is-invalid')
            checkstock= false;
           
        }else{
            event.target.classList.replace('is-invalid', 'is-valid')
            checkstock= true;
        }
        if(event.target.value>0.1){
            event.target.classList.add('is-valid')
            checkstock = true;
        }
    })
  
  
 
    //categoria ??

    //marca ??

    //descuento??

    //imagenes ??



}



    // let formProd = document.getElementById("formProd");
    // let prod = document.getElementById("name");    
    // let price = document.getElementById("price");    
    // let desc = document.getElementById("description");    
    // let stock = document.getElementById("stock");    
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
    //         // errors.push("El campo name debe tener al menos 3 caracteres");
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




    // formProd.description.addEventListener("keyup", function(event){
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




    // formProd.stock.addEventListener("blur", function(event){
        
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

   
       