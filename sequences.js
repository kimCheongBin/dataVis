var width = 750;

var height = 600;

var radius = Math.min(width, height) / 2;

var b = {

  w: 75, h: 30, s: 3, t: 10

};


var colors = {
  "bad": "#FF384B",
  "soso": "#63CC18",
  "Female": "#FF6488",
  "Man": "#3BA6CC",
  "Twenty": "#380B61",
  "Twenty-five": "#4B088A",
  "Thirty": "#5F04B4",
  "Thirty-five": "#7401DF",
  "Forty": "#8000FF",
  "Forty-five": "#9A2EFE",
  "Fifty": "#AC58FA",
  "Fifty-five": "#BE81F7",
  "Sixty": "#D0A9F5",
  "Sixty-five": "#E3CEF6"
};

var totalSize = 0; 

var vis = d3.select("#chart").append("svg:svg")

    .attr("width", width)

    .attr("height", height)

    .append("svg:g")

    .attr("id", "container")

    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


var partition = d3.layout.partition()

    .size([2 * Math.PI, radius * radius])

    .value(function(d) { return d.size; });


var arc = d3.svg.arc()

    .startAngle(function(d) { return d.x; })

    .endAngle(function(d) { return d.x + d.dx; })

    .innerRadius(function(d) { return Math.sqrt(d.y); })

    .outerRadius(function(d) { return Math.sqrt(d.y + d.dy); });


d3.text("data.csv", function(text) {

  var csv = d3.csv.parseRows(text);

  var json = buildHierarchy(csv);

  createVisualization(json);

});



function createVisualization(json) {


  initializeBreadcrumbTrail();

  drawLegend();

  d3.select("#togglelegend").on("click", toggleLegend);


  vis.append("svg:circle")

      .attr("r", radius)

      .style("opacity", 0);


  var nodes = partition.nodes(json)

      .filter(function(d) {

      return (d.dx > 0.005); 

      });


  var path = vis.data([json]).selectAll("path")

      .data(nodes)

      .enter().append("svg:path")

      .attr("display", function(d) { return d.depth ? null : "none"; })

      .attr("d", arc)

      .attr("fill-rule", "evenodd")

      .style("fill", function(d) { return colors[d.name]; })

      .style("opacity", 1)

      .on("mouseover", mouseover);


  d3.select("#container").on("mouseleave", mouseleave);

  totalSize = path.node().__data__.value;

 };


