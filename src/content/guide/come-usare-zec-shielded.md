---
title: "Come usare ZEC Shielded: Privacy, Tracciabilità e Casi d'Uso"
description: "Guida completa all'uso di Zcash (ZEC) e degli indirizzi schermati (shielded address) con DeGate e Zodl. Scopri come conciliare privacy e compliance."
pubDate: 2026-05-25
author: "Privacy Toolkit"
---

> **🎯 In Sintesi**
> - **Privacy Selettiva**: A differenza di Monero (privacy di default), Zcash offre una privacy opzionale e selettiva tramite indirizzi schermati (*z-address*) e trasparenti (*t-address*).
> - **Audit & Compliance**: Grazie alle *viewing key*, puoi mantenere private le tue transazioni verso il pubblico ma condividerne la visibilità con revisori, commercialisti o autorità fiscali.
> - **Zodl & DeGate**: Puoi scambiare USDC in ZEC su rete Solana tramite DeGate Wallet ed effettuarne lo swap in ZEC nativi schermati utilizzando l'app Zodl in totale sicurezza.
> - **Best Practice OP-SEC**: Per massimizzare l'anonimato, lascia riposare i fondi nello shielded pool ed evita di muovere importi identici a ridosso dello swap.
> - **Video Tutorial**: [Guarda il tutorial rapido su YouTube](https://youtube.com/shorts/ibwzxPPhi0E)

---

Zcash è una criptovaluta progettata per rendere il denaro digitale più privato, più resistente alla sorveglianza e più difficile da bloccare o censurare. Come Bitcoin, funziona su una blockchain pubblica e verificabile; la differenza è che Zcash permette di nascondere mittente, destinatario e importo attraverso transazioni schermate. Il punto non è “nascondere tutto per sempre”, ma dare all’utente **il controllo su cosa rendere pubblico e cosa mantenere privato**.

Questa è la differenza più importante rispetto a Monero: Monero punta a una privacy forte e uniforme per tutti, mentre Zcash offre una privacy selettiva (scopri di più nella nostra sezione delle [Privacy Coins](/privacy-coins/)). 

Attraverso le **viewing key** di Zcash, l’utente può mantenere private le transazioni verso il pubblico, ma condividerne la visibilità con soggetti specifici, come commercialisti, revisori o autorità fiscali. Per questo Zcash interessa non solo chi cerca riservatezza personale, ma anche chi deve conciliare privacy, audit e compliance. Nei contesti in cui il rischio di censura, sequestro o esposizione pubblica è elevato, ZEC può funzionare come un eccellente strumento di protezione patrimoniale.

In definitiva, Zcash cerca di offrire una forma di denaro digitale più vicina al contante: verificabile dalla rete, ma non necessariamente trasparente per chiunque.

---

## Il Token ZEC

La moneta nativa della rete si chiama **ZEC**: serve per trasferire valore on-chain, pagare le commissioni delle transazioni e partecipare attivamente all’economia decentralizzata di Zcash.

---

## Tracciabilità e Privacy

Zcash non è automaticamente privato in ogni transazione: la privacy dipende dal tipo di indirizzo usato e dal percorso della transazione. La rete rimane pubblica e verificabile, ma Zcash permette di separare la verifica della validità di una transazione dalla pubblicazione dei suoi dettagli sensibili. 

In pratica, la blockchain può controllare che nessuno stia spendendo monete inesistenti o effettuando una doppia spesa, senza mostrare pubblicamente chi ha pagato chi e quale importo è stato trasferito.

Zcash ha due grandi categorie di indirizzi:

* **Indirizzi trasparenti (*t-address*)**: simili a quelli di Bitcoin. Le transazioni mostrano pubblicamente mittente, destinatario e importo. Sono utili per compatibilità con exchange, wallet o servizi che non supportano pienamente la privacy, ma offrono poca riservatezza.
* **Indirizzi schermati (*shielded addresses, z-address*)**: progettati per nascondere i dati principali della transazione. Quando si usano correttamente, l’importo e gli indirizzi coinvolti non sono visibili pubblicamente sulla blockchain.

---

## Cos'è uno Shielded Address?

Uno **shielded address** è un indirizzo Zcash che usa prove crittografiche a conoscenza zero (*zero-knowledge proofs*, zk-SNARKs) per proteggere la privacy dell’utente. Invece di pubblicare tutti i dettagli della transazione, la rete riceve una prova matematica che dimostra che la transazione è valida: chi invia possiede davvero i fondi, non li sta spendendo due volte e rispetta le regole del protocollo.

Questo permette di nascondere informazioni critiche come:
- L’indirizzo del mittente;
- L’indirizzo del destinatario;
- L’importo trasferito;
- Il collegamento diretto tra gli input e gli output della transazione.

La privacy è più forte quando più utenti usano il pool schermato: più transazioni ci sono dentro, più diventa difficile collegare un movimento a un wallet specifico.

A maggio 2026, lo shielded pool contiene circa 5 milioni di ZEC, pari a circa **3,5 miliardi di dollari**, con una quota schermata del **30,77%** sulla supply totale. È un dato significativo, perché definisce la dimensione dell’insieme anonimo: più ZEC sono schermati, più diventa difficile isolare una singola transazione all’interno del pool.

![Statistiche dello Shielded Pool di Zcash](./dashboard.png)
*Fonte e dati in tempo reale: [https://zkp.baby/](https://zkp.baby/)*

---

## Transparent Address (Unshielded)

Un indirizzo **unshielded**, più comunemente chiamato **transparent address**, è un indirizzo non schermato. Le transazioni che coinvolgono questi indirizzi sono leggibili pubblicamente: chiunque può vedere importi, indirizzi e cronologia dei movimenti tramite un comune block explorer.

Questo significa che, se un utente riceve ZEC su un indirizzo trasparente e poi li sposta, gli analisti possono seguire il flusso dei fondi. Come in Bitcoin, non sempre l’identità reale è immediatamente visibile, ma una volta collegato un indirizzo a una persona, un exchange o un servizio, molte transazioni passate e future possono diventare completamente tracciabili.

---

## Tipi di Transazioni e Livello di Privacy

Il livello di privacy effettivo dipende dal percorso compiuto dalla transazione:

- **Transparent → Transparent**: completamente visibile, simile a Bitcoin. Mittente, destinatario e importo sono pubblici.
- **Transparent → Shielded**: i fondi entrano nel pool schermato. L’importo che entra può essere visibile dal lato trasparente, ma dopo l’ingresso diventa difficile seguire il movimento interno.
- **Shielded → Shielded**: è il caso con maggiore privacy. Gli indirizzi e gli importi restano completamente nascosti, e la blockchain vede solo che una transazione valida è avvenuta.
- **Shielded → Transparent**: i fondi escono dal pool schermato. L’importo e l’indirizzo trasparente di destinazione diventano visibili, quindi questa uscita può ridurre la privacy se è facilmente collegabile a precedenti depositi o abitudini dell’utente.

---

## Tracciabilità: Cosa si vede e cosa no

Zcash riduce drasticamente la tracciabilità, ma non la elimina automaticamente in ogni situazione. Le transazioni trasparenti restano analizzabili. Anche quando si usano indirizzi schermati, alcuni metadati esterni alla blockchain possono indebolire la privacy, per esempio:
- L'utilizzo di exchange centralizzati con KYC obbligatorio;
- Depositi e prelievi di importi insoliti o molto specifici;
- Tempi troppo ravvicinati tra l'entrata e l'uscita dal pool schermato;
- Il riutilizzo di indirizzi trasparenti.

Zcash offre strumenti estremamente robusti per la privacy, ma l’utente deve saperli utilizzare con criterio. La protezione migliore si ottiene quando i fondi restano a lungo nel pool schermato e le transazioni avvengono esclusivamente tra indirizzi schermati.

---

## Come ottenere ZEC Shielded (Schermati)

Per ottenere ZEC schermati in modo fluido ed efficiente, hai bisogno di due wallet: **[DeGate Wallet](https://app.degate.com/it/?s=jack18&utm_source=it_privacy_site&utm_content=ZEC)** e **Zodl** ([https://zodl.com/](https://zodl.com/)). Genera un portafoglio su entrambe le applicazioni.

1. Nel wallet DeGate, effettua lo swap da USDC a ZEC su rete Solana. Il token contract address di ZEC su Solana è: `A7bdiYdS5GjqGFtxf17ppRHtDKPkkRqbKtR27dxvQXaS`.
2. Nel wallet Zodl, fai clic su **Swap** e compila i campi come segue:
    - **From**: seleziona ZEC su Solana e inserisci l’importo di ZEC che desideri inviare.
    - **Refund Address**: inserisci il tuo indirizzo Solana del wallet DeGate.
    Poi fai clic su **Get a quote**.

![Configurazione del Swap su Zodl](./zec_dg_to_zodl.jpg)

Vedrai una schermata con la quotazione dello swap. Se il tasso ti soddisfa, fai clic su **Confirm**.

![Conferma della quotazione del Swap su Zodl](./zec_swap_quote.jpg)

Dopodiché visualizzerai una pagina con un codice QR e un indirizzo di deposito Solana. Copia questo indirizzo di deposito.

Ritorna nel wallet DeGate e preleva gli ZEC su Solana che hai acquistato. Come indirizzo di destinazione, inserisci l’indirizzo di deposito che hai appena copiato da Zodl.

Dopo aver inviato gli ZEC, in Zodl vedrai lo stato **Swapping…**. Attendi il completamento dell'operazione. Al termine, i tuoi ZEC saranno stati inviati in sicurezza su uno shielded address nativo.

---

## Come usare ZEC Shielded

1. **Inviare a indirizzi shielded**: Puoi inviare ZEC shielded a un altro indirizzo shielded. Questa è una transazione **Shielded → Shielded**, che garantisce il massimo grado di privacy consentito dal protocollo.
2. **Inviare a indirizzi trasparenti**: Puoi inviare ZEC shielded a un indirizzo trasparente (**Shielded → Transparent**). Se vuoi vendere ZEC su un exchange centralizzato tradizionale, questo è uno step purtroppo necessario, in quanto oggi quasi nessun CEX accetta depositi diretti da indirizzi schermati.
3. **Convertire ZEC shielded in altre monete**: Puoi convertire ZEC shielded in Bitcoin, USDC, ETH, ecc. Questa è una delle funzioni più apprezzate dai Privacy Maximalisti. La procedura è estremamente semplice:
    
    1. Nel wallet Zodl, fai clic su **Pay**.
    
    ![Sezione Pay su Zodl](./pay.jpg)
    
    2. In **Send to**, seleziona la moneta e la rete di destinazione su cui vuoi ricevere i fondi. Ad esempio, selezionando Bitcoin, la transazione convertirà automaticamente ZEC shielded in BTC su rete nativa.
    
    ![Conversione ZEC shielded in BTC su Zodl](./pay_btc.jpg)
    
    3. Fai clic su **Review**, verifica la quotazione e premi **Confirm** per completare la conversione.

---

## Regole d'Oro per usare Zcash correttamente

**1. Il tempo di permanenza nello shielded pool è una variabile centrale**

L’intervallo di tempo tra l’entrata e l’uscita influenza notevolmente la qualità dell’anonimato. L’approccio corretto consiste nell'**entrare ➔ sostare nel pool schermato per un tempo sufficiente (giorni o settimane) ➔ uscire**. Evita di fare depositi e prelievi immediati, altrimenti renderai facile l'analisi temporale dei flussi.

**2. Gli importi in uscita devono essere frazionati**

Se depositi 10 ZEC nel pool schermato, evita di prelevare esattamente 10 ZEC verso un indirizzo trasparente. Preleva piuttosto importi frazionati (es. 3 ZEC oggi, 4 ZEC la prossima settimana) lasciando il resto nel pool. Questo interrompe la correlazione matematica degli importi on-chain.

**3. Non mescolare identità diverse nello stesso wallet**

Un portafoglio dovrebbe corrispondere a un unico profilo di riservatezza. Mischiare pagamenti commerciali quotidiani e transazioni altamente riservate sotto lo stesso seed o viewing key rischia di compromettere la tua Op-Sec. Usa **wallet diversi con seed differenti** per scopi separati.

**4. Pianifica l'uscita in fiat**

L'uscita in valuta tradizionale (fiat) è l'anello più fragile della catena della privacy. Se hai necessità di convertire i fondi in Euro, pianifica in anticipo l'uso di canali non-KYC, piattaforme P2P, o transazioni personali con controparti di assoluta fiducia.

> **🇮🇹 Nota Fiscale per Utenti Italiani:** Anche se utilizzi transazioni schermate (*z-address*) per tutelare la tua sicurezza personale (in conformità con il diritto alla privacy protetto dall'Art. 8 della CEDU), i residenti fiscali in Italia sono tenuti a dichiarare le cripto-attività nel **Quadro RW** e a pagare l'eventuale imposta sostitutiva sulle plusvalenze realizzate. Poiché non esistono estratti conto automatici per transazioni schermate, spetta a te conservare traccia delle transazioni. Consulta la nostra guida su **[Tasse & Fisco in Italia](/fisco/)** per maggiori dettagli.
