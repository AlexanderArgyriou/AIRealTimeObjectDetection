var Video;
var Detector;
var Detections = [];

function preload() 
{
  Detector = ml5.objectDetector('cocossd');
}   // preload(), load cocossd on the detector

function gotDetections(Err, Results) 
{
  if (Err) 
    console.error(error);

  Detections = Results;
  Detector.detect(Video, gotDetections);
}   // gotDetections, parse them to the array, also erro handling

function setup() 
{
  createCanvas(640, 480);
  Video = createCapture(VIDEO);
  Video.size(640, 480);
  Video.hide();
  Detector.detect(Video, gotDetections);
}   // setup, create a canvas start a video session try to detect the objects

function draw() 
{
  image(Video, 0, 0);

  for (var i = 0; i < Detections.length; i++) 
  {
    var obj = Detections[i];
    stroke(0, 152, 0);
    strokeWeight(4);
    noFill();
    rect(obj.x, obj.y, 
        obj.width, obj.height);  // rectangle position
    noStroke();
    fill(255);
    textSize(20);
    var probability = Math.round(obj.confidence) * 100;
    text(obj.label + " " + probability + "%", obj.x + 10, 
        obj.y + 24);   // text position with object's name
  } // for
}   // draw, draw the rectangles and the recognition results





