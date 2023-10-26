export class EstadoService {
    constructor({ $axios }) {
        this.$axios = $axios
    }

    FindAll({params}) {
        return this.$axios.$get('/tablero/findByproyectoId',{
            params,
        })
    }
    
    FindAllEstadoProyecto() {
        return this.$axios.$get('/estado/all')
    }    
}