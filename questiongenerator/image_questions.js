// Todas las consultas
var queries = {};

queries['Geografia'] = 
    [
      // pregunta = Imagen de un país, opcion = Pais
      [
      `
      SELECT DISTINCT ?option ?optionLabel ?imageLabel
      WHERE {
        ?option wdt:P31 wd:Q6256;               
              rdfs:label ?optionLabel;          
        
        OPTIONAL { ?option wdt:P18 ?imageLabel. }    
        FILTER(lang(?optionLabel) = "es")       
        FILTER EXISTS { ?option wdt:P18 ?imageLabel }
      }
    `, "¿Que país es el que aparece en la siguiente imagen?"]
  ];

queries['Cultura'] =
  [
      // pregunta = iamgen monumento, opcion = nombre
      [
      `
      SELECT ?option ?optionLabel ?imageLabel
      WHERE {
        ?option wdt:P31 wd:Q4989906; 
                  wdt:P17 wd:Q29;                
                  wdt:P18 ?imageLabel.                  
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es". }
      }
      LIMIT 100
      `, "¿Que monumento español es este?"]
  ];

queries['Personajes'] = 
  [
      // pregunta = imagen pintor, opcion = nombre pintor
      [
      `
      SELECT ?optionLabel ?imageLabel
      WHERE {
        ?option wdt:P106 wd:Q1028181;      
                wdt:P569 ?birthdate.      
        FILTER(YEAR(?birthdate) >= 1500) 
        ?option wdt:P18 ?imageLabel.     
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es". }
      }
      LIMIT 100
      `, "¿Cuál es el nombre de este pintor?"],
      // pregunta = imagen futbolista, opcion = nombre futbolista
      [
      `
      SELECT ?optionLabel ?imageLabel
      WHERE {
        ?option wdt:P106 wd:Q937857;     
                wdt:P569 ?birthdate.     
        FILTER(YEAR(?birthdate) >= 1960)  
        ?option wdt:P18 ?imageLabel.     
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es". }
      }
      LIMIT 100
      `,  "¿Cuál es el nombre de este futbolista?"],
      // pregunta = imagen cantante, opcion = nombre cantante
      [
      `
      SELECT ?optionLabel ?imageLabel
      WHERE {
          ?option wdt:P106/wdt:P279* wd:Q177220; 
                    wdt:P18 ?imageLabel.              
          SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es". }
      }
      LIMIT 100
      `, "¿Cuál es el nombre de este cantante?"],
      // pregunta = Imagen de un presidente de EE.UU., opcion = Nombres de presidentes de EE.UU.
      [
      `
      SELECT ?option ?optionLabel ?imageLabel
      WHERE {
          ?option wdt:P31 wd:Q5;  
                      wdt:P39 wd:Q11696;  
                      wdt:P18 ?imageLabel.   
          SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es". }
      }
      `,  "¿Que presidente de EE.UU es el que se muestra en la imagen?"]
  ];

module.exports = { queries };