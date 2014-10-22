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
		var iterador = vertice.arestas.values();
		for(var adjacente in iterador){ // Retira cada aresta que ligava ao vértice
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
		if()
		verticeA.arestas.delete(verticeB);
		verticeB.arestas.delete(verticeA);
		return true; // A conexão entre os dois vértices foi desfeita
	},
	ordem: function(){
		return this.vertices.size; // Retorna a quantidade de 
	},
	todosVertices: function(){
		return this.vertices;
	},
	umVertice: function(){
		var iterador = this.vertices.values();
		return iterador.next().value; // Retorna o primeiro vertice que o iterador trouxer
	},
	adjacentes: function(vertice){
		return this.vertice.arestas;
	},
	grau: function(vertice){
		return this.vertice.arestas.size;
	},
	//Acoes Derivadas
	eRegular: function(){},
	eCompleto: function(){},
	fechoTransitivo: function(vertice){},
	eConexo: function(){},
	eArvore: function(){}
};