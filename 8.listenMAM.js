const Mam = require('@iota/mam')
const { asciiToTrytes, trytesToAscii } = require('@iota/converter')

// Enter root of the
rootMAM = 'KKLYWZOAYWJXHIRVTEIKYGJRWTRSGZQVORGOGBXNOFAQBBIYARZDCUFNBXPEFYIIPTWZS9KKVCBYNUMXK'

async function initMam() {
  
    console.log("In ascolto...");
  await Mam.init('https://nodes.devnet.iota.org:443');
}

//controllo ogni 5 secondi se sono presenti nuovi messaggi nel canale
async function checkMam() {

  // The showData callback will be called in order for each message found
  const data = await Mam.fetch(rootMAM, 'public', null, showData);
  rootMAM = data.nextRoot;
  // Check again in 5 seconds
  console.log("In ascolto...");
  setTimeout(checkMam, 5000);
}

const showData = raw => {
    const data = trytesToAscii(raw)
    console.log(data);
  }

// Start the monitoring!
initMam()
checkMam()