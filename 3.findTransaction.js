//serie di file js in cui passo per passo inizio con IOTA

//nel seguente file vado a leggere sulla rete devNet Tangle la transazione precedentemente fatta

const Iota = require('@iota/core');
const Extract = require('@iota/extract-json');

// Connect to a node
const iota = Iota.composeAPI({
  provider: 'https://nodes.devnet.thetangle.org:443'
});

// Define the bundle hash for your transaction
const bundle =
  'J9QKFQF9KEKDHPYSZUKZGNBHVRFNDYG99BHUKIBKCSLAKQXIWZOIWO9PWNZKZBHJIAYYYXUUUPKABXJ9W';


// Get the transaction in your bundle
iota.findTransactionObjects({ bundles: [bundle] })
  .then(bundle => {
    //solo value transazione
    console.log(JSON.parse(Extract.extractJson(bundle)));
    //tutta la transazione
    console.log(bundle);
  })
  .catch(err => {
    console.error(err);
  });