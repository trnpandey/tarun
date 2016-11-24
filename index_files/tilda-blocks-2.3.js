 
function t142_checkSize(recid){
  var el=$("#rec"+recid).find(".t142__submit");
  if(el.length){
    var btnheight = el.height() + 5;
    var textheight = el[0].scrollHeight;
    if (btnheight < textheight) {
      var btntext = el.text();
      el.addClass("t142__submit-overflowed");
      el.html("<span class=\"t142__text\">" + btntext + "</span>");
    }
  }
} 
    var t385 = {};
    
    t385.equalheight = function(recid) {

        var currentTallest = 0,
            currentRowStart = 0,
            rowDivs = new Array(),
            $el,
            topPosition = 0;
            
        $('#rec'+recid+' .t385__textwrapper').each(function() {
     
            $el = $(this);
            $($el).height('auto')
            topPostion = $el.position().top;
       
            if (currentRowStart != topPostion) {
                for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
                    rowDivs[currentDiv].height(currentTallest);
                }
                rowDivs.length = 0;
                currentRowStart = topPostion;
                currentTallest = $el.height();
                rowDivs.push($el);
            } else {
                rowDivs.push($el);
                currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
            }
            for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
                rowDivs[currentDiv].height(currentTallest);
            }
        });
    };
 
function t412_unifyHeights(recid) {
    $('#rec'+recid+' .t412 .t-container').each(function() {
        var highestBox2 = 0;
        $('.t412__descr', this).each(function(){
            if($(this).height() > highestBox2)highestBox2 = $(this).height(); 
        });  
        if($(window).width()>=960 && $(this).is(':visible')){
        	$('.t412__descr',this).css('height', highestBox2); 
        }else{
	        $('.t412__descr',this).css('height', "auto");    
        }
    });
    $('#rec'+recid+' .t412 .t-container').each(function() {
        var highestBox3 = 0;
        $('.t412__title', this).each(function(){
            if($(this).height() > highestBox3)highestBox3 = $(this).height(); 
        });  
        if($(window).width()>=960 && $(this).is(':visible')){
        	$('.t412__title',this).css('height', highestBox3); 
        }else{
	        $('.t412__title',this).css('height', "auto");    
        }
    });
    $('#rec'+recid+' .t412 .t-container').each(function() {
        var highestBox = 0;
        $('.t412__wrapper', this).each(function(){
            if($(this).height() > highestBox)highestBox = $(this).height();
        });  
        if($(window).width()>=960 && $(this).is(':visible')){
        	$('.t412__wrapper',this).css('height', highestBox); 
        }else{
	        $('.t412__wrapper',this).css('height', "auto");    
        }
    });
} 
t431_createTable = function(recid,tablehead,tabledata,tablecolsize,hastargetblank,btnstyles,t431__tdstyles,t431__thstyles,t431__oddrowstyles,t431__evenrowstyles){
	var t431__arrayColSize = t431_parseData(tablecolsize);
	var t431__arrayHead = t431_parseData(tablehead);
    var t431__arrayData = t431_parseData(tabledata);

	var t431__maxcolnumber = t431__findMaxRowLengthInTable(t431__arrayHead,t431__arrayData);
	var t431__colWidth = t431__setColumnsWidth(t431__arrayColSize,t431__maxcolnumber,recid);
	if (t431__colWidth[0].myText && t431__colWidth[0].myText[t431__colWidth[0].myText.length - 1] == "%") {
		for (var i=0; i<t431__colWidth.length; i++) {
			t431__colWidth[i].myText = t431__colWidth[i].myText.slice(0,-1);
			t431__colWidth[i].myText += "vw";
		}
	}

	var t431__container = $('#rec'+recid+' .t431 .t-container .t431__table');
	var t431__htmlTable = "";
	if (t431__arrayHead) { t431__htmlTable += t431__generateHtml(recid,t431__arrayHead,"th",hastargetblank,t431__colWidth,btnstyles,t431__thstyles,null,null,t431__maxcolnumber);}
	t431__container.append(t431__htmlTable);
	t431__htmlTable = "";
	if (t431__arrayData) { t431__htmlTable += t431__generateHtml(recid,t431__arrayData,"td",hastargetblank,t431__colWidth,btnstyles,t431__tdstyles,t431__oddrowstyles,t431__evenrowstyles,t431__maxcolnumber);}
    t431__container.append(t431__htmlTable);
};


