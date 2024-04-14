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
        SELECT ?optionLabel ?question ?questionLabel
        WHERE {
            ?option wdt:P31 wd:Q6256.    
            ?option wdt:P1082 ?question.  
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
        `,
        // pregunta = termino, opcion = universo
        `
        SELECT DISTINCT ?question ?questionLabel ?option ?optionLabel
        WHERE {
            {
                ?term wdt:P1080 wd:Q19595297;   # Relacionado con Warhammer 40000
                    rdfs:label ?termLabel.
                BIND("Warhammer 40000" AS ?option)
            }
            UNION
            {
                ?term wdt:P1080 wd:Q19786052;         # Relacionado con Star Wars
                    rdfs:label ?termLabel.
                BIND("Star Wars" AS ?option)
            }
            UNION
            {
                ?term wdt:P1080 wd:Q18043309;         # Relacionado con Star Trek
                    rdfs:label ?termLabel.
                BIND("Star Trek" AS ?option)
            }
            UNION
            {
                ?term wdt:P1080 wd:Q81738;      # Relacionado con Legendarium
                    rdfs:label ?termLabel.
                BIND("Legendarium" AS ?option)
            }
            FILTER(LANG(?termLabel) = "es")
            SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es". }
        }
        LIMIT 200
        `
    ];

queries['Informatica'] = 
    [
        // pregunta = software, opcion = fecha
        `
        SELECT ?questionLabel ?option ?optionLabel
        WHERE {
            ?question wdt:P31 wd:Q7397.        
            ?question wdt:P571 ?option.   
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
var questions = {};

questions['Geografia'] = ["¿Cuál es la capital de ",
                "¿Que montaña se encuentra en ",
                "¿Que pais tiene una poblacion de personas de "];

questions['Cultura'] = ["¿Que director dirigio ",
                "¿Con que universo ficticio está relacionado el siguiente término: "];

questions['Informatica'] = ["¿En que fecha se creó ",
                "¿Quién creo el sistema opertativo ",
                "¿Que empresa tecnológica fue creada por "];

module.exports = { queries, questions };