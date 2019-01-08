export function getNiceScore(score) {
  if (score !== null) {
    return score
      .toString()
      .match(/(\d+?)(?=(\d{3})+(?!\d)|$)/g)
      .join(' ')
  }

  return null
}
