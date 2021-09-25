import app from './config/app';

app.listen(process.env.BackendPort, () => {
  console.log('Express server listening on port ' + process.env.BackendPort);
});
