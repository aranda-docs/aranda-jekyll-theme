//-- enable javascript engine for the search control
import { searchBar } from "./modules/SearchBar.js";
import { ResultItem } from "./modules/ResultItem.js";
const { jsPDF } = window.jspdf;
// Create Content List
function contentList() {
  $('#documentationArea').find('h1').each(function () {
    var $item = $(this);
    var $id = $(this).attr('id');
    var li = $('<li/>');
    var a = $('<a/>', { text: $item.text(), href: '#' + $id, title: $item.text() });
    a.appendTo(li);
    $('#nav ul').append(li);
  });
}

// SmoothScroll
function smoothScroll() {
  $('a[href^="#"]').click(function () {
    var target = $(this.hash);
    var hash = this.hash;
    if (target.length == 0) target = $('a[name="' + this.hash.substr(1) + '"]');
    if (target.length == 0) target = $('html');
    console.log(target);
    // If the Target element is collapsed; expand it...
    if ($(target).hasClass('collapsed')) {
      $(target).nextUntil('h1').slideDown();
      $(target).removeClass('collapsed');
    }
    // Scroll to the element
    $('html, body').animate({ scrollTop: target.offset().top }, 500, function () {
      location.hash = hash;
    });
    return false;
  });
}

//-- Scroll to Active link
function ScrollToActive() {
  if ($('.active').offset() !== undefined) {
    $('.sg_sidebar').animate({
      scrollTop: $('.active').offset().top
    }, 1000);
  }
}
// Collapse H1
function collapseH() {
  $('#documentationArea h1').click(function () {
    $(this).toggleClass('collapsed');
    $(this).nextUntil('h1').slideToggle();
  });
}

// Target External Links
function TargetExt() {
  $(".sg_doc a[href^='http']").attr("target", "_blank").addClass("ext");
}
// Copy Code

function handleCopyClick(evt) {
  // get the children of the parent element
  const { children } = evt.target.parentElement
  // grab the first element (we append the copy button on afterwards, so the first will be the code element)
  // destructure the innerText from the code block
  const { innerText } = Array.from(children)[0]
  // copy all of the code to the clipboard
  copyToClipboard(innerText)
  // alert to show it worked, but you can put any kind of tooltip/popup to notify it worked
  alert(innerText)
}


// Sidebar Button
function sidebarButton() {
  var $button = $('.sg_sidebar_button');

  $button.click(function (e) {
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

//-- Scroll to result once per search
let scrollTimes = 0;

//-- Render results inside html container
let prev = document.getElementById("article-content").innerHTML.toString();
let keyWordResult = [];
//-- Set other article results in the result box

//-- Highlight words find in the current document and engage the result box

const ifHighlightedWord = () => {
  const yellowHighlighter = document.querySelector('mark');
  if (yellowHighlighter && scrollTimes == 0) {
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

//-- Adding listener and triggering  render function when key is up.

//Functions that run when all HTML is loaded
$(document).ready(function () {
  contentList();
  smoothScroll();
  ScrollToActive();
  maturityCount();
  collapseH();
  TargetExt();
  sidebarButton();
});
