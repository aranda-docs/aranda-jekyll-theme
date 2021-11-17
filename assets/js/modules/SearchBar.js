import { Manuales } from "../const/manuales.js";
//-- Sorting the manuals array based on the current context
const sortOnContext = (a, b) => {
    
}

// Return a list of elements that contains an specific word in his title, abstact or manual property
// Param: search, word to find
export const searchBar = ( search, subject ) => {
    
    const subResults = Manuales.filter( manual => 
        manual.manual.toLowerCase().includes(subject.toString().toLowerCase())
        && ( manual.titulo.toLowerCase().includes(search.toString().toLowerCase())        
        || manual.abstract.toLowerCase().includes(search.toString().toLowerCase()) ) );        
    const addResults = Manuales.filter( 
        manual => 
        manual.manual.toLowerCase().includes(search.toString().toLowerCase()) 
        | manual.titulo.toLowerCase().includes(search.toString().toLowerCase()) 
        |  manual.abstract.toLowerCase().includes(search.toString().toLowerCase()));     
    const results =  [ ...subResults, ...addResults].filter( (obj, index, array) => {
        return array.map( mapObj => mapObj.abstract ).indexOf(obj.abstract) === index;
    } );
    return results;
}