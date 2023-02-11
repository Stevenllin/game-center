const decodeString = (string: string) => {
  const textArea = document.createElement('textarea')
  textArea.innerHTML = string
  return textArea.value
}

const getQuizValidTime = (target: number) => {
  const minute = new Date().getTime() + target * 1000 * 60 + 1500;
  return minute
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  decodeString,
  getQuizValidTime
}