var express = require('express');
var apiRouterV2 = express.Router();

const knex = require('knex') (require( '../knexfile' ).development )



/* Faremos middlewares de uma API RESTful, retemos get, post, put e delete */ 

/* GET home page. */
apiRouterV2.get('/produtos', function(req, res, next) {
  knex('produtos')
  .select('*')
  .then ( produtos => { 
       res.status(200).json(produtos)
  } )
  .catch ( err => res.status(500).json( { message: 
    `Erro ao obter produtos: ${ err.message }` }) )
});

// Get Produto único
apiRouterV2.get('/produtos/:id', function(req, res, next) {
  let id = req.params.id;

   if( id ) {
        idInt = Number.parseInt(id)
        knex('produtos')
          .select('*')
          .where({ id: idInt })   // na cláusula where informo que só quero um produto
          .then ( produtos => {

              if (!produtos.length) {
                       res.status(404).json({ message: `Produto não encontrado`})
                       // return é para não seguir o código
                       return
              }
              else{
                let produto = produtos[0]
                res.status(200).json(produto)
              }
          } )
          .catch ( err => res.status(500).json( { message:
             `Erro ao obter produtos: ${ err.message }` 
         }) )
   }
  else {
    res.status(404).json({ message: `Produto não encontrado` })
  }
});


// Método POST
apiRouterV2.post( '/produtos', function(req, res, next) {
  let produto = req.body;
  knex('produtos')
     .insert( produto, [ 'id'])
     .then(produtos => {
         if(!produtos.length){    // Se produto não for digitado ou outro erro
             res.status(400).json({ message: `Erro ao inserir produto` })
             return
         }
         else {
                let id = produtos[0].id
                res.status(201).json({ message: `Produto inserido com sucesso`,  
                                       data: { id }   })
         }
     })
     .catch ( err => res.status(500).json( { message: 
           `Erro ao inserir produtos: ${ err.message }` }) 
     )
});


apiRouterV2.delete( '/produtos/:id', function(req, res, next) {
  let id = req.params.id;
  if( id ){
      idInt = Number.parseInt(id)
      knex('produtos')
        .where({ id: idInt })
        .del()
        .then(
            result => res.status(200).json({ message: `Produto excluído com sucesso` })
        )
        .catch( err => res.status(500).json({ message: `Erro ao excluir produto: 
                  ${err.message}`})
        )
  }
  else {
      res.status(404).json({ message: `Produto não encontrado` })
  }    
});


// Método PUT
apiRouterV2.put('/produtos/:id', function(req, res, next) {
  let id = req.params.id;
  produto = req.body;   // Var produto recebe o que veio no corpo da requisição
  if( id ){
     idInt = Number.parseInt(id);
         knex('produtos')
            .where({ id: idInt })
            .update(produto)
            .then( result => {
                  res.status(200).json({ message: `Produto alterado com sucesso`,
                                          data: { produto }  
                  })
              })
            .catch(err => { res.status(500).json({ message: `Erro ao atualizar produto: 
              ${err.message}`})   } 
            )           
  }
  else {
       res.status(404).json({ message: `Produto não encontrado` })
  } 
});


module.exports = apiRouterV2;
