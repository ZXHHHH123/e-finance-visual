function isEmptyDict (obj) {
  if (JSON.stringify(obj) === '{}') {
    return true
  } else {
    return false
  }
}

export default
{
  isEmptyDict
}
