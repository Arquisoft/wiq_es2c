// Todas las consultas
var queries = {};

queries["es"]= {
        "Geografia":
            [
                    // pregunta = Pais, opcion = capitales
                    [`SELECT ?question ?questionLabel ?option ?optionLabel
        WHERE {
            ?question wdt:P31 wd:Q6256; wdt:P36 ?option.
            SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es". }
        }
        LIMIT 100
        `, "¿Cuál es la capital de "],
                    // pregunta = pais, opcion = montaña
                    [
                            `
        SELECT ?question ?questionLabel ?option ?optionLabel
        WHERE {
            ?question wdt:P31 wd:Q6256.             
            ?question wdt:P610 ?option.     
            ?option wdt:P2044 ?elevation.  
            SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es". }
        }
        `, "¿Que montaña se encuentra en "],
                    // pregunta = poblacion, opcion = pais
                    [
                            `
        SELECT ?optionLabel ?question ?questionLabel
        WHERE {
            ?option wdt:P31 wd:Q6256.    
            ?option wdt:P1082 ?question.  
            SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es". }
        }`, "¿Que pais tiene una poblacion de personas de "
                    ]
            ],

        "Cultura":
            [
                    // pregunta = pelicula, opcion = director
                    [
                            `
        SELECT DISTINCT ?question ?questionLabel ?option ?optionLabel
        WHERE {
            ?question wdt:P31 wd:Q11424;                 
                        wdt:P57 ?option.                 
            ?question wdt:P577 ?publicationDate.
            FILTER(?publicationDate >= "2000-01-01T00:00:00Z"^^xsd:dateTime)
            SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es". }
        }
        LIMIT 100
        `, "¿Que director dirigio "],
                    // pregunta = termino, opcion = universo
                    [
                            `
        SELECT DISTINCT ?question ?questionLabel ?option ?optionLabel
        WHERE {
            {
                ?question wdt:P1080 wd:Q19595297;   # Relacionado con Warhammer 40000
                    rdfs:label ?questionLabel.
                BIND("Warhammer 40000" AS ?option)
            }
            UNION
            {
                ?question wdt:P1080 wd:Q19786052;         # Relacionado con Star Wars
                    rdfs:label ?questionLabel.
                BIND("Star Wars" AS ?option)
            }
            UNION
            {
                ?question wdt:P1080 wd:Q18043309;         # Relacionado con Star Trek
                    rdfs:label ?questionLabel.
                BIND("Star Trek" AS ?option)
            }
            UNION
            {
                ?question wdt:P1080 wd:Q81738;      # Relacionado con Legendarium
                    rdfs:label ?questionLabel.
                BIND("Legendarium" AS ?option)
            }
            FILTER(LANG(?questionLabel) = "es")
            SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es". }
        }
        LIMIT 100
        `, "¿A que universo de ficción pertenece el siguiente término: "],
                    [
                            // pregunta = genero, opcion = videojuego
                            `
        SELECT ?option ?optionLabel ?question ?questionLabel
        WHERE {
        ?option wdt:P31 wd:Q7889.     
        ?option wdt:P136 ?question.    
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es". }
        }
        LIMIT 100
        `, "¿Cual de los siguientes juegos pertenece al genero "]
            ],

        "Informatica":
            [
                    // pregunta = software, opcion = fecha
                    [
                            `
        SELECT ?question ?questionLabel ?option ?optionLabel
        WHERE {
            ?question wdt:P31 wd:Q7397.        
            ?question wdt:P571 ?releaseDate.
            BIND(SUBSTR(?releaseDate, 9, 2) AS ?day)    
            BIND(SUBSTR(?releaseDate, 6, 2) AS ?month) 
            BIND(SUBSTR(?releaseDate, 1, 4) AS ?year)   
            BIND(CONCAT(?day, "/", ?month, "/", ?year) AS ?option)  
            SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es". }
        }
        `, "¿En que fecha se creó "],
                    [
                            // pregunta = creador, opcion = lenguaje de programacion
                            `
        SELECT ?option ?optionLabel ?question ?questionLabel
        WHERE {
            ?option wdt:P31 wd:Q9143.
            ?option wdt:P178 ?question.
            SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es". }
        }
        LIMIT 100        
        `, "¿Que lenguaje de programación fue creado por "]
            ]
};

