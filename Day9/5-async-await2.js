// Implementing retry logic was pretty clumsy with Promises
// But with async/await it a lot more simple.
function request(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error(`Network error when trying to reach ${url}`));
    }, 500);
  });
}

function wait(timeout) {
  return new Promise((resolve) => setTimeout(resolve, timeout));
}

async function requestWithRetry(url) {
  const MAX_RETRIES = 10;
  for (let i = 0; i <= MAX_RETRIES; i++) {
    try {
      return await request(url);
    } catch (err) {
      const timeout = Math.pow(2, i);
      console.log('Waiting', timeout, 'ms');
      await wait(timeout);
      console.log('Retrying', err.message, i);
    }
  }
}

requestWithRetry('http://localhost:3000');
