const stage = new Konva.Stage({
    container: "container",
    width: window.innerWidth,
    height: window.innerHeight
})

//background image in container
const bgImg = "./assets/space.png"
stage.container().style.backgroundImage = `url( ${bgImg} )`;
stage.container().style.backgroundSize = "cover";


addImage("./assets/astronaut.png", 75, 100, 28)
addImage("./assets/rocket.png", 400, 100, 4)
addImage("./assets/planet.png", 50, 50, 3)


function addImage(src, x=0, y=0, size=2){

    const img = new Image();
    img.onload = function(){

        //create konva layer
        const layer = new Konva.Layer();

        // create konva image
        const konvaImg = new Konva.Image({
            image: img,
            x: x,
            y: y,
            width: img.naturalWidth / size,
            height: img.naturalHeight / size,
            draggable: true
        });

        // add cursor styling
        konvaImg.on('mouseover', function() {
            document.body.style.cursor = 'pointer';
        });

        konvaImg.on('mouseout', function() {
            document.body.style.cursor = 'default';
        });

        //move layer zindex to top
        konvaImg.on('mousedown', function() {
            layer.moveUp();
        });

        //remove transparent pixels from hit - only works with server
        konvaImg.cache();
        konvaImg.drawHitFromCache();

        //add image to layer
        layer.add(konvaImg);

        //add layer to stage
        stage.add(layer);

    }

    img.src = src;
}

// used pixabay and rawpixel for images