// Todas las consultas
var queries = [`SELECT ?question ?questionLabel ?option ?optionLabel
    WHERE {
        ?question wdt:P31 wd:Q6256; wdt:P36 ?option.
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es". }
    }
    LIMIT 200
    `,`
    SELECT ?question ?questionLabel ?option ?optionLabel
    WHERE {
        ?question wdt:P31 wd:Q476028.
        ?question wdt:P115 ?option. 
        ?question wdt:P17 wd:Q29.
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es". }
    }
    LIMIT 100
    `,`
    SELECT ?option ?optionLabel ?questionLabel (SUBSTR(?símbolo, 1, 1) AS ?sym)
    WHERE {
    ?option wdt:P31 wd:Q11344;        
                wdt:P1086 ?questionLabel.        
    SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE], es". }
    }
    LIMIT 100
    `,`SELECT ?question ?questionLabel ?optionLabel
    WHERE {
        ?question wdt:P31 wd:Q178561.    
        ?question wdt:P580 ?date.      
        FILTER (YEAR(?date) >= 1500 && YEAR(?date) <= 1945) 
        BIND(YEAR(?date) as ?optionLabel)
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es". }
    }
    LIMIT 100
    `];

// Todas las preguntas, en el mismo orden que las consultas
var questions = ["¿Cuál es la capital de ",
                "¿En que campo juega el ",
                "¿Cuál es el elemento de la tabla periódica número ",
                "¿En que año ocurrio la "];

module.exports = { queries, questions };