function saveMyMap()
{
    cw = addElemMapCw
    if(cw.yourMapEmailValue.value!=""&&cw.yourMapTitleValue.value!="")
    {

        //---validate image present----
                var validateImage=domElemG.getElementsByTagName("image").length
                console.log(validateImage)
               if(validateImage>0)
               {

                    setMapBounds()
                   //---discovery date---





                    var title = cw.yourMapTitleValue.value
                    var createdBy = "<br><span style=font-size:90%;font-weight:normal >Created By: "+cw.yourMapEmailValue.value+"</span>"

                    myMapTitleDiv.innerHTML = title+createdBy

                    var plantName = cw.addPlantNameValue.value
                    if(plantName=="")
                        plantName = "Not Known...Please Help (Contact my Email)"
                        plantNameValue.value = plantName

                        var comment = cw.yourMapCommentValue.value
                        myMapCommentValue.innerHTML = comment
                        titleContainerDiv.style.visibility = "visible"

                        MyMap.scrollWheelZoom.enable();
                    MyMap.dragging.enable()
                    if(!EditMapId)
                        sendMap()
                        else
                            sendEditMap()
                }
                else
                cw.sendMapMessageSpan.innerHTML = "<SPAN style=color:red>**Photo not included...try again***</SPAN>"

        }

}
function cancelDrawMap()
{
    if(EditMapId)
    {
        EditMapId = null
        EditButton.disabled = false
        openAddMapButton.disabled = false

        openAddMapButton.style.background = "#C3E6D3"
        openAddMapButton.innerHTML = "Save Map"
        BoundsRect.style("visibility", "visible")
        myMapTitleDiv.style.visibility = "visible"

    }

    closeIframe("addElemMap")

    MyMap.scrollWheelZoom.enable();
    MyMap.dragging.enable()

}

function closeDrawMap()
{
    closeIframe("addElemMap")

    MyMap.scrollWheelZoom.enable();
    MyMap.dragging.enable()
    if(SendMapId)
    {
        disableAllButtons()
        getMapLibraryButton.style.visibility = "visible"
        getMapLibraryButton.disabled = false
    }

}

