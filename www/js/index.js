$(document).ready(function() {

	$(".opcoes-link").on("click", function () {

		var opcao = $(this).data('content');
		 // Acesso o servidor NODE que me dá o resultado
	    $.ajax({
	      type: "GET",
	      url: "http://nodeteste.freitas.webfactional.com/jogo?opcao="+opcao,
	      data: {},
	      dataType: "json",
	      cache: false
	    }).done(function( response ) {
	    	console.log(response);
	        $("span#resultado").html(response.sua_escolha+'<br/>'+response.server_escolha+'<br/>'+response.mensagem);
	    }).fail(function( jqXHR, textStatus ) {
	        
	        //alert( "No internet connection! Error: " + textStatus );
	        //Se o Servidor não estiver online, jogar local
			
			var opcoes = ['pedra','papel','tesoura'];
			if(opcoes.indexOf(opcao) >= 0){    	
		    	var item = opcoes[Math.floor(Math.random()*opcoes.length)];
		    	console.log(item);
		    	console.log(compara(opcao,item));
		    	var response = {
		    		sua_escolha:'Você escolheu: ' + opcao,
		    		server_escolha: 'Server escolheu: ' + item,
		    		mensagem: 'Você ' + compara(opcao,item)
		    	};
		    	$("span#resultado").html(response.sua_escolha+'<br/>'+response.server_escolha+'<br/>'+response.mensagem);	
		    }
		    
	    });


	});
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