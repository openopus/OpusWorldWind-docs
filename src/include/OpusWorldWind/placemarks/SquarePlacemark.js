/**
 * @exports SquarePlacemark
 */
define([
    'OpusWorldWind/placemarks/ScreenShapePlacemark'
], function(ScreenShapePlacemark) {

    /**
     * Creates a new ScreenShapePlacemarkAttributes.
     * 
     * @alias ScreenShapePlacemarkAttributes
     * @constructor
     * @augments ScreenShapePlacemark
     * @classdesc SquarePlacemark represents a square placemark.
     * @param  {SquarePlacemark} attributes
     */
    var SquarePlacemark = function(position, attributes) {
        ScreenShapePlacemark.call(this, [
            -1, 1,
            1, -1,
            1, 1,
            -1, 1,
            -1, -1,
            1, -1
        ], position, attributes);

        /**
         * The width of the placemark.
         * @type {Number}
         * @default 8
         */
        this.width = 8;

        /**
         * The height of the placemark.
         * @type {Number}
         * @default 8
         */
        this.height = 8;
    };

    SquarePlacemark.prototype = Object.create(ScreenShapePlacemark.prototype);

    return SquarePlacemark;
});