function mouseover(d) {


  var percentage = (100 * d.value / totalSize).toPrecision(5);

  var percentageString = percentage + "%";

  var testText = "Segment/Total";

  //미세먼지 여부
  if(percentage == 47.440) { testText = "More: 21, 22, 92 / Less: 42, 33"; }
  if(percentage == 52.560) { testText = "More: 21, 22, 92 / Less: 42, 33"; }
  
  //여자
  if(percentage == 23.934) { testText = "More: 92, 22, 34, 44 / Less: 42"; }
  if(percentage == 26.570) { testText = "More: 92, 22, 34, 44 / Less: 42"; }

  //남자
  if(percentage == 23.506) { testText = "More: 21, 42, 34 / Less: 33, 22"; }
  if(percentage == 25.990) { testText = "More: 21, 42, 34 / Less: 33, 22"; }
 
  //여자 20
  if(percentage == 2.3994) { testText = "Less: 71, 52, 81, 33, 42"; }
  if(percentage == 2.6984) { testText = "Less: 71, 52, 81, 33, 42"; }

  //여자 25 
  if(percentage == 2.4426) { testText = "More: 42, 50 / Less: 33, 62, 21"; }
  if(percentage == 2.7173) { testText = "More: 42, 50 / Less: 33, 62, 21"; }

  //여자30
  if(percentage == 2.3660) { testText = "More: 21, 34 / Less: 42, 33, 35"; }
  if(percentage == 2.6389) { testText = "More: 21, 34 / Less: 42, 33, 35"; }

  //여자35
  if(percentage == 2.4281) { testText = "More: 92, 21, 22 / Less: 42, 44"; }
  if(percentage == 2.7096) { testText = "More: 92, 21, 22 / Less: 42, 44"; }

  //여자40
  if(percentage == 2.5210) { testText = "More: 92, 21, 22 / Less: 42, 44"; }
  if(percentage == 2.7995) { testText = "More: 92, 21, 22 / Less: 42, 44"; }

  //여자45
  if(percentage == 2.7379) { testText = "More: 92, 21, 22 / Less: 42, 44"; }
  if(percentage == 3.0441) { testText = "More: 92, 21, 22 / Less: 42, 44"; }

  //여자50
  if(percentage == 2.6205) { testText = "More: 21, 22, 92 / Less: 50, 33"; }
  if(percentage == 2.8962) { testText = "More: 21, 22, 92 / Less: 50, 33"; }

  //여자55
  if(percentage == 2.3971) { testText = "More: 92, 33, 22, 50 / Less: 42"; }
  if(percentage == 2.6492) { testText = "More: 92, 33, 22, 50 / Less: 42"; }

  //여자60
  if(percentage == 2.0507) { testText = "More: 21, 92, 70, 34 / Less: 42"; }
  if(percentage == 2.2604) { testText = "More: 21, 92, 70, 34 / Less: 42"; }

  //여자65
  if(percentage == 1.9703) { testText = "More: 71, 92, 81, 44 / Less: 42"; }
  if(percentage == 2.1569) { testText = "More: 71, 92, 81, 44 / Less: 42"; }

  //남자20
  if(percentage == 2.2542) { testText = "Less: 71, 33, 42, 62, 50"; }
  if(percentage == 2.5399) { testText = "Less: 71, 33, 42, 62, 50"; }

  //남자25
  if(percentage == 2.5668) { testText = "More: 21 / Less: 70, 33, 92, 35"; }
  if(percentage == 2.8614) { testText = "More: 21 / Less: 70, 33, 92, 35"; }

  //남자30
  if(percentage == 2.4543) { testText = "More: 21, 62 / Less: 42, 44, 22"; }
  if(percentage == 2.7206) { testText = "More: 21, 62 / Less: 42, 44, 22"; }

  //남자35
  if(percentage == 2.4887) { testText = "More: 21 / Less: 42, 50, 33, 81"; }
  if(percentage == 2.7698) { testText = "More: 21 / Less: 42, 50, 33, 81"; }
  
  //남자40
  if(percentage == 2.4267) { testText = "More: 42, 22, 34 / Less: 21, 44"; }
  if(percentage == 2.6950) { testText = "More: 42, 22, 34 / Less: 21, 44"; }
  
  //남자45
  if(percentage == 2.5615) { testText = "More: 22, 92, 34 / Less: 44, 42"; }
  if(percentage == 2.8397) { testText = "More: 22, 92, 34 / Less: 44, 42"; }
  
  //남자50
  if(percentage == 2.4890) { testText = "More: 92, 22, 21, 34, 70"; }
  if(percentage == 2.7329) { testText = "More: 92, 22, 21, 34, 70"; }
  
  //남자55
  if(percentage == 2.2741) { testText = "More: 22, 71, 50, 52 / Less: 33"; }
  if(percentage == 2.5003) { testText = "More: 22, 71, 50, 52 / Less: 33"; }
  
  //남자60
  if(percentage == 1.9766) { testText = "More: 50, 81, 71, 22 / Less: 42"; }
  if(percentage == 2.1647) { testText = "More: 50, 81, 71, 22 / Less: 42"; }
  
  //남자65
  if(percentage == 2.0142) { testText = "More: 71, 21, 70, 92, 50 / Less: 42"; }
  if(percentage == 2.1656) { testText = "More: 71, 21, 70, 92, 50 / Less: 42"; }
  
  

  d3.select("#percentage")

      .text(percentageString)

      .style("visibility", "");
  

  d3.select("#explanation")

      .text(testText)
      
      .style("visibility", "");


  var sequenceArray = getAncestors(d);

  updateBreadcrumbs(sequenceArray, percentageString);


  d3.selectAll("path")

      .style("opacity", 0.3);


  vis.selectAll("path")

      .filter(function(node) {

                return (sequenceArray.indexOf(node) >= 0);

              })

      .style("opacity", 1);

}


