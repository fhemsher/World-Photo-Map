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

            if(addElemCircleViz==true)trackDrawCircle()
                if(addElemEllipseViz==true)trackDrawEllipse()
                if(addElemRectViz==true)trackDrawRect()

                if(DrawTextStarted==true)trackDrawText()
                if(DrawPath==true||DrawPathStart==true)trackDrawPath()
                if(DrawPathEdit==true)trackDrawPathEdit()

                if(addElemPolygonViz==true)trackDrawPolygon()
            //    if(addElemMapViz==true)trackDrawMap()

                if(addElemImageViz==true)trackDrawImage()
               //----GPS---
                var svgPnt=L.point(SVGx,SVGy)
                SVGLatLng=MyMap.layerPointToLatLng(svgPnt)
                SVGLat=SVGLatLng.lat
                SVGLng=SVGLatLng.lng
                if(!SetGPS)
                gpsValue.value="GPS: "+SVGLat+", "+SVGLng
                if(gpsCheck.checked && !SetGPS)
                     gpsX.setAttribute("transform","translate("+SVGx+" "+SVGy+")")


        }
    );



}
