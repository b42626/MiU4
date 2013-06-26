// Matt Nowakowski
// MIU
// term 1306
// project 3


var parseMediaForm = function(data)
	{
		
		console.log(data);
	}
	
	$(document).ready(function()
	{
		var mediaForm = $("#mediaForm");
		mediaForm.validate(
		{
		
			invalidHandler: function(form, validator)
			{
				
				
			},
			submitHandler: function()
			{
				
				var data = mediaForm.serializeArray();
			
				parseMediaForm(data);
			}
		})
	});
	

window.addEventListener("DOMContentLoaded", function()
{
	
	function dia(x)
	{
		var theElement = document.getElementById(x);
		return theElement;
	}
	
	
	function makeMediaTypes() 
	{
		
		var formTag = document.getElementsByTagName("form"),
			selectLi = dia("mtype"),
			makeSelect = document.createElement("select");
			makeSelect.setAttribute("class", "required");
			makeSelect.setAttribute("id", "mtype");
			makeSelect.setAttribute("name", "mtype");
			makeSelect.setAttribute("data-native-menu", "false");
	
		for(var i=0, j=mediaGroups.length; i<j; i++) 
		{
			
			var makeOption = document.createElement("option");
			var optText = mediaGroups[i];
			makeOption.setAttribute("value", optText);
			
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		}
		selectLi.appendChild(makeSelect);
	}
	
	
	function getSelectedRadio()
	{
		
		var radios = document.forms[0].mtopics;
		for(var i=0; i<radios.length; i++)
		{
			if(radios[i].checked)
			{
				mtopicsValue = radios[i].value;
			}
		}
	}
	
	
	
	function toggleControls(n)
	{
		
	}
	
	function saveMedia(key)
	{
		
		if(!key)
		{
			
			var id = Math.floor(Math.random()*10000001);
		}
		
		
		else if(key === "A-Z" || "a-z")
		{
			
			localStorage.removeItem(this.key);
		}
		else
		{
			
			id = key;
		}
			
			getSelectedRadio();
			
			
			var item 			= {};
				item.mtype 		= ["Media Type:",dia("mtype").value];
				item.mgraphic   = ["Image:",dia("mgraphic").value];
				item.mname 		= ["Media Name:",dia("mname").value];
				item.mdate  	= ["Media Date:",dia("mdate").value];
				item.mrating 	= ["Media Rating:",dia("mrating").value];
				
				item.mtopics 	= ["Media format:",mtopicsValue];
				item.mtags		= ["Media Tags:",dia("mtags").value];
				item.mcomments	= ["Comments:",dia("mcomments").value];
			
			localStorage.setItem(id, JSON.stringify(item));
			alert("Media Saved");
	}
	
	
	function autoFillData()
	{
		
		for(var n in json)
		{
			var id = Math.floor(Math.random()*10000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
	}
	
	function getData()
	{
		
		toggleControls("on");
		
		if(localStorage.length === 0)
		{
			alert("No Media in local Storage. Test Data was Added.");
			
			autoFillData();
		}
		

		
		
		var makeDiv = document.createElement("div");
		makeDiv.setAttribute("id","items");
		makeDiv.setAttribute("data-role", "content");
		makeDiv.setAttribute("data-theme", "d");
		
		var makeDivPrimary = document.createElement("div");
		makeDivPrimary.setAttribute("class", "content-primary");

		var makeList = document.createElement("ul");
		makeList.setAttribute("id", "one");
		makeList.setAttribute("data-role", "listview");
		makeList.setAttribute("data-filter", "true");
		makeList.setAttribute("data-inset", "true");
		
		
		makeDiv.appendChild(makeDivPrimary);
		makeDivPrimary.appendChild(makeList);
		document.body.appendChild(makeDiv);
		dia("items").style.display = "black";
			
		for(var i=0, len=localStorage.length; i<len; i++)
		{
			var makeli = document.createElement("li");
			makeli.setAttribute("id", "two");
			
			var linksLi = document.createElement("div");
			linksLi.setAttribute("id", "three");
			
			makeList.appendChild(makeli);
			
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			
			var obj = JSON.parse(value);
			var makeSubList = document.createElement("a");
			makeSubList.setAttribute("href", "#");
			makeSubList.setAttribute("id", "four");

			makeli.appendChild(makeSubList);
			
			
			getProjectGraphic(obj.mgraphic[1], makeSubList);
			
			
			var makeSubli = document.createElement("p");
			makeSubli.setAttribute("id", "five");
			makeSubList.appendChild(makeSubli);
				
			for(var n in obj)
			{
				
				var optSubText = obj[n][1];
				makeSubli.innerHTML = optSubText;
				makeSubli.appendChild(linksLi);
			}
			
			makeItemLinks(localStorage.key(i), linksLi);
		}
	}
	
	
	function getImage(mediaType, makeSubList)
	{
		var imageLi = document.createElement("div");
		imageLi.setAttribute("align", "left");		
		makeSubList.appendChild(imageLi);
		var newImg = document.createElement("img");
		var setSrc = newImg.setAttribute("src", "images/" + mediaType + ".jpg");
		var alignImg = newImg.setAttribute("class", "projectIconAlign");
		imageLi.appendChild(newImg);
	}
	
	
	
	function getProjectGraphic(mediaName, makeSubList)
	{
		var projectGraphicLi = document.createElement("div");
		makeSubList.appendChild(projectGraphicLi);
		var newImg = document.createElement("img");
		var setSrc = newImg.setAttribute("src", mediaName);
		var alignImg = newImg.setAttribute("class", "projectScreenshotAlign");
		var setWidth = newImg.setAttribute("width", "75px");
		var setHeight = newImg.setAttribute("height", "75px");
		projectGraphicLi.appendChild(newImg);
	}
	
	
	function makeItemLinks(key, linksLi)
	{
		
		var breakTag = document.createElement("br");
		
		
		var editLink = document.createElement("a");
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Media";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;	
		linksLi.appendChild(editLink);
		
		
		linksLi.appendChild(breakTag);
		
		
		var deleteLink = document.createElement("a");
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Media";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
	}
	
	
	function editItem()
	{
		
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
		
		dia("mtype").value = item.mtype[1];
		dia("mgraphic").value = item.mgraphic[1];
		dia("mname").value = item.mname[1];
		dia("mdate").value = item.mdate[1];
		dia("mrating").value = item.mrating[1];
		var radios = document.forms[0].mtopics;
		for(var i=0; i<radios.length; i++)
		{
			if(radios(i).value === "cd" && item.mtopics(1) === "cd")
			{
				radios(i).setAttribute("checked", "checked");
			}else if(radios(i).value === "bluray" && item.mtopics(1) === "bluray")
			{
				radios(i).setAttribute("checked", "checked");
			}else if(radios(i).value === "dvd" && item.mtopics(1) === "dvd")
			{
				radios(i).setAttribute("checked", "checked");
			}
		}
	
		dia("mtags").value = item.mtags[1];
		dia("mcomments").value = item.mcomments[1];
		
		
		save.removeEventListener("click", saveMedia);
		
		
		dia("submit").value = "Edit Media";
		var editSubmit = dia("submit");
		
		
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;
	}
	
	function deleteItem()
	{
		var ask = confirm("You really want to Delete this Media?");
		if(ask)
		{
			localStorage.removeItem(this.key);
			alert("Media was Deleted");
			window.location.reload();
		}
		else
		{
			alert("Media was Not Deleted");
		}
	}
	
	function clearLocal()
	{
		if(localStorage.length === 0)
		{
			alert("No Media in local storage to Delete.");
		}
		else
		{
			localStorage.clear();
			alert("All Media Deleted from local storage.");
			window.location.reload();
			return false;
			
		}
	}
	
	
	function validate(e)
	{
		
		var getMtype = dia("mtype");
		var getMname = dia("mname");
		var getMdate = dia("mdate");
		
		
		errMsg.innerHTML = "";
			getMtype.style.border = "1px solid yellow";
			getMname.style.border = "1px solid yellow";
			getMdate.style.border = "1px solid yellow";
		
		
		var messageAry = [];
		
		
		if(getMtype.value === "-- Choose Media Type--")
		{
			var MtypeError = "Choose Media Type";
			getMtype.style.border = "1px solid yellow";
			messageAry.push(MtypeError);
		}
		
		
		if(getMname.value === "")
		{
			var MnameError = "Enter Media Name";
			getMname.style.border = "1px solid yellow";
			messageAry.push(MnameError);
		}
		
		
		if(getMdate.value === "")
		{
			var MdateError = "Enter Media Date";
			getMdate.style.border = "1px solid yellow";
			messageAry.push(MdateError);
		}
		
		
		if(messageAry.length >= 1)
		{
			for(var i=0, j=messageAry.length; i<j; i++)
			{
				var txt = document.createElement("li");
				txt.innerHTML = messageAry(i);
				errMsg.appendChild(txt);
			}
			e.preventDefault();
			return false;
		}else{
			
			saveMedia(this.key);
		}
	}
	
	
	
	var mediaGroups = ["-- Choose Media Type--", "Xbox", "Playstation", "Wii u", "Music", "PC", "Movie"],
		mtopicValue,
		errMsg = dia("errors");
		
	makeMediaTypes();
	
	var displayLink = dia("displayLink");
	displayLink.addEventListener("click", getData);
	
	var clearLink = dia("clear");
	clearLink.addEventListener("click", clearLocal);
	
	var displayXboxLink = dia("displayXboxLink");
	displayXboxLink.addEventListener("click", getData);
	
	var displayPlaystationLink = dia("displayPlaystationLink");
	displayPlaystationLink.addEventListener("click", getData);
	
	var displayMusicLink = dia("displayMusicLink");
	displayMusicLink.addEventListener("click", getData);

	var displayWiiuLink = dia("displayWiiuLink");
	displayWiiuLink.addEventListener("click", getData);

	var displayPcLink = dia("displayPcLink");
	displayPcLink.addEventListener("click", getData);

	var displayMovieLink = dia("displayMovieLink");
	displayMovieLink.addEventListener("click", getData);
	
	var save = dia("submit");
	
	save.addEventListener("click", saveMedia);
	
	
});