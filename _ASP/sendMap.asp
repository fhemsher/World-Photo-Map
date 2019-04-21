<%@ Language=javascript %>
<%
	var sendXML =  Server.CreateObject("Msxml2.DOMDocument.6.0");
	sendXML.load(Request)

	var mySVG=sendXML.documentElement

    var updateMapSVG = Server.CreateObject("Msxml2.DOMDocument.6.0");
    var svgFile='../LIBRARY/Map.svg'
    var svgMap=Server.MapPath(svgFile)
    updateMapSVG.load(svgMap)

    var docSVG=updateMapSVG.documentElement

    docSVG.appendChild(mySVG)
    updateMapSVG.save(svgMap)

   Response.Write("OK")

%>