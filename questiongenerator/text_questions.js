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
        LIMIT 100
        `,
        // pregunta = pais, opcion = montaña
        `
        SELECT ?question ?questionLabel ?option ?optionLabel
        WHERE {
            ?question wdt:P31 wd:Q6256.             
            ?question wdt:P610 ?option.     
            ?option wdt:P2044 ?elevation.  
            SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es". }
        }
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
        // MUY LENTA
        // pregunta = pelicula, opcion = director
        `
        SELECT DISTINCT ?question ?questionLabel ?option ?optionLabel
        WHERE {
            ?question wdt:P31 wd:Q11424;                 
                    wdt:P57 ?option.                 
            ?question wdt:P577 ?publicationDate.         
            FILTER(YEAR(?publicationDate) >= 2000)   
            SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es". }
        }
        LIMIT 100
        `
    ];

queries['Informatica'] = 
    [
        // Formatear fecha
        // pregunta = software, opcion = fecha
        `
        SELECT ?questionLabel ?option ?optionLabel
        WHERE {
            ?question wdt:P31 wd:Q7397.        
            ?question wdt:P571 ?option.   
            SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es". }
        }
        `,
        // pregunta = creador, opcion = empresa
        `
        SELECT ?optionLabel ?questionLabel
        WHERE {
            ?option wdt:P31 wd:Q4830453.        
            ?option wdt:P112 ?question.          
            SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es". }
        }
        LIMIT 100
        `
    ];

// Todas las preguntas, en el mismo orden que las consultas
var questions = {};

questions['Geografia'] = ["¿Cuál es la capital de ",
                "¿Que montaña se encuentra en ",
                "¿Que pais tiene una poblacion de personas de "];

questions['Cultura'] = ["¿Que director dirigio "];

questions['Informatica'] = ["¿En que fecha se creó ",
                "¿Que empresa tecnológica fue creada por "];

module.exports = { queries, questions };