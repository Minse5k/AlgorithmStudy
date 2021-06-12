function solution(records) {
  const recodeMap = new Map();
  const results = [];
  const command = {
    before: { enter: "Enter", leave: "Leave", change: "Change" },
    after: {
      enter: "님이 들어왔습니다.",
      leave: "님이 나갔습니다.",
    },
  };

  records.forEach((recode) => {
    const [cmd, id, nick] = recode.split(" ");
    switch (cmd) {
      case command.before.enter: {
        recodeMap.set(id, nick);
        results.push({ id, command: command.after.enter });
        break;
      }
      case command.before.leave: {
        results.push({ id, command: command.after.leave });
        break;
      }
      case command.before.change: {
        recodeMap.set(id, nick);
        break;
      }
    }
  });

  const answer = results.map((result) =>
    [recodeMap.get(result.id), result.command].join("")
  );

  return answer;
}
