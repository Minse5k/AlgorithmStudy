const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const dummyGameInfo = {
  boardSize: undefined,
  applePositionInfoCount: undefined,
  applePositionInfoList: [],
  directionTransformInfoCount: undefined,
  directionTransformInfoList: [],
}

const snakeInfo = {
  length: 1,
  position: [[0, 0]],
}

const directionTransformType = {
  RIGHT: 'right',
  DOWN: 'down',
  LEFT: 'left',
  UP: 'up',
}

const directionTransformOrder = [
  directionTransformType.RIGHT,
  directionTransformType.DOWN,
  directionTransformType.LEFT,
  directionTransformType.UP,
]

function setDummyGameInfo(line) {
  if (!dummyGameInfo.boardSize) {
    return (dummyGameInfo.boardSize = parseInt(line))
  } else if (dummyGameInfo.applePositionInfoCount === undefined) {
    return (dummyGameInfo.applePositionInfoCount = parseInt(line))
  } else if (
    dummyGameInfo.applePositionInfoList.length !==
    dummyGameInfo.applePositionInfoCount
  ) {
    const input = line.split(' ')
    return dummyGameInfo.applePositionInfoList.push([
      parseInt(input[0]),
      parseInt(input[1]),
    ])
  } else if (dummyGameInfo.directionTransformInfoCount === undefined) {
    return (dummyGameInfo.directionTransformInfoCount = parseInt(line))
  }
  const input = line.split(' ')
  return dummyGameInfo.directionTransformInfoList.push([
    parseInt(input[0]),
    input[1],
  ])
}

function getNextHead(type) {
  const snakeHead = snakeInfo.position[0]
  if (type === directionTransformType.RIGHT) {
    return [snakeHead[0], snakeHead[1] + 1]
  } else if (type === directionTransformType.DOWN) {
    return [snakeHead[0] + 1, snakeHead[1]]
  } else if (type === directionTransformType.LEFT) {
    return [snakeHead[0], snakeHead[1] - 1]
  } else {
    return [snakeHead[0] - 1, snakeHead[1]]
  }
}

function hasApple(position) {
  return dummyGameInfo.applePositionInfoList.find((info, idx) => {
    if (info[0] === position[0] + 1 && info[1] === position[1] + 1) {
      dummyGameInfo.applePositionInfoList[idx] = []
      return true
    }
  })
}

function getDirectionTransformOrderIdxByKeyword(
  currentDirectionTransformOrderIdx,
  keyword
) {
  if (keyword === 'D') {
    const nextDirectionTransformOrderIdx = currentDirectionTransformOrderIdx + 1
    return nextDirectionTransformOrderIdx % 4
  }
  const nextDirectionTransformOrderIdx = currentDirectionTransformOrderIdx - 1
  return nextDirectionTransformOrderIdx < 0
    ? directionTransformOrder.length - 1
    : nextDirectionTransformOrderIdx
}

function startDummyGame() {
  let timer = 0
  let currentDirectionTransformOrderIdx = 0
  while (1) {
    timer += 1
    const nextHead = getNextHead(
      directionTransformOrder[currentDirectionTransformOrderIdx]
    )
    if (
      nextHead.includes(-1) ||
      nextHead[0] === dummyGameInfo.boardSize ||
      nextHead[1] === dummyGameInfo.boardSize
    ) {
      break
    }
    if (
      snakeInfo.position.some(
        info => info[0] === nextHead[0] && info[1] === nextHead[1]
      )
    ) {
      break
    }
    snakeInfo.position = [nextHead, ...snakeInfo.position]
    if (hasApple(nextHead)) {
      snakeInfo.length = snakeInfo.length + 1
    } else {
      snakeInfo.position.pop()
    }
    if (
      dummyGameInfo.directionTransformInfoList.length > 0 &&
      dummyGameInfo.directionTransformInfoList[0][0] === timer
    ) {
      currentDirectionTransformOrderIdx =
        getDirectionTransformOrderIdxByKeyword(
          currentDirectionTransformOrderIdx,
          dummyGameInfo.directionTransformInfoList[0][1]
        )
      dummyGameInfo.directionTransformInfoList =
        dummyGameInfo.directionTransformInfoList.length > 1
          ? dummyGameInfo.directionTransformInfoList.slice(1)
          : []
    }
  }
  return {
    endTime: timer,
  }
}

rl.on('line', function (line) {
  setDummyGameInfo(line)
  if (
    dummyGameInfo.directionTransformInfoCount ===
    dummyGameInfo.directionTransformInfoList.length
  ) {
    const { endTime } = startDummyGame()
    console.log(endTime)
    rl.close()
  }
}).on('close', () => {
  process.exit()
})
