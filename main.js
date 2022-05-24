var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

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

function start1()
{
    recognition.start();        //This will start recognizing the speech!
}

recognition.onresult = function(event){     //this will run while the speech is being heard!    
    console.log(event);

    var Content = event.results[0][0].transcript;
    if(Content == "capture image" || Content == "Capture image.")
    {
        speak();
    }
}

function speak()
{
    var synth = window.speechSynthesis;
    speak_data = "Taking your picture in 5 seconds.";
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
    Webcam.attach(camera);
    setTimeout(function()
    {
        take_snapshot();       
    }, 5000);
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


/*var SpeechRecognition = window.webkitSpeechRecognition;

var recognition = new SpeechRecognition();

function start()
{
    document.getElementById("textbox").innerHTML = "";
    recognition.start();        //This will start recognizing the speech!
}

recognition.onresult = function(event){     //this will run while the speech is being heard!
    console.log(event);

    var Content = event.results[0][0].transcript;
    document.getElementById("textbox").innerHTML = Content;
    console.log(event);
    if(Content == "take my selfie" || Content == "Take my selfie.")
    {
        speak();
    }
}

function speak()
{
    var synth = window.speechSynthesis;
    speak_data = "Taking your Selfie in 5 seconds";
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
    Webcam.attach(camera);
    setTimeout(function()
    {
        take_snapshot();
        save();        
    }, 5000);
}

Webcam.set({
    width:360,
    height:250,
    image_format: 'png',
    png_quality: 90
});
camera = document.getElementById("camera");

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id = "selfie_image" src ="'+data_uri+'">';
        console.log(data_uri);
    });
}

function save()
{
    link = document.getElementById("link");
    image = document.getElementById("selfie_image").src;
    link.href = image;
    link.click();
}

*/