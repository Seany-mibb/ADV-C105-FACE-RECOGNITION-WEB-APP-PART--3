Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot()
{
    document.getElementById("capture").play();
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id = "captured_image" src = "'+data_uri+'"/>';
    });
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/URhnygljR/model.json", modelLoaded);

function modelLoaded()
{
    console.log("Huzzah!!! Your model has been Loaded ");
}

function check()
{
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}

function gotResult(error, results)
{
    if(error)
    {
        console.error(error);
    }
    else
    {
        document.getElementById("win").play(); 
        console.log(results);
        document.getElementById("object_name").innerHTML = "Object: " + results[0].label;
        document.getElementById("object_accuracy").innerHTML = "Accuracy: " + results[0].confidence.toFixed();
    }
}