function clearDrawMap()
{

     for(var k = domElemG.childNodes.length-1; k>=0; k--)
        domElemG.removeChild(domElemG.childNodes.item(k))


 closeDrawMap()

}
var PublishButton
var ShowMapButton
var EditButton
var EditCancelButton
var EditFinishButton
var EditTitle
var EditTitleBG
var MyMapLoaded = false
function loadMyMap(id)
{
    if(EditMapId==false)
    {
             zoomOutImage.style.visibility="hidden"
                 var groups = MapDoc.childNodes

            for(var k = 0; k<groups.length; k++)
            {
                var group = groups.item(k)
                if(group.nodeName!="#text")
                {
                    var mapId = group.getAttribute("id")
                    var email = group.getAttribute("email")
                    if(mapId==id)
                    {
                        clearMarker("marker_"+(k+1))
                        mySVG.removeChild(domElemG)
                        var elemG = group.cloneNode(true)

                        mySVG.removeChild(arrowDefs)
                        mySVG.insertBefore(elemG.firstChild, mySVG.firstChild) //---arrowDefs----

                        elemG.id = "domElemG"
                        mySVG.insertBefore(elemG, domWrapper)
                        var createdBy = "<br><span style=font-size:90%;font-weight:normal >Created By: "+elemG.getAttribute("email")+"</span>"

                        if(elemG.getAttribute("editTimeUtcMS"))
                            var utcMs = +elemG.getAttribute("editTimeUtcMS")
                            else
                                var utcMs = +mapId.split("map")[1]

                                var locale = new Date(utcMs).toLocaleString()
                                var atDate = "<span style=font-size:80%;font-weight:normal > <i>("+locale+")</i></span>"

                                myMapTitleDiv.innerHTML = elemG.getAttribute("title")+createdBy+atDate

                                var discovered=elemG.getAttribute("discovered")
                                var tzTitle=elemG.getAttribute("tzTitle")
                                discoveredSpan.innerHTML="<b>Discovered:</b> " +discovered
                                discoveredSpan.title=tzTitle
                                var plantName = elemG.getAttribute("plantName")
                                plantNameValue.value = plantName
                                var comment = elemG.getAttribute("comment")
                                myMapCommentValue.innerHTML = xml2txt(comment)
                                titleContainerDiv.style.visibility = "visible"

                                var ulLat = +elemG.getAttribute("MyMapLatUL")
                                var ulLng = +elemG.getAttribute("MyMapLngUL")
                                var lrLat = +elemG.getAttribute("MyMapLatLR")
                                var lrLng = +elemG.getAttribute("MyMapLngLR")

                                MyMap.fitBounds([[ulLat, ulLng],[lrLat, lrLng]]);

                        BoundsRect.attr("InitZoom", elemG.getAttribute("boundsRect-InitZoom"))
                        BoundsRect.attr("rectX", elemG.getAttribute("boundsRect-rectX"))
                        BoundsRect.attr("rectY", elemG.getAttribute("boundsRect-rectY"))
                        BoundsRect.attr("lat", elemG.getAttribute("boundsRect-lat"))
                        BoundsRect.attr("lng", elemG.getAttribute("boundsRect-lng"))
                        BoundsRect.attr("width", elemG.getAttribute("boundsRect-width"))
                        BoundsRect.attr("height", elemG.getAttribute("boundsRect-height"))
                        BoundsRect.style("visibility", "visible")

                        zoomRect.style.display = "none"

                        zoomUpdate()

                        HideMapButton = document.getElementById("hideMapButton"+id)

                        HideMapButton.disabled = false
                        PublishButton = document.getElementById("publishMapButton"+id)
                        PublishButton.disabled = false

                        EditButton = document.getElementById("editMapButton"+id)
                        if(EditButton)
                            EditButton.disabled = false
                            EditCancelButton = document.getElementById("editCancelMapButton"+id)
                            if(EditCancelButton)
                            EditCancelButton.disabled = true

                            EditFinishButton = document.getElementById("editFinishMapButton"+id)
                            if(EditFinishButton)
                            EditFinishButton.disabled = true

                            EditTitle = document.getElementById("titleValue"+id)
                            EditTitleBG = EditTitle.style.background
                            if(email==CookieEmail)
                        {
                            document.getElementById("titleValue"+id).contentEditable = "true"
                            document.getElementById("plantNameValue"+id).disabled = false
                            document.getElementById("commentValue"+id).contentEditable = "true"
                        }

                        openAddMapButton.disabled = true
                        //closeMapTable()
                        ShowMapButton = document.getElementById("showMapButton"+id)
                        ShowMapButton.style.visibility = "hidden"
                        for(var m = 0; m<MapIdArray.length; m++)
                        {
                            var myId = MapIdArray[m]
                            var row = document.getElementById("row"+myId)

                            if(myId!=mapId)
                            {
                                row.style.opacity = ".3"
                                var editRow = document.getElementById("editRow"+myId)
                                if(editRow)
                                    editRow.style.opacity = ".3"
                                    var commentRow = document.getElementById("commentRow"+myId)
                                    commentRow.style.opacity = ".3"
                                    var nameRow = document.getElementById("nameRow"+myId)
                                    nameRow.style.opacity = ".3"

                            }

                        }

                        MyMapLoaded = true
                        disableAllButtons()

                        getMapLibraryButton.style.visibility = "visible"
                        getMapLibraryButton.innerHTML = "Hide Map"
                        getMapLibraryButton.setAttribute("onClick", "hideMap('"+id+"')")
                        getMapLibraryButton.disabled = false
                        getMapLibraryButton.style.borderStyle = "outset"
                        gpsShowHideDiv.style.visibility = 'hidden'
                        if(email!=CookieEmail)
                        closeMapTable()
                        break
                    }
                }

            }

    }


}
var PreviewMapLoaded = false
function loadPreviewMap(id,by)
{       gpsShowHideDiv.style.visibility="hidden"
             zoomOutImage.style.visibility="hidden"
    if(!MapDoc)
    {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "Library/Map.svg", true);
        xhr.onload = function()
        {
            gpsShowHideDiv.style.visibility = 'hidden'
            var xmlString = this.responseText
            //---DOMParser---
            var parser = new DOMParser();
            MapDoc = parser.parseFromString(xmlString, "text/xml").documentElement;

            var groups = MapDoc.childNodes

            for(var k = 0; k<groups.length; k++)
            {
                var group = groups.item(k)
                if(group.nodeName!="#text")
                {
                    var mapId = group.getAttribute("id")

                    if(mapId==id)
                    {
                        clearMarker("marker_"+(k+1))
                        mySVG.removeChild(domElemG)
                        var elemG = group.cloneNode(true)

                        mySVG.removeChild(arrowDefs)
                        mySVG.insertBefore(elemG.firstChild, mySVG.firstChild) //---arrowDefs----
                        // mySVG.insertBefore(elemG.firstChild,mySVG.firstChild)
                        // mySVG.insertBefore(elemG.firstChild,mySVG.firstChild)

                        elemG.id = "domElemG"
                        mySVG.insertBefore(elemG, domWrapper)
                        var createdBy = "<br><span style=font-size:90%;font-weight:normal >Created By: "+elemG.getAttribute("email")+"</span>"

                        if(elemG.getAttribute("editTimeUtcMS"))
                            var utcMs = +elemG.getAttribute("editTimeUtcMS")
                            else
                                var utcMs = +mapId.split("map")[1]

                                var locale = new Date(utcMs).toLocaleString()
                                var atDate = "<span style=font-size:80%;font-weight:normal > <i>("+locale+")</i></span>"

                                myMapTitleDiv.innerHTML = elemG.getAttribute("title")+createdBy+atDate
                                var discovered=elemG.getAttribute("discovered")
                                var tzTitle=elemG.getAttribute("tzTitle")
                                discoveredSpan.innerHTML="<b>Discovered:</b> " +discovered
                                discoveredSpan.title=tzTitle

                                var plantName = elemG.getAttribute("plantName")
                                plantNameValue.value = plantName
                                var comment = elemG.getAttribute("comment")
                                myMapCommentValue.innerHTML = xml2txt(comment)
                                titleContainerDiv.style.visibility = "visible"

                                var ulLat = +elemG.getAttribute("MyMapLatUL")
                                var ulLng = +elemG.getAttribute("MyMapLngUL")
                                var lrLat = +elemG.getAttribute("MyMapLatLR")
                                var lrLng = +elemG.getAttribute("MyMapLngLR")

                                MyMap.fitBounds([[ulLat, ulLng],[lrLat, lrLng]]);

                        BoundsRect.attr("InitZoom", elemG.getAttribute("boundsRect-InitZoom"))
                        BoundsRect.attr("rectX", elemG.getAttribute("boundsRect-rectX"))
                        BoundsRect.attr("rectY", elemG.getAttribute("boundsRect-rectY"))
                        BoundsRect.attr("lat", elemG.getAttribute("boundsRect-lat"))
                        BoundsRect.attr("lng", elemG.getAttribute("boundsRect-lng"))
                        BoundsRect.attr("width", elemG.getAttribute("boundsRect-width"))
                        BoundsRect.attr("height", elemG.getAttribute("boundsRect-height"))
                        BoundsRect.style("visibility", "visible")

                        zoomRect.style.display = "none"

                        zoomUpdate()
                        disableAllButtons()
                        getMapLibraryButton.style.visibility = "visible"
                        getMapLibraryButton.innerHTML = "Close Preview Map"
                        getMapLibraryButton.setAttribute("onClick", "closePreviewMap('"+id+"')")
                        getMapLibraryButton.disabled = false

                        PreviewMapLoaded = true

                        if(by=="photoTable")
                        {
                            document.getElementById("imgCell"+id).style.border="4px inset violet"
                           closePhotoTable()

                        }

                         break
                    }

                }

            }

        }
        xhr.send()
    }
    else
    {
            var groups = MapDoc.childNodes

            for(var k = 0; k<groups.length; k++)
            {
                var group = groups.item(k)
                if(group.nodeName!="#text")
                {
                    var mapId = group.getAttribute("id")

                    if(mapId==id)
                    {
                        clearMarker("marker_"+(k+1))
                        mySVG.removeChild(domElemG)
                        var elemG = group.cloneNode(true)

                        mySVG.removeChild(arrowDefs)
                        mySVG.insertBefore(elemG.firstChild, mySVG.firstChild) //---arrowDefs----
                        // mySVG.insertBefore(elemG.firstChild,mySVG.firstChild)
                        // mySVG.insertBefore(elemG.firstChild,mySVG.firstChild)

                        elemG.id = "domElemG"
                        mySVG.insertBefore(elemG, domWrapper)
                        var createdBy = "<br><span style=font-size:90%;font-weight:normal >Created By: "+elemG.getAttribute("email")+"</span>"

                        if(elemG.getAttribute("editTimeUtcMS"))
                            var utcMs = +elemG.getAttribute("editTimeUtcMS")
                            else
                                var utcMs = +mapId.split("map")[1]

                                var locale = new Date(utcMs).toLocaleString()
                                var atDate = "<span style=font-size:80%;font-weight:normal > <i>("+locale+")</i></span>"

                                myMapTitleDiv.innerHTML = elemG.getAttribute("title")+createdBy+atDate
                                var discovered=elemG.getAttribute("discovered")
                                var tzTitle=elemG.getAttribute("tzTitle")
                                discoveredSpan.innerHTML="<b>Discovered:</b> " +discovered
                                discoveredSpan.title=tzTitle

                                var plantName = elemG.getAttribute("plantName")
                                plantNameValue.value = plantName
                                var comment = elemG.getAttribute("comment")
                                myMapCommentValue.innerHTML = xml2txt(comment)
                                titleContainerDiv.style.visibility = "visible"

                                var ulLat = +elemG.getAttribute("MyMapLatUL")
                                var ulLng = +elemG.getAttribute("MyMapLngUL")
                                var lrLat = +elemG.getAttribute("MyMapLatLR")
                                var lrLng = +elemG.getAttribute("MyMapLngLR")

                                MyMap.fitBounds([[ulLat, ulLng],[lrLat, lrLng]]);

                        BoundsRect.attr("InitZoom", elemG.getAttribute("boundsRect-InitZoom"))
                        BoundsRect.attr("rectX", elemG.getAttribute("boundsRect-rectX"))
                        BoundsRect.attr("rectY", elemG.getAttribute("boundsRect-rectY"))
                        BoundsRect.attr("lat", elemG.getAttribute("boundsRect-lat"))
                        BoundsRect.attr("lng", elemG.getAttribute("boundsRect-lng"))
                        BoundsRect.attr("width", elemG.getAttribute("boundsRect-width"))
                        BoundsRect.attr("height", elemG.getAttribute("boundsRect-height"))
                        BoundsRect.style("visibility", "visible")

                        zoomRect.style.display = "none"

                        zoomUpdate()
                        disableAllButtons()
                        getMapLibraryButton.style.visibility = "visible"
                        getMapLibraryButton.innerHTML = "Close Preview Map"
                        getMapLibraryButton.setAttribute("onClick", "closePreviewMap('"+id+"')")
                        getMapLibraryButton.disabled = false

                        PreviewMapLoaded = true
                                if(by=="photoTable")
                                {
                                    document.getElementById("imgCell"+id).style.border="4px inset violet"
                                    closePhotoTable()

                                }
                        break

                    }

                }

            }

        }

}

