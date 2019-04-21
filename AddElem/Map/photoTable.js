
var PhotosLoaded=false
function openPhotoTable()
{
    hideAllHelps()

    if(!MapDoc)
    {

        openPhotoTableButton.innerHTML="...loading Photos..."
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "Library/Map.svg", true);
        xhr.onload = function()
        {
            var xmlString = this.responseText

            //---DOMParser---
            var parser = new DOMParser();
            MapDoc = parser.parseFromString(xmlString, "text/xml").documentElement;
            //---clear previous table----
            var rows = photoTable.rows
            for(var k = rows.length-1; k>=0; k--)
                photoTable.deleteRow(rows[k])

                var rowCnt = 0
                var rowColor = 0
                //----write table---
                var groups = MapDoc.childNodes

                for(var k = 0; k<groups.length; k++)
            {
                var group = groups.item(k)
                if(group.nodeName!="#text")
                {

                    var plantName = group.getAttribute("plantName")
                    if(!plantName)
                        plantName = "Not Known...Please Help (Contact my Email)"

                        var imgPop = group.getElementsByTagName("image")[0]
                        var src = imgPop.getAttribute("href")
                        var width = +imgPop.getAttribute("naturalWidth")
                        var height = +imgPop.getAttribute("naturalHeight")
                        var widthHeightRatio = height/width

                        var widthFactor = 150/width
                        var w = 150
                        var h = widthFactor*height
                        var img = document.createElement("img")
                        img.setAttribute("src", src)
                        img.setAttribute("width", w)
                        img.setAttribute("height", h)
                        img.style.cursor="pointer"

                        img.setAttribute("title", plantName+"\nClick to preview map")
                        img.setAttribute("onClick", "loadPreviewMap('"+group.id+"','photoTable')")
                        //console.log(img)

                        var row = photoTable.insertRow()
                        var numCell = row.insertCell(0)
                        numCell.innerHTML = "<b>("+(k+1)+".)</b>"
                        var imgCell = row.insertCell(1)
                        imgCell.id="imgCell"+group.id
                        imgCell.appendChild(img)
                        if(plantName=="Not Known...Please Help (Contact my Email)")
                        numCell.style.background = "red"
                        else
                            numCell.style.background = "steelblue"

                }


            }
            disableAllButtons()
            photoTableCloseButton.style.visibility = "visible"
            photoTableDiv.style.top = "30px"
            photoTableDiv.style.visibility = "visible"
            var height = 640
            d3.select("#photoTableDiv").transition().duration(800).style("height", height+"px")
            photoTableDiv.style.visibility = "visible"
            photoTableDiv.style.overflow = "auto"
            openPhotoTableButton.innerHTML="All Plant Photos"
            gpsShowHideDiv.style.visibility = "hidden"
            PhotosLoaded=true
        }
        xhr.send()

    }
    else if(PhotosLoaded==false)
    {

            //---clear previous table----
            var rows = photoTable.rows
            for(var k = rows.length-1; k>=0; k--)
                photoTable.deleteRow(rows[k])

                var rowCnt = 0
                var rowColor = 0
                //----write table---
                var groups = MapDoc.childNodes

                for(var k = 0; k<groups.length; k++)
            {
                var group = groups.item(k)
                if(group.nodeName!="#text")
                {

                    var plantName = group.getAttribute("plantName")
                    if(!plantName)
                        plantName = "Not Known...Please Help (Contact my Email)"

                        var imgPop = group.getElementsByTagName("image")[0]
                        var src = imgPop.getAttribute("href")
                        var width = +imgPop.getAttribute("naturalWidth")
                        var height = +imgPop.getAttribute("naturalHeight")
                        var widthHeightRatio = height/width

                        var widthFactor = 150/width
                        var w = 150
                        var h = widthFactor*height
                        var img = document.createElement("img")
                        img.setAttribute("src", src)
                        img.setAttribute("width", w)
                        img.setAttribute("height", h)
                        img.setAttribute("title", plantName+"\nClick to preview map")
                        img.setAttribute("onClick", "loadPreviewMap('"+group.id+"','photoTable')")
                        img.style.cursor="pointer"

                        var row = photoTable.insertRow()
                        var numCell = row.insertCell(0)
                        numCell.innerHTML = "<b>("+(k+1)+".)</b>"
                        var imgCell = row.insertCell(1)
                        imgCell.id="imgCell"+group.id
                        imgCell.appendChild(img)
                        if(plantName=="Not Known...Please Help (Contact my Email)")
                        numCell.style.background = "red"
                        else
                            numCell.style.background = "steelblue"

                }


            }
            disableAllButtons()
            photoTableCloseButton.style.visibility = "visible"
            photoTableDiv.style.top = "30px"
            photoTableDiv.style.visibility = "visible"
            var height = 640
            d3.select("#photoTableDiv").transition().duration(800).style("height", height+"px")
            photoTableDiv.style.visibility = "visible"
            photoTableDiv.style.overflow = "auto"
            openPhotoTableButton.innerHTML="All Plant Photos"
            gpsShowHideDiv.style.visibility = "hidden"
            PhotosLoaded=true
   }
    else
    {
        disableAllButtons()
        photoTableCloseButton.style.visibility = "visible"
        photoTableDiv.style.top = "30px"
        photoTableDiv.style.visibility = "visible"
        var height = 640
        d3.select("#photoTableDiv").transition().duration(800).style("height", height+"px")
        photoTableDiv.style.visibility = "visible"
        photoTableDiv.style.overflow = "auto"
       gpsShowHideDiv.style.visibility = "hidden"

    }

}
function closePhotoTable()
{
    if(PreviewMapLoaded==false)
        enableAllButtons()
        photoTableCloseButton.style.visibility = "hidden"
        var height = 1
        d3.select("#photoTableDiv").transition().duration(400).style("height", height+"px")

        photoTableDiv.style.overflow = "hidden"

        setTimeout('photoTableDiv.style.visibility = "hidden"', 600)

}

function showPhoto(id)
{

    for(k = 0; k<MapIdArray.length; k++)
    {
        if(id==MapIdArray[k])
        {
            if(photoDiv.childNodes.length==1)
                photoDiv.removeChild(photoDiv.lastChild)

                var myMap = MapDoc.childNodes.item(k)

                var imgPop = myMap.getElementsByTagName("image")[0]
                var src = imgPop.getAttribute("href")
                var width = +imgPop.getAttribute("naturalWidth")
                var height = +imgPop.getAttribute("naturalHeight")
                var widthHeightRatio = height/width

                var widthFactor = 500/width
                var w = 500
                var h = widthFactor*height
                var img = document.createElement("img")
                img.setAttribute("src", src)
                img.setAttribute("width", w)
                img.setAttribute("height", h)
                img.setAttribute("title", "Click to close")
                photoDiv.appendChild(img)
                photoDiv.style.height = h+"px"
                photoDiv.style.visibility = "visible"

                break
        }

    }

}