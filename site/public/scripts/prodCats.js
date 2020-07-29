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
            }


            filtro.push(a)
        }
    })
    // console.log(filtro)

    let container_tarjetas=document.querySelector('.container-tarjetas')


    for (let i=0; i< filtro.length; i++) {
        console.log(filtro[i])
        console.log(filtro[i].name)

        // <div class="col-12 col-sm-6 col-lg-3">
        let div1=document.createElement('div')
        div1.classList.add(`col-12`)
        div1.classList.add(`col-sm-6`)
        div1.classList.add(`col-lg-3`)

        // <section class="product-box">
        let section=document.createElement('section')
        section.classList.add("product-box")

        // <a href="/products/<%=product.id%>">
        let a=document.createElement('a')
        a.setAttribute('href', `/products/${filtro[i].prod_id}`)

        // <figure class="product-box_image">

        let figure=document.createElement('figure')
        figure.classList.add("product-box_image")

        // <img src="./images/productos/<%=product.image1%>" class="center-cropped" alt="imagen de producto">

        let img=document.createElement('img')
        img.classList.add("center-cropped")
        img.setAttribute('src', `../../images/productos/${filtro[i].image}`)
        img.setAttribute(`alt`, `Card image cap`)

    

        // <article class="product-box_data">
        let article=document.createElement('article')
        article.classList.add("product-box_data")

            // <div class="precio-oferta">
                    
            //         <h2>$<%=product.price%></h2>
            //         
            let div2=document.createElement('div')
            div2.classList.add("precio-oferta")

            let h2=document.createElement('h2')
            h2.innerHTML+='$'+filtro[i].price

            let span=document.createElement('span')
        span.innerHTML+='%'+filtro[i].discount+' '+'OFF'
        
        // <span><%=product.brand%></span>

        //    <p><%=product.name%> <span>
       

        let p=document.createElement('p')
        p.innerHTML+=filtro[i].name

       

       
        container_tarjetas.append(div1)
        div1.append(section)
        section.append(a)
        a.append(figure)
        figure.appendChild(img)
        a.append(article)
        div2.append(h2)
        div2.append(span)
        article.append(div2)
        article.append(p)

        

        

        

        // *****
               
        // let div1=document.createElement('div')
        // div1.classList.add('card')
        // div1.setAttribute('style', '18rem')


        // let img=document.createElement('img')
        // img.classList.add('card-img-top')
        // img.setAttribute('src', `../../images/productos/${filtro[i].image}`)
        // img.setAttribute(`alt`, `Card image cap`)
        // div1.appendChild(img)


        // style="width: 18rem;"

        // console.log(filtro[i].image)

        // let div2=document.createElement('div')
        // div2.classList.add('card-body')

        // let h5=document.createElement('h5')
        // h5.classList.add('card-title')
        // h5.innerHTML+=filtro[i].name

        // div2.appendChild(h5)

        // let h4=document.createElement('h4')
        // h4.classList.add('card-text')
        // h4.innerHTML+="$"+filtro[i].price
        
       
        // div2.append(h4)

        // let p=document.createElement('p')
        // p.classList.add('card-text')
        // p.innerHTML+=filtro[i].description

        // div2.append(p)

        // div1.append(div2)

        // card_box.append(div1)

    }


     
    // <div class="col-12 col-sm-6 col-lg-3">
    // <section class="product-box">
        // <a href="/products/<%=product.id%>">
            // <figure class="product-box_image">
            //     <img src="./images/productos/<%=product.image1%>" class="center-cropped" alt="imagen de producto">
            // </figure>
            // <article class="product-box_data">
                {/* <div class="precio-oferta">
                    
                    <h2>$<%=product.price%></h2>
                    <span><%=product.discounts.level*100%>% OFF</span>
                </div> */}
                
                
                {/* <p><%=product.name%> <span>
                </span> <span><%=product.brand%></span></p>
                
            </article> */}
{/* //         </a> */}
{/* //     </section> */}
{/* </div> */}

})
}