export const ResultItem  = ( { manual, titulo, abstract, url } ) => {
   const item = `<div class="demo-item">
        <span class="item-manual"><strong>${manual}</strong></span>
        <br>
        <span class="item-title"><strong>${titulo}</strong></span>
        <br>
        <p class="demo-abstract">${abstract}</p>
        <a href="${url}" class="item-url">${url}</a>
        <hr />
    </div>`
    return item;
}