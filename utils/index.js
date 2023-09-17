export function routeOption(route, key, value) {
    return route.matched.some((m) => {
      if (process.client) {
        // Client
        return Object.values(m.components).some(
          (component) => component.options && component.options[key] === value
        )
      } else {
        // SSR
        return Object.values(m.components).some((component) =>
          Object.values(component._Ctor).some(
            (ctor) => ctor.options && ctor.options[key] === value
          )
        )
      }
    })
  }
  
  export function fakeFetch(time = 1000) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), time)
    })
  }
  
  export function buildError(error) {
    if (error.response) {
      const { data } = error.response
  
      if (data) {
        const { statusCode: status, message } = data
        return { status, message }
      } else {
        const { status, statusText: message } = error.response
        return { status, message }
      }
    } else {
      return { status: -1, message: error.message }
    }
  }
  
  export function buildNamespace(namespace) {
    return (action) => {
      return [namespace, action].join('/')
    }
  }
  
  export function buildRangeCaption({ max, min }) {
    const captions = []
  
    if (min > 0) {
      captions.push(`>= ${min}`)
    }
  
    if (max < 100) {
      captions.push(`< ${max}`)
    }
  
    return captions.join(' Y ')
  }
  
  export const questionTypes = {
    AGREEMENT: 1,
    COMMENT: 2,
    SATISFACTION: 3,
  }
  
  export function removeReactivity(object) {
    return JSON.parse(JSON.stringify(object))
  }
  
  export async function readFile(pathToFile) {
    const response = await fetch(pathToFile)
  
    return response.arrayBuffer()
  }
  