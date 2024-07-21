/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('produtos').del()
  await knex('produtos').insert([
    {"id": 1, "descricao": "Calça Legging", "marca": "Nike", "preco": 49.99},
    {"id": 2, "descricao": "Camisa manga longa", "marca": "Levi's", "preco": 89.99},
    {"id": 3, "descricao": "Ténis", "marca": "Adidas", "preco": 99.99},
    {"id": 4, "descricao": "Blusa de Moletom", "marca": "Puma", "preco": 59.99},
    {"id": 5, "descricao": "Short", "marca": "Mizzuno", "preco": 39.99},
    {"id": 6, "descricao": "Jaqueta", "marca": "The North Face", "preco": 149.99},
    {"id": 7, "descricao": "Vestido", "marca": "Zara", "preco": 79.99},
    {"id": 8, "descricao": "Sapato", "marca": "Gucci", "preco": 299.99},
    {"id": 9, "descricao": "Shorts", "marca": "H&M", "preco": 29.99},
    {"id": 10, "descricao": "Camisa", "marca": "Ralph Lauren", "preco": 109.99}
  ]);
};
