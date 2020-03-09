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
      'http://localhost:3000/foods?nutrients[0]=protein:1&operator=or',
      {
        json: true,
        resolveWithFullResponse: true
      }
    );
    expect(res.statusCode).toBe(200);
  });

  it('should return status code 200 for query of multiple nutrients with "or"', async () => {
    const res = await rp(
      'http://localhost:3000/foods?nutrients[0]=protein:1&nutrients[1]=sugar:2&operator=or',
      {
        json: true,
        resolveWithFullResponse: true
      }
    );
    expect(res.statusCode).toBe(200);
  });

  it('should return status code 200 for a valid query of multiple nutrients with "and"', async () => {
    const res = await rp(
      'http://localhost:3000/foods?nutrients[0]=protein:1&nutrients[1]=sugar:2&operator=and',
      {
        json: true,
        resolveWithFullResponse: true
      }
    );
    expect(res.statusCode).toBe(200);
  });

  it('should return the right error message for query of invalid nutrient', () => {
    return rp('http://localhost:3000/foods?nutrients[0]=iron:2&operator=and', {
      json: true,
      resolveWithFullResponse: true
    }).then(
      res => {
        fail('Should fail');
      },
      err => {
        expect(err.statusCode).toEqual(400);
        expect(err.error.message).toEqual(['iron is not a valid nutrient']);
      }
    );
  });

  it('should return the right error message for query of invalid value', async () => {
    return rp(
      'http://localhost:3000/foods?nutrients[0]=protein:one&operator=and',
      {
        json: true
      }
    ).then(
      res => {
        fail('Should fail');
      },
      err => {
        expect(err.statusCode).toEqual(400);
        expect(err.error.message).toEqual(['one is not a number for protein']);
      }
    );
  });

  it('should return the right error message for query with invalid operator', async () => {
    return rp(
      'http://localhost:3000/foods?nutrients[0]=protein:one&operator=join',
      {
        json: true
      }
    ).then(
      res => {
        fail('Should fail');
      },
      err => {
        expect(err.statusCode).toEqual(400);
        expect(err.error.message).toEqual(['Invalid operator join']);
      }
    );
  });
});