function closePreviewMap(id)
{      zoomOutImage.style.visibility="visible"
      gpsShowHideDiv.style.visibility="visible"
    for(var k = domElemG.childNodes.length-1; k>=0; k--)
        domElemG.removeChild(domElemG.childNodes.item(k))
        BoundsRect.style("visibility", "hidden")
        titleContainerDiv.style.visibility = "hidden"
        getMapLibraryButton.style.visibility = ""

        getMapLibraryButton.setAttribute("onClick", "getMapLibrary()")
        getMapLibraryButton.innerHTML = "Exotic Plant Maps"
        enableAllButtons()
        if(ClearedMarkerId)
        returnClearedMarker(id)
        PreviewMapLoaded = false

}
//---clear all add elems---
var HideMapButton
function hideMap(id)
{     zoomOutImage.style.visibility="visible"
    EditData = false
    for(var k = domElemG.childNodes.length-1; k>=0; k--)
        domElemG.removeChild(domElemG.childNodes.item(k))
        BoundsRect.style("visibility", "hidden")
        openAddMapButton.disabled = true

        if(document.getElementById("editMapButton"+id))
        document.getElementById("editMapButton"+id).disabled = true
        document.getElementById("showMapButton"+id).disabled = false
        document.getElementById("showMapButton"+id).style.visibility = ""
        document.getElementById("titleValue"+id).contentEditable = "false"
        document.getElementById("plantNameValue"+id).disabled = true
        document.getElementById("commentValue"+id).contentEditable = "false"
        if(EditTitle)
    {
        document.getElementById("commentValue"+id).style.background = EditTitleBG
        document.getElementById("plantNameValue"+id).style.background = EditTitleBG
        EditTitle.style.background = EditTitleBG
    }

    openAddMapButton.disabled = false
    titleContainerDiv.style.visibility = "hidden"

    HideMapButton = document.getElementById("hideMapButton"+id)
    HideMapButton.disabled = true
    PublishButton = document.getElementById("publishMapButton"+id)
    PublishButton.disabled = true

    EditButton = null
    EditCancelButton = null
    EditFinishButton = null

    EditMapId = false
    getMapLibraryButton.style.visibility = ""

    closeMapTable()
    elemLevelSpan.innerHTML = ""
    for(var m = 0; m<MapIdArray.length; m++)
    {
        var myId = MapIdArray[m]
        document.getElementById("showMapButton"+myId).style.visibility = ""

        var row = document.getElementById("row"+myId)

        row.style.opacity = ""
        var editRow = document.getElementById("editRow"+myId)
        if(editRow)
            editRow.style.opacity = ""
            var commentRow = document.getElementById("commentRow"+myId)
            commentRow.style.opacity = ""
            var nameRow = document.getElementById("nameRow"+myId)
            nameRow.style.opacity = ""

    }
    MyMapLoaded = false

    if(ClearedMarkerId)
        returnClearedMarker(id)
        else
            resetMarkers()
            enableAllButtons()
            getMapLibraryButton.style.visibility = ""
            getMapLibraryButton.innerHTML = "Exotic Plant Maps"
            getMapLibraryButton.setAttribute("onClick", "getMapLibrary()")
            //getMapLibraryButton.disabled=false
            mapTableDiv.style.overflow = "hidden"
      zoomOutImage.style.visibility="visible"
}

