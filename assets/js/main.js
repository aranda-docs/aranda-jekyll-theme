//-- enable javascript engine for the search control
import { searchBar } from "./modules/SearchBar.js";
import { ResultItem } from "./modules/ResultItem.js";
// Create Content List
function contentList() {
  $('#documentationArea').find('h1').each(function() {
    var $item = $(this);
    var $id = $(this).attr('id');
    var li = $('<li/>');
    var a = $('<a/>', {text: $item.text(), href: '#' + $id, title: $item.text()});
    a.appendTo(li);
    $('#nav ul').append(li);
  });
}

// SmoothScroll
function smoothScroll() {
  $('a[href^="#"]').click(function() {
    var target = $(this.hash);
    var hash = this.hash;
    if (target.length == 0) target = $('a[name="' + this.hash.substr(1) + '"]');
    if (target.length == 0) target = $('html');
    console.log(target);
    // If the Target element is collapsed; expand it...
    if($(target).hasClass('collapsed')) {
      $(target).nextUntil('h1').slideDown();
      $(target).removeClass('collapsed');
    } 
    // Scroll to the element
    $('html, body').animate({ scrollTop: target.offset().top }, 500, function (){
        location.hash = hash;
    });
  return false;
  });
}

//-- Scroll to Active link
function ScrollToActive() {
  $('.sg_sidebar').animate({
      scrollTop: $('.active').offset().top
  }, 1000);
}
// Collapse H1
function collapseH() {
  $('#documentationArea h1').click(function() {
    $(this).toggleClass('collapsed');
    $(this).nextUntil('h1').slideToggle();
//    $('html, body').animate({
//        scrollTop: $(this).offset().top
//    }, 500);
  });
}

// Target External Links
function TargetExt() {
  $(".sg_doc a[href^='http']").attr("target","_blank").addClass("ext");
}


// Sidebar Button
function sidebarButton() {
  var $button = $('.sg_sidebar_button');

  $button.click(function(e) {
    e.preventDefault();
    $(this).parents('.sg-pusher').toggleClass('show_sidebar');
  });
}

// Maturity Count
function maturityCount() {
  var p = $('.sg_label.planned').length
  var d = $('.sg_label.draft').length
  var r = $('.sg_label.ready').length
  var rt = $('.sg_label.retired').length
  var total = parseInt(p) + parseInt(d) + parseInt(r) + parseInt(rt);
  var pp = 100 / total * p;
  var pd = 100 / total * d;
  var pr = 100 / total * r;
  var prt = 100 / total * rt;  
  if (total > 0) { 
    $('.title').append('<div class="count" title="Current Maturity"><span class="planned" style="width:' + pp + '%"></span><span class="draft" style="width:' + pd + '%"></span><span class="ready" style="width:' + pr + '%"></span><span class="retired" style="width:' + prt + '%"></span></div>');
  }
}

//-- Download manual to PDF
const downloadManual = () => {
   // const content = $('#article-content').html();

  html2canvas(document.querySelector('#article-content')).then(function(canvas) {
    var printWindow = window.open('', '', 'height=980,width=980');
    var pageHeight = 980;
    var pageWidth = 900;
    var srcImg = canvas;
    var sX = 0;
    var sY = pageHeight * 1 // start 1 pageHeight down for every new page
    var sWidth = pageWidth;
    var sHeight = pageHeight;
    var dX = 0;
    var dY = 0;
    var dWidth = pageWidth;
    var dHeight = pageHeight;

    window.onePageCanvas = document.createElement("canvas");
    onePageCanvas.setAttribute('width', pageWidth);
    onePageCanvas.setAttribute('height', pageHeight);
    var ctx = onePageCanvas.getContext('2d');
    ctx.drawImage(srcImg, 0, 0, 980, 980, 0,0, 980, 980);

    var canvasDataURL = onePageCanvas.toDataURL("image/png", 1.0);
    document.body.appendChild(canvas);
    printWindow.document.write('<img src="' + canvasDataURL + '">');
    printWindow.document.close();
    printWindow.print();
});
}

//-- Getting form control and html container
const searchInput = document.querySelector('#formulario');
const resultBox = document.querySelector('#result-box');
//-- Scroll to result once per search
let scrollTimes = 0;

//-- Render results inside html container
let prev =  document.getElementById("article-content").innerHTML.toString();
let keyWordResult = [];
//-- Set other article results in the result box
const setOtherResults = ( search ) => {
  const results = search.length > 0 ? searchBar( search ) : [];
    if( search.length > 0 && results.map( result =>  ResultItem( result ) ).length > 0 ){
      const cleanUpResults =  results.map( result =>  ResultItem( result ) )
      .toString()
      .replace(/,/g, '');
      keyWordResult = cleanUpResults;
      resultBox.innerHTML = `<p class="item-title" id="expand-results">clic aquí para más resultados con la busqueda '${search}'</p>`;            
      //-- Expand results
      $('#expand-results').click( () => {
        $('#result-box')
        .animate({maxHeight: '300px'}, 200, 
        () => resultBox.innerHTML = keyWordResult);
        $('.demo-item').addClass('show_tooltip');
      });      
    } else if(search.length === 0) {
      resultBox.innerHTML = [];
    }else {
      resultBox.innerHTML = `<p class="item-title">No hay resultados addicionales para la busqueda '${search}'</p>`;
    } 
}
//-- Highlight words find in the current document and engage the result box
const setResults = ( evt ) => {
  try {
    const search = evt.target.value.toString();   
    //-- Engage result box
    setOtherResults(search);
    //-- Highlight word engine
    let article = document.getElementById("article-content").innerHTML.toString();
    if( article.match(/mark/gi) ){
      article = prev;
    }
    if ( search.length >= 3 ) {      
      const pattern = new RegExp("("+search+")", "gi");
      const new_text = article.replace(pattern, "<mark>"+search+"</mark>");      
      document.getElementById("article-content").innerHTML = new_text; 
      scrollTimes = 0;    
             
    }  else {
      document.getElementById("article-content").innerHTML = prev;
    }  
  } catch (error) {
    console.log(error);
  }
        
}

const ifHighlightedWord = () => {
  if( $('mark') && scrollTimes == 0){
    $('html').animate({
      scrollTop: $('mark').offset().top
    }, 1000);
    scrollTimes = 1;
  }
}

setInterval(ifHighlightedWord, 1000);

//-- Activating download tooltip
const tooltip = document.querySelector('#tooltip');
const searchButton = document.querySelector('#pdf-ic');
// const convertPDF = document.querySelector('#convertPDF');

//-- Show Tooltip
const showTooltip = (evt) => {
  $('#tooltip').removeClass('hide_tooltip');
  $('#tooltip').addClass('show_tooltip');
}
//-- Hide Tooltip
const hideTooltip = (evt) => {
  $('#tooltip').addClass('hide_tooltip');
  $('#tooltip').removeClass('show_tooltip');
}


//-- Binding events
searchButton.onmouseover = showTooltip;
searchButton.onmouseout = hideTooltip;
// convertPDF.onclick = downloadManual;

//-- Adding listener and triggering  render function when key is up.
searchInput.onkeyup = setResults;

//Functions that run when all HTML is loaded
$(document).ready(function() {
  contentList();
  smoothScroll();
  //ScrollToActive();
  maturityCount();
  collapseH();
  TargetExt();
  sidebarButton();
});


