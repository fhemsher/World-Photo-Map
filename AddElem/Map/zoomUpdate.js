
var ZoomEditId
function myZoomLevel(level,elem)
{

  if(document.getElementById(elem.id) )
  {
    ZoomEditId=elem.id



    var editElem=elem.cloneNode(true)
    domWrapper.appendChild(editElem)
    var bb=domWrapper.getBBox()
     domWrapper.removeChild(editElem)
     var bbx=bb.x
     var bby=bb.y
     var bbw=bb.width
     var bbh=bb.height
     zoomRect.setAttribute("x",bbx)
     zoomRect.setAttribute("y",bby)
     zoomRect.setAttribute("width",bbw)
     zoomRect.setAttribute("height",bbh)
     if(level==MapZoom)
     {
      elemLevelSpan.style.background="lime"
      zoomRect.setAttribute("stroke","lime")

     }
      else
      {
         elemLevelSpan.style.background="red"
         zoomRect.setAttribute("stroke","red")

      }
      zoomRect.setAttribute("display","block")
     elemLevelSpan.innerHTML=level
    }
    else ZoomEditId=null

}
function removeZoomLevel()
{
     elemLevelSpan.innerHTML=""
     zoomRect.setAttribute("display","none")
}


var MapZoom=2
function zoomUpdate()
{
   MapZoom=MyMap.getZoom()
    var elemZoomLevel=+elemLevelSpan.innerHTML
    zoomLevelSpan.innerHTML=MapZoom
    emDiv.style.visibility="hidden"
   zoomUpdateAddElems()
  /*
   if(EditMapId)
   {
   zoomUpdateAddElems()
    MapZoom=MyMap.getZoom()
    var elemZoomLevel=+elemLevelSpan.innerHTML
    zoomLevelSpan.innerHTML=MapZoom
    if(ZoomEditId&&document.getElementById(ZoomEditId))
    {
        var editElem=document.getElementById(ZoomEditId).cloneNode(true)
      var level=+editElem.getAttribute("InitZoom")
    domWrapper.appendChild(editElem)
    var bb=domWrapper.getBBox()
     domWrapper.removeChild(editElem)
     var bbx=bb.x
     var bby=bb.y
     var bbw=bb.width
     var bbh=bb.height
     zoomRect.setAttribute("x",bbx)
     zoomRect.setAttribute("y",bby)
     zoomRect.setAttribute("width",bbw)
     zoomRect.setAttribute("height",bbh)
     if(level==MapZoom)
     {
      elemLevelSpan.style.background="lime"
      zoomRect.setAttribute("stroke","lime")

     }
      else
      {
         elemLevelSpan.style.background="red"
         zoomRect.setAttribute("stroke","red")

      }
      zoomRect.setAttribute("display","block")
     }
   }
   */
     zoomOutImage.src="Images/zoom-out.png"

     ZoomOut=true

}

var ZoomOut=false
function zoomOut()
{

  if(ZoomOut==true)
  {

    MyMap.setView([20,10],2)
     ZoomOut=false
    setTimeout('zoomOutImage.src="Images/zoom-out-grey.png"',800)
      emDiv.style.visibility="visible"    
  }




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

      var level=+BoundsRect.attr("InitZoom")
       zoomRect.setAttribute("display","none")
    /*
    if(level==MapZoom)
     {
      elemLevelSpan.style.background="lime"


     }
      else
      {
         elemLevelSpan.style.background="red"

      }

     elemLevelSpan.innerHTML=level
     */
}



//---map on drag---
function translateCoverRect()
{

    var bbRect = mapContainerDiv.getBoundingClientRect();
    var x = bbRect.left
    var y = bbRect.top
    var width=bbRect.width
    var height=bbRect.height
    var pnt = mySVG.createSVGPoint();
    pnt.x = x;
    pnt.y = y;
    var sCTM = mySVG.getScreenCTM();
    var PNT = pnt.matrixTransform(sCTM.inverse());
    var rectX=PNT.x
    var rectY=PNT.y


    CoverRect.attr("x",rectX)
    CoverRect.attr("y",rectY)


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
              console.log(initZoom)
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
    if(gpsX.style.display!="none")
    {         gpsX.setAttribute("transform","")
        var transformRequestObj=mySVG.createSVGTransform()

		var animTransformList=gpsX.transform

		var transformList=animTransformList.baseVal

        var latLng= new  L.latLng(SVGLatSet, SVGLngSet)
         var transX=MyMap.latLngToLayerPoint(latLng).x
		var transY=MyMap.latLngToLayerPoint(latLng).y

		transformRequestObj.setTranslate(transX,transY)
		transformList.appendItem(transformRequestObj)
		transformList.consolidate()

    }


}



