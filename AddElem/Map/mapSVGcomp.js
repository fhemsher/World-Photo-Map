	/*
	Destination point given distance and bearing from start point
	Given a start point, initial bearing, and distance, this will calculate the destination point and final bearing travelling along a (shortest distance) great circle arc.
the bearing (clockwise from north), d is the angular distance d/R; d being the distance requested, R the earth’s radius
	(all angles in radians)
	--convert lat/lng to radians
	Radians = Degrees * PI / 180
	Degrees = Radians * 180 / PI

	nsew:bearing, convert to radians---
	0 north
	90 east
	180 south
	-90 west
	*/
 //---required to initially set pixels vs requested KM in AddElem---

function getTargetLatLng(lat1,lng1,distKm,bearing)
{
	var d=distKm
	var rlat1=lat1*(Math.PI / 180)
	var rlng1=lng1*(Math.PI / 180)
	var brng=bearing*(Math.PI / 180)
	var R=6371  //---km
	var rlat2 = Math.asin( Math.sin(rlat1)*Math.cos(d/R) +
	Math.cos(rlat1)*Math.sin(d/R)*Math.cos(brng) );
	var rlng2 = rlng1 + Math.atan2(Math.sin(brng)*Math.sin(d/R)*Math.cos(rlat1),
	Math.cos(d/R)-Math.sin(rlat1)*Math.sin(rlat2));

	var lat2=rlat2*(180/Math.PI);
	var lng2=rlng2*(180/Math.PI);
	return [lat2,lng2]
}

//----distance(km) between 2 svg points---

function mapKM(svgX1,svgY1,svgX2,svgY2)
{
	var svgPnt1=L.point(svgX1,svgY1)
	var mapLatLng1=MyMap.layerPointToLatLng(svgPnt1)
	var svgPnt2=L.point(svgX2,svgY2)
	var mapLatLng2=MyMap.layerPointToLatLng(svgPnt2)
	var distanceKm = mapLatLng1.distanceTo(mapLatLng2)/1000;
	return distanceKm.toFixed(4)
}
//---return x,y from requested lat/lng---
function svgXYll(lat,lng)
{
	var latLng= new  L.latLng(lat, lng)
	var x=MyMap.latLngToLayerPoint(latLng).x
	var y=MyMap.latLngToLayerPoint(latLng).y
  	return [x,y]

}

//---return  transformed x,y from computed x,y---
function XY(x,y)
{
   	var pnt = domSVG.createSVGPoint();
	pnt.x = x
	pnt.y = y
	var sCTM = domSVG.getScreenCTM();
	var PNT = pnt.matrixTransform(sCTM.inverse());
  	return {x:PNT.x,y:PNT.y}
}




//---real numbers---
function numberWithCommas(str)
 {
  return (str + "").replace(/\b(\d+)((\.\d+)*)\b/g, function(a, b, c) {
    return (b.charAt(0) > 0 && !(c || ".").lastIndexOf(".") ? b.replace(/(\d)(?=(\d{3})+$)/g, "$1,") : b) + c;
  });
}
//--timedelay to check asp xml updates---
var XMLFile
function aspResponse()
{
  alert(XMLFile.responseText)
}
//---check svg element's svg properties---
function svgValue(svgElem)
{
 myValue.value+=new XMLSerializer().serializeToString(svgElem)+"\n\n"
}
function clearMyValue()
{
 myValue.value=""
}
