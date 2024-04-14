// Todas las consultas
var queries = {};

queries['Geografia'] = 
    [
      // pregunta = Imagen de un país, opcion = Pais
      `
      SELECT DISTINCT ?option ?optionLabel ?imageLabel
      WHERE {
        ?option wdt:P31 wd:Q6256;               
              rdfs:label ?optionLabel;          
        
        OPTIONAL { ?option wdt:P18 ?imageLabel. }    
        FILTER(lang(?optionLabel) = "es")       
        FILTER EXISTS { ?option wdt:P18 ?imageLabel }
      }
    `
  ];

queries['Cultura'] = 
  [
      // pregunta = cuadro, opcion -> nombre
      `
      SELECT ?optionLabel ?imageLabel
      WHERE {
          ?option wdt:P31 wd:Q3305213.   
          ?option wdt:P18 ?imageLabel.       
          SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es". }
      }
      LIMIT 200
      `
  ];

queries['Personajes'] = 
  [
      // pregunta = imagen pintor, opcion = nombre pintor
      `
      SELECT ?optionLabel ?imageLabel
      WHERE {
          ?option wdt:P106 wd:Q1028181; 
                  wdt:P18 ?imageLabel.        
          SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es". }
      }
      LIMIT 200
      `,
      // pregunta = imagen futbolista, opcion = nombre futbolista
      `
      SELECT ?optionLabel ?imageLabel
      WHERE {
          ?option wdt:P106 wd:Q937857; 
                      wdt:P18 ?imageLabel. 
          SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es". }
      }
      LIMIT 200
      `,
      // pregunta = imagen cantante, opcion = nombre cantante
      `
      SELECT ?optionLabel ?imageLabel
      WHERE {
          ?option wdt:P106/wdt:P279* wd:Q177220; 
                    wdt:P18 ?imageLabel.              
          SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es". }
      }
      LIMIT 200
      `
  ];

// Todas las preguntas, en el mismo orden que las consultas
var questions = ["¿Que presidente de EE.UU es el que se muestra en la imagen?",
                "¿Que país es el que aparece en la siguiente imagen?"];

module.exports = { queries, questions };