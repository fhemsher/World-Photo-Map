L.mapbox.accessToken = 'pk.eyJ1IjoiZmhlbXNoZXIiLCJhIjoiODQ5MW9WayJ9.px2P6wVMFucfXHE1zmDA1A';
var MyMap = L.mapbox.map('MyMap', 'mapbox.streets', {doubleClickZoom: false, zoomControl:false,center: new L.latLng(20,10),zoom:1,minZoom:1});


   new L.Control.Zoom({ position: 'topright' }).addTo(MyMap);



MyMap.on('moveend', function(e)
{


    if(CoverRect.style("display") !="none")
    {
        var bbRect = mapContainerDiv.getBoundingClientRect();
        var x = bbRect.left
        var y = bbRect.top
        var width=bbRect.width
        var height=bbRect.height
        var pnt = domSVG.createSVGPoint();
        pnt.x = x;
        pnt.y = y;
        var sCTM = domSVG.getScreenCTM();
        var PNT = pnt.matrixTransform(sCTM.inverse());
        var rectX=PNT.x
        var rectY=PNT.y

        CoverRect.attr("x",0)
        CoverRect.attr("y",0)
        CoverRect.attr("width",width)
        CoverRect.attr("height",height)
        CoverRect.attr("transform","translate("+rectX+" "+rectY+")" )
    }
});

var d3SVG  //---d3 set SVG---
var TimelineG  //---timelined symbols && paths---

var AddElemG //---all added elems container---
var SymbolG  //---all symbols container---
var CoverRect
var ActiveElemG
var Wrapper //---svg wrapper---
var DrawX
var LatLonPanX
var DragDot //---used for circles/rects---

var BoundsRect
var BoundsCenter
var Login=false
var XMLloginArray=[] //---places + non-owner visitors
var XMLActiveLoginArray=[] //---This specific user owned+visits
var XMLBounds
var Admin=false
var oNAME
var oEMAIL
var uEMAIL
var PlaceNAME
var PlaceDescription
var UserOwnerEmail //--my community select:login.htm
var SendOwnerEmail //--my community select:login.htm
var ID
var FOLDER
var RegisterOK=false
var ActiveElem=null
var SymbolG
var temp="zyKi33753Yam181941DaNAPAIgeLj"
var Referrer=false
var ReferrerFolder=null
var XMLCommunitiesDoc //---filled via getCommunities()---
var XMLUsersDoc //---filled via getCommunities()---
var Visitor=false
var NewUser=false
var CookieOK=true  //---check user computer public?---
var ActiveFolderArray=[] //--validate cookie folder and remove if folder was removed---
 var NS="http://www.w3.org/2000/svg"
