

router.delete('/celular/:id', (req, res)=> {

  let celularesFiltrados= celulares.filter(celular=> celular.id !=req.params.id)
  
   celulares=celularesFiltrados;


})