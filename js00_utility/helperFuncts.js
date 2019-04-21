//----text user input filter so xml 'string' doesn't crash----
function txt2xml(inputTxt)
{
        var reAmp=/&/g
        var reQuote=/"/g
        var reApost=/'/g
        var reGT=/>/g
        var reLT=/</g
        var inputTxt1=inputTxt.replace(reAmp,"AMP")
        var inputTxt2=inputTxt1.replace(reQuote,"QUOTE")
        var inputTxt3=inputTxt2.replace(reApost,"APOST")
        var inputTxt4=inputTxt3.replace(reGT,"GT")
        var safeXml=inputTxt4.replace(reLT,"LT")

return safeXml
}
// into a text or textarea...exactly as user plugged it in
function xml2txt(inputXml)
{
        var reAmp=/AMP/g
        var reQuote=/QUOTE/g
        var reApost=/APOST/g
        var reGT=/GT/g
        var reLT=/LT/g
    if(inputXml)
    {
        var inputXml1=inputXml.replace(reAmp,"&")
        var inputXml2=inputXml1.replace(reQuote,"\"")
        var inputXml3=inputXml2.replace(reApost,"'")
        var inputXml4=inputXml3.replace(reGT,">")
        var text=inputXml4.replace(reLT,"<")
    return text
    }
    else
    return "";

}

function getSmoothPathDistance()
{
  var smoothPathLength=drawPathSmooth.getTotalLength()
        var segCnt=(smoothPathLength/30).toFixed(0)
         var prevPnt=drawPathSmooth.getPointAtLength(0)
         var smoothDistance=0
        for(var k=0;k<segCnt;k++)
        {
           var len=30*k
           if(len<smoothPathLength)
           {
                var pnt=drawPathSmooth.getPointAtLength(len)
                var x=pnt.x
                var y=pnt.y
                //---prev----
                var svgPntPrev=L.point(prevPnt.x,prevPnt.y)
                var latLng1=MyMap.layerPointToLatLng(svgPntPrev)
                var svgPnt=L.point(x,y)
                var latLng2=MyMap.layerPointToLatLng(svgPnt)
                smoothDistance+=latLng1.distanceTo(latLng2)

                 prevPnt=pnt


           }
           else
            break;

        }

        TotalDistance=+smoothDistance.toFixed(0)


}
///---drag path points ---linear----
function getPathDistance()
{
  var pathLength=activeElem.getTotalLength()
        var segCnt=(pathLength/30).toFixed(0)
         var prevPnt=activeElem.getPointAtLength(0)
         var distance=0
        for(var k=0;k<segCnt;k++)
        {
           var len=30*k
           if(len<pathLength)
           {
                var pnt=activeElem.getPointAtLength(len)
                var x=pnt.x
                var y=pnt.y
                //---prev----
                var svgPntPrev=L.point(prevPnt.x,prevPnt.y)
                var latLng1=MyMap.layerPointToLatLng(svgPntPrev)
                var svgPnt=L.point(x,y)
                var latLng2=MyMap.layerPointToLatLng(svgPnt)
                distance+=latLng1.distanceTo(latLng2)

                 prevPnt=pnt


           }
           else
            break;

        }

        TotalDistance=+distance.toFixed(0)


}


function jsonCSV(objArray)
{
    var array = typeof objArray != 'object'? JSON.parse(objArray): objArray;
    var str = 'xData,yData\r\n';

    for (var i = 0; i < array.length; i++)
    {
        var line = '';
        for (var index in array[i])
        {
            if (line != '') line += ','

                line += array[i][index];
        }

        str += line + '\r\n';
    }

    return str;
}

