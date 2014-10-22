var Grafo = function(){
	this.vertices = new Set();
}

var Vertice = function(id){
	this.id = id;
	this.arestas = new Set();
}

Grafo.prototype = {
	//Ações Básicas
	adicionaVertice: function(vertice){
		if(this.vertices.has(vertice))
			return false; // O vértice já está no grafo
		this.vertices.add(vertice);
		return true; // O vértice foi adicionado
	},

	removeVertice: function(vertice){
		if(!(this.vertices.has(vertice)))
			return false; // O vértice já não está no grafo
		this.vertices.delete(vertice); // Remove o vértice do grafo
		for(var adjacente of vertice.arestas){ // Retira cada aresta que ligava ao vértice
			adjacente.arestas.delete(vertice);
			vertice.arestas.delete(adjacente);
		}
		return true; // O vértice foi removido
	},

	conecta: function(verticeA,verticeB){
		if(!(this.vertices.has(verticeA) && this.vertices.has(verticeB)))
			return false; // Algum dos vértices não está no grafo
		if(verticeA.arestas.has(verticeB))
			return false; // Os vértices já estão conectados
		verticeA.arestas.add(verticeB); // Pode-se adicionar um valor a ligação utilizando um Map no lugar de Set, no caso de um grafo valorado
		verticeB.arestas.add(verticeA); // Pode-se adicionar a aresta apenas em um sentido no caso de um grafo orientado
		return true; // Os dois vértices foram conectados
	},

	desconecta: function(verticeA,verticeB){
		if(!(this.vertices.has(verticeA) && this.vertices.has(verticeB)))
			return false; // Algum dos vértices não está no grafo
		if(!(verticeA.arestas.has(verticeB)))
			return false; // Os vértices não está conectados
		verticeA.arestas.delete(verticeB);
		verticeB.arestas.delete(verticeA);
		return true; // A conexão entre os dois vértices foi desfeita
	},

	ordem: function(){
		return this.vertices.size; // Retorna a quantidade de vértices no grafo
	},

	todosVertices: function(){
		return this.vertices; // Retorna um set com todos os vertices do grafo
	},

	umVertice: function(){
		var iterador = this.vertices.values();
		return iterador.next().value; // Retorna o primeiro vertice que o iterador trouxer
	},

	adjacentes: function(vertice){
		return vertice.arestas; // Retorna um set com todos os vertices adjacentes ao vertice
	},

	grau: function(vertice){
		return vertice.arestas.size; // Retorna a quantidade de vertices adjacentes ao vertice
	},

	//Acoes Derivadas
	eRegular: function(){
		if(this.ordem() == 0)
			return false; // Nenhum vértice no grafo
		var qtd = -1;
		for(var vertice of this.vertices){
			window.alert(this.grau(vertice));
			if(qtd == -1)
				qtd = this.grau(vertice);
			else if(qtd != this.grau(vertice))
				return false; // Algum vértice com grau diferente dos outros
		}
		return true; // Todos vértices com mesmo grau
	},

	eCompleto: function(){
		if(this.ordem() == 0)
			return false; // Nenhum vértice no grafo
		var qtd = this.ordem()-1;
		for(var vertice of this.vertices){
			if(qtd != this.grau(vertice))
				return false; // Algum vértice com grau diferente de ordem-1
		}
		return true; // Todos vértices com grau igual a ordem-1
	},

	fechoTransitivo: function(vertice){},

	eConexo: function(){},

	eArvore: function(){}
};