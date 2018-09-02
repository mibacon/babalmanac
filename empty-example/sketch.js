var data;


function preload() {
	data = loadJSON('data.json')
}


function setup() {
  noLoop();

}

function draw() {
  background(200);

  console.log('hello')
  
  // data.forEach(function(value,key) {

  // 	var x = (key, 0, Object.keys(data).length, 10, 900)

  // 	rect(x,y,w,h)


  // })


}