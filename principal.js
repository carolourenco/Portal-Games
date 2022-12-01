

const dragames = (data) => {
    let dadosHTML = '';
    let dadosGames = JSON.parse(data.target.response);

    localStorage.setItem('db_Games', data.target.response);

    for (let i = 0; i < dadosGames.results.length; i++) {
        let game = dadosGames.results[i];
        dadosHTML += `
            <div class="card col-xs-12 col-sm-6 col-md-3 col-lg-3 divListaGames">
                <img class="sizeimg card-img-top" src="${game.background_image}" alt="Game XPTO">
                <div class="card-body">
                    <h4 class="card-title">${game.name}</h4>
                    <p class="card-text"><b>Lançamento:</b> ${game.released}</p>
                     <button> <a href="https://rawg.io/games/${game.id}" rel="noopener noreferrer" target="_blank">Detalhes</a></button>
                </div>
            </div>
        `
        
    }
    document.getElementById('divListaGames').innerHTML = dadosHTML
}

const dragerror = (data) => {
    alert('error requisit');
}

var apiapi_key= "4790824687d846d8a28a56d1622b1d66"

const inicializar = () => {

    let xhr = new XMLHttpRequest();
    let url = `https://api.rawg.io/api/games?key=${apiapi_key}&dates=2022-05-10,2022-12-22`
    xhr.onload = dragames;
    xhr.onerror = dragerror;
    xhr.open('GET', url, true);
    xhr.send();
}

document.body.onload = inicializar;

const pesquisar = () => {

    let input = document.querySelector("#txtBusca");
    let JogoProcurado = input.value;
    let xhr = new XMLHttpRequest();
    let url = `https://api.rawg.io/api/games?key=${apiapi_key}&search=${JogoProcurado}`
    xhr.onload = dragames;
    xhr.onerror = dragerror;
    xhr.open('GET', url, true);
    xhr.send();

    document.getElementById('JogoProcurado').innerHTML = `
    <p class="JogoProcurado"> O resultado encontrado "${JogoProcurado}" </p> `

}

const parametros = new URLSearchParams(location.search);
let id = parametros.get('id');

dadosGames = JSON.parse(localStorage.getItem('db_games'));

let idxGame = dadosGames.results.findIndex((elem) => elem.id == id);


if (idxGame >= 0) {

    let game = dadosGames.results[idxGame];


    

    let nomeGenero = '';


    document.getElementById('divDetalheGame').innerHTML = `
    <div class="divListaGames">
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
      <h1 class="titulo-destaque">${game.name}</h1>
        <div class=" card-imagem-detalhe col-xs-4 col-sm-4 col-md-4 col-lg-4">
          
        <div class="card-detalhe col-xs-7 col-sm-7 col-md-7 col-lg-7>
            <p class="card-text"><b>Lançamento:</b> ${game.release_date}</p>
            <p class="card-text"><b>Avaliação: </b>${game.vote_average}</p>
            <p class="card-text"><b>Popularidade: </b>${game.popularity}</p>
            <p class="card-text"><b>Gênero(s): </b>${game.gender}</p>
            <p class="card-text"><b>Lançamento:</b> ${game.released}</p>
            <p class="card-text"><b>Sinopse: </b>${game.overview}</p>
            <a href="https://api.rawg.io/api/games/${game.id}&key=29c01aa1491949e1b0c2737d94aeb487" type="button" class="btn btn-sm btn-outline-secondary">Mais informações</a>
            <a href="index.html" type="button" class="btn btn-sm btn-outline-secondary">Voltar</a>
        </div>
        </div>
    </div>
    </div>
`
}