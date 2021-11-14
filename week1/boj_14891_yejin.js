const readline = require("readline")
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const COGWHEEL_COUNT = 4
const RotateInfo = {
  clockwise: 1,
  counterclockwise: -1,
  stop: 0,
}

const cogwheelInfo = []
let cogwheelRotateInfo = []
let rotateCount = 0
const rotateOrder = []

function rotateCogWheel(wheelIdx, rotateInfo) {
  if (rotateInfo === RotateInfo.stop) {
    return
  }
  if (rotateInfo === RotateInfo.clockwise) {
    const lastValue = cogwheelInfo[wheelIdx].pop()
    cogwheelInfo[wheelIdx] = [lastValue, ...cogwheelInfo[wheelIdx]]
  } else {
    const firstValue = cogwheelInfo[wheelIdx][0]
    cogwheelInfo[wheelIdx] = [...cogwheelInfo[wheelIdx].slice(1), firstValue]
  }
}

function setCogwheelRotateInfo(wheelNum, rotateInfo) {
  const wheelIdx = wheelNum - 1
  if (cogwheelRotateInfo[wheelIdx] !== undefined) {
    return
  }

  cogwheelRotateInfo[wheelIdx] = rotateInfo
  if (wheelNum > 1) {
    const prevWheelIdx = wheelNum - 2
    const isRotate =
      rotateInfo !== RotateInfo.stop &&
      cogwheelInfo[prevWheelIdx][2] !== cogwheelInfo[wheelIdx][6]
    setCogwheelRotateInfo(
      wheelNum - 1,
      isRotate ? rotateInfo * -1 : RotateInfo.stop
    )
  }
  if (wheelNum < COGWHEEL_COUNT) {
    const nextWheelIdx = wheelNum
    const isRotate =
      rotateInfo !== RotateInfo.stop &&
      cogwheelInfo[nextWheelIdx][6] !== cogwheelInfo[wheelIdx][2]
    setCogwheelRotateInfo(
      wheelNum + 1,
      isRotate ? rotateInfo * -1 : RotateInfo.stop
    )
  }
}

function getScore() {
  const cogWheelScoreInfo = [1, 2, 4, 8]
  return cogwheelInfo.reduce((acc, cur, idx) => {
    return acc + parseInt(cur[0]) * cogWheelScoreInfo[idx]
  }, 0)
}

rl.on("line", function (line) {
  if (cogwheelInfo.length < COGWHEEL_COUNT) {
    cogwheelInfo.push(line.split(""))
  } else if (rotateCount === 0) {
    rotateCount = parseInt(line)
  } else {
    rotateOrder.push(line.split(" "))
    if (rotateCount === rotateOrder.length) {
      rotateOrder.forEach((info) => {
        setCogwheelRotateInfo(parseInt(info[0]), parseInt(info[1]))
        cogwheelRotateInfo.forEach((info, idx) => {
          rotateCogWheel(idx, info)
        })
        cogwheelRotateInfo = []
      })
      rl.close()
    }
  }
}).on("close", () => {
  console.log(getScore())
  process.exit()
})
