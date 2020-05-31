'use strict';

class ServiceLocator {
    constructor() {
        this.dependencyMap = {};
        this.dependencyCache = {};
    }

    register(dependencyName, constructor) {
        if (typeof constructor !== 'function') {
            throw new Error(dependencyName + ': O construtor dessa dependência não é uma função');
        }

        if (!dependencyName) {
            throw new Error('O nome da dependência é inválido');
        }

        this.dependencyMap[dependencyName] = constructor;
    }

    get(dependencyName) {
        if (this.dependencyMap[dependencyName] === undefined) {
            throw new Error(dependencyName + ': A dependência é desconhecida');
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

    clear() {
        this.dependencyCache = {};
        this.dependencyMap = {};
    }
}

module.exports = new ServiceLocator();