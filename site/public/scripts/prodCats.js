window.onload=function(){
    let breadcrumb=document.querySelector('.breadcrumb')



fetch('http://localhost:3000/api/products/por_cats')
.then(function(respuesta) {
    if (respuesta.status==200) {
        return respuesta.json();
      
    }
    return Promise.reject('Error...') 
})
.then(function(json){
    let products=json.data.products
    // console.log(json.data.products)
    let idCat= ((window.location.pathname).split('/')).pop()

    let filtro=[]
    products.forEach(prod=>{
        if(prod.cat_id==idCat){

            let a={
                cat_id: prod.cat_id,
                cat_name: prod.cat_name,
                description: prod.description,
                detail: prod.detail,
                prod_id: prod.id,
                image: prod.image,
                name: prod.name,
                price:prod.price,
                discount: prod.discount*100,
                encabezado: prod.img_cat
            }


            filtro.push(a)
        }
    })
    // console.log(filtro)

   let jumbo= document.querySelector('.jumbo-encabezado')
   jumbo.style.backgroundImage=`url(../../imagenes/${filtro[0].encabezado} )`
   let titulo= document.querySelector('h1.display-4')
   titulo.innerHTML+=filtro[0].cat_name
   titulo.style.fontSize="8em"
   titulo.style.color="#E9e9e9"
   titulo.style.textShadow= "2px 2px 6px #353535";
   titulo.style.height="300px"

   console.log(filtro[0].encabezado)

    for (let i=0; i< filtro.length; i++) {
      

        // <a href="/products/<%=product.id%>">
        let a=document.createElement('a')
        a.setAttribute('href', `/products/${filtro[i].prod_id}`)


         // <div class="col-12 col-sm-6 col-lg-3">
         let div1=document.createElement('div')
         div1.classList.add(`card`)
       

          // <img src="./images/productos/<%=product.image1%>" class="center-cropped" alt="imagen de producto">

          let img=document.createElement('img')
          img.classList.add("card-img-top")
          img.setAttribute('src', `../../images/productos/${filtro[i].image}`)
          img.setAttribute(`alt`, `Card image cap`)

        div1.append(img)

        let div2=document.createElement('div')
        div2.classList.add("card-body")


        // <div><h2>$<%=product.price%></h2><span><%=product.discounts.level*100%>% OFF</span></div>
        let div3=document.createElement('div')
        let h2=document.createElement('h2')
        h2.innerHTML+='$'+filtro[i].price
        let span1=document.createElement('span')
        span1.innerHTML+='%'+filtro[i].discount+' '+'OFF'
        div3.append(h2)
        div3.append(span1)

       
        let h4=document.createElement('h4')
        h4.innerHTML+=filtro[i].name
        

        div2.append(div3)
        div2.append(h4)
        div1.append(div2)
        let contenedor= document.querySelector('.card-deck-index')
        a.append(div1)
        contenedor.append(a)


       //CÓDIGO INICIAL: CON PROBLEMAS EN RESPONSIVENESS

        // let container_tarjetas=document.querySelector('.container-tarjetas')
        
        // let div1=document.createElement('div')
        // div1.classList.add(`col-12`)
        // div1.classList.add(`col-sm-6`)
        // div1.classList.add(`col-lg-3`)

       
        // let section=document.createElement('section')
        // section.classList.add("product-box")

        
        // let a=document.createElement('a')
        // a.setAttribute('href', `/products/${filtro[i].prod_id}`)

        // let figure=document.createElement('figure')
        // figure.classList.add("product-box_image")

       
        // let img=document.createElement('img')
        // img.classList.add("center-cropped")
        // img.setAttribute('src', `../../images/productos/${filtro[i].image}`)
        // img.setAttribute(`alt`, `Card image cap`)

    
        // let article=document.createElement('article')
        // article.classList.add("product-box_data")

                  
        //     let div2=document.createElement('div')
        //     div2.classList.add("precio-oferta")

        //     let h2=document.createElement('h2')
        //     h2.innerHTML+='$'+filtro[i].price

        //     let span=document.createElement('span')
        // span.innerHTML+='%'+filtro[i].discount+' '+'OFF'
           

        // let p=document.createElement('p')
        // p.innerHTML+=filtro[i].name

       

       
        // container_tarjetas.append(div1)
        // div1.append(section)
        // section.append(a)
        // a.append(figure)
        // figure.appendChild(img)
        // a.append(article)
        // div2.append(h2)
        // div2.append(span)
        // article.append(div2)
        // article.append(p)


    }


    

})
}