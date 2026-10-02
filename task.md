As part of our workshop, we designed a simple Express application with caching for both GET /products and GET /products/:id.
Your task is to extend the application as follows:
Organize the application into the following folders:
routes
controllers
services
database
middleware
Implement caching for the GET endpoints.
Add caching as middleware
Whenever a POST, PUT, PATCH, or DELETE request successfully modifies the stored data, invalidates all cache entries that may contain stale data.
Add headers for cache HIT and MISS
Implement a Time to Live (TTL) of 1 minute for cached data.
Store the time at which each cache entry was created.
When a cached value is requested, check whether it is older than 1 minute.
If it has expired, do not use the cached value.
Fetch the latest data from the database and store the fresh value in the cache again.
The expected request flow should follow the layered structure:
Route → Middleware → Controller → Service → Database

Workshop submission form - https://docs.google.com/forms/d/e/1FAIpQLSeKyCbxS_85GbVgAzPONQDqMU3eXNU2TV4Nc_VxFtSZFfJq0g/viewform


