import { StatusCodes } from 'http-status-codes'
import { buildError } from '@/utils'

export default function (ctx) {
  const { $dialog, $axios, app, redirect } = ctx
  // A noop loading inteterface for when $nuxt is not yet ready
  const noopLoading = {
    finish: () => {},
    start: () => {},
    fail: () => {},
    set: () => {},
  }

  let requestCounter = 0

  let errors = []

  const $loading = ($process, $window) => {
    if ($process.browser && $window.$nuxt) {
      const { $loading = {} } = $window.$nuxt
      return Object.keys($loading).length > 1 ? $loading : noopLoading
    } else {
      return noopLoading
    }
  }

  $axios.onRequest((config) => {
    if (config && config.progress === false) {
      return
    }

    if (requestCounter === 0) {
      if (process.browser && window.$nuxt) {
        errors = []
        $loading(process, window).start()
      }
    }

    requestCounter++
  })

  $axios.onResponse((response) => {
    if (requestCounter > 0) requestCounter--

    if (response && response.config && response.config.progress === false) {
      return
    }

    if (requestCounter === 0 && process.browser && window.$nuxt) {
      $loading(process, window).finish()
    }
  })

  $axios.onError((error) => {
    // Redirect to login when token expires
    if (error.response && error.response.status === StatusCodes.UNAUTHORIZED) {
      app.$auth.reset()
      redirect('/login')
      requestCounter = 0
    }

    if (requestCounter > 0) requestCounter--

    errors.push(buildError(error))

    if (error && error.config && error.config.progress === false) return

    if (requestCounter === 0 && process.browser && window.$nuxt) {
      $loading(process, window).fail()

      // Getting only the last error for user
      const [lastError] = errors.slice(-1)

      // Prompt the error
      $dialog.error({
        text:
          lastError.status === -1
            ? 'Ocurrió un error inesperado, inténtalo nuevamente'
            : lastError.message,
        title: 'Error',
        icon: 'mdi-close-octagon-outline',
      })
    }
  })
}