function initMap()
{
	window.name = 'parentWindow'; //---required for add Path---


	MyMap._initPathRoot()  //---svg layer in Leaflet---

	d3SVG=d3.select("#MyMap").select("svg")
	d3SVG.attr("id","domSVG")
	d3SVG.style("visibility","hidden")
	d3SVG.attr("overflow","hidden")
	d3SVG.attr("stroke","black")
	d3SVG.attr("stroke-width",".25")

	AddElemG = d3SVG.append("g");
	AddElemG.attr("id","domAddElemG")
	SymbolG = d3SVG.append("g");
	SymbolG.attr("id","symbolG")
	//---text/icon/path drag protect---
	CoverRect = d3SVG.append("rect")
	.style("display","none")
	.attr("id","coverRect")
	.attr("x",0)
	.attr("y",0)
	.attr("width","100%")
	.attr("height","100%")
	.attr("fill","white")
	.attr("opacity",0)

	//---holds on the single Active Elem under construction---
	//---top of svg ---
	ActiveElemG = d3SVG.append("g");
	ActiveElemG.attr("id","domActiveElemG")

	//--svg elem used as temp container to find native center of tranformed elem for active elem roatation---
	Wrapper=d3SVG.append("svg")
  	.style("display","block")
	.attr("width","100%")
	.attr("height","100%")
	.attr("overflow","visible")
	.attr("id","domWrapper")
   
	DrawX=ActiveElemG.append("g")
	.style("display","none")
	.attr("id","domDrawX")
	.attr("stroke","honeydew")
	.attr("stroke-width","1")
	.attr("pointer-events","none")
	DrawX.append("circle")
	.attr("cx","0")
	.attr("cy","0")
	.attr("r","4")
	.attr("fill","honeydew")
	DrawX.append("line")
	.attr("x1","0")
	.attr("y1","-50%")
	.attr("x2","0")
	.attr("y2","50%")
	DrawX.append("line")
	.attr("x1","-50%")
	.attr("y1","0")
	.attr("x2","50%")
	.attr("y2","0")

    DragDot=d3SVG.append("circle")
	.attr("id","dragDot")
	.attr("class","dragTargetObj")
	.attr("cx","0")
	.attr("cy","0")
	.attr("r","8")
	.attr("fill","white")
	.attr("fill-opacity",".5")
	.attr("stroke","black")
	.attr("stroke-width","1")
    .style("visibility","hidden")
	.style("cursor","default")

	BoundsRect=d3SVG.append("rect")
	.attr("id","boundsRect")
	.attr("pointer-events","none")
	.attr("rx","12")
	.attr("ry","12")
	.style("x","0")
	.style("y","0")
	.style("visibility","hidden")
	.attr("stroke","#004953")
	.attr("fill-opacity","0.4")
	.attr("fill","none")
	.attr("stroke-width","1")
	.attr("stroke-dasharray","15 3")

	BoundsCenter=d3SVG.append("g")
	.attr("id","boundsCenter")
	.style("display","none")
	.attr("stroke","#004953")
	.attr("stroke-width","1")
	BoundsCenter.append("circle")
	.attr("cx","0")
	.attr("cy","0")
	.attr("r","10")
	.attr("fill","white")
	BoundsCenter.append("line")
	.attr("x1","0")
	.attr("y1","-50%")
	.attr("x2","0")
	.attr("y2","50%")
	BoundsCenter.append("line")
	.attr("x1","-50%")
	.attr("y1","0")
	.attr("x2","50%")
	.attr("y2","0")

	LatLonPanX=d3SVG.append("g")
	.style("display","none")
	.attr("id","domLLPanX")
	.attr("stroke","linen")
	.attr("stroke-width","1")
	.attr("pointer-events","none")
	LatLonPanX.append("circle")
	.attr("cx","0")
	.attr("cy","0")
	.attr("r","4")
	.attr("fill","linen")
	LatLonPanX.append("line")
	.attr("x1","0")
	.attr("y1","-50%")
	.attr("x2","0")
	.attr("y2","50%")
	LatLonPanX.append("line")
	.attr("x1","-50%")
	.attr("y1","0")
	.attr("x2","50%")
	.attr("y2","0")

    //	<defs id="arrowDefs"><marker colorId="RGB(0,0,0)" id="endArrow" viewBox="0 0 8000 8000" refX="250" refY="150"	markerUnits="strokeWidth" markerWidth="300" markerHeight="300" orient="auto"  fill="RGB(0,0,0)" stroke-linejoin="bevel" ><path stroke="RGB(0,0,0)" stroke-width="5" d="M2 59,293 148,1 243,121 151,Z" /></marker><marker colorId="RGB(0,0,0)" id="arrowStartClone" viewBox="0 0 8000 8000" refX="30" refY="147.5"	markerUnits="strokeWidth" markerWidth="300" markerHeight="300" orient="auto"  fill="RGB(0,0,0)" stroke-linejoin="bevel" ><path stroke="rgb(0,0,0)" stroke-width="5" d="M4 147,299 60,159 148,299 251,Z" /></marker></defs>
    //---add end arrow defs marker during drawing polylines---
    var defs=d3SVG.append("defs")
    .append("marker")
    .attr("id","endArrow")
    .attr("viewBox","0 0 8000 8000")
    .attr("refX","250")
    .attr("refY","150")
    .attr("markerUnits","strokeWidth")
    .attr("markerWidth","300")
    .attr("markerHeight","300")
    .attr("orient","auto")
    .attr("fill","white")
    .attr("stroke-linejoin","bevel")
    .append("path")
    .attr("d","M2 59,293 148,1 243,121 151,Z")
    .attr("stroke","RGB(0,0,0)")
    defs.append("marker")
    .attr("id","cloneArrow")
    .attr("viewBox","0 0 8000 8000")
    .attr("refX","250")
    .attr("refY","150")
    .attr("markerUnits","strokeWidth")
    .attr("markerWidth","300")
    .attr("markerHeight","300")
    .attr("orient","auto")
    .attr("fill","RGB(0,0,0)")
    .attr("stroke-linejoin","bevel")
    .append("path")
    .attr("d","M2 59,293 148,1 243,121 151,Z")
    .attr("stroke","RGB(0,0,0)")

    //--holds all path end arrows---
    var arrowDefs=d3SVG.append("defs")
    .attr("id","arrowDefs")



 //	MyMap.on("viewreset", zoomUpdate);
    MyMap.on('contextmenu', function(event)
    {
        event.returnValue = false;
        if (event.preventDefault) event.preventDefault();
    })


    MyMap.on('locationfound', onLocationFound);
    setGeoloc() 
}//--END INIT


mapContainerDiv.addEventListener('contextmenu', function(evt)
{

   evt.preventDefault();
}, false);


function setGeoloc()
{
	MyMap.locate({setView: true, maxZoom: 16});
}
var GeoMarker
function onLocationFound(e)
{
	var radius = e.accuracy / 2;
	GeoMarker=L.marker(e.latlng)
	GeoMarker.addTo(MyMap)
		.bindPopup("Your internet connection is here.").openPopup();
}

