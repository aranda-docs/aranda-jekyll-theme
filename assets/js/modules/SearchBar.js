import { Articles } from '../const/Articles.js';
// Return a list of elements that contains an specific word in his title
// Param: search, word to find
export const searchBar = ( search ) => {    
    const results = Articles.filter( 
        article => 
        article.title.toLowerCase().includes(search.toString().toLowerCase()));
    return results;
}