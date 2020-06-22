/** 
 * @exports PointPlacemarkAttributes 
 */
define([
    'OpusWorldWind/OpusWorldWind',
    'WebWorldWind/WorldWind',
    'WebWorldWind/shapes/ShapeAttributes'
], function(OpusWorldWind, WorldWind, ShapeAttributes) {

    /**
     * Creates a new PointPlacemarkAttributes.
     * 
     * @alias PointPlacemarkAttributes
     * @constructor
     * @augments AbstractShape
     * @classdesc PointPlacemarkAttributes specify configuration for a PointPlacemark.
     * @param  {ShapeAttributes} attributes
     */
    var PointPlacemarkAttributes = function(attributes) {
        ShapeAttributes.call(this, attributes);
        this._pointSize = attributes ? attributes.pointSize : PointPlacemarkAttributes.DEFAULT_POINT_SIZE;
    };

    /**
     * The default point size.
     * 
     * @constant
     */
    PointPlacemarkAttributes.DEFAULT_POINT_SIZE = 8;

    PointPlacemarkAttributes.prototype = Object.create(ShapeAttributes.prototype);

    Object.defineProperties(PointPlacemarkAttributes.prototype, {
        /**
         * The point size of the placemark.
         * 
         * @memberof PointPlacemarkAttributes
         * @type {Number}
         */
        pointSize: {
            get: function() {
                return this._pointSize;
            },
            set: function(pointSize) {
                this._pointSize = pointSize;
                this.stateKeyInvalid = true;
            }
        }
    });

    /**
     * Computes the state key for this attributes object.
     * 
     * @returns {String} The state key for this object.
     */
    PointPlacemarkAttributes.prototype.computeStateKey = function() {
        return ShapeAttributes.prototype.computeStateKey.call(this) +
            ' ps ' + this._pointSize;
    };

    return PointPlacemarkAttributes;
});