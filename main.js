function setup() {
    canvas = createCanvas(300, 300);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide()

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function gotPoses(results) {
    if(results.length > 0)
    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX =" + leftWristX + "leftWristY =" + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;        
        console.log("rightWristX =" + rightWristX + "rightWristY =" + rightWristY);
    }
}

function modelLoaded() {
    console.log("PoseNet is Initialized");
}

function preload() {
    song1 = loadSound("faded.mp3");
    song2 = loadSound("lovely.mp3");
}

function play() {
    song1.play();
    song2.play();

    song1.setVolume(1);
    song1.rate(1);

    song2.setVolume(1);
    song2.rate(1);
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX,leftWristY,20);
        status = song1.isplaying()
        song2.stop()
        if(status == false)
        {
            song1.play()
        } 
        document.getElementById("update_name").innerHTML = "Faded"
    }
}