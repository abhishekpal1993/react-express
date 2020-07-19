import debug from 'debug';

const logger = () => {
  const log = debug('custom:server');
  return (str) => {
    log(JSON.stringify(str, null, 2));
  }
}

export default logger;