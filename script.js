let seuVotoPara = document.querySelector('.esquerdo1 span');
let cargo = document.querySelector('.esquerdo2 span');
let descricao = document.querySelector('.esquerdo4');
let aviso = document.querySelector('.parte-inferior');
let lateral = document.querySelector('.direito');
let numeros = document.querySelector('.esquerdo3');

let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let votos = [];

function comecarEtapa() {
    let etapa = etapas[etapaAtual];

    let numeroHtml = '';
    numero = '';
    votoBranco = false;
    
    for(let i=0;i<etapa.numeros;i++) {
        if(i === 0) {
            numeroHtml += '<div class="numeros pisca"></div>';
        } else {
        numeroHtml += '<div class="numeros"></div>';
        }
    }
    
    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}
function atualizarInterface() {
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero === numero){
            console.log(item)
            return true;
        } else {
            return false;
        }
    });
    if(candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome}</br> Partido: ${candidato.partido}`;
        
        let fotosHtml = '';
            for(let i in candidato.fotos){
                if(candidato.fotos[i].small){
                    fotosHtml += `<div class="direito-img1 small"><img src="IMG/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`;
                } else {
            fotosHtml += `<div class="direito-img1"><img src="IMG/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`; 
        }
    } 
        lateral.innerHTML = fotosHtml;
    }else { 
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso-fim pisca">VOTO NULO</div>';
        }
}
    
function clicou(n) {
    let elNumero = document.querySelector('.numeros.pisca');
    if(numeros !== null){
        elNumero.innerHTML = n;
        numero = `${numero}${n}`;

        elNumero.classList.remove('pisca');
        if(elNumero.nextElementSibling !=null) {
        elNumero.nextElementSibling.classList.add('pisca');
        }else {
            atualizarInterface();
        }
    }
}
function branco(){
        numero = '';
        votoBranco = true;

        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = '<div class="aviso-fim pisca">VOTO EM BRANCO</div>';
        lateral.innerHTML = '';
}
function corrigir(){
    comecarEtapa();
}
function confirmar(){
    let etapa = etapas[etapaAtual];

    let votoConfirmado = false;

    if(votoBranco === true){
        votoConfirmado = true;
        votos.push({
            etapa:etapas[etapaAtual].titulo,
            voto: 'Branco'
        });
    } else if(numero.length === etapa.numeros) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        });
    }

    if(votoConfirmado){
        etapaAtual ++;
        if(etapa = etapas[etapaAtual] !== undefined){
            comecarEtapa();
        } else {
            document.querySelector('.tela').innerHTML = '<div class="aviso-final pisca">FIM!</div>';
            console.log(votos);
        }
    }

}
comecarEtapa();