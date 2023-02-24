var popArray = [];
var introPopArray = [];
var introPopIndex = 0;
var currPopup;

var introArray = ['#intro1', '#intro2', '#intro3', '#intro4', '#intro5', '#intro6', '#intro7', '#intro8']; //THIS ARRAY CONTAINS ALL SLIDES ASSOCIATED W/ INTRO POPUP
var introIndex = 0;

var tutorial1Array = ['#nav1', '#nav2', '#nav3', '#nav4', '#nav5', '#nav6', '#nav7']; //THIS ARRAY CONTAINS ALL SLIDES IN THE NAVIGATION TUTORIAL
var tutorial1Index = 0;

$('#popContainer').load("popups.html #popupsections", function () {

    for (var i = 0; i < $('#popContainer #popupsections').children().length; i++) {
        var c = '#' + $('#popContainer #popupsections').children().eq(i).attr('id');
        popArray.push(c);
        
        if (c === "#first" || c === "#tutorials" || c === "#intro")
            introPopArray.push(c);

        $('#popContainer #popupsections').children().eq(i).hide();
        $(c + ' .exitBtn').click(HandleExitClick);
    }


    HideIntro(); //CALL THE HIDE INTRO FUNCTION
    HideTut1();  //CALL THE HIDE TUT1 FUNCITON
    SetUpIntroDolts();  //SETUP THE DOLTS FOR THE INTRO 
    SetUpTut1Dolts();   //SETUP THE DOLTS FOR THE FRIST TUT
    AddListeners();
    $('#accTutTxt').hide();  // ACCESSBILITY TEXT ON TUTORIALS POPUP
    $('.acc').hide();  //HIDES ALL ACCESSIBILITY ELEMENTS ON POPUPS

    isLoaded('popupcontrolScript');
});

function HandleExitClick(){
    var id = '#' + $(this).parent().parent().attr('id');
    ClosePopUp(id);
}

function OpenPopUps(_id)
{
     for(var p = 0; p < popArray.length; p++){
         $(popArray[p]).hide();
     }
    if(_id == '#first'){
       $('#popupsections ' + _id).delay(500).fadeIn(400); 
    }else{
       $('#popupsections ' + _id).fadeIn(400); 
    }
    
    $('#popContainer').show();
    currPopup = _id;
    popupOpen = true;
}

function OpenPopUpswithCustomContent(_id, _header, _message){
    var contents = '';
    if(_header != null){
        contents = '<h1>' + _header + '</h1>';
    }
    if(_message != null){
        contents += '<p>' + _message + '</p>';
    }

    $(_id + ' .normalS').append(contents);
    
    //call original method
    OpenPopUps(_id);
}

function ClosePopUp(id)
{
    $(id).hide(200);
    $('#popContainer').hide();
    popupOpen = false;
    currPopup = '';
    if ((introPopIndex + 1) < introPopArray.length)
    {
        introPopIndex++;
        OpenPopUps(introPopArray[introPopIndex]);
    }
}

function CloseAllPopups(){
   for(var p = 0; p < popArray.length; p++)
   {
       $('#popContainer ' + popArray[p]).hide();
   }
   $('#popContainer').hide();
}

