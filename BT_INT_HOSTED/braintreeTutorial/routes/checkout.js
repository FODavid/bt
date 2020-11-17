const express = require('express');
const router = express.Router();
const braintree = require('braintree');

router.post('/', (req, res, next) => {
  const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    // Use your own credentials from the sandbox Control Panel here
    merchantId: 'qw47n4kc9kn24wkc',
    publicKey: 'v27dfdmzykzgggzc',
    privateKey: 'a3bb3ae97155039ebe9956d2ff596113'
  });

  // Use the payment method nonce here
  console.log(req);
  console.log(req.body);
  const nonceFromTheClient = req.body.paymentMethodNonce;
  // Create a new transaction for $10
  
  const newTransaction = gateway.transaction.sale({
    amount: '100.00',
    paymentMethodNonce: nonceFromTheClient,
    options: {
      // This option requests the funds from the transaction
      // once it has been authorized successfully
      submitForSettlement: true
    }
  }, (error, result) => {
      if (result) {
        res.send(result);
        console.log(result);
      } else {
        res.status(500).send(error);
        
      }
  });
});

module.exports = router;