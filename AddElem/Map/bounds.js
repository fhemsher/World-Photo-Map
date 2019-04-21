


//---return  transformed x,y from computed x,y---
function XY(x, y)
{
    var pnt = mySVG.createSVGPoint();
    pnt.x = x
    pnt.y = y
    var sCTM = mySVG.getScreenCTM();
    var PNT = pnt.matrixTransform(sCTM.inverse());
    return {x: PNT.x, y: PNT.y}
}
function mapKM(svgX1,svgY1,svgX2,svgY2)
{
	var svgPnt1=L.point(svgX1,svgY1)
	var mapLatLng1=MyMap.layerPointToLatLng(svgPnt1)
	var svgPnt2=L.point(svgX2,svgY2)
	var mapLatLng2=MyMap.layerPointToLatLng(svgPnt2)
	var distanceKm = mapLatLng1.distanceTo(mapLatLng2)/1000;
	return distanceKm.toFixed(4)
}

//---
var MyMapZoom
var MyMapCenterLat
var MyMapCenterLng

function setMapBounds()
{

    MyMapZoom = MyMap.getZoom()
    var center = MyMap.getCenter()
    MyMapCenterLat = center.lat
    MyMapCenterLng = center.lng

    var bbRect = mapContainerDiv.getBoundingClientRect();
    var x = bbRect.left
    var y = bbRect.top
    var width = window.innerWidth
    var height = window.innerHeight


    var pnt = mySVG.createSVGPoint();
    pnt.x = x;
    pnt.y = y;
    var sCTM = mySVG.getScreenCTM();
    var PNT = pnt.matrixTransform(sCTM.inverse());
    var rectX = PNT.x
    var rectY = PNT.y

    //----asociated map lat/lng values---
    var svgPnt = L.point(rectX, rectY)
    var rectLatLng = MyMap.layerPointToLatLng(svgPnt)
    var rectLat = rectLatLng.lat
    var rectLng = rectLatLng.lng

    BoundsRect.attr("InitZoom", MyMapZoom)
    BoundsRect.attr("rectX", rectX)
    BoundsRect.attr("rectY", rectY)
    BoundsRect.attr("lat", rectLat)
    BoundsRect.attr("lng", rectLng)

    BoundsRect.attr("x", 0)
    BoundsRect.attr("y", 0)
    BoundsRect.attr("width", width)
    BoundsRect.attr("height", height)


    BoundsRect.attr("transform", "translate("+rectX+" "+rectY+")")

    BoundsRect.style("visibility","visible")

    myMapBounds()

}

var MyMapLatUL
var MyMapLngUL
var MyMapLatLR
var MyMapLngLR
function myMapBounds()
{
    var bbRect = mapContainerDiv.getBoundingClientRect();
    var x = bbRect.left
    var y = bbRect.top
    var width = window.innerWidth
    var height = window.innerHeight

    var trans=XY(x,y)
    //---screen computed---
    var x=trans.x
    var y=trans.y
    var ulX=x
    var ulY=y
    var ulPnt=L.point(ulX,ulY)
    var latLngUL=MyMap.layerPointToLatLng(ulPnt)

    var lrX=x+width
    var lrY=y+height
    var lrPnt=L.point(lrX,lrY)
    var latLngLR=MyMap.layerPointToLatLng(lrPnt)

    MyMapLatUL=latLngUL.lat
    MyMapLngUL=latLngUL.lng
    MyMapLatLR=latLngLR.lat
    MyMapLngLR=latLngLR.lng
}

//---click on ??---
function myMapCenterView()
{
   if(MyMapCenterLat)
   {
	  MyMap.setView([MyMapCenterLat,MyMapCenterLng],MyMapZoom)

   }
}
