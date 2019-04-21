function getDiscoveryToLocale(discoveryString,tzTitle)
{
    var ymd=discoveryString.replace(/\//g,"-").split(" ")[0]
    //---add leading zeros to m & d---
    var year=ymd.split("-")[0]
    var month=ymd.split("-")[1]
    var day=ymd.split("-")[2]
    if(month.length==1)
        month="0"+month
    if(day.length==1)
        day="0"+day

    if(discoveryString.indexOf("PM")!=-1)
        var pm=true
    else
        var pm=false

    var ymd=year+"-"+month+"-"+day
    var time=discoveryString.split(" ")[1]
    var hrs=time.split(":")[0]
    if(pm==true)
    {
        hrs=+hrs+12
        time=hrs+":"+time.split(":")[1]
    }
    else
    if(hrs.length==1)
        time="0"+time

    var offset=tzTitle.split("UTC")[1]
    if(offset.indexOf(":")==-1)
        offset=offset+":00"
    var string=ymd+"T"+time+offset
    var ms = Date.parse(string)
    var locale=new Date(ms).toLocaleString()
    return locale
}