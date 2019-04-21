function gpsChecked()
{
    SetGPS = false
    if(gpsCheck.checked)
    {
        GPSX.style("display", "block")
        MySVG.attr("onmousedown", "centerGPS(evt)")

    }
    else
    {
        GPSX.style("display", "none")
        mySVG.removeAttribute("onmousedown")

    }

}
var SetGPS = false
var SVGLatSet
var SVGLngSet

function centerGPS(evt)
{

    var isRightMB;
    var evtW = window.event;
    if(evtW)
    {
        isRightMB = evtW.which == 3;
        if (!isRightMB) // IE, Opera
            isRightMB = evtW.button == 2;
    }
    else //---firefox--
        isRightMB = evt.which == 3;

    if(isRightMB&&gpsCheck.checked)
    {

        if(!SetGPS)
        {
            MyMap.setView([SVGLat, SVGLng])
            SVGLatSet = SVGLat
            SVGLngSet = SVGLng
        }

        if(SetGPS==false)
            SetGPS = true
            else
                SetGPS = false

    }

}

function goToGPS()
{
    var gps = gpsGoToValue.value
    if(gps!="")
    {
        if(gps.indexOf(",")!=-1)
        {
            var lat = +gps.split(",")[0]
            var lng = +gps.split(",")[1]
        }
        else
        {
            var lat = +gps.split(" ")[0]
            var lng = +gps.split(" ")[1]
        }
        SVGLatSet = lat
        SVGLngSet = lng
        MyMap.setView([lat, lng])
        var latLng = new L.latLng(lat, lng)
        var transX = MyMap.latLngToLayerPoint(latLng).x
        var transY = MyMap.latLngToLayerPoint(latLng).y
        gpsX.setAttribute("transform", "")
        //elem.removeAttribute("transform")

        var transformRequestObj = mySVG.createSVGTransform()

        var animTransformList = gpsX.transform

        var transformList = animTransformList.baseVal
        transformRequestObj.setTranslate(transX, transY)
        transformList.appendItem(transformRequestObj)
        transformList.consolidate()
        GPSX.style("display", "block")
    }

}