function AddListeners()
{
    //ADD CLICK FUNCTION TO THE ARROWS ON THE INTRO SLIDES
        $("#intro .arrowL_P").click(function () {
            if (introIndex <= 0) { 
                introIndex = 0;
            } else {
                introIndex--;
            }
            ChangeIntroDolts();
            HideIntro();
        });
        $("#intro .arrowR_P").click(function () {
            if (introIndex >= (introArray.length - 1)) {
                introIndex = introArray.length - 1;
            } else {
                introIndex++;
            }
            ChangeIntroDolts();
            HideIntro();
        });

        //ADD CLICK FUNCTION TO THE ARROWS ON THE TUTORIAL SLIDES
        $("#tutorial1 .arrowL_P").click(function () {
            if (tutorial1Index <= 0) {
                tutorial1Index = 0;
            } else {
                tutorial1Index--;
            }
            ChangeTut1Dolts();
            HideTut1();
        });
        $("#tutorial1 .arrowR_P").click(function () {
            if (tutorial1Index >= (tutorial1Array.length - 1)) {
                tutorial1Index = tutorial1Array.length - 1;
            } else {
                tutorial1Index++;
            }
            ChangeTut1Dolts();
            HideTut1();
        });

        //ADD FUNCTIONALITY TO ALL OF THE TUTORIAL LINK BUTTONS
        $("#tutLink1").click(function () {
            OpenPopUps('#tutorial1');
        }); //IF CLICKED SHOW POPUP 6 IN THE POP ARRAY
        $("#tutLink2").click(function () {
            //alert("got me");
        });
        $("#tutLink3").click(function () {
            //alert("got me");
        });
        $("#tutLink4").click(function () {
            //alert("got me");
        });
        $("#tutLink5").click(function () {
            //alert("got me");
        });

        //ADD FUNCTIONALITY TO ALL OF THE VIDEO LINK BUTTONS
        $("#vidLink1").click(function () {
            window.open('http://www.youtube.com/embed/MA-dDxgZpoc?autoplay=1', 'scrollbars=no', "width=800, height=600");
        });
        $("#vidLink2").click(function () {
            window.open('mms://wms.sinclair.edu/Quadrant_Streak_Plate_Windows.wmv', 'scrollbars=no', "width=800, height=600");
        });
        $("#vidLink3").click(function () {
            window.open('http://www.youtube.com/embed/4Tf-IQo3ftc?autoplay=1', 'scrollbars=no', "width=800, height=600");
        });
        $("#vidLink4").click(function () {
            window.open('http://www.youtube.com/embed/m0EAPxalKEw?autoplay=1', 'scrollbars=no', "width=800, height=600");
        });
        $("#vidLink5").click(function () {
            window.open('http://flashmedia.sinclair.edu/dl/dept/Economics/2160/Chapter%203%20Review%20Presentation/index.htm', 'scrollbars=no', "width=800, height=600");
        });


        //ADD FUNCTIONALITY TO ALL OF THE SAVE LINK BUTTONS
        $("#saveLink1").click(function () {
            SavePDF(1);
        });
}


/*=========================================
 * INTRO POPUP FUNCTIONS
 =========================================*/
var introSlideCount = 0;
var introSlides = introArray.length;
var introId = introSlides;


function SetUpIntroDolts() {
    if (introSlides == 1) {
        var clicked = 0;
        introSlides = introSlides - 1;
    } else if (introSlides <= 1) {

    } else {
        var clicked = 1;
        introSlideCount = introSlides - 1;
    }

    if (introSlides > 1) {
        for (var i = 0; i <= introSlides - 1; i++)
        {

            $('#intro #introDolt ul').prepend('<li class="slideNum inactive" id="slidenum' + i + '"></li>');
        }
    } else {
    }
    ChangeIntroDolts();
}

function ChangeIntroDolts()
{
    for (var i = 0; i <= introSlides; i++)
    {
        $('#intro #introDolt  ul li').eq(i).removeClass('active');
        $('#intro #introDolt  ul li').eq(i).addClass('inactive');
    }
    $('#intro #introDolt  ul li').eq(introIndex).removeClass('inactive');
    $('#intro #introDolt  ul li').eq(introIndex).addClass('active');
}



function HideIntro() {
    $(introArray[0]).hide();
    for (var i = 0; i < introArray.length; i++) {
        $(introArray[i]).hide();
    }
    $(introArray[introIndex]).show();
}

/*=========================================
 * TUTORIAL POPUP FUNCTIONS
 =========================================*/
var tutSlideCount = 0;
var tutSlides = tutorial1Array.length;
var tutId = tutSlides;


function SetUpTut1Dolts() {
    if (tutSlides == 1) {
        var clicked = 0;
        tutSlides = tutSlides - 1;
    } else if (tutSlides <= 1) {

    } else {
        var clicked = 1;
        tutSlideCount = tutSlides - 1;
    }
    if (tutSlides > 1) {
        for (var i = 0; i <= tutSlides - 1; i++)
        {
            $('#tutorial1 #tutDolt ul').prepend('<li class="slideNum inactive" id="slidenum' + i + '"></li>');
        }
    } else {
    }

    ChangeTut1Dolts();
}
function ChangeTut1Dolts()
{
    for (var i = 0; i <= tutSlides; i++)
    {
        $('#tutorial1 #tutDolt ul li').eq(i).removeClass('active');
        $('#tutorial1 #tutDolt ul li').eq(i).addClass('inactive');
    }
    $('#tutorial1 #tutDolt ul li').eq(tutorial1Index).removeClass('inactive');
    $('#tutorial1 #tutDolt ul li').eq(tutorial1Index).addClass('active');
}

function HideTut1() {
    $(tutorial1Array[0]).hide();
    for (var i = 0; i < tutorial1Array.length; i++) {
        $(tutorial1Array[i]).hide();
    }
    $(tutorial1Array[tutorial1Index]).show();
}


function SavePDF(num) {
    switch (num) {
        case 1:
            var doc = new jsPDF();
            doc.text(20, 20, 'Test Message');
            doc.addPage();
            doc.text(20, 20, 'Test Page 2');
            doc.save('Test.pdf');
            break;
    }




}
