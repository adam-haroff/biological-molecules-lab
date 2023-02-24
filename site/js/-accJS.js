var accOn = false;
popupOpen = true;
let selectedMolecule = ''

function setupAccessibility(){
    $(document).unbind('keypress');
    $(document).unbind('keydown');

	$.ui.accordion.prototype._keydown = function( event ) {
 };
    $(document).keyup(function (event) {
        var key = event.which;
		if (key === 9) {
            $(document.activeElement).blur();
        }
        if (key === 65 && $("#first").is(":visible") == true) {
            $('#accDiv').toggle();
            $('#fiveEight').toggleClass('accessOn accessOff');
            $('#infoBtn').toggleClass('accessOn accessOff');
            $('#tutBtn').toggleClass('accessOn accessOff');
            $('#saveBtn').toggleClass('accessOn accessOff');
            $('#formulaBtn').toggleClass('accessOn accessOff');
            $('#videoBtn').toggleClass('accessOn accessOff');
            $('.sideLetter').toggleClass('sideLetterAccessOn sideLetterAccessOff');
            $('#arrw_L').toggleClass('accessOffArrL');
            $('#arrw_R').toggleClass('accessOffArrR');
            $('#accessText').fadeToggle(400);
            $('.accTxt').toggleClass('accTxtOff');
            $('#tutNextBtn').toggleClass('accessNextBtnOn');
            $('#tutPrevBtn').toggleClass('accessPrevBtnOn');
            $('#first .exitBtn').trigger("click");

            accOn = true;
            $('#fiveEight').trigger("click");
            $('.acc').show();
            $('.accContentOn').show();
            $('.accContentOff').hide();
        }

function giveNextActiveIndex(elmArray, currentIndex) {
    let index = 0;
    if (currentIndex || currentIndex === 0) {
        let flag = false;
        for (var i = currentIndex; i <= elmArray.length - 1; i++) {
            if (i > currentIndex && $(elmArray[i]).children().length > 0) {
                index = i;
                flag = true;
                break;
            }
        }
        if (!flag) {
            for (var i = 0; i <= currentIndex + 1; i++) {
                if ($(elmArray[i]).children().length > 0) {
                    index = i;
                    break;
                }
            }
        }

    } else {
        for (var i = 0; i <= elmArray.length - 1; i++) {
            if ($(elmArray[i]).children().length > 0) {
                index = i;
                break;
            }
        }
    }
    return index;
}

function givePrevActiveIndex(elmArray, currentIndex) {
    let index = 0;
    if (currentIndex) {
        let flag = false;
        for (var i = currentIndex - 1; i>=0; --i) {
            if ($(elmArray[i]).children().length > 0) {
                index = i;
                flag = true;
                break;
            }
        }
        if (!flag) {
            for (var i = elmArray.length - 1; i >= 0; --i) {
                if ($(elmArray[i]).children().length > 0) {
                    index = i;
                    break;
                }
            }
        }

    } else {
        for (var i = elmArray.length - 1; i >= 0; --i) {
            if ($(elmArray[i]).children().length > 0) {
                index = i;
                break;
            }
        }
    }
    return index;
	
}
function implementClassSwap(elm, focusedClass, hoverClass) {
  $(elm).find(focusedClass).removeClass(focusedClass);
  $(elm).find(hoverClass).removeClass(hoverClass).addClass(focusedClass);
}
        //IF ACCESSIBILITY IS TURNED ON
        if (accOn === true) {

			
            //HEADER BUTTONS NAVIGATION
            switch (key) {
                case 49: //1
                case 97:
                    if (popupOpen) {
						if ($(currPopup + " .link1") !== null) {
                            $(currPopup + " .link1").trigger("click");
                        } 
                    }
                    break;
                case 50: //2
                case 98:
                    if (popupOpen) {
                        
                    } else {

                    }
                    break;
                case 51: //3
                case 99:
                    if (popupOpen) {
                        
                    } else {
                        
                    }
                    break;
                case 52: //4
                case 100:
                    if (popupOpen) {
                        
                    } else {

                    }
                    break;
                case 53: //5
                case 101:
                    if (popupOpen) {
                        
                    } else {

                    }
                    break;
                case 83:   //S
                    if (popupOpen) {
                        
                    } else {
                        
                    }
                    break;
                case 84:   //T
                     if (popupOpen) {
                    } else {
                        $("#tutBtn").trigger("click");
                    }
                    break; 
                  
                case 73:  //I
                    if (popupOpen) {
                        
                    } else {
                        
                    }
                    break;
                case 86:  //V
                    if (popupOpen) {
                        
                    } else {
                        
                    }
                    break;
                case 70:  //F
                    if (popupOpen) {
                        
                    } else {
                        
                    }
                    break;
                case 32:     // SPACE BAR
                    if (popupOpen) {
                        $(currPopup + " .exitBtn").trigger("click");
                    }
                    break;
            }
            switch (key) {
				case 77:  //M
                    if (!popupOpen) {
                    	$('#sidePanel_m').trigger("click");
						if ( $('#moleculesList').find('.focused').length > 0) {
						  return;
						}
						$('.drag-container.visibleDragContainer').removeClass('active');
                        $('.molecules-block').addClass('activePanel');
                         if ($('#moleculesList').find('.active').length > 0) {
						  if ($('#moleculesList').find('.active').next().length < 1) {
							$("#moleculesList li").first().addClass("focused");
						  } else {
							$('#moleculesList').find('.active').next().addClass('focused');
						  }
						} else {
						  $("#moleculesList li").first().addClass("focused");
						}
					}
                    break;
                case 80:  //P
                    if ($('#sidePanel_procedure').is(':visible') && !popupOpen) {
                      $('#sidePanel_procedure').trigger("click");  
                    } 
                    break;
                case 37:  //LEFT ARROW
                    if (popupOpen) {
                        if ($(currPopup + " .arrowL_P") !== null) {
                            $(currPopup + " .arrowL_P").trigger("click");
                        }

                    } else {($('#arrw_L').trigger("click"));
                       // $('#arrw_L').trigger("click");               
                   
					
						/*const mainContainer = $(".footer .drag-container.visibleDragContainer");
						 if (($(".molecules-block").hasClass("activePanel") && $(".molecules-block").find(".focused").length > 0) || $(".rightPanel").hasClass("disabled") || $("#sidePanel_procedure").hasClass("ui-state-active") || $('.rightPanel').find('.enabled').length < 1) {
					          return;
							 }
						let index, currentIndex = 0;
                        const firstUl = $(mainContainer).find('ul:nth-child(1)');
                        if ($(mainContainer).find('.focused').length > 0) {

                           
                            if ($(mainContainer).find('.focused').prev().length < 1) {
                                index = givePrevActiveIndex($(firstUl).find('li')) + 1;
                                $(firstUl).find('li:nth-child('+ index +')').addClass('focusedHover');

                            } else {
							    const indexElms = $(mainContainer).find('.focused').parent().children();
                                currentIndex = $(mainContainer).find('.focused').index();
                                index = givePrevActiveIndex(indexElms, currentIndex) + 1;
                                $(mainContainer).find('.focused').parent().find('li:nth-child('+ index +')').addClass('focusedHover');
                      
                            }
							$(mainContainer).find('.focused').removeClass('focused');
                            $(mainContainer).find('.focusedHover').removeClass('focusedHover').addClass('focused');
                        }*/
						
					}
                    break;
                case 39:  //RIGHT ARROW
                    if (popupOpen) {
                        if ($(currPopup + " .arrowR_P") !== null) {
                            $(currPopup + " .arrowR_P").trigger("click");
                        }
                    } else{ (
                        $('#arrw_R').trigger("click"));                  
                   
					
						/*if (($('.molecules-block').hasClass('activePanel') && $('.molecules-block').find('.focused').length > 0) && $(".rightPanel").hasClass("disabled") || $("#sidePanel_procedure").hasClass("ui-state-active") || $('.rightPanel').find('.enabled').length < 1) {
                                return;
                            }
                        let index, currentIndex = 0;
                        const mainContainer = $('.footer .drag-container.visibleDragContainer');
                        const firstUl = $(mainContainer).find('ul:nth-child(1)');
                        if ($(mainContainer).find('.focused').length < 1) {
                           // index = giveNextActiveIndex($(firstUl).find('li')) + 1;
                           // $(firstUl).find('li:nth-child('+ index +')').addClass('focused');
                            return;
                        } else {
                            if ($(mainContainer).find('.focused').next().length < 1) {
                                index = giveNextActiveIndex($(firstUl).find('li')) + 1;
                                $(firstUl).find('li:nth-child('+ index +')').addClass('focusedHover');
                                
                            } else {
                                const indexElms = $(mainContainer).find('.focused').parent().children();
                                currentIndex = $(mainContainer).find('.focused').index();
                                index = giveNextActiveIndex(indexElms, currentIndex) + 1;
                                $(mainContainer).find('.focused').parent().find('li:nth-child('+ index +')').addClass('focusedHover');
                            }
                            $(mainContainer).find('.focused').removeClass('focused');
                            $(mainContainer).find('.focusedHover').removeClass('focusedHover').addClass('focused');
                            return;
                        
						}*/
					}
                    break;
			   case 66: //B - Bonds selection
                        if (!popupOpen) {
							if ($(".molecules-block").find(".focused").length > 0 || $('.rightPanel').find('.enabled').length > 0 || $('#sidePanel_procedure').hasClass('ui-state-active')) {
							  return;
							}
							$('.drag-container.visibleDragContainer').removeClass('active');
							if ($('.rightPanel').find('.chooseAgain').length > 0 || $('.rightPanel').find('.rightsideBtnHover').length > 0) {
							  return;
							}
							$("#bondPanel").removeClass("disabled");
							$(".rightsideBtn").first().addClass("rightsideBtnHover");
				  }
				  break;
			  case 38:  //UP ARROW
                    if (!popupOpen) {
							if ($(".rightPanel").find(".rightsideBtnHover").length < 1 && $(".rightPanel").find(".enabled").length < 1) {
							  	$("#acc_uparrow").trigger("click");
							}
							if ($("#moleculesList").find(".focused").length < 1 && $(".rightPanel").find(".enabled").length < 1) {
							  if ($('.rightPanel').find('.rightsideBtnHover').length < 1) {
								return;
							  }
							  if ($(".rightsideBtnHover").prev().length < 1) {
								$(".rightsideBtnHover").removeClass('rightsideBtnHover');
								$(".rightsideBtn").last().addClass("rightsideBtnHoverPrev");
							  } else {
								$(".rightsideBtnHover").prev().addClass("rightsideBtnHoverPrev");
							  }
							  $("div").remove("#overlay");
							  if ($(".rightsideBtnHoverPrev").next().length < 1) {
								$(".rightsideBtn").first().removeClass("rightsideBtnHover").removeClass("chooseAgain");
							  } else {
								$(".rightsideBtnHoverPrev").next().removeClass("rightsideBtnHover").removeClass("chooseAgain");
							  }
							  $(".rightsideBtnHoverPrev").addClass("rightsideBtnHover");
							  $(".rightsideBtnHoverPrev").removeClass("rightsideBtnHoverPrev");
							}

							// Molecule Section Starts
							if ($(".rightPanel").find(".rightsideBtnHover").length > 0 || ($(".rightPanel").find(".enabled").length > 0 && $('#moleculesList').find('.focused').length < 1) || ($("#moleculesList").find(".focused").length < 1 && $("#moleculesList").find(".active").length < 1)) {
							  return;
							}
							let selector = "";
							if ($("#moleculesList").find(".focused").length > 0) {
							  selector = $("#moleculesList").find(".focused");
							} else {
							  selector = $("#moleculesList").find(".active");
							}
							if ($(selector).length < 1) {
							  $("#moleculesList li:first-child").addClass("activeHover");
							} else {
							  if ($(selector).prev().length < 1) {
								$("#moleculesList li:last-child").addClass("activeHover");
							  } else {
								$(selector).prev().addClass("activeHover");
							  }
							}
							$("#moleculesList").find(".focused").removeClass("focused");
							$("#moleculesList").find(".activeHover").removeClass("activeHover").addClass("focused");
							return;
							// Molecule Section Ends
						  }
                    break;
           case 40:  //DOWN ARROW
                        event.preventDefault();
						  if (!popupOpen) {
		
							if ($("#moleculesList").find(".focused").length < 1 && $(".rightPanel").find(".enabled").length < 1) {
								 if ($('.rightPanel').find('.rightsideBtnHover').length < 1) {
								   return;
								  }
							 if ($(".rightsideBtnHover").next().length < 1) {
							   $(".rightsideBtnHover").removeClass('rightsideBtnHover');
								$(".rightsideBtn").first().addClass("rightsideBtnHoverNxt");
							  } else {
								
							  $(".rightsideBtnHover").next().addClass("rightsideBtnHoverNxt");}
							  $("div").remove("#overlay");
							  if ($(".rightsideBtnHoverNxt").prev().length < 1) {
								  $(".rightsideBtn").last().removeClass("rightsideBtnHover").removeClass("chooseAgain");
								  } else {
									$(".rightsideBtnHoverNxt").prev().removeClass("rightsideBtnHover").removeClass("chooseAgain");

					              }
									
							  $(".rightsideBtnHoverNxt").addClass("rightsideBtnHover");
							  $(".rightsideBtnHoverNxt").removeClass("rightsideBtnHoverNxt");
							}
				
							// Molecule Section Starts
							if ($(".rightPanel").find(".rightsideBtnHover").length > 0 || ($(".rightPanel").find(".enabled").length > 0 && $('#moleculesList').find('.focused').length < 1) || ($("#moleculesList").find('.focused').length < 1 && $("#moleculesList").find('.active').length < 1)) {
							  return;
							}
							let selector = "";
							if ($("#moleculesList").find(".focused").length > 0) {
							  selector = $("#moleculesList").find(".focused");
							} else {
							  selector = $("#moleculesList").find(".active");
							}
							if ($(selector).length < 1) {
							  $("#moleculesList li:first-child").addClass("activeHover");
							} else {
							  if ($(selector).next().length < 1) {
								$("#moleculesList li:first-child").addClass("activeHover");
							  } else {
								$(selector).next().addClass("activeHover");
							  }
							}
							$("#moleculesList").find(".focused").removeClass("focused");
							$("#moleculesList").find(".activeHover").removeClass("activeHover").addClass("focused");
							return;
							// Molecule Section Ends
						  }
                    break;
				case 13: //Enter
                        if (!popupOpen) {
							if ($("#moleculesList").find(".focused").length < 1 && $(".rightPanel").find(".rightsideBtnHover").length > 0 && $(".rightPanel").find(".enabled").length < 1)
							 {
								  $(".rightPanel").removeClass("disabled");
								  $(".rightsideBtnHover").trigger("click");
							}
							if ($("#moleculesList").find(".focused").length > 0) {
								selectedMolecule = $("#moleculesList").find(".focused").attr('id');
							 	 // To Check bottom bar status Start
								  const idAttr = $("#moleculesList").find(".focused").attr("id");
								  $("#moleculesList").find(".focused a").trigger("click");
								  const canvasDiv = $("#main-container").find("#" + idAttr + "Canvas");
							if ($(canvasDiv).hasClass("visible")) {
								  const selectedDataIds = [];
								  $(canvasDiv).find(".dropTarget").each((i, span) => {
											if ($(span).attr("selected-data-id")) {
											   selectedDataIds.push($(span).attr("selected-data-id"));
											}
							});
								  $(".footer .visibleDragContainer ul li").each((i, li) => {
									if (selectedDataIds.indexOf($(li).attr("data_id")) > -1) {
											$(li).html("").addClass("dragged");
										  }
								});
							  }
							  // To Check bottom bar status End
							  const idToMatch = $("#moleculesList").find(".focused").attr("id");
							  //To maintain right panel Status Start
							  if ($(".rightPanel .enabled").length > 0) {
									if ($(".rightPanel .enabled").attr("data_id") !== idToMatch && $(".rightPanel .enabled").attr("data_extra_id") !== idToMatch) {
								    $(".rightPanel .enabled").removeClass("enabled");
								}
							  }
							  //To maintain right panel Status end To Maintain Left panel Status Start
							  if ($(".molecules-block").hasClass("activePanel")) {
								  $(".molecules-block").removeClass("activePanel");
							  }
							  $("#moleculesList").find(".active").removeClass("active");
							  $("#moleculesList").find(".focused").removeClass("focused").addClass("active");
							  // To Maintain Left panel Status End
							}
							if ($(".footer .drag-container.visibleDragContainer").find(".focused").length > 0 && $(".footer .drag-container.visibleDragContainer").find(".focused").html()) {
							  const currentElm = $(".footer .drag-container.visibleDragContainer").find(".focused");
							  const atom = $("#main-container").find(".MoleculeCanvas.visible");
							  if (atom.length > 0) {
								const flag = false;
								let counter = 0;
								const spans = $(atom).find(".allDroppableTarget .dropTarget");
								$(spans).each((index, sp) => {
								  if ($(sp).attr("data-id").indexOf($(currentElm).attr("data_id")) > -1 && $(sp).children().length < 1) {
									$(sp).attr("selected-data-id", $(currentElm).attr("data_id"));
									$(sp).html($(currentElm).html()).addClass("filled");
									$(currentElm).html("").addClass("dragged");
									return false;
								  }
								});
								$(spans).each((index, span) => {
									if ($(span).attr("selected-data-id")) {
										counter ++;
									  }
								});
								if (counter === $(spans).length) {
						  			$('#correctMessage').addClass('visible');
						  			//console.log('demo', '#' + $(atom).attr('data-class'));
									 //$('#' + $(atom).find('.structuredAtom').attr('data-class')).find('#checkImg').addClass('visible');
									 $('#' + selectedMolecule + ' #checkImg').addClass('visible');
									 if($( '.visible').length==22){  OpenPopUps("#completed");}
										 
		 						 }
								
						 	 }
							}
							return;
					 	 }
				break;

				case 9: //tab to select molecule buttons (rightpanel)
					if(!popupOpen){
						  /*if (event.shiftKey) {
                            if ($('.molecules-block').hasClass('activePanel')) {
                                if ($('#moleculesList').find('.focused').prev().length < 1) {
                                    $('#moleculesList li:last-child').addClass('activeHover');
                                } else {
                                    $('#moleculesList').find('.focused').prev().addClass('activeHover');
                                }
                                $('#moleculesList').find('.focused').removeClass('focused');
                                $('#moleculesList').find('.activeHover').removeClass('activeHover').addClass('focused');
                                return;
                            }
                        }
                        if ($('.molecules-block').hasClass('activePanel')) {
                            if ($('#moleculesList').find('.focused').next().length < 1) {
                                $('#moleculesList li:first-child').addClass('activeHover');
                            } else {
                                $('#moleculesList').find('.focused').next().addClass('activeHover');
                            }
                            $('#moleculesList').find('.focused').removeClass('focused');
                            $('#moleculesList').find('.activeHover').removeClass('activeHover').addClass('focused');
                            return;
                        }*/

					}
					break;
				case 65:// 	A - //select Atoms
					if (!popupOpen) {
						const mainContainer = $(".footer .drag-container.visibleDragContainer");
						if (($(".molecules-block").hasClass("activePanel") && $(".molecules-block").find(".focused").length > 0) || $(".rightPanel").hasClass("disabled") || $('.rightPanel').find('.enabled').length < 1)  {
						  return;
						}
						$(mainContainer).addClass('active');
						const firstUl = $(mainContainer).find("ul:nth-child(1)");
						if ($(mainContainer).find(".focused").length < 1) {
						  	index = giveNextActiveIndex($(firstUl).find("li")) + 1;
						  	$(firstUl).find("li:nth-child(" + index + ")").addClass("focused");
						 	return;
						}
					  }
				  break;
					
				case 188: //< - select atoms //backward
					if(!popupOpen){
						 const mainContainer = $(".footer .drag-container.visibleDragContainer");
						 if (($(".molecules-block").hasClass("activePanel") && $(".molecules-block").find(".focused").length > 0) || $(".rightPanel").hasClass("disabled") || $("#sidePanel_procedure").hasClass("ui-state-active") || $('.rightPanel').find('.enabled').length < 1) {
					          return;
							 }
						let index, currentIndex = 0;
                        const firstUl = $(mainContainer).find('ul:nth-child(1)');
                        if ($(mainContainer).find('.focused').length > 0) {

                           
                            if ($(mainContainer).find('.focused').prev().length < 1) {
                                index = givePrevActiveIndex($(firstUl).find('li')) + 1;
                                $(firstUl).find('li:nth-child('+ index +')').addClass('focusedHover');

                            } else {
							    const indexElms = $(mainContainer).find('.focused').parent().children();
                                currentIndex = $(mainContainer).find('.focused').index();
                                index = givePrevActiveIndex(indexElms, currentIndex) + 1;
                                $(mainContainer).find('.focused').parent().find('li:nth-child('+ index +')').addClass('focusedHover');
                      
                            }
							 if($('#correctMessage').hasClass('visible') && $('#' + selectedMolecule + ' #checkImg').hasClass('visible')){
										 if ($(mainContainer).find(".focused")) {
											
											$(mainContainer).removeClass("focused");
											return;
										}
									 }
							$(mainContainer).find('.focused').removeClass('focused');
                            $(mainContainer).find('.focusedHover').removeClass('focusedHover').addClass('focused');
                        }
					}
				break;
				case 190: // > - select atoms // forward
				if(!popupOpen){
					 if (($('.molecules-block').hasClass('activePanel') && $('.molecules-block').find('.focused').length > 0) && $(".rightPanel").hasClass("disabled") || $("#sidePanel_procedure").hasClass("ui-state-active") || $('.rightPanel').find('.enabled').length < 1) {
                                return;
                            }
                        let index, currentIndex = 0;
                        const mainContainer = $('.footer .drag-container.visibleDragContainer');
                        const firstUl = $(mainContainer).find('ul:nth-child(1)');
                        if ($(mainContainer).find('.focused').length < 1) {
                           // index = giveNextActiveIndex($(firstUl).find('li')) + 1;
                           // $(firstUl).find('li:nth-child('+ index +')').addClass('focused');
                            return;
                        } else {
                            if ($(mainContainer).find('.focused').next().length < 1) {
                                index = giveNextActiveIndex($(firstUl).find('li')) + 1;
                                $(firstUl).find('li:nth-child('+ index +')').addClass('focusedHover');
                                
                            } else {
                                const indexElms = $(mainContainer).find('.focused').parent().children();
                                currentIndex = $(mainContainer).find('.focused').index();
                                index = giveNextActiveIndex(indexElms, currentIndex) + 1;
                                $(mainContainer).find('.focused').parent().find('li:nth-child('+ index +')').addClass('focusedHover');
                            }
							 if($('#correctMessage').hasClass('visible') && $('#' + selectedMolecule + ' #checkImg').hasClass('visible')){
										 if ($(mainContainer).find(".focused")) {
											
											$(mainContainer).removeClass("focused");
											return;
										}
									 }
                            $(mainContainer).find('.focused').removeClass('focused');
                            $(mainContainer).find('.focusedHover').removeClass('focusedHover').addClass('focused');
                            return;
                        }
					
					}
				break;
                

            }   //END OF SWITCH STATEMENT
        }
    });
}