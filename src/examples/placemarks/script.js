requirejs(['../../include/WorldWindShim',
        '../../include/LayerManager',
        '../../include/OpusWorldWind/placemarks/SquarePlacemark'],
function (WorldWind,
            LayerManager,
            SquarePlacemark) {
    "use strict";
    
    // Tell WorldWind to log only warnings and errors.
    WorldWind.Logger.setLoggingLevel(WorldWind.Logger.LEVEL_WARNING);

    // Create the WorldWindow.
    var wwd = new WorldWind.WorldWindow("canvasOne");

    // Create and add layers to the WorldWindow.
    var layers = [
        // Imagery layers.
        {layer: new WorldWind.BMNGLayer(), enabled: true},
        {layer: new WorldWind.BMNGLandsatLayer(), enabled: false},
        {layer: new WorldWind.BingAerialLayer(null), enabled: false},
        {layer: new WorldWind.BingAerialWithLabelsLayer(null), enabled: true},
        {layer: new WorldWind.BingRoadsLayer(null), enabled: false},
        {layer: new WorldWind.OpenStreetMapImageLayer(null), enabled: false},
        // Add atmosphere layer on top of all base layers.
        {layer: new WorldWind.AtmosphereLayer(), enabled: true},
        // WorldWindow UI layers.
        {layer: new WorldWind.CompassLayer(), enabled: true},
        {layer: new WorldWind.CoordinatesDisplayLayer(wwd), enabled: true},
        {layer: new WorldWind.ViewControlsLayer(wwd), enabled: true}
    ];

    for (var l = 0; l < layers.length; l++) {
        layers[l].layer.enabled = layers[l].enabled;
        wwd.addLayer(layers[l].layer);
    }

    // add some custom stuff ----------------------------------

    // Create the custom image for the placemark with a 2D canvas.
    var canvas = document.createElement("canvas"),
    ctx2d = canvas.getContext("2d"),
    size = 256, c = size / 2 - 0.5, innerRadius = 5, outerRadius = 20;

    canvas.width = size;
    canvas.height = size;

    // Set placemark attributes.
    var placemarkAttributes = new WorldWind.PlacemarkAttributes(null);
    // Wrap the canvas created above in an ImageSource object to specify it as the placemarkAttributes image source.
    placemarkAttributes.imageSource = new WorldWind.ImageSource(canvas);
    // Define the pivot point for the placemark at the center of its image source.
    placemarkAttributes.imageOffset = new WorldWind.Offset(WorldWind.OFFSET_FRACTION, 0.5, WorldWind.OFFSET_FRACTION, 0.5);
    placemarkAttributes.imageScale = 1;
    placemarkAttributes.imageColor = WorldWind.Color.WHITE;

    var highlightAttributes = new WorldWind.PlacemarkAttributes(placemarkAttributes);
    highlightAttributes.imageScale = 1.2;

    // Create the placemark with the attributes defined above.
    var placemarkPosition = new WorldWind.Position(47.684444, -121.129722, 1e2);

    var placemark = new SquarePlacemark(placemarkPosition, false, placemarkAttributes);

    // -------------------------------

    var customLayer = new WorldWind.RenderableLayer("Custom");
    customLayer.addRenderable(placemark);
    wwd.addLayer(customLayer);

    // Create a layer manager for controlling layer visibility.
    var layerManager = new LayerManager(wwd);
});