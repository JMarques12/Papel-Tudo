//Variáveis e constantes(objetos) globais
const msgs = document.getElementById('msgs');
const criar = document.getElementById('criar');
const dados = document.getElementById('dados');
const uri = "http://localhost:3000/items";
const clientes = [];
const cadastro = document.getElementById('cadastro');

//Obter dados do back-end
function loadItems() {
    fetch(uri)
        .then(res => res.json())
        .then(res => {
            // res.forEach(cli => {
            //     clientes.push(cli);
            // });
            items.push(...res);
            preencherTabela();
        });
}

//CRUD - Read - Renderizar os dados obtidos em uma tabela
function preencherTabela() {
    items.forEach(cli => {
        dados.innerHTML += `
                <tr>
                    <td>${cli.id}</td>
                    <td>${cli.nome}</td>
                    <td>${cli.descricao}</td>
                    <td>${cli.valor}</td>
                    <td>
                        <button onclick="del(${cli.id})"> - </button>
                        <button onclick="edit(this)"> * </button>
                    </td>
                </tr>
            `;
    });
}

//CRUD - Create
criar.addEventListener('submit', e => {
    e.preventDefault();
    const data = {
        nome: criar.nome.value,
        descricao: criar.descricao.value,
        valor: criar.nascimento.value
    };
    fetch(uri, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(res => {
            if (res.sqlMessage == undefined) {
                clientes.push(res);
                dados.innerHTML = "";
                preencherTabela();
                cadastro.classList.add('oculto');
                criar.reset();
            } else {
                cadastro.classList.add('oculto');
                mensagens(res.sqlMessage, 'Erro ao cadastrar item!');
            }
        });
});

//CRUD - Update
function update(btn) {
    let linha = btn.parentNode.parentNode;
    let celulas = linha.cells;
    let id = celulas[0].innerHTML;
    let data = {
        nome: celulas[1].innerHTML,
        descricao: celulas[2].innerHTML,
        valor: celulas[3].innerHTML
    };
    fetch(uri + '/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(res => {
            if (res.sqlMessage == undefined) {
                celulas[1].removeAttribute('contenteditable');
                celulas[2].removeAttribute('contenteditable');
                celulas[3].removeAttribute('contenteditable');
                btn.innerHTML = '*';
                btn.setAttribute('onclick', 'edit(this)');
            } else {
                mensagens(res.sqlMessage, 'Erro ao atualizar item!');
            }
        });
}

//CRUD - Delete
function del(id) {
    mensagens('Deseja realmente excluir o item id = ' + id + '?', 'Excluir item', id);
}

//Confirma exclusão
function confirmar(id) {
    fetch(uri + '/' + id, {
        method: 'DELETE'
    })
        .then(res => res.json())
        .then(res => {
            window.location.reload();
        });
}

//Tornar as células da linha tabela editáveis
function edit(btn) {
    let linha = btn.parentNode.parentNode;
    let celulas = linha.cells;
    for (let i = 1; i < celulas.length - 2; i++) {
        celulas[i].setAttribute('contenteditable', 'true');
    }
    btn.innerHTML = '✔';
    btn.setAttribute('onclick', 'update(this)');
}

//Mostrar mensagens do sistema em um modal
function mensagens(msg, titulo, confirma) {
    msgs.classList.remove('oculto');
    document.querySelector('#errTit').innerHTML = titulo;
    document.querySelector('#msg').innerHTML = msg;
    if (confirma != undefined) {
        document.querySelector('#confirma').classList.remove('oculto');
        document.querySelector('#confirma').setAttribute("onclick", `confirmar(${confirma})`);
    }
}

//Calcular idade a partir da data de nascimento
function calcularSoma() {
    var numero1 = parseFloat(document.getElementById('numero1').value);
    var numero2 = parseFloat(document.getElementById('numero2').value);

    if (!isNaN(numero1) && !isNaN(numero2)) {
        var resultado = numero1 + numero2;
        document.getElementById('resultado').innerText = 'Resultado: ' + resultado;
    } else {
        alert('Por favor, insira números válidos.');
    }
}