/* index.js
This file contains code to fill tedious tables so that index.html isn't unreadably long
It also does some config things to make developing for other colleges easier

I use anon functions so they don't stick around in namespace
*/

//config.js stuff
document.title = app_config.siteTitle;
document.getElementById("cors").innerHTML = 'Hi, and welcome to ' + app_config.siteTitleShort + '! This is a tool for creating, editing, testing, and sharing schedules for ' + app_config.collegeName + '.<br>' +
      '<br>' +
      'It appears you\'re having some network issues. Please <b>reload the page</b>.<br>' +
      '<br>If you\'re a developer seeing this message, you may need to use a cors-everywhere extension to get incoming requests working while not on sitscheduler.com.';

// thead - fill with days of the week
// see comment in index.html within <td id="schedThead">
(function(){
    var thead = document.getElementById("schedThead");
    var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    for(var i=0; i<days.length; ++i){
	var day = days[i];
	var td = document.createElement("td");
	td.innerText = day;
	thead.appendChild(td);
    }
})();

// tbody - fill with lots of stuff
// see commend in <tbody id="schedTbody">
(function(){
    var tbody = document.getElementById("schedTbody");
    var hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    var days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    var tr_template = document.createElement("tr"); // CSS says Saturday & Sunday are hidden
    var td0 = document.createElement("td");
    td0.className = "time";
    //td0.innerText = ((hour - 1) % 12 + 1) + ':00'; - set later
    tr_template.appendChild(td0);

    var td_template = document.createElement("td");
    td_template.className = "block";
    var div0 = document.createElement("div");
    div0.className = "wrapper";
    var div00 = document.createElement("div");
    div00.className = "wrapperInternal";
    //div00.data-hour = hour, div00.data-day = day - set later
    div0.appendChild(div00);
    div0.appendChild(document.createElement("div"));
    div0.appendChild(document.createElement("div"));
    td_template.appendChild(div0);
    
    for(var i=0; i<hours.length; ++i){
	var hour = hours[i];
	var tr = tr_template.cloneNode(true);
	tr.firstChild.innerText = ((hour - 1) % 12 + 1) + ':00';
	for(var j=0; j<days.length; ++j){
	    var day = days[j];
	    var td = td_template.cloneNode(true);
	    td.firstChild.firstChild.setAttribute("data-hour", hour);
	    td.firstChild.firstChild.setAttribute("data-day", day);
	    tr.appendChild(td);
	}
	tbody.appendChild(tr);
    }
})();

// Hide Saturday and Sunday - will be shown on request
(function(){
    var ths = document.getElementById("schedThead").children;
    ths[6].style.display = "none";
    ths[7].style.display = "none";
    var trs = document.getElementById("schedTbody").children;
    for(var i=0; i<trs.length; ++i){
	trs[i].children[6].style.display = "none";
	trs[i].children[7].style.display = "none";
    }
})();