//var csv is the CSV file with headers
function csvJSON(csv)
{

    var lines = csv.split("\n");

    var result =[];

    var headers = lines[0].split(",");

    for(var i = 1; i<lines.length; i++)
    {

        var obj =
        {
        };

        var currentline = lines[i].split(",");

        for(var j = 0; j<headers.length; j++)
        {
            obj[headers[j]] = currentline[j];
        }

        result.push(obj);

    }

    //return result; //JavaScript object
    return result //JSON.stringify(result); //JSON
}

//---except arc paths---
function screenPath(path)
{
    var sCTM = path.getCTM()
    var svgRoot = path.ownerSVGElement

    var segList = path.pathSegList
    var segs = segList.numberOfItems
    //---change segObj values
    for(var k = 0; k<segs; k++)
    {
        var segObj = segList.getItem(k)

        if(segObj.x && segObj.y)
        {
            var mySVGPoint = svgRoot.createSVGPoint();
            mySVGPoint.x = segObj.x
            mySVGPoint.y = segObj.y
            mySVGPointTrans = mySVGPoint.matrixTransform(sCTM)
            segObj.x = mySVGPointTrans.x
            segObj.y = mySVGPointTrans.y
        }

        if(segObj.x1 && segObj.y1)
        {
            var mySVGPoint1 = svgRoot.createSVGPoint();
            mySVGPoint1.x = segObj.x1
            mySVGPoint1.y = segObj.y1
            mySVGPointTrans1 = mySVGPoint1.matrixTransform(sCTM)
            segObj.x1 = mySVGPointTrans1.x
            segObj.y1 = mySVGPointTrans1.y
        }
        if(segObj.x2 && segObj.y2)
        {
            var mySVGPoint2 = svgRoot.createSVGPoint();
            mySVGPoint2.x = segObj.x2
            mySVGPoint2.y = segObj.y2
            mySVGPointTrans2 = mySVGPoint2.matrixTransform(sCTM)
            segObj.x2 = mySVGPointTrans2.x
            segObj.y2 = mySVGPointTrans2.y
        }
    }
    //---force removal of transform--
    path.setAttribute("transform", "")
    path.removeAttribute("transform")
}

function getPosition(el)
{
    var xPosition = 0;
    var yPosition = 0;

    xPosition += (el.offsetLeft - el.scrollLeft + el.clientLeft);
    yPosition += (el.offsetTop - el.scrollTop + el.clientTop);

    return {x:xPosition,y:yPosition};

}
function reverse(s)
{
    return s.split('').reverse().join('');
}
//=================================================================================
//---Usage: decomposeMatrix(document.getElementById('myElement').getCTM())
function deltaTransformPoint(matrix, point)
{

    var dx = point.x * matrix.a + point.y * matrix.c + 0;
    var dy = point.x * matrix.b + point.y * matrix.d + 0;
    return {x: dx, y: dy};

}

function decomposeMatrix(matrix)
{

    // @see https://gist.github.com/2052247

    // calculate delta transform point
    var px = deltaTransformPoint(matrix,
        {
        x: 0, y: 1
        }
    );
    var py = deltaTransformPoint(matrix,
        {
        x: 1, y: 0
        }
    );

    // calculate skew
    var skewX = ((180 / Math.PI) * Math.atan2(px.y, px.x) - 90);
    var skewY = ((180 / Math.PI) * Math.atan2(py.y, py.x));

    return {translateX: matrix.e,translateY: matrix.f,scaleX: Math.sqrt(matrix.a * matrix.a + matrix.b * matrix.b),scaleY: Math.sqrt(matrix.c * matrix.c + matrix.d * matrix.d),skewX: skewX,skewY: skewY,rotation: skewX};

}

