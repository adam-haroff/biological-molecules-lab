//LOAD PROCEDUREs INSTRUCTIONS AND DATA
var menuTabs = [];
var totalProcedures = 1;
var proIndex = 0;
var instIndex = 0;
var instIndexNums = [];

var pro1Index = 0;
var pro2Index = 0;
var pro3Index = 0;


//SLIDESHOW DOTS VARS
//var numSlides;
//var addId = numSlides;


$('#sideMenu #loadDiv').load("sidePanel.html #sidePanelContent", function () {
    //alert('load was performed');
    for (var i = 0; i < $('#sideMenu #loadDiv div').length; i++) {

        $('#sideMenu #loadDiv div').eq(i).hide();

    }
    $('#sideMenu').append('<div id="accordian"></div>');

    /* if (typeof menuItems === 'undefined') { //IF MENU
     window.menuItems = [];
     }*/

    $('#sideMenu #loadDiv div[id]').each(function () {
        var word = $(this).attr('id');

        if (word[0] === word[0].toUpperCase()) {
            menuTabs.push(word);
        }

    });

    //CREATE HEADER MENU BARS
    for (var m = 0; m < menuTabs.length; m++) {
        var w = menuTabs[m];

        var l = $('#' + w).attr('class').split(' '); //GETS ALL CLASSESS ASSOCIATED WITH TAB
        var l = l[0]; //GETS THE FIRST CLASS **MANDITORY SINGLE LETTER**

        if (m === 0) {
            $('#sideMenu #accordian').append(
                    '<h3 class="topMenu" id="sidePanel_procedure"><span class="sideLetter sideLetterAccessOff">P</span><span class="sideText">PROCEDURE</span></h3>' +
                    '<div id="c0" class="content" tabindex="-1"></div>'
                    );


            $('#Procedures .procedure').appendTo('#sideMenu #accordian #c0');
            totalProcedures = $('#sideMenu #accordian #c0 .procedure').length;

            for (var p = 0; p < $('#sideMenu #accordian #c0 .procedure').length; p++) {
                instIndexNums.push($('#sideMenu #accordian #c0 .procedure').eq(p).children('.inst').length);
            }

           
            switch (totalProcedures) {
                case 1:
                    //alert("one");
                    break;
                case 2:
                    //alert("two");
                    $('<span class="sideNum endNum p2" id="sideP_2">2</span><span class="sideNum p1" id="sideP_1">1</span>').appendTo('#sideMenu #accordian .topMenu');
                    break;
                case 3:
                    //alert("three");
                    $('<span class="sideNum endNum p3" id="sideP_3">3</span><span class="sideNum p2" id="sideP_2">2</span><span class="sideNum p1" id="sideP_1">1</span>').appendTo('#sideMenu #accordian .topMenu');
                    break;
            }



            $('<div id="arrowHolder"><div id="arrw_L"></div><div id="doltContainer"><ul></ul></div><div id="arrw_R"></div></div>').appendTo('#sideMenu #accordian #c0');


        } else if (menuTabs[m] == "Data") {
            $('#sideMenu #accordian').append(
                    '<h3 class="data" class="proBtn" id="sidePanel_data"><span class="sideLetter sideLetterAccessOff">D</span><span class="sideText">DATA</span></h3>' +
                    '<div id="c1" class="content" tabindex="-1"></div>' +
                    '</div>'
                    );

            $('#Data .procedure').appendTo('#sideMenu #accordian #c1');
            //totalProcedures = $('#sideMenu #accordian #c1 .procedure').length;

            switch (totalProcedures) {
                case 1:
                    //alert("one");

                    break;
                case 2:
                    //alert("two");

                    $('<span class="sideNum endNum p2" id="sideD_2">2</span><span class="sideNum p1" id="sideD_1">1</span>').appendTo('#sideMenu #accordian .data');
                    break;
                case 3:
                    //alert("three");

                    $('<span class="sideNum endNum p3" id="sideD_3">3</span><span class="sideNum p2" id="sideD_2">2</span><span class="sideNum p1" id="sideD_1">1</span>').appendTo('#sideMenu #accordian .data');
                    break;
            }

        } else {
            var temp = w.replace(/([a-z])([A-Z])/g, '$1 $2');
            temp = temp.replace(/([A-Z])([A-Z][a-z])/g, '$1 $2');

            $('#sideMenu #accordian').append(
                    '<h3 class="proBtn" id="sidePanel_' + l.toLowerCase() + '"><span class="sideLetter sideLetterAccessOff">' + l.toUpperCase() + '</span><span class="sideText">' + temp.toUpperCase() + '</span></h3>' +
                    '<div id="c' + m + '" class="content" tabindex="-1"></div>' +
                    '</div>'
                    );

            var htmlStr = $('#' + w).html();
            $(htmlStr).appendTo('#sideMenu #accordian #c' + m);
            
            switch (totalProcedures) {
                case 1:
                    //alert("one");

                    break;
                case 2:
                    //alert("two");

                    $('<span class="sideNum endNum p2>2</span><span class="sideNum p1">1</span>').appendTo('#sideMenu #accordian #sidePanel_' + l.toLowerCase());
                    break;
                case 3:
                    //alert("three");

                    $('<span class="sideNum endNum" style="background-color:#444444; cursor:default;"></span><span class="sideNum p2">2</span><span class="sideNum p1" >1</span>').appendTo('#sideMenu #accordian  #sidePanel_' + l.toLowerCase());
                    break;
            }
        }
    }
    $('#sideMenu #accordian div').show();
    $('#sideMenu #loadDiv').remove();


    StartMenu();
    ChangeProceedures();
    SetUpDolts();
    ChangeContentAreas(); //INITAL START OF CONTENT AREAS
    
    isLoaded('sidePanelsScript');
});

