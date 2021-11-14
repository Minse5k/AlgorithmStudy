const readline = require("readline")
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

let N = undefined
let chickenStoreCount = undefined
let rowCount = 0
const homeList = []
const chickenStoreList = []

function getCombinations(arr, selectCount) {
  const results = []
  if (selectCount === 1) {
    return arr.map((value) => [value])
  }

  arr.forEach((fixed, idx, arr) => {
    const rest = arr.slice(idx + 1)
    const restCombinations = getCombinations(rest, selectCount - 1)
    const combinations = restCombinations.map((restCombination) => [
      fixed,
      ...restCombination,
    ])
    results.push(...combinations)
  })

  return results
}

function calculateDist(coord1, coord2) {
  return Math.abs(coord1[0] - coord2[0]) + Math.abs(coord1[1] - coord2[1])
}

function calculateChickenDist(homeCoord, chickenStoreList) {
  return Math.min(
    ...chickenStoreList.map((storeCoord) =>
      calculateDist(homeCoord, storeCoord)
    )
  )
}

function getResult(combinations) {
  return Math.min(
    ...combinations.map((chickenStoreList) =>
      homeList.reduce(
        (acc, curHome) => acc + calculateChickenDist(curHome, chickenStoreList),
        0
      )
    )
  )
}

rl.on("line", function (line) {
  const splitLine = line.split(" ")
  if (N === undefined) {
    N = parseInt(splitLine[0])
    chickenStoreCount = parseInt(splitLine[1])
  } else {
    splitLine.forEach((value, idx) => {
      if (value === "1") {
        homeList.push([rowCount, idx])
      } else if (value === "2") {
        chickenStoreList.push([rowCount, idx])
      }
    })
    rowCount += 1
    if (N === rowCount) {
      const combinations = getCombinations(chickenStoreList, chickenStoreCount)
      console.log(getResult(combinations))
      rl.close()
    }
  }
}).on("close", () => {
  process.exit()
})
