function solution(cacheSize, cities) {
  if (cacheSize === 0) return cities.length * 5;

  const caching = cities.reduce(
    (prev, beforeCity) => {
      const [cache, time] = prev;
      const city = beforeCity.toUpperCase();

      if (cache.size < cacheSize) {
        const [changedCache, runningTime] = isRowCached(cache, city);
        return [changedCache, time + runningTime];
      }
      const [changedCache, runningTime] = isFullCached(cache, city);
      return [changedCache, time + runningTime];
    },
    [new Map(), 0]
  );

  return caching[1];
}

function isRowCached(cache, city) {
  if (cache.has(city)) {
    cache.delete(city);
    cache.set(city, null);
    return [cache, 1];
  }
  cache.set(city, null);
  return [cache, 5];
}

function isFullCached(cache, city) {
  if (cache.has(city)) {
    cache.delete(city);
    cache.set(city, null);
    return [cache, 1];
  }
  cache.delete([...cache][0][0]);
  cache.set(city, null);
  return [cache, 5];
}
