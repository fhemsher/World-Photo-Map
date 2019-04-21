var LoadedMapArray =[] //---hide edit send div---
//---'send' button---
var AddArrowDefs
var SendMapId
function sendMap()
{
     var cw = addElemMapCw




    var email = cw.yourMapEmailValue.value
    var title = cw.yourMapTitleValue.value
    var plantName = cw.addPlantNameValue.value
    if(plantName=="")
        plantName = "Not Known...Please Help (Contact my Email)"

        var comment = cw.yourMapCommentValue.value
        setCookie("email", email, 720)
        var saveMap = domElemG.cloneNode(true)
        var year=cw.yearSelect.options[cw.yearSelect.selectedIndex].text
        var month=cw.monthSelect.options[cw.monthSelect.selectedIndex].text
        var day=cw.daySelect.options[cw.daySelect.selectedIndex].text
        var hour=cw.hourSelect.options[cw.hourSelect.selectedIndex].text
        var minute=cw.minuteSelect.options[cw.minuteSelect.selectedIndex].text
        var ampm=cw.ampmSelect.options[cw.ampmSelect.selectedIndex].text
        var tz=cw.timeZoneSelect.options[cw.timeZoneSelect.selectedIndex].text
        var tzTitle=cw.timeZoneSelect.options[cw.timeZoneSelect.selectedIndex].title
        var discovered=year+"/"+month+"/"+day+" "+hour+":"+minute+" "+ampm
        discoveredSpan.innerHTML="<b>Discovered:</b> " +discovered
        discoveredSpan.title=tzTitle
        saveMap.setAttribute("discovered", discovered)
        saveMap.setAttribute("tzTitle", tzTitle)

        saveMap.setAttribute("email", email)
        saveMap.setAttribute("title", title)
        saveMap.setAttribute("plantName", plantName)

        if(gpsGoToValue.value!="" || gpsCheck.checked==true)
    {
        comment += " @ GPS:"+SVGLatSet+", "+SVGLngSet

    }
    gpsShowHideDiv.style.visibility = 'hidden'
    saveMap.setAttribute("comment", txt2xml(comment))
    GPSX.style("display", "none")
    gpsGoToValue.placeholder = 'Insert GPS here...latitude,longitude'
    gpsGoToValue.value = ""
    SetGPS = false
    gpsCheck.checked = false

    saveMap.setAttribute("MyMapZoom", MyMapZoom)
    saveMap.setAttribute("MyMapCenterLat", MyMapCenterLat)
    saveMap.setAttribute("MyMapCenterLng", MyMapCenterLng)
    saveMap.setAttribute("MyMapLatUL", MyMapLatUL)
    saveMap.setAttribute("MyMapLngUL", MyMapLngUL)
    saveMap.setAttribute("MyMapLatLR", MyMapLatLR)
    saveMap.setAttribute("MyMapLngLR", MyMapLngLR)

    saveMap.setAttribute("boundsRect-InitZoom", BoundsRect.attr("InitZoom"))
    saveMap.setAttribute("boundsRect-rectX", BoundsRect.attr("rectX"))
    saveMap.setAttribute("boundsRect-rectY", BoundsRect.attr("rectY"))
    saveMap.setAttribute("boundsRect-lat", BoundsRect.attr("lat"))
    saveMap.setAttribute("boundsRect-lng", BoundsRect.attr("lng"))
    saveMap.setAttribute("boundsRect-width", BoundsRect.attr("width"))
    saveMap.setAttribute("boundsRect-height", BoundsRect.attr("height"))

    //---clear all elements---
    for(var k = saveMap.childNodes.length-1; k>=0; k--)
        saveMap.removeChild(saveMap.childNodes.item(k))

        var bb = boundsRect.getBBox()

        var r = mySVG.createSVGRect();
    r.x = bb.x;
    r.y = bb.y;
    r.width = bb.width;
    r.height = bb.height;
    var nodeList = mySVG.getIntersectionList(r, null);
    var arr = Array.from(nodeList);
    for(var k = 0; k<arr.length; k++)
    {
        var elem = arr[k]
        var myParent = elem.parentNode

        if(myParent.id=="domElemG")
        {
            var clone = elem.cloneNode(true)
            clone.removeAttribute("onmousedown")
            clone.removeAttribute("onmouseover")
            clone.removeAttribute("onmouseout")
            clone.setAttribute("pointer-events", "none")

            if(EditMapId)
            {
                var utcMS = new Date().getTime()
                saveMap.setAttribute("editTimeUtcMS", utcMS)
            }

            saveMap.appendChild(clone)

        }
    }

    saveMap.insertBefore(arrowDefs.cloneNode("true"), saveMap.firstChild)
    //---hide not in map---
    for(var k = 0; k<domElemG.childNodes.length; k++)
        domElemG.childNodes.item(k).setAttribute("display", "none")

        for(var k = 0; k<saveMap.childNodes.length; k++)
    {
        var elem = saveMap.childNodes.item(k)
        var saveId = elem.id
        var savedElem = document.getElementById(saveId)
        savedElem.removeAttribute("display")
        savedElem.removeAttribute("onmousedown")
        savedElem.removeAttribute("onmouseover")
        savedElem.removeAttribute("onmouseout")
    }

    var utcMS = new Date().getTime()
    saveMap.setAttribute("utcMS", utcMS)
    var myId = "map"+utcMS
    saveMap.setAttribute("id", myId)
    SendMapId = myId

    var svgString = new XMLSerializer().serializeToString(saveMap)

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "_ASP/sendMap.asp", true);
    xhr.onload = function()
    {
        if (this.status == 200)
        {
            cw.sendMapMessageSpan.innerHTML = "Thanks, your map has been received and placed in the library."
            zoomRect.style.display = "none"
            cw.sendButton.disabled = true
            cw.cancelButton.disabled = true
            getMapLibraryButton.innerHTML = "Hide Map"
            getMapLibraryButton.setAttribute("onClick", "hideAddedMap('"+myId+"')")
            PhotosLoaded=false
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "Library/Map.svg", true);
            xhr.onload = function()
            {
                var xmlString = this.responseText

                //---DOMParser---
                var parser = new DOMParser();
                MapDoc = parser.parseFromString(xmlString, "text/xml").documentElement;

            }
            xhr.send()

        }
        if (this.status == 500)
        {
            //---Error---
            console.log(this.responseText) //---HTML-formatted error description---
            cw.sendMapMessageSpan.innerHTML = "<SPAN style=color:red>**error - photo file defective***</SPAN>"
            titleContainerDiv.style.visibility = "hidden"

            for(var m = domElemG.childNodes.length-1; m>=0; m--)
                domElemG.removeChild(domElemG.childNodes.item(m))
                boundsRect.style.visibility = "hidden"
                getMapLibraryButton.style.visibility = ""

                SendMapId = null

        }
    };

    xhr.send(svgString);

}

