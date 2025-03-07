In questo Stop&Code vanno gestite 2 API:
 
- una per selezionare le nazioni: https://raw.githubusercontent.com/pmontrasio/codici-stati/master/dist/countries.json
 
- un'altra per le previsioni del tempo: si compone di una chiave fissa e di un'espressione dipendente dalla città e dalla nazione che avete selezionato
 
 
 
const apikey = "3d8aa45f7271f6bcb67cba7a6b0896d7"
 
const apiWeather = "https://api.openweathermap.org/data/2.5/weather?q=[citta],[paese]&appid=[chiave]"
 


La prima API dovrebbe restituirvi un unico oggetto JSON, che potrebbe essere utile modificare, ad esempio convertendolo in un array...Per fare questo potreste sfruttare l'oggetto 'Object' di Javascript, altrimenti sbizzarritevi pure.

Buon lavoro!