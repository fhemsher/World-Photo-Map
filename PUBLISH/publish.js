function loadPublishSVG(publishID)
{
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "../Library/Publish.svg", true);
    xhr.onload = function()
    {

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

                if(mapId==publishID)
                {

                    mySVG.removeChild(domElemG)
                    var elemG=group.cloneNode(true)


                    mySVG.removeChild(arrowDefs)

                    mySVG.insertBefore(elemG.firstChild,mySVG.firstChild)


                    elemG.id="domElemG"
                    mySVG.insertBefore(elemG,boundsRect)
                     var createdBy="<br><span style=font-size:90%;font-weight:normal >Created By: "+elemG.getAttribute("email")+"</span>"

                    if(elemG.getAttribute("editTimeUtcMS"))
                        var utcMs=+elemG.getAttribute("editTimeUtcMS")
                    else
                        var utcMs=+mapId.split("map")[1]

                    var utc= new Date(utcMs).toUTCString()
                    var atDate="<span style=font-size:80%;font-weight:normal > <i>("+utc+")</i></span>"
                    var discovered=elemG.getAttribute("discovered")
                    var tzTitle=elemG.getAttribute("tzTitle")
                    discoveredSpan.innerHTML="<b>Discovered:</b> " +discovered
                    discoveredSpan.title=tzTitle

                    myMapTitleDiv.innerHTML=elemG.getAttribute("title")+createdBy+atDate
                    myMapCommentValue.innerHTML=xml2txt(elemG.getAttribute("comment"))
                    console.log(elemG.getAttribute("plantName"))
                    plantNameValue.value=elemG.getAttribute("plantName")
                    titleContainerDiv.style.visibility="visible"
                    var ulLat=+elemG.getAttribute("MyMapLatUL")
                    var ulLng=+elemG.getAttribute("MyMapLngUL")
                    var lrLat=+elemG.getAttribute("MyMapLatLR")
                    var lrLng=+elemG.getAttribute("MyMapLngLR")



                    BoundsRect.attr("InitZoom",elemG.getAttribute("boundsRect-InitZoom"))
                    BoundsRect.attr("rectX",elemG.getAttribute("boundsRect-rectX"))
                    BoundsRect.attr("rectY",elemG.getAttribute("boundsRect-rectY"))
                    BoundsRect.attr("lat",elemG.getAttribute("boundsRect-lat"))
                    BoundsRect.attr("lng",elemG.getAttribute("boundsRect-lng"))
                    BoundsRect.attr("width",elemG.getAttribute("boundsRect-width")  )
                    BoundsRect.attr("height",elemG.getAttribute("boundsRect-height"))
                    BoundsRect.style("visibility","visible")
                    MyMap.fitBounds([[ulLat, ulLng],[lrLat, lrLng]]);






                    break
                }
            }

        }

    }
    xhr.send()





}

// into a text or textarea...exactly as user plugged it in
function xml2txt(inputXml)
{
        var reAmp=/AMP/g
        var reQuote=/QUOTE/g
        var reApost=/APOST/g
        var reGT=/GT/g
        var reLT=/LT/g
    if(inputXml)
    {
        var inputXml1=inputXml.replace(reAmp,"&")
        var inputXml2=inputXml1.replace(reQuote,"\"")
        var inputXml3=inputXml2.replace(reApost,"'")
        var inputXml4=inputXml3.replace(reGT,">")
        var text=inputXml4.replace(reLT,"<")
    return text
    }
    else
    return "";

}

var SVGx
var SVGy
var SVGLat
var SVGLng

function startCursorLoc()
{

    MySVG.on("mousemove", function()
        {
            SVGx = d3.mouse(this)[0]
            SVGy = d3.mouse(this)[1]


                var svgPnt=L.point(SVGx,SVGy)
                SVGLatLng=MyMap.layerPointToLatLng(svgPnt)
                SVGLat=SVGLatLng.lat
                SVGLng=SVGLatLng.lng

                gpsValue.value="GPS: "+SVGLat+", "+SVGLng
                

        }
    );



}
