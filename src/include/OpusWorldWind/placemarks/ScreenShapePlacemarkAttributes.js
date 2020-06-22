/**
 * @exports ScreenShapePlacemarkAttributes
 */
define([
    'WebWorldWind/WorldWind',
    'WebWorldWind/shapes/ShapeAttributes'
], function(WorldWind, ShapeAttributes) {

    /**
     * Creates a new ScreenShapePlacemarkAttributes.
     * 
     * @alias ScreenShapePlacemarkAttributes
     * @constructor
     * @augments ShapeAttributes
     * @classdesc ScreenShapePlacemarkAttributes specify configuration for a ScreenShapePlacemark.
     * @param  {ShapeAttributes} attributes
     */
    var ScreenShapePlacemarkAttributes = function(attributes) {
        ShapeAttributes.call(this, attributes);
        this._depthTest = attributes ? attributes.depthTest : true;
        this._allowPicking = true;
    };

    ScreenShapePlacemarkAttributes.prototype = Object.create(ShapeAttributes.prototype);

    Object.defineProperties(ScreenShapePlacemarkAttributes.prototype, {

        /**
         * Wether depth testing is enabled or disabled for this placemark.
         * 
         * @memberof ScreenShapePlacemarkAttributes
         * @type {boolean}
         * @default true
         */
        depthTest: {
            get: function() {
                return this._depthTest;
            },
            set: function(v) {
                this._depthTest = v;
                this.stateKeyInvalid = true;
            }
        },

        /**
         * Wether picking is allowed for this placemark.
         * 
         * @memberof ScreenShapePlacemarkAttributes
         * @type {boolean}
         * @default true
         */
        allowPicking: {
            get: function() {
                return this._allowPicking;
            },
            set: function(v) {
                this._allowPicking = v;
                this.stateKeyInvalid = true;
            }
        }

    });

    /**
     * Computes the state key for this attributes object.
     * 
     * @returns {String} The state key for this object.
     */
    ScreenShapePlacemarkAttributes.prototype.computeStateKey = function() {
        return ShapeAttributes.prototype.computeStateKey.call(this) +
            ' dt ' + this._depthTest;
    };

    return ScreenShapePlacemarkAttributes;
});