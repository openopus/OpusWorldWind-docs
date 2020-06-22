/**
 * @exports PedestalPlacemark
 */
define([
    'WebWorldWind/WorldWind',
    'WebWorldWind/geom/Vec2',
    'OpusWorldWind/placemarks/ScreenShapePlacemark'
], function(WorldWind, Vec2, ScreenShapePlacemark) {

    /**
     * Creates a new PedestalPlacemark.
     * 
     * @alias PedestalPlacemark
     * @constructor
     * @classdesc PedestalPlacemark is a placemark with 3 points, offset from the center, 
     *  acting as a sort of pedestal or "pointer" to an object.
     * @augments ScreenShapePlacemark
     * @param {Position} Position containing the latitude and longitude of the placemark.
     * @param {PlacemarkAttributes} PlacemarkAttributes derivative with containing color, font, offset properties.
     * @returns {PedestalPlacemark}
     */
    var PedestalPlacemark = function(position, attributes) {
        ScreenShapePlacemark.call(this, [
            -1, 1,
            0, -1,
            1, 1
        ], position, attributes);

        /** 
         * Width of the placemark 
         * @type {Number}
         * @default 18
         */
        this.width = 18;

        /** 
         * Height of the placemark 
         * @type {Number}
         * @default 9
         */
        this.height = 9;

        /** 
         * Offset of the placemark
         * @type {Vec2}
         * @default (0, 4.5 * window.devicePixelRatio)
         */
        this.offset = new Vec2(0, 4.5 * window.devicePixelRatio);
    };

    PedestalPlacemark.prototype = Object.create(ScreenShapePlacemark.prototype);

    return PedestalPlacemark;
});