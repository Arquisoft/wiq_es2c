// Todas las consultas
var queries = {};

queries["es"] = {
      "Geografia":
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
          ],

      "Cultura":
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
          ],

      "Personajes":
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
      `, "¿Cuál es el nombre de este futbolista?"],
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
      `, "¿Que presidente de EE.UU es el que se muestra en la imagen?"]
          ]
}

queries["en"] = {
      "Geografia":
          [
                // pregunta = Imagen de un país, opcion = Pais
                [
                      `
      SELECT DISTINCT ?option ?optionLabel ?imageLabel
      WHERE {
        ?option wdt:P31 wd:Q6256;               
              rdfs:label ?optionLabel;          
        
        OPTIONAL { ?option wdt:P18 ?imageLabel. }    
        FILTER(lang(?optionLabel) = "en")       
        FILTER EXISTS { ?option wdt:P18 ?imageLabel }
      }
    `, "What country is the one that appears in the following image?"]
          ],

      "Cultura":
          [
                // pregunta = iamgen monumento, opcion = nombre
                [
                      `
      SELECT ?option ?optionLabel ?imageLabel
      WHERE {
        ?option wdt:P31 wd:Q4989906; 
                  wdt:P17 wd:Q29;                
                  wdt:P18 ?imageLabel.                  
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
      }
      LIMIT 100
      `, "What Spanish monument is this?"]
          ],

      "Personajes":
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
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
      }
      LIMIT 100
      `, "What is the name of this painter?"],
                // pregunta = imagen futbolista, opcion = nombre futbolista
                [
                      `
      SELECT ?optionLabel ?imageLabel
      WHERE {
        ?option wdt:P106 wd:Q937857;     
                wdt:P569 ?birthdate.     
        FILTER(YEAR(?birthdate) >= 1960)  
        ?option wdt:P18 ?imageLabel.     
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
      }
      LIMIT 100
      `, "What is the name of this footballer?"],
                // pregunta = imagen cantante, opcion = nombre cantante
                [
                      `
      SELECT ?optionLabel ?imageLabel
      WHERE {
          ?option wdt:P106/wdt:P279* wd:Q177220; 
                    wdt:P18 ?imageLabel.              
          SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
      }
      LIMIT 100
      `, "What is the name of this singer?"],
                // pregunta = Imagen de un presidente de EE.UU., opcion = Nombres de presidentes de EE.UU.
                [
                      `
      SELECT ?option ?optionLabel ?imageLabel
      WHERE {
          ?option wdt:P31 wd:Q5;  
                      wdt:P39 wd:Q11696;  
                      wdt:P18 ?imageLabel.   
          SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
      }
      `, "Which US president is shown in the image?"]
          ]
}



module.exports = { queries };