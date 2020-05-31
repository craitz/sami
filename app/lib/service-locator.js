// =============================================================
// Autor: Camilo Raitz da Silva
// Descrição: classe responsável pela injeção de dependências
// ==============================================================

'use strict';

class ServiceLocator {
    constructor() {
        this.dependencyMap = {};
        this.dependencyCache = {};
    }

    // -- método que insere uma dependência no registro --
    register(dependencyName, constructor) {
        if (typeof constructor !== 'function') {
            throw new Error(dependencyName + ': O construtor dessa dependência não é uma função');
        }

        if (!dependencyName) {
            throw new Error('O nome da dependência é inválido');
        }

        this.dependencyMap[dependencyName] = constructor;
    }

    // -- método que retorna uma dependência do registro --
    // Caso a dependência já esteja na cache, é obtida de lá.
    // Caso contrário, é criada uma instância da dependência, que
    // é então adicionada na cache.
    get(dependencyName) {
        if (this.dependencyMap[dependencyName] === undefined) {
            throw new Error(dependencyName + ': Não foi possível encontrar a dependência');
        }

        if (typeof this.dependencyMap[dependencyName] !== 'function') {
            throw new Error(dependencyName + ': O construtor dessa dependência não é uma função');
        }

        if (this.dependencyCache[dependencyName] === undefined) {
            const dependencyConstructor = this.dependencyMap[dependencyName];
            const dependency = dependencyConstructor(this);
            if (dependency) {
                this.dependencyCache[dependencyName] = dependency;
            }
        }

        return this.dependencyCache[dependencyName];
    }

    // -- método que limpa o registro de dependências --
    clear() {
        this.dependencyCache = {};
        this.dependencyMap = {};
    }
}

module.exports = new ServiceLocator();