//THIS CONTROLS THE HEADER BUTTONS ALONG THE TOP RIGHT
//====================================
//== EVENT LISTENERS
//====================================
$('#infoBtn').click(function () {   
    LoadStuff('infoBtn');
});

$('#tutBtn').click(function () {
    LoadStuff('tutBtn');
});

$('#saveBtn').click(function () {
    LoadStuff('saveBtn');
});

$('#formulaBtn').click(function () {
    LoadStuff('formulaBtn');
});

$('#videoBtn').click(function () {
    LoadStuff('videoBtn');
});



$('#accDiv').hide(); 	//MAIN OVERLAY OF ACCESSIBILITY DIV 
$('#accessText').hide();   // ACCESSBILITY TEXT AT TOP 	 
$('#popup').hide();   // HIDES MAIN POPUP IN FIRST LOAD OF LAB; SO IT DOESN'T SHOW UP BEFORE LAB LOADS

$('#tutorials').hide();
$('#tutorialsDiv').hide();
//====================================
//== INITIAL POPUP/DIALOG THAT OPENS WITH APPLICATION
//====================================


//====================================
//== FUNCTIONS
//====================================
function LoadStuff(btnName) {
    switch (btnName) {

        case "fiveEight":
                 
            break;
        case "infoBtn":
		popupOpen = true;
            OpenPopUps('#intro');
            break;
        case "tutBtn":
		popupOpen = true;
            OpenPopUps('#tutorials');
            break;
        case "saveBtn":
		popupOpen = true;
            OpenPopUps('#save');
            break;            
        case "formulaBtn":
		popupOpen = true;
            OpenPopUps('#formulas');
            break;            
        case "videoBtn":
		popupOpen = true;
            OpenPopUps('#videos');
            break;
    }  //End of switch statement

}  //End of function


//====  TOOL TIP FUNCTIONS FOR HEADER BUTTONS ===
$(document).ready(function () {
    $('#infoBtn').tooltipster({
        animation: 'grow',
        content: ('INTRODUCTION')
    });
    $('#tutBtn').tooltipster({
        animation: 'grow',
        content: ('TUTORIALS')
    });
    $('#saveBtn').tooltipster({
        animation: 'grow',
        content: ('SAVE')
    });
    $('#formulaBtn').tooltipster({
        animation: 'grow',
        content: ('FORMULAS')
    });
    $('#videoBtn').tooltipster({
        animation: 'grow',
        content: ('VIDEOS')
    });
});


