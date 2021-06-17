function solution(total, me, rival) {
  const league = createLeague(total, me, rival);
  const answer = startLeague(total, league);

  return answer;
}

const player = {
  me: "A",
  rival: "B",
  other: "C",
};

function createLeague(total, me, rival) {
  const league = new Array(total + 1).fill(player.other);
  league[me] = player.me;
  league[rival] = player.rival;

  return league;
}

function startLeague(total, league) {
  let count = 0;
  if (total === 1) return count;

  const nextLeague = [false];
  count++;
  for (let i = 1; i <= total; i += 2) {
    if (league[i] === league[i + 1]) {
      nextLeague.push(league[i]);
      continue;
    }

    switch (league[i]) {
      case player.me: {
        if (league[i + 1] === player.rival) {
          return count;
        }
        nextLeague.push(league[i]);
        break;
      }
      case player.rival: {
        if (league[i + 1] === player.me) {
          return count;
        }
        nextLeague.push(league[i]);
        break;
      }
      default: {
        nextLeague.push(league[i + 1]);
      }
    }
  }

  count += startLeague(total / 2, nextLeague);

  return count;
}
