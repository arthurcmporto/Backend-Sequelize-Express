const Services = require('./Services.js');

class PessoaService extends Services {
    constructor() {
        super('Pessoa');
        this.matriculaServices = new Services('Matricula');
    }

    async pegaMatriculasAtivasPorEstudante(id) {
        const estudante = await super.pegaUmRegistroPorId(id);
        const listaMatriculas = await estudante.getAulasMatriculadas();
        return listaMatriculas;
    }

    async pegaPessoasEscopo() {
        const listaPessoas = await super.pegaRegistrosPorEscopo('todosOsRegistros');
        return listaPessoas;
    }


    async pegaTodasAsMatriculasPorEstudante(id) {
        const estudante = await super.pegaUmRegistroPorId(id);
        const listaMatriculas = await estudante.getTodasAsMatriculas();
        return listaMatriculas;
    }

    async cancelaPessoaEMatriculas(estudanteId){
        await super.atualizaRegistro({ ativo: false }, { id: estudanteId });
        await this.matriculaServices.atualizaRegistro({status: 'cancelado'}, {estudante_id: estudanteId});
    }

}



module.exports = PessoaService;