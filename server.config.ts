const config = (app) => {
  app.get('/api/hello-world/', (_, res) => {
    res.send('Hello world from proxy server!');
  });
};

export default config;
