export class UsuarioService {
    constructor({ $axios }) {
        this.$axios = $axios
    }

    FindAll() {
        return this.$axios.$get('/usuario/all')
    }

    deletedById({ params }) {
        console.log('params.serv.js', params)
        return this.$axios.$get('/usuario/delete', {
            params,
        })
    }


    usuarioInsert(usuario) {
        return this.$axios.$post('/usuario/save', usuario)
    }
}