//====================================
//== FUNCITONS
//====================================
function StartMenu() {
    //START UP THE ACCORDIAN MENU
    $("#accordian").accordion({
        heightStyle: "fill"
    });

    //POSITION ARROW HOLDER BASED ON THE HEIGH OF THE PROCEDURES MENU
    var aH = $('#arrowHolder').height();
    var cH = $('#sideMenu #accordian #c0').height();
    var b = (cH - aH) + 10;
    $('#arrowHolder').css({top: b, postion: 'absolute'});

    //ADD EVENT LISTENERS TO THE ARROWS AND NUMBER BUTTONS
    $('#arrowHolder #arrw_L').click(function () {
        ChangeInstructions('left');

    });
    $('#arrowHolder #arrw_R').click(function () {
        ChangeInstructions('right');
    });
    $('.p1').click(function () {
        if (!$('#sideMenu #accordian .procedure').eq(0).is(':visible')) {
            proIndex = 0;
            //pro1Index = instIndex;
            ChangeProceedures();
            ChangeContentAreas();
        }
    });
    $('.p2').click(function () {
        if (!$('#sideMenu #accordian .procedure').eq(1).is(':visible')) {
            proIndex = 1;
            //pro2Index = instIndex;
            ChangeProceedures();
            ChangeContentAreas(); 
        }
    });
    $('.p3').click(function () {
        if (!$('#sideMenu #accordian .procedure').eq(2).is(':visible')) {
            proIndex = 2;
            //pro3Index = instIndex;
            ChangeProceedures();
            ChangeContentAreas(); 
        }
    });
    
    
}

function ChangeProceedures() {
    $('#sideMenu #accordian .procedure').hide();
    for(var p = 0; p < menuTabs.length; p++){
        $('#sideMenu #accordian #c'+p+' .procedure').eq(proIndex).show();
    }
     
    $('.p1, .p2, .p3').switchClass("sideNumActive", "sideNum", 10);
   
    switch (proIndex) {
        case 0:
            instIndex = pro1Index;
            $('.p1').switchClass("sideNum", "sideNumActive", 100);
            break;
        case 1:
            instIndex = pro2Index;
            $('.p2').switchClass("sideNum", "sideNumActive", 100);
            break;
        case 2:
            instIndex = pro3Index;
            $('.p3').switchClass("sideNum", "sideNumActive", 100);
            break;
    }
    
    if (instIndexNums[proIndex] <= 1) {
        $('#arrowHolder').hide();
    } else {
        $('#arrowHolder').show();

    }
    SetUpDolts();
    ChangeInstructions('null');
}

function ChangeInstructions(dir) {
    $('#sideMenu #accordian .procedure').eq(proIndex).children('.inst').hide();
    $('#sideMenu #accordian .procedure').eq(proIndex).children('.data').eq(instIndex).hide();
    var maxNum = instIndexNums[proIndex];

    //alert(maxNum);
    switch (dir) {
        case 'left':
            if (instIndex <= 0) {
                instIndex = 0;
            } else {
                instIndex = instIndex - 1;
            }
            break;
        case 'right':
            if (instIndex >= (maxNum - 1)) {
                instIndex = maxNum - 1;
            } else {
                instIndex = instIndex + 1;
            }
            break;
    }
   
    this['pro'+(proIndex + 1) +'Index'] = instIndex;

    $('#sideMenu #accordian .procedure').eq(proIndex).children('.inst').eq(instIndex).show();
    $('#sideMenu #accordian .procedure').eq(proIndex).children('.data').eq(instIndex).show();
    ChangeDolts();
}

/*==================================
 *  DOLT CONTAINER
 =================================*/

function SetUpDolts() {

    $('#doltContainer ul').empty();
    if (instIndexNums[proIndex] > 1) {
        for (var d = 0; d < instIndexNums[proIndex]; d++) {
            $('#doltContainer ul').prepend('<li class="slideNum inactive" id="slidenum' + d + '"></li>');
        }
    }
    ChangeDolts();
}

function ChangeDolts()
{
    for (var i = 0; i <= instIndexNums[proIndex]; i++)
    {
        $('#doltContainer ul li').eq(i).removeClass('active');
        $('#doltContainer ul li').eq(i).addClass('inactive');
    }
    $('#doltContainer ul li').eq(instIndex).removeClass('inactive');
    $('#doltContainer ul li').eq(instIndex).addClass('active');
    

}

/********************************************
 * SETUP CONTENT AREA(S)
 *******************************************/

function ChangeContentAreas(){
    
    for(var c = 0; c < $('#contentArea .c').length; c++)
    {
        $('#contentArea .c').eq(c).hide();
    }
    
     $('#contentArea #content' + proIndex).show();
     
}




