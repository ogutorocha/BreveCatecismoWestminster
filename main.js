function getQuestion() {
  // getQuestion é a função responsável por renderizar o modo aleatório
  function numAle(min, max) {
    //numAle é responsável apenas por gerar um numero aleatório e devolver
    //um numero qualquer entre 0 e 106 (perguntas 1 a 107)
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min) + min);
  }

  let num = numAle(0, 106); // chama função acima
  document.querySelector("#question").style.display = "block";
  document.querySelector("#modoLista").style.display = "none";

  let urlinfo = `westminster-shorter-pt-br.json`; 
  //leturlinfo apenas informa a url do arquivo json

  fetch(urlinfo)
    .then((response) => response.json())
    .then((data) => {

      //após chamada padrão do json as variaveias abaixo estão apenas declaradas 
      //para melhor organização do código, mas poderiam ser chamadas diretamente tambem
      let nume = document.getElementById("numero");
      let perg = document.getElementById("pergunta");
      let resp = document.getElementById("resposta");
      let ref = document.getElementById("refs");
      
      //valores são inseridos no html
      nume.innerHTML = `Pergunta nº ${data[num].numero}`;
      perg.innerHTML = data[num].pergunta;
      resp.innerHTML = `Resposta: ${data[num].resposta}`;
      ref.innerHTML = `Referencias: ${data[num].refs}`;
    });
}

//modoLista renderiza todas as perguntas a partir do json para que o usuário escolha
function modoLista() {
  document.querySelector("#question").style.display = "none";
  document.querySelector("#modoLista").style.display = "block";

  let urlinfo = `westminster-shorter-pt-br.json`;
  
  //limpaLista apenas limpa o for abaixo antes de rodar novamente, evitando que
  //a sequencia de 1 a 107 seja repetida na tela do usuário
  limpaLista();
  fetch(urlinfo)
    .then((response) => response.json())
    .then((data2) => {
      let lista = document.getElementById("link");

      //o for abaixo cria a lista de links para que o usuário selecione 
      //uma pergunta a sua escolha
      for (i = 0; i < data2.length; i++) {
        lista.innerHTML += `<a id="link${i}" style='cursor: pointer' onclick="getQuestionOnList(${i})"> Pergunta ${data2[i].numero}: <b> ${data2[i].pergunta} </b></a> <br>`;
      }
    });
}

//getQuestionOnList é a responsavel por renderizar a resposta de uma pergunta selecionada
// pelo usuário
function getQuestionOnList(num2) {
  document.querySelector("#modoLista").style.display = "none";
  document.querySelector("#question").style.display = "block";

  let urlinfo = `westminster-shorter-pt-br.json`;

  fetch(urlinfo)
    .then((response) => response.json())
    .then((data3) => {
      let nume = document.getElementById("numero");
      let perg = document.getElementById("pergunta");
      let resp = document.getElementById("resposta");
      let ref = document.getElementById("refs");

      nume.innerHTML = `Pergunta nº ${data3[num2].numero}`;
      perg.innerHTML = data3[num2].pergunta;
      resp.innerHTML = `Resposta: ${data3[num2].resposta}`;
      ref.innerHTML = `Referencias: ${data3[num2].refs}`;
    });
}

function limpaLista() {
  let lista = document.getElementById("link");
  lista.innerHTML = "";
}