/*add display:block to thead and tbody for vertical scroll, set th width to fix unequal col width*/
t431_setHeadWidth = function(recid) {
	if ($(window).width()>960){
        var t431__tbody = $('#rec'+recid+' .t431 .t431__tbody');
        var t431__thead = $('#rec'+recid+' .t431 .t431__thead');
		t431__tbody.css("display","block");
		t431__thead.css("display","block");

		var t431__colWidth = $('#rec'+recid+' .t431 .t431__tbody tr:first').children().map(function() {
            return $(this).width();
        });

		if($('#rec'+recid+' .t431 .t431__tbody tr td:first').css('border-left-width').length>=3) {
			var t431__verticalborder = $('#rec'+recid+' .t431 .t431__tbody tr td:first').css('border-left-width').slice(0,-2);
		}

        $('#rec'+recid+' .t431 .t431__thead tr').children().each(function(i, v) {
            if ($(v).is(":last-child")) {
                $(v).width(t431__colWidth[i] + (t431__tbody.width() - $('#rec'+recid+' .t431 .t431__tbody tr:first').width()));
            } else {
                $(v).width(t431__colWidth[i] + (+t431__verticalborder));
            }
        });
	}
};


t431__findMaxRowLengthInTable = function(arrayhead, arraydata) {
	var t431__headmaxlength = 0;
	var t431__datamaxlength = 0;
	if (arrayhead) {
		t431__headmaxlength = t431__findMaxRowLengInArray(arrayhead);
	}
	if (arraydata) {
		t431__datamaxlength = t431__findMaxRowLengInArray(arraydata);
	}
	if (t431__datamaxlength>t431__headmaxlength) {
		return t431__datamaxlength;
	} else {
		return t431__headmaxlength;
	}
};


t431__findMaxRowLengInArray = function(curarray) {
	var t431__maxlength = 0;
	for (var i=0; i<curarray.length; i++) {
		if (curarray[i].length>t431__maxlength) {
			t431__maxlength = curarray[i].length;
		}
	}
	return t431__maxlength;
};


t431__setColumnsWidth = function(t431__colwidth,t431__colsnumber,recid) {
		if (t431__colwidth) {
			return t431__colwidth[0];
		}	else {
			var t431__tablewidth = $('#rec'+recid+' .t431 .t-container .t-col').width();
			return (t431__tablewidth/t431__colsnumber + "px");
		}
};


