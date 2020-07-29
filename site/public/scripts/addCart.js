let cartButton=document.querySelector('button#prod')
cartButton.addEventListener('click', function(e){

  

 fetch("http://localhost:3000/api/products/cart/"+this.value, {
            method:'post',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                product_id:this.value
            })
        })
        .then(response=> response.json())
        .then(json=> console.log('en carrito') )





})


$('button#prod').confirm({
    columnClass: 'col-lg-4',
    icon: 'fas fa-shopping-cart',
    title: 'Se agregó al carrito',
    content: 'Para seguir navegando, presioná ok',
    animationBounce: 1.5,

    buttons: {
        'Ir al carrito': function(){
            location.href = 'http://localhost:3000/users/cart';
        },
        'Ok': {
            text: 'Ok',
            btnClass: 'btn-red',
            action: function() {
                location.href = 'http://localhost:3000/';
}
        }
    }
});



