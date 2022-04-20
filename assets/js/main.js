//-- enable javascript engine for the search control
import { searchBar } from "./modules/SearchBar.js";
import { ResultItem } from "./modules/ResultItem.js";
const { jsPDF } = window.jspdf;
// Create Content List
function contentList() {
    $("#documentationArea")
        .find("h1")
        .each(function () {
            var $item = $(this);
            var $id = $(this).attr("id");
            var li = $("<li/>");
            var a = $("<a/>", {
                text: $item.text(),
                href: "#" + $id,
                title: $item.text(),
            });
            a.appendTo(li);
            $("#nav ul").append(li);
        });
}

// SmoothScroll
function smoothScroll() {
    $('a[href^="#"]').click(function () {
        var target = $(this.hash);
        var hash = this.hash;
        if (target.length == 0)
            target = $('a[name="' + this.hash.substr(1) + '"]');
        if (target.length == 0) target = $("html");
        console.log(target);
        // If the Target element is collapsed; expand it...
        if ($(target).hasClass("collapsed")) {
            $(target).nextUntil("h1").slideDown();
            $(target).removeClass("collapsed");
        }
        // Scroll to the element
        $("html, body").animate(
            { scrollTop: target.offset().top },
            500,
            function () {
                location.hash = hash;
            }
        );
        return false;
    });
}

//-- Scroll to Active link
function ScrollToActive() {
    if ($(".active").offset() !== undefined) {
        $(".sg_sidebar").animate(
            {
                scrollTop: $(".active").offset().top,
            },
            1000
        );
    }
}
// Collapse H1
function collapseH() {
    $("#documentationArea h1").click(function () {
        $(this).toggleClass("collapsed");
        $(this).nextUntil("h1").slideToggle();
        //    $('html, body').animate({
        //        scrollTop: $(this).offset().top
        //    }, 500);
    });
}

// Target External Links
function TargetExt() {
    $(".sg_doc a[href^='http']").attr("target", "_blank").addClass("ext");
}

// Sidebar Button
function sidebarButton() {
    var $button = $(".sg_sidebar_button");

    $button.click(function (e) {
        e.preventDefault();
        $(this).parents(".sg-pusher").toggleClass("show_sidebar");
    });
}

// Maturity Count
function maturityCount() {
    var p = $(".sg_label.planned").length;
    var d = $(".sg_label.draft").length;
    var r = $(".sg_label.ready").length;
    var rt = $(".sg_label.retired").length;
    var total = parseInt(p) + parseInt(d) + parseInt(r) + parseInt(rt);
    var pp = (100 / total) * p;
    var pd = (100 / total) * d;
    var pr = (100 / total) * r;
    var prt = (100 / total) * rt;
    if (total > 0) {
        $(".title").append(
            '<div class="count" title="Current Maturity"><span class="planned" style="width:' +
                pp +
                '%"></span><span class="draft" style="width:' +
                pd +
                '%"></span><span class="ready" style="width:' +
                pr +
                '%"></span><span class="retired" style="width:' +
                prt +
                '%"></span></div>'
        );
    }
}

//-- Workaround for html2canvas blank image
function fnIgnoreElements(el) {
    if (typeof el.shadowRoot == "object" && el.shadowRoot !== null) return true;
}

function loadMenu() {
    $(".menu ul:has(ul)").click(function (e) {
        e.preventDefault();

        if ($(this).hasClass("activado")) {
            $(this).removeClass("activado");
            $(this).children("ul").slideUp();
        } else {
            $(".menu li ul").slideUp();
            $(".menu li").removeClass("activado");
            $(this).addClass("activado");
            $(this).children("ul").slideDown();
        }
    });

    $(".btn-menu").click(function () {
        $(".contenedor-menu .menu").slideToggle();
    });

    $(window).resize(function () {
        if ($(document).width() > 450) {
            $(".contenedor-menu .menu").css({ display: "block" });
        }

        if ($(document).width() < 450) {
            $(".contenedor-menu .menu").css({ display: "none" });
            $(".menu li ul").slideUp();
            $(".menu li").removeClass("activado");
        }
    });

    $(".menu li ul li a").click(function () {
        window.location.href = $(this).attr("href");
    });
}

