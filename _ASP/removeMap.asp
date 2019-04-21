<%@ Language=javascript %>
<%
	var sendXML =  Server.CreateObject("Msxml2.DOMDocument.6.0");
	sendXML.load(Request)

	var remove=sendXML.documentElement
    var myId=remove.getAttribute("myId")
    
    var updateMapSVG = Server.CreateObject("Msxml2.DOMDocument.6.0");
    var svgFile='../LIBRARY/Map.svg'
    var svgMap=Server.MapPath(svgFile)
    updateMapSVG.load(svgMap)

    var docSVG=updateMapSVG.documentElement
    for(var k=0;k<docSVG.childNodes.length;k++)
    {
       var svg=docSVG.childNodes.item(k)
       var id=svg.getAttribute("id")
       if(id==myId)
       {
         docSVG.removeChild(svg)
          Response.Write("OK")
            updateMapSVG.save(svgMap)
          break;


       }


    }





%>