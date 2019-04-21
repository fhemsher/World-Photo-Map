
var NS = "http://www.w3.org/2000/svg"
var MySVG
var BoundsRect
var CaveG
//---called via onload---
var MyMap
function initD3Svg()
{

    L.mapbox.accessToken = 'pk.eyJ1IjoiZmhlbXNoZXIiLCJhIjoiODQ5MW9WayJ9.px2P6wVMFucfXHE1zmDA1A';
    MyMap = L.mapbox.map('MyMap', 'mapbox.streets', {doubleClickZoom: false, zoomControl:false,center: new L.latLng(20,10),zoom:1,minZoom:1});
    MyMap.on("viewreset", zoomUpdate);

    window.name = 'parentWindow'; //---required for add Path---

	MyMap._initPathRoot()
    MySVG =d3.select("#MyMap").select("svg")
    MySVG.attr("id","mySVG")
    MySVG.style("cursor","default")


    var defs = MySVG.append("defs")
    .attr("id", "endArrowDefs")
    .append("marker")
    .attr("id", "endArrow")
    .attr("viewBox", "0 0 8000 8000")
    .attr("vector-effect", "non-scaling-stroke")
    .attr("refX", "250")
    .attr("refY", "150")
    .attr("markerUnits", "strokeWidth")
    .attr("markerWidth", "300")
    .attr("markerHeight", "300")
    .attr("orient", "auto")
    .attr("fill", "violet")
    .attr("stroke-linejoin", "bevel")
    .append("path")
    .attr("d", "M2 59,293 148,1 243,121 151,Z")
    .attr("stroke", "RGB(0,0,0)")
    defs.append("marker")
    .attr("id", "cloneArrow")
    .attr("viewBox", "0 0 8000 8000")
    .attr("vector-effect", "non-scaling-stroke")
    .attr("refX", "250")
    .attr("refY", "150")
    .attr("markerUnits", "strokeWidth")
    .attr("markerWidth", "300")
    .attr("markerHeight", "300")
    .attr("orient", "auto")
    .attr("fill", "RGB(0,0,0)")
    .attr("stroke-linejoin", "bevel")
    .append("path")
    .attr("d", "M2 59,293 148,1 243,121 151,Z")
    .attr("stroke", "RGB(0,0,0)")


    //--holds all path end arrows---
    MySVG.append("defs")
    .attr("id", "arrowDefs")


    var defsPattern=MySVG.append("defs")
    .attr("id","defsPattern")

    var defsGradient=MySVG.append("defs")
    .attr("id","defsGradient")
    var defsShadow=MySVG.append("defs")
    .attr("id","defsShadow")
    var filter = defsShadow.append("filter")
    .attr("id", "drop-shadow")
    .attr("height", "150%")
    .attr("width", "150%");
    filter.append("feGaussianBlur")
    .attr("in", "SourceAlpha")
    .attr("stdDeviation", 5)
    .attr("result", "blur");
    filter.append("feOffset")
    .attr("in", "blur")
    .attr("dx", 5)
    .attr("dy", 5)
    .attr("result", "offsetBlur");
    var feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode")
    .attr("in", "offsetBlur")
    feMerge.append("feMergeNode")
    .attr("in", "SourceGraphic");


    var defs3DPipe=MySVG.append("defs")
    .attr("id", "pipe3dDefs")
    var pipeFilter=defs3DPipe.append("filter")
    .attr("id","pipe3D")
    pipeFilter.append("feFlood").attr("flood-color","black")
    pipeFilter.append("feComposite").attr("operator","out").attr("in2","SourceGraphic")
    pipeFilter.append("feGaussianBlur").attr("stdDeviation","6")
    pipeFilter.append("feComposite").attr("operator","atop").attr("in2","SourceGraphic")

    ElemG = MySVG.append("g")
    .attr("id", "domElemG")
    .attr("shape-rendering","geometricPrecision")
    .attr("text-rendering", "geometricPrecision")
    .attr("class", "noselect")

    BoundsRect=MySVG.append("rect")
    .attr("id","boundsRect")
    .attr("pointer-events","none")
    .attr("rx","12")
    .attr("ry","12")
    .attr("x","0")
    .attr("y","0")
    .style("visibility","hidden")
    .attr("stroke","#004953")
    .attr("fill-opacity","0.2")
    .attr("fill","none")
    .attr("stroke-width","2")
    .attr("stroke-dasharray","15 3")

}