//---rotate elem----
function rote(id, angle)
{

    var domElem = document.getElementById(id)
    var transformRequestObjRote = mySVG.createSVGTransform()
    var animTransformListRote = domElem.transform
    var transformList = animTransformListRote.baseVal
    transformRequestObjRote.setRotate(angle, 0, 0)
    transformList.appendItem(transformRequestObjRote)
    transformList.consolidate()

    var ctm = domElem.getCTM()
    RAD2DEG = 180 / Math.PI;
    RotateAngle = Math.atan2(ctm.b, ctm.a) * RAD2DEG;

}
//---used when adding/editing elements---
function coverOn()
{

    CoverRect.style("display", "block")

    domElemG.setAttribute("pointer-events", "none")

}
function coverOff()
{

    CoverRect.style("display", "none")

    domElemG.removeAttribute("pointer-events")

}
function points2degAz(x1,y1,x2,y2)
{
    var atan2=Math.atan2((y2-y1),(x2-x1))
    var svgDeg=atan2*57.2957795
    //===atan2 serves minus value at>270 deg---
    if(svgDeg<0)svgDeg=svgDeg+360

    if(svgDeg<=270)
        var degAz=90+svgDeg
    else
        var degAz=svgDeg-270

    return degAz
}
    function _toRad(deg) {
    return deg * Math.PI / 180;
    }
    function _toDeg (rad) {
    return rad * 180 / Math.PI;
    }

function bearing(lat1,lng1,lat2,lng2)
{
    var dLon = (lng2-lng1);
    var y = Math.sin(dLon) * Math.cos(lat2);
    var x = Math.cos(lat1)*Math.sin(lat2) - Math.sin(lat1)*Math.cos(lat2)*Math.cos(dLon);
    var brng = this._toDeg(Math.atan2(y, x));
    var degrees= 360 - ((brng + 360) % 360);
    return degrees.toFixed(3)


}

//---real numbers---
function numberWithCommas(str)
{
    return (str + "").replace(/\b(\d+)((\.\d+)*)\b/g, function(a, b, c)
        {
            return (b.charAt(0) > 0 && !(c || ".").lastIndexOf(".")? b.replace(/(\d)(?=(\d{3})+$)/g, "$1,"): b) + c;
        }
    );
}

//---check svg element's svg properties---
function svg2Stng(svgElem)
{
    console.log(new XMLSerializer().serializeToString(svgElem))
}
//=======================LAT/LNG=====================
//---changes all transformed points to screen points---
function computePolyPoints(mySVG,myPoly)
{
    var sCTM = myPoly.getCTM()
    var pointsList = myPoly.points;
    var n = pointsList.numberOfItems;
    for(var m=0;m<n;m++)
    {
        var mySVGPoint = mySVG.createSVGPoint();
        mySVGPoint.x = pointsList.getItem(m).x
        mySVGPoint.y = pointsList.getItem(m).y
        mySVGPointTrans = mySVGPoint.matrixTransform(sCTM)
        pointsList.getItem(m).x=mySVGPointTrans.x
        pointsList.getItem(m).y=mySVGPointTrans.y
    }
    //---force removal of transform--
    myPoly.setAttribute("transform","")
    myPoly.removeAttribute("transform")
}
function setLatLng(elem)
{
  
    var Tfm=elem.getAttribute("transform")
    if(Tfm)
    {
        if(Tfm.indexOf("matrix")==-1)
        {
            var tfmSplit=Tfm.split("translate(")[1]
            var x=+tfmSplit.split(" ")[0]

           if(Tfm.indexOf("scale")==-1)
            var y=+tfmSplit.split(" ")[1].replace(/\)/,"")
            else  // activeElem.setAttribute("transform", "translate("+SVGx+" "+SVGy+")scale("+scale+")")
            {
               var y1=tfmSplit.split(" ")[1]
               var y=+y1.split(")")[0]
            }
        }
        else
        {
            var x=+Tfm.split(" ")[4]
            var y=+Tfm.split(" ")[5].replace(/\)/,"")
        }


        var svgPnt = L.point(x, y)
        var latLng = MyMap.layerPointToLatLng(svgPnt)
        var lat = latLng.lat
        var lng = latLng.lng
        elem.setAttribute("lat", lat)
        elem.setAttribute("lng", lng)
    }

}