const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

//Conexão com o SGBD MySQL
const con = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    database: 'inventario'
});


//Rota de teste
const teste = (req, res) => {
    res.send("Back-end do inventario respondendo");
}

//CRUD - create
const create = (req, res) => {
    let nome = req.body.nome;
    let descricao = req.body.descricao;
    let valor = req.body.valor;
    let query = `INSERT INTO item(id, nome, descricao, valor) VALUE`;
    query += `('${nome}', '${descricao}', '${valor}');`;
    con.query(query, (err, result) => {
        if (err)
            res.redirect("http://127.0.0.1:5500/front/erro.html?erro=Provalmente o id já está cadastrado&err=" + err.code);
        else
            res.redirect("http://127.0.0.1:5500/front/index.html");
    });
}

//CRUD - Read
const read = (req, res) => {
    con.query("SELECT * FROM item ORDER BY id DESC", (err, result) => {
        if (err)
            res.json(err);
        else
            res.json(result);
    });
}

//CRUD - Update
const update = (req, res) => {
    let id = req.params.id;
    let nome = req.body.nome;
    let descricao = req.body.descricao;
    let valor = req.body.valor;
    let query = `UPDATE item SET cpf = ' nome = '${nome}', descricao = '${descricao}', valor = '${valor}' WHERE id = ${id};`;
    con.query(query, (err, result) => {
        if (err)
            res.redirect("http://127.0.0.1:5500/front/erro.html?erro=Erro ao atualizar&err=" + err.code);
        else {
            if (result.affectedRows == 0)
                res.redirect("http://127.0.0.1:5500/front/erro.html?erro=Nada foi alterado");
            else
                res.json("Atualizado com sucesso!");
        }
    });
}

//CRUD - Delete
const del = (req, res) => {
    let id = Number(req.params.id);
    con.query(`DELETE FROM item WHERE id=${id}`, (err, result) => {
        if (err)
            res.redirect("http://127.0.0.1:5500/front/erro.html?erro=Erro ao excluir&err=" + err.code);
        else {
            if (result.affectedRows == 0)
                res.redirect("http://127.0.0.1:5500/front/erro.html?erro=Nada foi excluído");
            else
                res.json("Atualizado com sucesso!");
        }
    });
}



//Configurações de saída - FrontEnd
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

//Rotas de Saída - FrontEnd
app.get("/", teste);
app.post("/items", create);
app.get("/items", read);
app.delete("/items/:id", del);
app.put("/items/:id", update);

//Teste e porta no console
app.listen(3000, () => {
    console.log("Back-end respondendo na porta 3000");
});