//-- Download manual to PDF
const downloadManual = async () => {
    const printableArea = document.querySelector("body");
    html2canvas(printableArea, {
        useCORS: true,
        allowTaint: true,
        ignoreElements: fnIgnoreElements,
    }).then(function (canvas) {
        const img = canvas.toDataURL("image/png");
        var doc = new jsPDF("l", "mm", [1200, 1210]);
        doc.addImage(img, "JPEG", 20, 20, 980, 980);
        doc.save(`Aranda-${new Date().toLocaleDateString()}.pdf`);
    });
};

//-- Getting form control and html container
const searchInput = document.querySelector("#formulario");
const resultBox = document.querySelector("#result-box");
//-- Scroll to result once per search
let scrollTimes = 0;

//-- Render results inside html container
let prev = document.getElementById("article-content").innerHTML.toString();
let keyWordResult = [];
//-- Set other article results in the result box
const setOtherResults = (search) => {
    const results = search.length > 0 ? searchBar(search) : [];
    if (
        search.length > 0 &&
        results.map((result) => ResultItem(result)).length > 0
    ) {
        const cleanUpResults = results
            .map((result) => ResultItem(result))
            .toString()
            .replace(/,/g, "");
        keyWordResult = cleanUpResults;
        resultBox.innerHTML = `<p class="item-title" id="expand-results">clic aquí para más resultados con la busqueda '${search}'</p>`;
        //-- Expand results
        $("#expand-results").click(() => {
            $("#result-box").animate(
                { maxHeight: "300px" },
                200,
                () => (resultBox.innerHTML = keyWordResult)
            );
            $(".demo-item").addClass("show_tooltip");
        });
    } else if (search.length === 0) {
        resultBox.innerHTML = [];
    } else {
        resultBox.innerHTML = `<p class="item-title">No hay resultados addicionales para la busqueda '${search}'</p>`;
    }
};
//-- Highlight words find in the current document and engage the result box
const setResults = (evt) => {
    try {
        const search = evt.target.value.toString();
        //-- Engage result box
        setOtherResults(search);
        //-- Highlight word engine
        let article = document
            .getElementById("article-content")
            .innerHTML.toString();
        if (article.match(/mark/gi)) {
            article = prev;
        }
        if (search.length >= 3) {
            const pattern = new RegExp("(" + search + ")", "gi");
            const new_text = article.replace(
                pattern,
                "<mark>" + search + "</mark>"
            );
            document.getElementById("article-content").innerHTML = new_text;
            scrollTimes = 0;
        } else {
            document.getElementById("article-content").innerHTML = prev;
        }
    } catch (error) {
        console.log(error);
    }
};

const ifHighlightedWord = () => {
    const yellowHighlighter = document.querySelector("mark");
    if (yellowHighlighter && scrollTimes == 0) {
        $("html").animate(
            {
                scrollTop: $("mark").offset().top,
            },
            1000
        );
        scrollTimes = 1;
    }
};

setInterval(ifHighlightedWord, 1000);

//-- Activating download tooltip
const tooltip = document.querySelector("#tooltip");
const searchButton = document.querySelector("#pdf-ic");
const convertPDF = document.querySelector("#convertPDF");

//-- Show Tooltip
const showTooltip = (evt) => {
    $("#tooltip").removeClass("hide_tooltip");
    $("#tooltip").addClass("show_tooltip");
};
//-- Hide Tooltip
const hideTooltip = (evt) => {
    $("#tooltip").addClass("hide_tooltip");
    $("#tooltip").removeClass("show_tooltip");
};

//-- Binding events
searchButton.onmouseover = showTooltip;
searchButton.onmouseout = hideTooltip;
convertPDF.onclick = downloadManual;

//-- Adding listener and triggering  render function when key is up.
searchInput.onkeyup = setResults;

//Functions that run when all HTML is loaded
$(document).ready(function () {
    contentList();
    smoothScroll();
    ScrollToActive();
    maturityCount();
    collapseH();
    TargetExt();
    sidebarButton();
    loadMenu();
});
