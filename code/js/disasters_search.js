


var infection = document.getElementById("infection");
var filter = document.getElementById("filter");
var searchvalue = document.getElementById("searchvalue");


document.getElementById("search").addEventListener("click",searchfor);


var datavisSet = [['Country', 'Impact of event']];
function searchfor(e) {
    var tmpid = 1;

    if (infection.value == "Zika"){
        for (var i = disasterData.length-1; i >= 0; i--) {
            if (disasterData[i][filter.value] == searchvalue.value) {
                for (var zi = zikadata.length - 1; zi >= 0; zi--) {
                    if ((zikadata[zi]["Time"] >=  disasterData[i]["Start Year"]) && (zikadata[zi]["Time"] <=  disasterData[i]["End Year"])) {
                        tmpcalc = zikadata[zi]["NumValue"] / disasterData[i]["Total Deaths"];
                        if(tmpcalc == Infinity)
                            {tmpcalc = 100000;}
                        if( isNaN(tmpcalc))
                            {tmpcalc = 1;}
                        tmp = [zikadata[zi]["RegionName"],tmpcalc];
                        datavisSet[tmpid]=tmp;
                        tmpid++;
                    }
                }
            break;
            }
            //console.log(i);
        }
    }

    console.log(datavisSet);
    document.getElementById('regions_div').innerHTML="";

    google.charts.load('current', {
      'packages':['geochart'],
    });
    google.charts.setOnLoadCallback(drawRegionsMap);

    function drawRegionsMap() {
     var data = google.visualization.arrayToDataTable(datavisSet);
     var options = {
        backgroundColor: '#000f1a',
        colorAxis: {colors: ['yellow', 'orange', '#e31b23']},
        atalessRegionColor: '#2a2a28',
        defaultColor: '#2a2a28',
      };

      var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

      chart.draw(data, options);
    }
}
