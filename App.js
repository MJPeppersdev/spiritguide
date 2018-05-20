
//If you want to control the camera with your mouse set cameraActive to true
var cameraActive = true;
// cameraRatio controls the maximum movement of the camera
var cameraRatio = .2;

var animationContainer = document.getElementById('lottie');
var animData = {
    container: animationContainer,
    renderer: 'html',
    loop: true,
    autoplay: false,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid meet',
        className: 'master',
        hideOnTransparent: false,
        progressiveLoad: true
    },
    path: 'https://labs.nearpod.com/bodymovin/demo/monument/data.json'
};
anim = lottie.loadAnimation(animData);
var animationAPI;
window.addEventListener('mousemove', updateMouseValue);
window.addEventListener('touchmove', updateMouseValue);
window.addEventListener('mousewheel', updateMouseWheel);
var last_mouse_coords = [0,0];
var FRAME_RATE = 30;
var camera_zoom_value = 5000;
var current_camera_zoom_value = 5000;
var camera_null_animator;
anim.addEventListener('DOMLoaded', setup);

function setupCamera() {
    var camera_position = animationAPI.getKeyPath('ISOMETRIC_CAMERA,Position');
    animationAPI.addValueCallback(camera_position, function(currentValue) {
        var x = last_mouse_coords[0] + (((mouse_coords[0] - window.innerWidth / 2) * cameraRatio) - last_mouse_coords[0]) / 10;
        var y = last_mouse_coords[1] + (((mouse_coords[1] - window.innerHeight / 2) * cameraRatio) - last_mouse_coords[1]) / 10;
        last_mouse_coords[0] = x;
        last_mouse_coords[1] = y;
        var newCoords = [x, y, currentValue[2]]
        return newCoords
    })
    var camera_zoom_animator = animationAPI.getKeyPath('ISOMETRIC_CAMERA,Zoom');
    animationAPI.addValueCallback(camera_zoom_animator, function(currentValue) {
        current_camera_zoom_value = current_camera_zoom_value + (camera_zoom_value - current_camera_zoom_value) / 20;
        return current_camera_zoom_value
    })

    /*var orientation = [0,0,0];
    var camera_orientation_animator = animationAPI.getKeyPath('ISOMETRIC_CAMERA,Orientation');
    animationAPI.addValueCallback(camera_orientation_animator, function(currentValue) {
        return orientation
    })
    function deviceOrientationHandler(e) {
        var body = document.getElementById('lottie');
        body.style.backgroundColor = 'black';
        orientation[0] = e.alpha
        orientation[1] = (e.beta - 90)
        orientation[2] = e.gamma
    }
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', deviceOrientationHandler, false);
    }*/
}

function completeScene0() {
    titleText.exitText();
    scene1.setup();
    //scene4_b.setup();
    //scene5.setup();
    setTimeout(function() {
        camera_null_animator.playSegment(0 / FRAME_RATE, 253 / FRAME_RATE);
    },500);
}

function completeScene1() {
    titleText.exitText();
    scene2.setup();
    setTimeout(function() {
        camera_null_animator.playSegment(253 / FRAME_RATE, 506 / FRAME_RATE);
    },500);
}

function completeScene2() {
    titleText.exitText();
    scene3.setup();
    camera_null_animator.playSegment(507 / FRAME_RATE, 758 / FRAME_RATE);
}

function completeScene3() {
    titleText.exitText();
    scene4_b.setup();
    camera_null_animator.playSegment(759 / FRAME_RATE, 1010 / FRAME_RATE);
}

function completeScene4() {
    titleText.exitText();
    scene4_b.setup();
    camera_null_animator.playSegment(1011 / FRAME_RATE, 1262 / FRAME_RATE);
}

function completeScene4_b() {
    titleText.exitText();
    scene5.setup();
    camera_null_animator.playSegment(1011 / FRAME_RATE, 1262 / FRAME_RATE);
}

function setupMainComp() {
    camera_null_animator = animationAPI.getKeyPath('Timed_Comp,Time Remap').getPropertyAtIndex(0);
    camera_null_animator.setLoop(false);
    camera_null_animator.playSegment(0, 0);
    var humanoid_animator = animationAPI.getKeyPath('Timed_Comp,Humanoid_2,Time Remap').getPropertyAtIndex(0);
    humanoid_animator.playSegment(0, 40 / FRAME_RATE);
}

function setup() {
    animationAPI = lottie_api.createAnimationApi(anim);
    window.addEventListener('resize',function(){anim.resize()});
    setTimeout(function(){
        setupMainComp();
      if(cameraActive) {
        setupCamera();
      }
        titleText.setup();
        scene0.setup();
        anim.play();
    }, 100)
}

var mouse_coords = [0,0];
function updateMouseValue(ev) {
    mouse_changed = true;
    var mouseX, mouseY;
    if(ev.touches && ev.touches.length) {
        var mouseX = ev.touches[0].pageX;
        var mouseY = ev.touches[0].pageY; 
    } else if(ev.pageX !== undefined) {
        mouseX = ev.pageX;
        mouseY = ev.pageY;
    }
    mouse_coords[0] = mouseX;
    mouse_coords[1] = mouseY;
}

function updateMouseWheel(ev) {
    camera_zoom_value -= ev.deltaY * 2;
    if(camera_zoom_value >= 9000 ) {
        camera_zoom_value = 9000;
    }
  ev.preventDefault();
  ev.stopImmediatePropagation();
}