function hideAddedMap(id)
{
    //---add new marker---
    resetMarkers()
    for(var k = domElemG.childNodes.length-1; k>=0; k--)
        domElemG.removeChild(domElemG.childNodes.item(k))
        BoundsRect.style("visibility", "hidden")
        titleContainerDiv.style.visibility = "hidden"
        getMapLibraryButton.style.visibility = ""

        getMapLibraryButton.setAttribute("onClick", "getMapLibrary()")
        getMapLibraryButton.innerHTML = "Exotic Plant Maps"
        enableAllButtons()
        MapDoc = null
        SendMapId = null

}
 var MapDeleted=false
function deleteMap(myId)
{
    if(boundsRect.style.visibility=="visible")
    {
        for(var j = domElemG.childNodes.length-1; j>=0; j--)
            domElemG.removeChild(domElemG.childNodes.item(j))
            boundsRect.style.visibility = "hidden"
    }
    var svgString = "<remove myId='"+myId+"' />"

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "_ASP/removeMap.asp", true);
    xhr.onload = function()
    {
        if (this.status == 200)
        {
            document.getElementById("deleteMapButton"+myId).disabled = true
            document.getElementById("deleteMapButton"+myId).innerHTML = "..deleted.."
            MapDoc = null
            MapDeleted=true
            setTimeout(getMapLibrary(), 1500)
            elemLevelSpan.innerHTML = ""



            MyMapLoaded = false
            mapTableCloseButton.style.visibility = "visible"
            getMapLibraryButton.innerHTML = "Exotic Plant Maps"
            getMapLibraryButton.style.background = "#C3E6D3"
            //enableAllButtons()
            getMapLibraryButton.style.visibility = "hidden"
            titleContainerDiv.style.visibility = "hidden"
            //EditMapId=null
            //closeMapTable()
            //mapTableCloseButton.style.visibility = "hidden"

            PhotosLoaded=false
        }

    };

    xhr.send(svgString);

}
