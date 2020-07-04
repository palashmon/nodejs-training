// callback hell

function getUser(cb) {
  setTimeout(() => {
    return cb(null, { name: 'john', id: 1 });
  }, 1000);
}

function getSubscriptions(id, cb) {
  let subscriptions = [
    {
      name: 'monthly dining',
      price: 3000,
    },
    {
      name: '5star dining',
      price: 2000,
    },
  ];

  let subscriptions1 = [
    {
      name: 'drinks',
      price: 4000,
    },
    {
      name: '4star dining',
      price: 2000,
    },
  ];
  setTimeout(() => {
    if (id == 1) return cb(null, subscriptions);
    if (id == 2) return cb(null, subscriptions1);
  }, 1000);
}

(function () {
  getUser(function (err, user) {
    if (err) {
      // deal with it
      console.log('err');
    } else {
      let { id } = user;

      getSubscriptions(id, function (err, subscriptions) {
        if (err) {
          // deal with it
          console.log('err');
        } else {
          console.log('subscriptions', subscriptions);
          deleteSubscription(subId, function (err, status) {
            if (err) {
              console.log('err');
            } else {
              console.log('status: ', status);
            }
          });
        }
      });
    }
  });
})();
