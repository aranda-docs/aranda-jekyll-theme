import { searchBar } from "./modules/SearchBar.js";
import { ResultItem } from "./modules/ResultItem.js";
//-- Getting form control and html container
const searchInput = document.querySelector('#formulario');
const searchButton = document.querySelector('#Buscar');
const htmlElement = document.querySelector('#demo');

//-- Render results inside html container
const setResults = ( evt ) => {
    const search = evt.target.value.toString();
    const results = search.length > 0 ? searchBar( evt.target.value.toString() ) : [];
    if( search.length > 0 && results.map( result =>  ResultItem( result ) ).length > 0 ){
        htmlElement.innerHTML = results.map( result =>  ResultItem( result ) );
    } else if(search.length === 0) {
        htmlElement.innerHTML = [];
    }else {
        htmlElement.innerHTML = `<p class="item-title">No hay resultados para la busqueda '${search}'</p>`;
    }        
}

//-- Search by button
const SearchByButton = () => {
    setResults({target: { value:  searchInput.value}})
}

//-- Adding listener and triggering  render function when key is up.
searchInput.onkeyup = setResults;
searchButton.onclick = SearchByButton;