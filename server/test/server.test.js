const rp = require('request-promise-native');
const server = require('../server');
let httpServer = null;

describe('server', () => {
  beforeAll(() => {
    console.log('beforeAll');
    return new Promise(resolve => {
      httpServer = server.listen(process.env.PORT || 3000, () => {
        console.log(
          'Express server is up and running on http://localhost:3000/'
        );
        resolve();
      });
    });
  });

  afterAll(() => {
    console.log('afterAll');
    if (httpServer) {
      return new Promise(resolve => {
        httpServer.close(() => {
          console.log('Express server is closed');
          resolve();
        });
      });
    }
  });

  it('should return status code 200 for a single query for nutrient', async () => {
    const res = await rp(
      'http://localhost:3000/foods?nutrients[0]=protein:1&operator=or'
    );
    console.log(JSON.parse(res).status);
    expect(JSON.parse(res).status).toBe(200);
  });

  it('should return status code 200 for query of multiple nutrients with "or"', async () => {
    const res = await rp(
      'http://localhost:3000/foods?nutrients[0]=protein:1&nutrients[1]=sugar:2&operator=or'
    );
    console.log(JSON.parse(res).status);
    expect(JSON.parse(res).status).toBe(200);
  });

  it('should return status code 200 for query of multiple nutrients with "and"', async () => {
    const res = await rp(
      'http://localhost:3000/foods?nutrients[0]=protein:1&nutrients[1]=sugar:2&operator=and'
    );
    console.log(JSON.parse(res).status);
    expect(JSON.parse(res).status).toBe(200);
  });

  it('should return status code 400 for query of invalid nutrient', async () => {
    const res = await rp(
      'http://localhost:3000/foods?nutrients[0]=iron:1&operator=and'
    );
    console.log(JSON.parse(res).status);
    expect(JSON.parse(res).status).toBe(400);
  });

  it('should return status code 400 for query of invalid value', async () => {
    const res = await rp(
      'http://localhost:3000/foods?nutrients[0]=protein:one&operator=and'
    );
    console.log(JSON.parse(res).status);
    expect(JSON.parse(res).status).toBe(400);
  });
});
