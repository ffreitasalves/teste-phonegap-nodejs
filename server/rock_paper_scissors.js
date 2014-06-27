var express = require('express');
var bodyParser = require('body-parser');
 
var app = express();


app.use(bodyParser());       // to support JSON-encoded bodies
//app.use( bodyParser.urlencoded() ); // to support URL-encoded bodies
//app.use(express.json());       // to support JSON-encoded bodies
//app.use(express.urlencoded()); // to support URL-encoded bodies

//app.use(express.bodyParser());


// Configurando o app
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
 });

app.get('/', function(req, res, next) {
    res.json({message:'Bem vindo à raiz da nossa API em Node Para Brincar, entre em /jogo?opcao=escolha onde sua escolha pode ser pedra, papel ou tesoura'});
});


app.get('/jogo', function(req, res, next) {
	opcao = req.query.opcao;
	var opcoes = ['pedra','papel','tesoura'];
	if(opcoes.indexOf(opcao) >= 0){    	
    	var item = opcoes[Math.floor(Math.random()*opcoes.length)];
    	//console.log('opção do jogador: '+ opcao);
        //console.log('opção do servidor: '+ item);
    	//console.log('jogador '+compara(opcao,item));
    	res.json({
    		sua_escolha:'Você escolheu: ' + opcao,
    		server_escolha: 'Server escolheu: ' + item,
    		mensagem: 'Você ' + compara(opcao,item)
    	});
    }
    else{
    	res.json({message:'Escolha incorreta: ' + opcao});	
    }
});



app.post('/game', function (req,res,next) {
    //console.log(req.param.option);
    //console.log(req.param);
    //console.log(req.query);
    //console.log(req.body);
    var opcao = req.param('option',null);
    var opcoes = ['pedra','papel','tesoura'];
    if(opcoes.indexOf(opcao) >= 0){     
        var item = opcoes[Math.floor(Math.random()*opcoes.length)];
        //console.log(item);
        //console.log(compara(opcao,item));
        /*res.json({
            sua_escolha:'Você escolheu: ' + opcao,
            server_escolha: 'Server escolheu: ' + item,
            mensagem: 'Você ' + compara(opcao,item)
        });*/
        res.json({
            'option': traduz(item)
        });

    }
    else{
        res.json({message:'Escolha incorreta: ' + opcao});  
    }
});

function compara(a, b){
	//Retorna Se A Ganhou, Empatou ou Perdeu
	if(a == b){
		return 'empatou';
	}
	if(a == 'pedra'){
		if (b == 'papel'){
			return 'perdeu';
		}
		else if (b == 'tesoura'){
			return 'ganhou';
		}
	}
	else if(a == 'papel'){
		if (b == 'pedra'){
			return 'ganhou';
		}
		else if (b == 'tesoura'){
			return 'perdeu';
		}
	}
	else if(a == 'tesoura'){
		if (b == 'pedra'){
			return 'perdeu';
		}
		else if (b == 'papel'){
			return 'ganhou';
		}
	}
}

//Traduz pedra, papel e tesoura para o japones
function traduz(portugues){
    if (portugues == 'tesoura'){
        return 'jan';
    }
    else if (portugues == 'papel'){
        return 'ken';
    }
    else if (portugues == 'pedra'){
        return 'po';
    }
    else {
        return portugues;
    }
}
 
app.listen(31022);