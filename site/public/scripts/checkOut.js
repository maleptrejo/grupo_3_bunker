let seguir=document.getElementById('check-out')

seguir.addEventListener('click', function(e){
    e.preventDefault()

   


fetch(this.href, {
    method: 'put',
    headers:{
    'Content-Type':'application/json'
},
body: JSON.stringify({

    total:this.getAttribute('value')
})

}).then(response=>
    response.json()

)
})


$('#check-out').confirm({
    columnClass: 'col-lg-5',
    icon: 'fa fa-spinner fa-spin',
    title: 'Su compra está siendo procesada',
    content: 'Revisá tu mail para ver los detalles de tu compra',
    animationBounce: 1.5,

    buttons: {
        'Volver a navegar': function(){
            location.href = 'http://localhost:3000/';
        },
        'Ok': {
            text: 'Ok',
            btnClass: 'btn-red',
            action: function() {

}
        }
    }
});