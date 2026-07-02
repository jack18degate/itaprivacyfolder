# 🚀 Changelog e Walkthrough UI/UX

Dopo un accurato audit sulle varie risoluzioni, ho notato e corretto alcuni artefatti visivi che intaccavano la fluidità e la leggibilità su mobile. Ecco i dettagli:

### 1. Overlay Menu Mobile (Leggibilità e Sfocatura)
Sui dispositivi mobile, l'overlay scuro del menu di navigazione o dei risultati di ricerca aveva un background troppo trasparente (`rgba(5, 5, 16, 0.98)`). Questo faceva intravedere fastidiosamente il testo del sito sottostante, mischiandosi con il testo dei menu.

> [!NOTE]
> Ho incrementato la densità del colore base (`0.99`) sulle variabili del CSS e applicato una sfocatura del fondale estrema passando da `backdrop-blur-2xl` a `backdrop-blur-3xl`. Adesso il menu copre perfettamente senza disturbi.

### 2. Pulsante di Chiusura (Mobile Menu)
Sempre nel menu mobile, il bottone "(X)" di chiusura era scarsamente visibile specialmente se un utente dovesse invertire il tema sul telefono.

> [!TIP]
> Ho aumentato la visibilità del bottone applicando un background semi-opaco `bg-white/[0.08]` e un hover più evidente, per farlo sembrare un reale "Target" taccabile.

### 3. Modulo Compare: Respiro Laterale (Scroll Orizzontale)
Nelle sezioni "Acquisto" ed "Exchange", i chip draggabili (`CompareModule.astro`) arrivavano esattamente al margine destro/sinistro fisico dello smartphone. Questo è frustrante perché toglie "aria" e fa sembrare il design incastrato.

> [!TIP]
> Aggiunto il padding `px-4 sm:px-0` sul wrapper `flex gap-3 overflow-x-auto`. In questo modo su desktop l'allineamento rimane a filo col body, mentre su mobile avremo il giusto margine bianco laterale prima di far iniziare lo scroll nativo.

---

### Stato Rilascio:
✅ **Build Terminata**. L'applicativo è stabile e la cartella `/dist` è aggiornata con i file statici finali minificati (10 pagine buildate in `931ms`). Tutte le modifiche pre-push sono state consolidate.
