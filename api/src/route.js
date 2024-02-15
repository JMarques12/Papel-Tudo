const express = require("express");
const router = express.Router();

const item = require("./controllers/items");

//Rota de teste
const teste = (req, res) => {
    res.json("Back-end, API Inventario respondendo!");
}

//Rotas de Saída - Clientes
router.get("/", teste);
router.post("/items", item.create);
router.get("/items", item.read);
router.put("/items/:id", item.update);
router.delete("/items/:id", item.del);

module.exports = router;