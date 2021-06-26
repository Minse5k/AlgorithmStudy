function solution(infos, querys) {
  const tables = getTable(infos);

  const answer = getAnswer(tables, querys);
  return answer;
}

function getTable(infos) {
  const tables = infos.reduce((tables, info) => {
    const [language, job, career, food, score] = info.split(" ");
    return [
      ...tables,
      {
        language,
        job,
        career,
        food,
        score: parseInt(score),
      },
    ];
  }, []);

  return tables.sort((a, b) => b.score - a.score);
}

function getAnswer(tables, querys) {
  return querys.reduce((answers, query) => {
    const [language, job, career, last] = query.split(" and ");
    const [food, score] = last.split(" ");
    let count = 0;
    for (const table of tables) {
      if (table.score < parseInt(score)) break;
      if (table.language !== language && language !== "-") continue;
      if (table.job !== job && job !== "-") continue;
      if (table.career !== career && career !== "-") continue;
      if (table.food !== food && food !== "-") continue;
      count++;
    }

    return [...answers, count];
  }, []);
}