t431__generateHtml = function(recid,arrayValues,coltag,hastargetblank,colWidth,btnstyles,colstyles,oddrowstyles,evenrowstyles,maxcolnumber) {
	var t431__htmlpart = "";


	if (coltag == "td") {
		var t431__theadorbodytag = "tbody";
	} else {
		var t431__theadorbodytag = "thead";
	}
	t431__htmlpart += "<" + t431__theadorbodytag + " class=\"t431__" + t431__theadorbodytag + "\">";

	//remove forst body row top border, if table head has bottom border
	if($('#rec'+recid+' .t431 .t-container .t431__thead th').length>0 && $('#rec'+recid+' .t431 .t-container .t431__thead th').css("border-bottom-width")[0]!="0") {
		var t431__firstbodyrowstyle = "border-top: 0 !important;";
	}

	for (var i=0; i<arrayValues.length; i++) {

		//add classes for striped table
		if (coltag == "td") {
			if ((i + 1) % 2 > 0) {
				t431__htmlpart += "<tr class=\"t431__oddrow\"" + "style=\"" + oddrowstyles + "\">";
			} else { t431__htmlpart += "<tr class=\"t431__evenrow\"" + "style=\"" + evenrowstyles + "\">";}
		} else {
			t431__htmlpart += "<tr>";
		}

		var t431__addingcols = 0;
		if (arrayValues[i].length<maxcolnumber) {
			t431__addingcols = maxcolnumber - arrayValues[i].length;
        }
		for (var j=0; j<(arrayValues[i].length + t431__addingcols); j++) {
			if (arrayValues[i][j]) {
				//define col width
                if(Array.isArray(colWidth) && colWidth[j]) {
                    var t431__curWidth = colWidth[j].myText;
                } else { var t431__curWidth = colWidth;}

				 if (i==0 && coltag=="td") {
					var t431__colwithattr = "<" + coltag + " class=\"t431__" + coltag + "\" style=\"width:" + t431__curWidth + ";" + colstyles + t431__firstbodyrowstyle + "\">";
				} else {
					var t431__colwithattr = "<" + coltag + " class=\"t431__" + coltag + "\" style=\"width:" + t431__curWidth + ";" + colstyles + "\">";
				}

                if (arrayValues[i][j].myHref) {
                    var t431__tblank = "";
                    if (hastargetblank) {var t431__tblank = "target=\"_blank\"";}
                    //define link type
                    if (arrayValues[i][j].myHrefType == "link") {
                        var t431__linkwithattr = "<a href=\"" + arrayValues[i][j].myHref + "\"" + t431__tblank + ">";
                        var t431__linkclosetag = "</a>";
                    } else {
                        var t431__linkwithattr = "<div class=\"t431__btnwrapper\"><a href=\"" + arrayValues[i][j].myHref + "\"" + t431__tblank + " class=\"t-btn\" style=\"" + btnstyles + "\"><table style=\"width:100%; height:100%;\"><tr><td>";
                        var t431__linkclosetag = "</td></tr></table></a></div>";
                    }
                    t431__htmlpart += t431__colwithattr + t431__linkwithattr + arrayValues[i][j].myText + t431__linkclosetag + "</" + coltag + ">";
                } else {
                    t431__htmlpart += t431__colwithattr + arrayValues[i][j].myText + "</" + coltag + ">";
                }
			} else {
					t431__htmlpart += "<" + coltag + " class=\"t431__" + coltag + "\" style=\"width:" + t431__curWidth + ";" + colstyles + "\">" + "</" + coltag + ">";
			}
		}
		t431__htmlpart += "</tr>";
	}
	t431__htmlpart += "</" + t431__theadorbodytag + ">";
	return t431__htmlpart;
};