queries["en"] = {
        "Geografia":
            [
                    // pregunta = Pais, opcion = capitales
                    [`SELECT ?question ?questionLabel ?option ?optionLabel
        WHERE {
            ?question wdt:P31 wd:Q6256; wdt:P36 ?option.
            SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
        }
        LIMIT 100
        `, "What is the capital of "],
                    // pregunta = pais, opcion = montaña
                    [
                            `
        SELECT ?question ?questionLabel ?option ?optionLabel
        WHERE {
            ?question wdt:P31 wd:Q6256.             
            ?question wdt:P610 ?option.     
            ?option wdt:P2044 ?elevation.  
            SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
        }
        `, "Where is the mountain called "],
                    // pregunta = poblacion, opcion = pais
                    [
                            `
        SELECT ?optionLabel ?question ?questionLabel
        WHERE {
            ?option wdt:P31 wd:Q6256.    
            ?option wdt:P1082 ?question.  
            SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
        }`, "What country has a population of "
                    ]
            ],

        "Cultura":
            [
                    // pregunta = pelicula, opcion = director
                    [
                            `
        SELECT DISTINCT ?question ?questionLabel ?option ?optionLabel
        WHERE {
            ?question wdt:P31 wd:Q11424;                 
                        wdt:P57 ?option.                 
            ?question wdt:P577 ?publicationDate.
            FILTER(?publicationDate >= "2000-01-01T00:00:00Z"^^xsd:dateTime)
            SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
        }
        LIMIT 100
        `, "What director directed "],
                    // pregunta = termino, opcion = universo
                    [
                            `
        SELECT DISTINCT ?question ?questionLabel ?option ?optionLabel
        WHERE {
            {
                ?question wdt:P1080 wd:Q19595297;   # Relacionado con Warhammer 40000
                    rdfs:label ?questionLabel.
                BIND("Warhammer 40000" AS ?option)
            }
            UNION
            {
                ?question wdt:P1080 wd:Q19786052;         # Relacionado con Star Wars
                    rdfs:label ?questionLabel.
                BIND("Star Wars" AS ?option)
            }
            UNION
            {
                ?question wdt:P1080 wd:Q18043309;         # Relacionado con Star Trek
                    rdfs:label ?questionLabel.
                BIND("Star Trek" AS ?option)
            }
            UNION
            {
                ?question wdt:P1080 wd:Q81738;      # Relacionado con Legendarium
                    rdfs:label ?questionLabel.
                BIND("Legendarium" AS ?option)
            }
            FILTER(LANG(?questionLabel) = "es")
            SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
        }
        LIMIT 100
        `, "To which fictional universe does the following term belong: "],
                    [
                            // pregunta = genero, opcion = videojuego
                            `
        SELECT ?option ?optionLabel ?question ?questionLabel
        WHERE {
        ?option wdt:P31 wd:Q7889.     
        ?option wdt:P136 ?question.    
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
        }
        LIMIT 100
        `, "Which of the following games belongs to the genre "]
            ],

        "Informatica":
            [
                    // pregunta = software, opcion = fecha
                    [
                            `
        SELECT ?question ?questionLabel ?option ?optionLabel
        WHERE {
            ?question wdt:P31 wd:Q7397.        
            ?question wdt:P571 ?releaseDate.
            BIND(SUBSTR(?releaseDate, 9, 2) AS ?day)    
            BIND(SUBSTR(?releaseDate, 6, 2) AS ?month) 
            BIND(SUBSTR(?releaseDate, 1, 4) AS ?year)   
            BIND(CONCAT(?day, "/", ?month, "/", ?year) AS ?option)  
            SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
        }
        `, "Where was created "],
                    [
                            // pregunta = creador, opcion = lenguaje de programacion
                            `
        SELECT ?option ?optionLabel ?question ?questionLabel
        WHERE {
            ?option wdt:P31 wd:Q9143.
            ?option wdt:P178 ?question.
            SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
        }
        LIMIT 100        
        `, "What programming language was created by "]
            ]
}



module.exports = { queries };