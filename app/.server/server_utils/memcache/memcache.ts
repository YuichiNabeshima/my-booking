import Memcached from 'memcached';

const memcached = new Memcached('localhost:11211');

// set value
memcached.set('key', 'value', 10, (err) => {
  if (err) console.error(err);
});

// get value
memcached.get('key', (err, data) => {
  if (err) console.error(err);
  console.log('Fetched value:', data);
});
