///////////////////////////////
// MAM: Fetch messages to Public Stream
///////////////////////////////

const Mam = require('@iota/mam')
const { trytesToAscii } = require('@iota/converter')

const seed ='HYEWPPA9WIOAUS9GWNFOSUTIWBSZPARXXBTAFUEKIJZJBHMDGTFXMTXBUDOXRBBECAZTNENFHPF9TTCOQ';
// Initialize MAM State - PUBLIC
const mam = Mam.init('https://nodes.devnet.thetangle.org:443', seed)

const root = 'LMRYISMSSC9KJUNUDJGLJZTDDIWNLI9BQJJWVOVXEZJAJSVMWGCCQK9NFRUDFOBAYMEVBLSSQMUKMEHRB'

// Display coordinate data on our screen when we receive it
const showData = raw => {
  const data = trytesToAscii(raw)
  console.log(data);
}


async function readMam() {
  await Mam.fetch(root, 'public', null, showData)
}

readMam();