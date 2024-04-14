// Todas las consultas
var queries = {};

queries['Geografia'] =
    [
        // pregunta = Pais, opcion = capitales
        `SELECT ?question ?questionLabel ?option ?optionLabel
        WHERE {
            ?question wdt:P31 wd:Q6256; wdt:P36 ?option.
            SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es". }
        }
        LIMIT 200
        `,
        // pregunta = pais, opcion = montaña
        `
        SELECT ?questionLabel ?optionLabel
        WHERE {
            ?country wdt:P31 wd:Q6256.             
            ?country wdt:P610 ?mountainRange.     
            ?mountainRange wdt:P2044 ?elevation.  
            SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es". }
        }
        GROUP BY ?country ?questionLabel ?optionLabel
        `,
        // pregunta = poblacion, opcion = pais
        `
        SELECT ?optionLabel ?questionLabel
        WHERE {
            ?option wdt:P31 wd:Q6256.    
            ?option wdt:P1082 ?questionLabel.  
            SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es". }
        }
    `]

queries['Cultura'] =
    [
        // pregunta = pelicula, opcion = director
        `
        SELECT DISTINCT ?questionLabel ?optionLabel
        WHERE {
            ?question wdt:P31 wd:Q11424;                 
                    wdt:P57 ?option.                 
            ?question wdt:P577 ?publicationDate.         
            FILTER(YEAR(?publicationDate) >= 2000)   
            SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es. }
        }
        LIMIT 200
        `
    ];

queries['Informatica'] = 
    [
        // pregunta = software, opcion = fecha
        `
        SELECT ?questionLabel ?optionLabel
        WHERE {
            ?question wdt:P31 wd:Q7397.        
            ?question wdt:P571 ?optionLabel.   
            SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es". }
        }
        `,
        // pregunta = sistema operativo, opcion = creador
        `
        SELECT ?questionLabel ?optionLabel
        WHERE {
            ?question wdt:P31 wd:Q9135.        
            ?question wdt:P178 ?option.     
            SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es". }
        }
        LIMIT 200
        `,
        // pregunta = creador, opcion = empresa
        `
        SELECT ?optionLabel ?questionLabel
        WHERE {
            ?option wdt:P31 wd:Q4830453.        
            ?option wdt:P112 ?question.          
            SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es". }
        }
        LIMIT 200
        `
    ];

// Todas las preguntas, en el mismo orden que las consultas
var questions = ["¿Cuál es la capital de ",
                "¿En que campo juega el ",
                "¿Cuál es el elemento de la tabla periódica número ",
                "¿En que año ocurrio la "];

module.exports = { queries, questions };