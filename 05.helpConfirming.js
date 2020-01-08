//serie di file js in cui passo per passo inizio con IOTA
//rete devnet

//vado a favorire la conferma della transazione

const Iota = require('@iota/core');

const iota = Iota.composeAPI({
  provider: 'https://nodes.devnet.iota.org:443'
  });

//hash della transazione di coda
var tails = ["YLNXMHXEDFPTMUPUEYXGUHBIAXTEVRCYKKFKWDNQZTCJLVOXNIAILDELBWVDARSCISFSNNEDVSY9ER999"];

var seconds = 0;

var anonymousMainFunction = autoConfirm.bind(null, tails);

// Run the autoConfirm() function every 30 seconds to check for confirmations
var interval = setInterval(anonymousMainFunction, 30000);

// Set a timer to measure how long it takes for the bundle to be confirmed
var timer = setInterval(stopWatch, 1000);
function stopWatch (){
  seconds++
}


//E' la priima funzione chiamata, controlla se la  transazione in oggetto è confermata oppure no. Se lo è stampa un avviso di transazione confermata, altrimenti 
//chiama la funzione autoPromoteReattach e gli passa l'hash della transazione
function autoConfirm(tails){
    console.log(tails);
        iota.getLatestInclusion(tails)
            .then(states => {
                // Check that none of the transactions have been confirmed
                //(!states) dovrebbe andare bene uguale
                if (states.indexOf(true) === -1) {
                    // Get latest tail hash
                    const tail = tails[tails.length - 1] 
                    autoPromoteReattach(tail);
                } else {
                    console.log(JSON.stringify(states,null, 1));
                    clearInterval(interval);
                    clearInterval(timer);
                    var minutes = (seconds / 60).toFixed(2);
                    var confirmedTail = tails[states.indexOf(true)];
                    console.log(`Confirmed transaction hash in ${minutes} minutes: ${confirmedTail}`);
                    return;
                }
            }).catch(error => {
                console.log(error);
            }
        );
    } 

// Create a function that checks if a bundle is attached to a valid subtangle
// and not older than the last 6 milestone transactions
// If it is, promote it, if not, try to reattach it.
//Controlla se la transazione è in una parte del tangle valida  
function autoPromoteReattach (tail) {
  iota.isPromotable(tail)
    .then(promote => promote
    ? iota.promoteTransaction(tail, 3, 14)
        .then(()=> {
            console.log(`Promoted transaction hash: ${tail}`);
        })
    : iota.replayBundle(tail, 3, 14)
        .then(([reattachedTail]) => {
            const newTailHash = reattachedTail.hash

            console.log(`Reattached transaction hash: ${tail}`);

            // Keep track of all reattached tail transaction hashes to check for confirmation
            tails.push(newTailHash);
        })
    )
    .catch((error)=>{
         console.log(error);
    });
}

