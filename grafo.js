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
		if(verticeA == verticeB)
			return false; // Tentando conectar o vértice a ele mesmo
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
		var qtd = this.ordem()-1; // Ordem-1 é a quantidade esperada de conexões em cada vértice para ser completo
		for(var vertice of this.vertices){
			if(qtd != this.grau(vertice))
				return false; // Algum vértice com grau diferente de ordem-1
		}
		return true; // Todos vértices com grau igual a ordem-1
	},

	fechoTransitivo: function(vertice){
		var fecho = new Set(); // Novo conjunto onde será colocado o fecho transitivo
		fecho.add(vertice); // Coloca o próprio vértice em seu fecho
		for(var vertice of fecho){ // Percorre todos os vértices do fecho atual
			for(var aresta of vertice.arestas){ // Percorre cada aresta do fecho atual
				fecho.add(aresta); // Adiciona os vértices que foram alcaçados e não estavam no fecho
			}
		}
		return fecho; // Retorna o conjunto dos vértices alcançáveis
	},

	eConexo: function(){
		if(this.ordem() == 0)
			return false; // Não há vértices no grafo
		var qtd = this.fechoTransitivo(this.umVertice()).size; // Pega o tamanho de um fecho transitivo qualquer
		if(qtd != this.ordem()) // Se a ordem e o tamanho do fecho são diferentes
			return false; // Não é conexo, o fecho percorreu apenas uma componente conexa das várias
		return true; // É conexo, o fecho transitivo de um vértice é todo o grafo
	},

	eArvore: function(){
		if(this.ordem() == 0)
			return false; // Não há vértices no grafo
		var fecho = new Set(); // Novo conjunto onde será colocado o fecho transitivo
		var qtd = 0; // Inicia onde serão contadas as arestas
		fecho.add(this.umVertice()); // Coloca o próprio vértice em seu fecho
		for(var vertice of fecho){ // Percorre todos os vértices do fecho atual
			qtd = qtd + vertice.arestas.size; // Soma a quantidade de arestas
			for(var aresta of vertice.arestas){ // Percorre cada aresta do vertice atual
				fecho.add(aresta); // Adiciona os vértices que foram alcançados e não estavam no fecho
			}
		}
		if((fecho.size == this.ordem()) && (this.ordem()-1 == qtd/2)) // Se é conexo e tem o número mínimo de arestas, ou seja não tem ciclos
			return true; // Então é árvore
		return false; // Não é árvore
	}
};