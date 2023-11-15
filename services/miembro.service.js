export class MiembroService {
    constructor({ $axios }) {
        this.$axios = $axios
    }

    FindAll() {
        return this.$axios.$get('/miembro/allP')
    }  

    deletedById({ params }) {
        console.log('params.serv.js', params)
        return this.$axios.$get('/miembro/delete', {
            params,
        })
    }


    usuarioInsert(miembro) {
        return this.$axios.$post('/miembro/save', miembro)
    }
}