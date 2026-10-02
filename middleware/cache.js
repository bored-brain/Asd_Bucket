const cache = {};
const TTL = 60 * 1000;

function cacheMiddleware(req, res, next) {
  let key = req.originalUrl;
  let entry = cache[key];

  if (entry) {
    let age = Date.now() - entry.createdAt;

    if (age < TTL) {
      res.set("X-Cache", "HIT");
      return res.json(entry.data);
    }

    delete cache[key];
  }

  res.set("X-Cache", "MISS");
  res.cacheKey = key;
  next();
}

function setCache(key, data) {
  cache[key] = {
    data,
    createdAt: Date.now(),
  };
}

function invalidateCache() {
  for (let key in cache) {
    delete cache[key];
  }
}

module.exports = { cacheMiddleware, setCache, invalidateCache };
