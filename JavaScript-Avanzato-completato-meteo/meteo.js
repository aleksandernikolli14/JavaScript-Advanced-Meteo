
const urlNazioni = 'https://raw.githubusercontent.com/pmontrasio/codici-stati/master/dist/countries.json'
const urlMeteo = "https://api.openweathermap.org/data/2.5/weather"
const apiKey = '3d8aa45f7271f6bcb67cba7a6b0896d7'

const select = document.querySelector('select')
// Al caricamento della pagina faccio partire la chiamta all'API delle nazioni

const btnInvia = document.getElementById('invia')

const table = document.querySelector('table')

fetch(urlNazioni)
.then((response)=>{return response.json()})
.then((responseNazioni)=>{
    console.log(responseNazioni)
    // for(let nazione of responseNazioni){
    //     console.log(nazione)
    // }

    const arrayNazioni = Object.values(responseNazioni) // questa istruzione (in generale il metodo values ()) inserisce all'interno di un array i valori di un oggetto

    console.log(arrayNazioni)

    for(let nazione of arrayNazioni){
        console.log(nazione.english_country_name)

        if(nazione.english_country_name === ''){
            console.log(nazione.italian_country_name_1.charAt(0))
            const capitalLetter = nazione.italian_country_name_1.charAt(0) // Primo carattere maiuscolo
            const stringaMinuscola = nazione.italian_country_name_1.toLowerCase()

            let arrayCaratteri = []
            for(let carattere of stringaMinuscola){
                console.log(carattere)
                arrayCaratteri.push(carattere)
            }
            console.log(arrayCaratteri)
            arrayCaratteri.splice(0, 1)
            console.log(arrayCaratteri)
            const stringaFinale = arrayCaratteri.join('')
            console.log(stringaFinale) // Stringa italian_country_name privata del primo carattere

        select.innerHTML += `
                <option value='${nazione.iso3361_2_characters}'>${capitalLetter}${stringaFinale}</option>
                `
        }else if(nazione.english_country_name === undefined){

            const capitalLetter = nazione.italian_country_name_2.charAt(0) // Primo carattere maiuscolo
            const stringaMinuscola = nazione.italian_country_name_2.toLowerCase()

            let arrayCaratteri = []
            for(let carattere of stringaMinuscola){
                console.log(carattere)
                arrayCaratteri.push(carattere)
            }
            console.log(arrayCaratteri)
            arrayCaratteri.splice(0,1)
            console.log(arrayCaratteri)
            const stringaFinale = arrayCaratteri.join('')
            console.log(stringaFinale) // Stringa italian_country_name privata del primo carattere

            select.innerHTML += `
                <option value='${nazione.iso3361_2_characters}'>${capitalLetter}${stringaFinale}</option>
                `
        }else{
            select.innerHTML += `
                <option value='${nazione.iso3361_2_characters}'>${nazione.english_country_name}</option>
                `
        }

        
    }
})

// Gestisco poi il click sul button 'invia'
btnInvia.addEventListener('click',()=>{
    const valueCitta = document.querySelector('input').value
    console.log(select.value)


    console.log(`https://api.openweathermap.org/data/2.5/weather?q=${valueCitta},${select.value}`)

    // Qui al click su invia faccio partire la seconda chiamata
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${valueCitta},${select.value}&appid=${apiKey}`)
    .then((response)=>{return response.json()})
    .then((responseMeteo)=>{
        console.log(responseMeteo.cod)



        if(responseMeteo.cod === 200){
            table.innerHTML = `
        <h2>Situazione Meteo: ${valueCitta} - ${select.value}</h2>
        <thead>
            <td>Longitudine</td>
            <td>Latitudine</td>
            <td>Temperatura Massima</td>
            <td>Temperatura Minima</td>
        </thead>

        <tbody>
        <tr>
            <td>${responseMeteo.coord.lon}</td>
            <td>${responseMeteo.coord.lat}</td>
            <td>${responseMeteo.main.temp_max}</td>
            <td>${responseMeteo.main.temp_min}</td>
        </tr>
        </tbody>
        `
        }else{
            `
        <h2>Situazione Meteo: ${responseMeteo.cod} - ${responseMeteo.message}</h2>`
        table.innerHTML = ''
        }
    })
})