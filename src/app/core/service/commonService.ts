const decodeString = (str: string) => {
  const textArea = document.createElement('textarea')
  textArea.innerHTML = str
  return textArea.value
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  decodeString
}