var EditMapId = false

var EditMapTitle
var SaveElemG
function editMap(id)
{
    closeMapTable()
    EditMapId = id

    HideMapButton.disabled = true
    getMapLibraryButton.innerHTML = "Editing Map..."
    getMapLibraryButton.setAttribute("onClick", "getMapLibrary()")
    getMapLibraryButton.style.background = "orange"

    var groups = MapDoc.childNodes
    for(k = 0; k<groups.length; k++)
    {
        var group = groups.item(k)
        var groupId = group.id
        if(groupId==id)
        {
            EditMapTitle = group.getAttribute("title")
            break
        }
    }

    SaveElemG = domElemG.cloneNode(true)
    var els = domElemG.childNodes
    for(var j = 0; j<els.length; j++)
    {
        var el = els.item(j)
        var id = el.id
        el.removeAttribute("pointer-events")
        var myClass = el.getAttribute("class")
        var initZoom = el.getAttribute("InitZoom")

        if(myClass=="pathElem")el.setAttribute("onmousedown", "startPathDrawEdit("+id+",evt)")
            if(myClass=="circleElem")el.setAttribute("onmousedown", "editCircleDraw("+id+",evt)")
            if(myClass=="ellipseElem")el.setAttribute("onmousedown", "editEllipseDraw("+id+",evt)")
            if(myClass=="rectElem")el.setAttribute("onmousedown", "editRectDraw("+id+",evt)")
            if(myClass=="textElem")el.setAttribute("onmousedown", "editTextDraw("+id+",evt)")
            if(myClass=="imageElem")el.setAttribute("onmousedown", "editImageDraw("+id+",evt)")
            if(myClass=="polygonElem")el.setAttribute("onmousedown", "editPolygonDraw("+id+",evt)")

    }

    EditButton.disabled = true
    EditCancelButton.disabled = false
    EditFinishButton.disabled = false
    document.getElementById("commentValue"+EditMapId).contentEditable = "true"
    document.getElementById("titleValue"+EditMapId).contentEditable = "true"
    document.getElementById("plantNameValue"+EditMapId).disabled = false

    //closeMapTable()

    BoundsRect.attr("stroke", "orange")
    myMapTitleDiv.style.background = "orange"

    enableAllButtons()
    gpsShowHideDiv.style.visibility = 'visible'

}
function finishEditMap()
{

    GPSX.style("display", "none")
    gpsGoToValue.placeholder = 'Insert GPS here...latitude,longitude'
    gpsGoToValue.value = ""
    SetGPS = false
    gpsCheck.checked = false

    setMapBounds()

    var saveMap = domElemG.cloneNode(true)

    var title = document.getElementById("titleValue"+EditMapId).innerHTML
    document.getElementById("titleValue"+EditMapId).contentEditable = "false"

    saveMap.setAttribute("title", title)
    var plantName = document.getElementById("plantNameValue"+EditMapId).value
    if(plantName=="")
        plantName = "Not Known...Please Help (Contact my Email)"
        saveMap.setAttribute("plantName", plantName)
        document.getElementById("plantNameValue"+EditMapId).style.background = EditTitleBG
        document.getElementById("plantNameValue"+EditMapId).disabled = true
        var comment = document.getElementById("commentValue"+EditMapId).innerHTML
        document.getElementById("commentValue"+EditMapId).style.background = EditTitleBG
        document.getElementById("commentValue"+EditMapId).contentEditable = "false"
        saveMap.setAttribute("comment", txt2xml(comment))

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


    //---validate image present----
    var validateImage=saveMap.getElementsByTagName("image").length
    console.log(validateImage)
    if(validateImage>0)
    {


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

    saveMap.setAttribute("id", EditMapId)
    var svgEditString = new XMLSerializer().serializeToString(saveMap)

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "_ASP/sendUpdateMap.asp", true);
    xhr.onload = function()
    {
        if (this.status == 200)
        {

            //cw.sendMapMessageSpan.innerHTML = "Your map has been edited in the library."
            // cw.sendButton.disabled = true

            if(EditButton)
                EditButton.disabled = false
                openAddMapButton.disabled = false
                PublishButton = null
                EditButton = null

                openAddMapButton.style.background = "#C3E6D3"
                getMapLibraryButton.style.background = "#C3E6D3"
                getMapLibraryButton.innerHTML = "Hide Map"
                getMapLibraryButton.setAttribute("onClick", "hideMap('"+EditMapId+"')")
                gpsShowHideDiv.style.visibility = 'hidden'
                getMapLibraryButton.disabled = false
                BoundsRect.style("visibility", "visible")
                BoundsRect.attr("stroke", "#004953")
                myMapTitleDiv.style.background = "#e0b0ff"

                var email = saveMap.getAttribute("email")
                var createdBy = "<br><span style=font-size:90%;font-weight:normal >Created By: "+email+"</span>"

                var utcMs = +saveMap.getAttribute("editTimeUtcMS")

                var locale = new Date(utcMs).toLocaleString()
                var atDate = "<span style=font-size:80%;font-weight:normal > <i>("+locale+")</i></span>"
                var discovered=saveMap.getAttribute("discovered")
                var tzTitle=saveMap.getAttribute("tzTitle")
                discoveredSpan.innerHTML="<b>Discovered:</b> " +discovered
                discoveredSpan.title=tzTitle

                myMapTitleDiv.innerHTML = title+createdBy+atDate
                var plantName = saveMap.getAttribute("plantName")
                plantNameValue.value = plantName
                var comment = saveMap.getAttribute("comment")
                myMapCommentValue.innerHTML = xml2txt(comment)

                titleContainerDiv.style.visibility = "visible"

                ShowMapButton = document.getElementById("showMapButton"+EditMapId)
                ShowMapButton.style.visibility = "hidden"
                HideMapButton = document.getElementById("hideMapButton"+EditMapId)
                HideMapButton.disabled = false
                EditCancelMapButton = document.getElementById("editCancelMapButton"+EditMapId)
                EditCancelMapButton.disabled = true
                EditFinishMapButton = document.getElementById("editFinishMapButton"+EditMapId)
                EditFinishMapButton.disabled = true
                EditTitle.style.background = EditTitleBG

                //  updateClearedMarker(saveMap)
                MapDoc=null
                PhotoDoc = null
                EditMapId = null
                gpsShowHideDiv.style.visibility = 'hidden'
        }
        if (this.status == 500)
        {
            //---Error---
            console.log(this.responseText) //---HTML-formatted error description---

        }

    };

    xhr.send(svgEditString);
    }
    else
    {
        confirm("Photo must be included within Map boundary")



    }

}
function cancelEdit()
{
    GPSX.style("display", "none")
    gpsGoToValue.placeholder = 'Insert GPS here...latitude,longitude'
    gpsGoToValue.value = ""
    SetGPS = false
    gpsCheck.checked = false
    EditButton.disabled = false
    gpsShowHideDiv.style.visibility = 'hidden'

    EditCancelButton.disabled = true
    EditFinishButton.disabled = true

    EditTitle.style.background = EditTitleBG
    document.getElementById("commentValue"+EditMapId).contentEditable = "false"
    document.getElementById("titleValue"+EditMapId).contentEditable = "false"
    document.getElementById("plantNameValue"+EditMapId).disabled = true
    document.getElementById("commentValue"+EditMapId).style.background = EditTitleBG
    document.getElementById("plantNameValue"+EditMapId).style.background = EditTitleBG

    openAddMapButton.disabled = true
    HideMapButton.disabled = false

    openAddMapButton.style.background = "#C3E6D3"
    //getMapLibraryButton.innerHTML = "Hide Map"
    //getMapLibraryButton.disabled=false
    //getMapLibraryButton.setAttribute("onClick", "hideMap('"+EditMapId+"')")
    BoundsRect.attr("stroke", "#004953")
    myMapTitleDiv.style.background = "#e0b0ff"
    getMapLibraryButton.style.background = "#C3E6D3"

    mySVG.removeChild(domElemG)
    mySVG.insertBefore(SaveElemG, domWrapper)
    var title = SaveElemG.getAttribute("title")

    var titleTextarea = document.getElementById("titleValue"+EditMapId)
    titleTextarea.value = title
    hideMap(EditMapId)
    EditMapId = false

}