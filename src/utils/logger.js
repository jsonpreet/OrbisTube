

const logger = {
  error: (message, error) => {
    //console.error(message, error)
    console.error(message, error.message)
  }
}

export default logger