// Require the IOTA libraries
const Iota = require('@iota/core');
const Sign = require('@iota/signing');
const Converter = require('@iota/converter');

//=========================================================
// Derive a subseed by passing a seed in trits and an index to the `subseed()` method

const seed = "HYEWPPA9WIOAUS9GWNFOSUTIWBSZPARXXBTAFUEKIJZJBHMDGTFXMTXBUDOXRBBECAZTNENFHPF9TTCOQ";

var subseed = Sign.subseed(Converter.trytesToTrits(seed), 0 /*index*/);

//===========================================================
// Derive one private key for each of the three security levels by passing the same subseed and a different security level to the `key()` method

var privateKey1 = Sign.key(subseed, 1 /*security level*/);

console.log('Private key length for security level 1: ' + Converter.tritsToTrytes(privateKey1).length);

var privateKey2 = Sign.key(subseed, 2 /*security level*/);

console.log('Private key length for security level 2: ' + Converter.tritsToTrytes(privateKey2).length);

var privateKey3 = Sign.key(subseed, 3 /*security level*/);

console.log('Private key length for security level 3: ' + Converter.tritsToTrytes(privateKey3).length);

//===========================================================
// Derive the key digests for each private key by passing each private key to the `digests()` method

var privateKey1Digests = Sign.digests(privateKey1);

console.log(`Total key digests for security level 1: ` + Converter.tritsToTrytes(privateKey1Digests).length/81);

var privateKey2Digests = Sign.digests(privateKey2);

console.log(`Total key digests for security level 2: ` + Converter.tritsToTrytes(privateKey2Digests).length/81);

var privateKey3Digests = Sign.digests(privateKey3);

console.log(`Total key digests for security level 3: ` + Converter.tritsToTrytes(privateKey3Digests).length/81);

//=================================================================
// Derive an address for each private key by passing the digests to the `address()` method

var privateKey1Address = Sign.address(privateKey1Digests);

// Convert the returned trits to trytes
console.log('Address with security level 1: ' + Converter.tritsToTrytes(privateKey1Address));

// Check the address by creating it with the same index and security level using the Core JS library
console.log(Iota.generateAddress(seed, 0, 1));

var privateKey2Address = Sign.address(privateKey2Digests);

// Convert the returned trits to trytes
console.log('Address with security level 2: ' + Converter.tritsToTrytes(privateKey2Address));

// Check the address by creating it with the same index and security level using the Core JS library
console.log(Iota.generateAddress(seed, 0, 2));

var privateKey3Address = Sign.address(privateKey3Digests);

// Convert the returned trits to trytes
console.log('Address with security level 3: ' + Converter.tritsToTrytes(privateKey3Address));

// Check the address by creating it with the same index and security level using the Core JS library
console.log(Iota.generateAddress(seed, 0, 3));

//===========================================================