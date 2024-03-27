// Todas las consultas
var queries = 
    // pregunta = Imagen de un presidente de EE.UU., opcion = Nombres de presidentes de EE.UU.
    [`SELECT ?option ?optionLabel ?imageLabel
    WHERE {
        ?option wdt:P31 wd:Q5;  
                    wdt:P39 wd:Q11696;  
                    wdt:P18 ?imageLabel.   
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es". }
    }
    `,
    // pregunta = Imagen de un país, opcion = Pais
    `SELECT DISTINCT ?option ?optionLabel ?imageLabel
    WHERE {
      ?option wdt:P31 wd:Q6256;               
            rdfs:label ?optionLabel;          
      
      OPTIONAL { ?option wdt:P18 ?imageLabel. }    
      FILTER(lang(?optionLabel) = "es")       
      FILTER EXISTS { ?option wdt:P18 ?imageLabel }
    }
    `];

// Todas las preguntas, en el mismo orden que las consultas
var questions = ["¿Que presidente de EE.UU es el que se muestra en la imagen?",
                "¿Que país es el que aparece en la siguiente imagen?"];

module.exports = { queries, questions };