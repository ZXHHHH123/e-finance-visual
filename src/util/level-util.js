export function level2num (data) {
  var ret = 0
  if (data.charAt(0) === 'D') {
    ret = 1
  } else if (data.charAt(0) === 'C') {
    ret = 2
  } else if (data.charAt(0) === 'B') {
    ret = 7
  } else if (data.charAt(0) === 'A') {
    ret = 12
  }

  ret = ret + data.length - 1
  return ret
}

export function num2level (params, ticket, callback) {
  var levelNum = parseInt(params.value[2])
  var level = 'unknow'
  if (levelNum === 1) {
    level = 'D'
  } else if (levelNum >= 2 && levelNum < 7) {
    if (levelNum - 1 === 1) {
      level = 'C'
    } else {
      level = (levelNum - 1) + 'C'
    }
  } else if (levelNum >= 7 && levelNum < 12) {
    if (levelNum - 6 === 1) {
      level = 'B'
    } else {
      level = (levelNum - 6) + 'B'
    }
  } else if (levelNum >= 12 && levelNum < 17) {
    if (levelNum - 11 === 1) {
      level = 'A'
    } else {
      level = (levelNum - 11) + 'A'
    }
  }
  return params.name + ': ' + level
}
