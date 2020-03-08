const rp = require('request-promise-native');
const server = require('../server');
let httpServer = null;

describe('server', () => {
  beforeAll(() => {
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

  it('should do something', async () => {
    const res = await rp(
      'http://localhost:3000/foods?nutrients[0]=protein:2&operator=or'
    );
    console.log({ res });
    expect(true).toBe(true);
  });

  it('should do something', async () => {
    const res = await rp(
      'http://localhost:3000/foods?nutrients[0]=protein:2&nutrients[1]=sugar:1&operator=or'
    );
    console.log({ res });
    expect(true).toBe(true);
  });
});