t431_parseData = function(t431__data) {
  if (t431__data!="" && typeof t431__data!='undefined')
  {
	t431__data = t431__addBrTag(t431__data);
    var t431__arrayTable = new Array();
    var t431__arrayRow = new Array();
    var t431__curItem = {myText:"", myHref:"", myHrefType:""};
	var t431__HasLink = "";
	var t431__HasLinkWithSpace = "";
    var t431__HasBtn = "";
	var t431__HasBtnWithSpace = "";
	var t431__EndOfLine = "";
    for (var i=0; i<t431__data.length; i++)
    {
	  //col end and check of special symbols: «>», «<» and «&»
      if (t431__data[i] == ";" && !((t431__data[i-1]&&(t431__data[i-1]=="t")) && (t431__data[i-2]&&(t431__data[i-2]=="g" || t431__data[i-2]=="l")) && (t431__data[i-3]&&(t431__data[i-3]=="&"))) && !((t431__data[i-1]&&(t431__data[i-1]=="p")) && (t431__data[i-2]&&(t431__data[i-2]=="m")) && (t431__data[i-3]&&(t431__data[i-3]=="a")) && (t431__data[i-4]&&(t431__data[i-4]=="&")))) {
          t431__arrayRow.push(t431__curItem);
          var t431__curItem = {myText:"", myHref:""};
          t431__HasLink = "";
          t431__HasLinkWithSpace = "";
          t431__HasBtn = "";
          t431__HasBtnWithSpace = "";
      } else {
        if(t431__HasLink == "link=" || t431__HasLinkWithSpace == " link=" || t431__HasBtn == "button=" || t431__HasBtnWithSpace == " button=") {
		  if (t431__curItem.myHref=="" && t431__HasLink == "link=") {
			t431__curItem.myText = t431__curItem.myText.slice(0,-5);
			t431__curItem.myHrefType = "link";
		  } else { if (t431__curItem.myHref=="" && t431__HasLinkWithSpace == " link=") {
			t431__curItem.myText = t431__curItem.myText.slice(0,-6);
            t431__curItem.myHrefType = "link";
		  } else {if (t431__curItem.myHref=="" && t431__HasBtn == "button=") {
			t431__curItem.myText = t431__curItem.myText.slice(0,-7);
			t431__curItem.myHrefType = "btn";
		  } else { if (t431__curItem.myHref=="" && t431__HasBtnWithSpace == " button=") {
			t431__curItem.myText = t431__curItem.myText.slice(0,-8);
			t431__curItem.myHrefType = "btn";
		  }}}}
		  t431__curItem.myHref += (t431__data[i]);
		} else {
		  t431__curItem.myText += (t431__data[i]);
		  t431__HasLink = t431__checkSubstr("link=",t431__HasLink,t431__data[i]);
		  t431__HasLinkWithSpace = t431__checkSubstr(" link=",t431__HasLinkWithSpace,t431__data[i]);
		  t431__HasBtn = t431__checkSubstr("button=",t431__HasBtn,t431__data[i]);
		  t431__HasBtnWithSpace = t431__checkSubstr(" button=",t431__HasBtnWithSpace,t431__data[i]);
		}
		t431__EndOfLine = t431__checkSubstr("<br />",t431__EndOfLine,t431__data[i]);
        if (t431__EndOfLine == "<br />") {
          if (t431__curItem.myHref) {
			t431__curItem.myHref = t431__curItem.myHref.slice(0,-6);
		  } else {
			t431__curItem.myText = t431__curItem.myText.slice(0,-6);
		  }
          t431__arrayRow.push(t431__curItem);
          t431__arrayTable.push(t431__arrayRow);
          var t431__curItem = {myText:"", myHref:""};
		  t431__HasLink = "";
		  t431__HasLinkWithSpace = "";
		  t431__HasBtn = "";
		  t431__HasBtnWithSpace = "";
          t431__arrayRow = new Array();
        }
      }
    }
	if (t431__arrayRow.length > 0 || t431__curItem.myText!="") {
		if (t431__curItem!="") {
			t431__arrayRow.push(t431__curItem);
		}
		t431__arrayTable.push(t431__arrayRow);
	}
  }
  return t431__arrayTable;
};


// checking a step by step combining of t431__targetSubstr
t431__checkSubstr = function(t431__targetSubstr,t431__curSubstr,t431__curSymbol){
	if (!t431__curSubstr && t431__curSymbol == t431__targetSubstr[0]) {
    return t431__curSymbol;
  } else {
    if (t431__curSubstr) {
		for (var i=0; i<(t431__targetSubstr.length-1); i++) {
			if (t431__curSubstr[t431__curSubstr.length - 1] == t431__targetSubstr[i] && t431__curSymbol == t431__targetSubstr[i+1]) {
				return (t431__curSubstr += t431__curSymbol);
            }
        }
    }
  }
};


t431__addBrTag = function(t431__oldStringItem){
	if(typeof t431__oldStringItem=='undefined')return;
	var t431__newStringItem = "";
	for (var i=0; i < t431__oldStringItem.length; i++) {
		if (t431__oldStringItem[i] == "\n" || t431__oldStringItem[i] == "\r") {
			t431__newStringItem += "<br />";
		} else {
			t431__newStringItem += t431__oldStringItem[i];
		}
	}
	return t431__newStringItem;
};
 
function t452_scrollToTop(){
  $('html, body').animate({scrollTop: 0}, 700);								
}	  
function t527_setHeight(recid) {
  var t527__el=$("#rec"+recid),
      t527__image = t527__el.find(".t527__bgimg:first"),
      t527__width = t527__image.attr("data-image-width"),
      t527__height = t527__image.attr("data-image-height"),
      t527__ratio = t527__height/t527__width,
      t527__padding = t527__ratio*100;	  
  $("#rec"+recid+" .t527__bgimg").css("padding-bottom",t527__padding+"%");  
}