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

    NomColumn(tablero){
        return this.$axios.$post('/tablero/save', tablero)
    }

    DelColumn({ params }) {
        console.log('params.estado.service.js', params)
        return this.$axios.$get('/tablero/delete', {
          params,
        })
    }
}