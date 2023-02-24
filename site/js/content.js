$('#contentArea').load('content.html', function () {
    'use strict';
    isLoaded('contentScript');
});
var correctOverlayAdded = false;
var matchedMolecules = [];

function setupContent() {
    'use strict';
    var bondMapping = {
        "methaneMolecule": "methane",
        "ammoniaMolecule": "ammonia",
        "waterMolecule": "water",
        "oxygenMolecule": "oxygen",
        "nitrogenMolecule": "nitrogen",
        "carbonDioxideMolecule": "carbonDioxide",
        "ozoneMolecule": "ozone",
        "sulfurDioxideMolecule": "sulfurDioxide",
        "carbonMonoxideMolecule": "nitrogen",
        "formaldehydeMolecule": "formaldehyde",
    };
	
    var selectedMolecule;
    var selectedMoleculeDataid;
    $('.hiddenDragContainer').html($('.visibleDragContainer').html());
    var firstTime = true;

    $('#moleculesList li').click(function () {
        var flag = false;
        var selectedMoleculesIds = [];
        selectedMolecule = this.id;
        selectedMoleculeDataid = $(this).attr('data-id');
        $('.drop-container .MoleculeCanvas').removeClass('visible');

        $('div').remove('#correctOverlay');
        $('.rightsideBtn').removeClass('disabled');
        if ($(this).attr('bondMatched')) {
            $('.rightsideBtn').addClass('disabled');
            $('#' + $(this).attr('bondMatched')).addClass('enabled').removeClass('rightsideBtnHover').removeClass('disabled').prepend('<div class="correctOverlay" id="correctOverlay"><span><h3>CORRECT! </h3><h4>NOW ADD ATOMS</h4><span></div>');
        }
        $('#' + selectedMolecule + 'Canvas').addClass("visible");

        var c = $('#' + selectedMolecule + 'Canvas').find('.allDroppableTarget .dropTarget');
        c.each(function (i) {
            if (!!$(this).attr('selected-data-id')) {
                selectedMoleculesIds.push($(this).attr('selected-data-id'));
                flag = true;
            }
        });
        if (c.length === selectedMoleculesIds.length) {
			console.log(c.length, selectedMoleculesIds, selectedMoleculesIds.length);
            $('#correctMessage').addClass('visible');
        } else {
            $('#correctMessage').removeClass('visible');
        }
        if (flag) {
            $('.visibleDragContainer').html($('.hiddenDragContainer').html());

            $('.visibleDragContainer li').each(function (i) {
                if (selectedMoleculesIds.indexOf($(this).attr('data_id')) > -1) {
                    $(this).addClass('hidden');
                }
            });
            /*$('#dvSource li').draggable({
                opacity: 1,
                revert: true,
                drag: function (event, ui) {
                    currentlyDragging = $(this);
                }
            });*/
            firstTime = false;
			$('#dvSource li').css('pointer-events','none');
        } else {
            if (!firstTime) {
                $('.visibleDragContainer').html($('.hiddenDragContainer').html());
                $('#dvSource li').draggable({
                    opacity: 1,
                    revert: true,
                    drag: function (event, ui) {
                        currentlyDragging = $(this);
                    }
                });
            }
            firstTime = false;
        }

    });

    $('.rightPanel .rightsideBtn').on('click', function () {
        if ($(this).hasClass('disabled')) {
            return false;
        }
        var bondDataid = $(this).attr('data_id');
        var bond = bondMapping[bondDataid];
        var selectedId = this.id;
		
        if (selectedMoleculeDataid === bond && !$('#' + selectedId).find('.correctOverlay').length) {
            $('.rightPanel .rightsideBtn').addClass('disabled');
            $(this).removeClass('disabled').addClass('enabled').removeClass('rightsideBtnHover');
            $('#' + selectedMolecule).attr('bondMatched', selectedId);
            $('#' + selectedId).prepend('<div class="correctOverlay" id="correctOverlay"><span><h3>CORRECT! </h3><h4>NOW ADD ATOMS</h4></span></div>');

            var c = $('#' + selectedMolecule + 'Canvas');
            if (selectedMolecule != undefined); {
                $(c).find('.structuredAtom').addClass('visible');
            }
        } else if (selectedMolecule !== bond) {
            if (!$('#' + selectedId).find('.overlay').length && !$('#' + selectedId).find('.correctOverlay').length) {
                $('#' + selectedId).addClass('chooseAgain');
                $('#' + selectedId).prepend('<div class="overlay" id="overlay"><span>CHOOSE AGAIN<span></div>');
               $(this).removeClass('hover');
            }
        }
    });


    $('.rightsideBtn').hover(function () {

      $(this).addClass('rightsideBtnHover');
    }, function () { 
		$(this).removeClass('rightsideBtnHover');
        if ($(this).hasClass('chooseAgain')) {
            $(this).removeClass('chooseAgain');
			 
        }
        
        $('div').remove('#overlay');
    });

    $('.molecules-block ul li a').click(function () {

        $('.molecules-block ul li a').removeAttr('style');

        $(this).css('background', 'linear-gradient(to bottom, #ffffff 0%,#6b3781 180%)');
        $(this).css('border', '2px solid #6b3781');
		$('.rightPanel .rightsideBtn').removeClass('enabled');

    });

    /* Dragging Starts */
    var currentlyDragging = '';
    $('#dvSource li').draggable({
        opacity: 1,
        revert: true,
        drag: function (event, ui) {
            currentlyDragging = $(this);
        }
    });
    $('.allDroppableTarget .dropTarget').droppable({
        drop: function (event, ui) {
                if (!$(this).html() && $(this).attr('data-id').indexOf(currentlyDragging.attr('data_id')) > -1) {
                $(currentlyDragging).addClass('hidden');
                $(this).append($(currentlyDragging).find('img'));
                $(this).attr('selected-data-id', currentlyDragging.attr('data_id'));
                checkMoleculeCompleted();
            }
        }
    })

    function checkMoleculeCompleted() {

        var atomLength = $('#' + selectedMolecule + 'Canvas .structuredAtom .allDroppableTarget').find('.dropTarget').length;
        var count = 0;
        $('#' + selectedMolecule + 'Canvas .structuredAtom .allDroppableTarget .dropTarget').each(function () {
            if ($(this).find('img').length == 1) {
                $('.dropTarget .atoms').parent().css({
                    '-webkit-box-shadow': '0 0 13px rgba(132,131,131,.6)',
                    'box-shadow': '0 0 13px rgba(132,131,131,.6)'
                });
                count = count + 1;
                if (count == atomLength) {
                    $('#correctMessage').addClass('visible');
                    var showMessageFlag = true;
                    $('#' + selectedMolecule + ' #checkImg').addClass('visible');
					if($('#' + selectedMolecule + ' #checkImg').hasClass('visible')){
					$('#dvSource li').draggable( 'disable' );
						$('#dvSource li').css('pointer-events','none');
						if($( '.visible').length==22){  OpenPopUps("#completed");}
					}
                }
            }
        });
    }
};