function mouseleave(d) {


  d3.select("#trail")

      .style("visibility", "hidden");


  d3.selectAll("path").on("mouseover", null);


  d3.selectAll("path")

      .transition()

      .duration(1000)

      .style("opacity", 1)

      .each("end", function() {

              d3.select(this).on("mouseover", mouseover);

            });



  d3.select("#explanation")

      .style("visibility", "hidden");

}



function getAncestors(node) {

  var path = [];

  var current = node;

  while (current.parent) {

    path.unshift(current);

    current = current.parent;

  }

  return path;

}



function initializeBreadcrumbTrail() {


  var trail = d3.select("#sequence").append("svg:svg")

      .attr("width", width)

      .attr("height", 50)

      .attr("id", "trail");


  trail.append("svg:text")

    .attr("id", "endlabel")

    .style("fill", "#000");

}



function breadcrumbPoints(d, i) {

  var points = [];

  points.push("0,0");

  points.push(b.w + ",0");

  points.push(b.w + b.t + "," + (b.h / 2));

  points.push(b.w + "," + b.h);

  points.push("0," + b.h);

  if (i > 0) { 

    points.push(b.t + "," + (b.h / 2));

  }

  return points.join(" ");

}


function updateBreadcrumbs(nodeArray, percentageString) {


  var g = d3.select("#trail")

      .selectAll("g")

      .data(nodeArray, function(d) { return d.name + d.depth; });




  var entering = g.enter().append("svg:g");



  entering.append("svg:polygon")

      .attr("points", breadcrumbPoints)

      .style("fill", function(d) { return colors[d.name]; });



  entering.append("svg:text")

      .attr("x", (b.w + b.t) / 2)

      .attr("y", b.h / 2)

      .attr("dy", "0.35em")

      .attr("text-anchor", "middle")

      .text(function(d) { return d.name; });




  g.attr("transform", function(d, i) {

    return "translate(" + i * (b.w + b.s) + ", 0)";

  });



  g.exit().remove();



  d3.select("#trail").select("#endlabel")

      .attr("x", (nodeArray.length + 0.5) * (b.w + b.s))

      .attr("y", b.h / 2)

      .attr("dy", "0.35em")

      .attr("text-anchor", "middle")

      .text(percentageString);

  d3.select("#trail")

      .style("visibility", "");

}


function drawLegend() {

  var li = {

    w: 100, h: 20, s: 5, r: 3

  };

  var legend = d3.select("#legend").append("svg:svg")

      .attr("width", li.w)

      .attr("height", d3.keys(colors).length * (li.h + li.s));

  var g = legend.selectAll("g")

      .data(d3.entries(colors))

      .enter().append("svg:g")

      .attr("transform", function(d, i) {

              return "translate(0," + i * (li.h + li.s) + ")";

           });

  g.append("svg:rect")

      .attr("rx", li.r)

      .attr("ry", li.r)

      .attr("width", li.w)

      .attr("height", li.h)

      .style("fill", function(d) { return d.value; });

  g.append("svg:text")

      .attr("x", li.w / 2)

      .attr("y", li.h / 2)

      .attr("dy", "0.35em")

      .attr("text-anchor", "middle")

      .text(function(d) { return d.key; });

}

function toggleLegend() {

  var legend = d3.select("#legend");

  if (legend.style("visibility") == "hidden") {

    legend.style("visibility", "");

  } else {

    legend.style("visibility", "hidden");

  }

}


function buildHierarchy(csv) {

  var root = {"name": "root", "children": []};

  for (var i = 0; i < csv.length; i++) {

    var sequence = csv[i][0];

    var size = +csv[i][1];

    if (isNaN(size)) { 

      continue;

    }

    var parts = sequence.split("_");

    var currentNode = root;

    for (var j = 0; j < parts.length; j++) {

      var children = currentNode["children"];

      var nodeName = parts[j];

      var childNode;

      if (j + 1 < parts.length) {


 	var foundChild = false;

 	for (var k = 0; k < children.length; k++) {

 	  if (children[k]["name"] == nodeName) {

 	    childNode = children[k];

 	    foundChild = true;

 	    break;

 	  }

 	}

 	if (!foundChild) {

 	  childNode = {"name": nodeName, "children": []};

 	  children.push(childNode);

 	}

 	currentNode = childNode;

      } else {


 	childNode = {"name": nodeName, "size": size};

 	children.push(childNode);

      }

    }

  }

  return root;

};

