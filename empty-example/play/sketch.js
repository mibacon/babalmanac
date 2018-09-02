var data;


function preload() {
	data = loadJSON('data.json')
}


function setup() {
  noLoop();
  createCanvas(800, 800)

  
  for (var i = 0; i < Object.keys(data).length; i++) {
  	// console.log(data[i].date)



  	var y = i * 15
  	var h = (800/Object.keys(data).length)
  	


  	fill(200)
  	noStroke()
  	rect(375, y, 20, h)
  	
  	if(data[i].bab == "-\r") {
  		var x = 370 - (data[i]["Count of date"]*10)
  		var c = [200, 10, 230]
  		var w = data[i]["Count of date"]*10
  	} else {
  		var c = [10, 200, 230]
  		var x = 400
  		var w = data[i]["Count of date"]*10
  	}

  	noStroke()
  	fill(c)
  	rect(x, y, w, h)


  	}
  	
  


}