
var MapZoom
function zoomUpdate()
{
   zoomUpdateAddElems()
    MapZoom=MyMap.getZoom()






}

function zoomUpdateBoundsRect(mapZoom)
{
	boundsRect.setAttribute("transform","")

	var transformRequestObj=mySVG.createSVGTransform()
	var animTransformList=boundsRect.transform
	var transformList=animTransformList.baseVal

	var lat=parseFloat(boundsRect.getAttribute("lat"))
	var lng=parseFloat(boundsRect.getAttribute("lng"))
	var latLng= new  L.latLng(lat, lng)
	var transX=MyMap.latLngToLayerPoint(latLng).x
	var transY=MyMap.latLngToLayerPoint(latLng).y

	transformRequestObj.setTranslate(transX,transY)
	transformList.appendItem(transformRequestObj)
	transformList.consolidate()

	var initZoom=parseInt(boundsRect.getAttribute("InitZoom"),10)
	var scale = (Math.pow(2, mapZoom)/2)/(Math.pow(2, initZoom)/2);
	transformRequestObj.setScale(scale,scale)
	transformList.appendItem(transformRequestObj)
	transformList.consolidate()
    if(mapZoom<initZoom-2)
         boundsRect.setAttribute("fill","#A020F0")
    else
       boundsRect.setAttribute("fill","none")


}






function zoomUpdateAddElems()
{


      var elems=domElemG.childNodes

	for(var k=0;k<elems.length;k++)
	{
		var elem=elems.item(k)

        var myClass=elem.getAttribute("class")



        var ctm = elem.getCTM()
        RAD2DEG = 180 / Math.PI;
        var rotate = Math.atan2(ctm.b, ctm.a) * RAD2DEG;


		elem.setAttribute("transform","")
		//elem.removeAttribute("transform")

		var transformRequestObj=mySVG.createSVGTransform()

		var animTransformList=elem.transform

		var transformList=animTransformList.baseVal

		var lat=parseFloat(elem.getAttribute("lat"))
		var lng=parseFloat(elem.getAttribute("lng"))


		var latLng= new  L.latLng(lat, lng)
		var transX=MyMap.latLngToLayerPoint(latLng).x
		var transY=MyMap.latLngToLayerPoint(latLng).y

		transformRequestObj.setTranslate(transX,transY)
		transformList.appendItem(transformRequestObj)
		transformList.consolidate()
       if(rotate!=0)
		{
	      transformRequestObj.setRotate(rotate,0,0)
				transformList.appendItem(transformRequestObj)
				transformList.consolidate()
		}


        	var mapZoom=MyMap.getZoom()
    		var initZoom=+elem.getAttribute("InitZoom")

    		    var scale = (Math.pow(2, mapZoom)/2)/(Math.pow(2, initZoom)/2);


    		transformRequestObj.setScale(scale,scale)
    		transformList.appendItem(transformRequestObj)
    		transformList.consolidate()

     }


    if(BoundsRect.style("visibility")=="visible")
    {

    	var mapZoom=MyMap.getZoom()
      zoomUpdateBoundsRect(mapZoom)
    }

}


