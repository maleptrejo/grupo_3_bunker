let producto ={
    id: 0,
    nombre: null,
    marca: null,
    descripcion: null,
    imagen1: undefined,
    precio: null,
    descuento: null,
  }
  
  function isEmptyObject(objeto){
    return !Object.keys(objeto).length;
  }
  
  console.log(isEmptyObject(productosArray))
  
  if (!isEmptyObject(productosArray)){
    producto.id=1;
  } else {
    
   producto.id=productosArray[productosArray.lenght-1].id+1;
    
  }

  if (req.files == undefined) {
    imagenProd = 'n/a';
   } else {
    imagenProd = req.files[0].filename;
   }

  producto.nombre=req.body.nombre;
  producto.marca=req.body.marca;
  producto.descripcion=req.body.descripcion;
  producto.precio=req.body.precio;
  producto.descuento=req.body.descuento;
  producto.imagen1=imagenProd;
  
  console.log(productosArray);
  
  console.log(typeof(productosArray))
  
  if (isEmptyObject(productosArray)){
    productosArray.push(producto);
  } else {
  
  
  }
   
  
  
  
  fs.writeFileSync (objetosPath, JSON.stringify (productosArray));