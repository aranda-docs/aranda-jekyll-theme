export const ResultItem  = ( { parent, title, url } ) => {
   const item = `<div class="demo-item">
        <span class="item-manual"><strong>${parent}</strong></span>
        <br>
        <span class="item-title"><strong>${title}</strong></span>
        <br>        
        <a href="${url}" class="item-url">${url}</a>
        <hr />
    </div>`
    return item;
}