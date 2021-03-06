/** 
 * @exports PointPlacemark
 */
define([
    'OpusWorldWind/OpusWorldWind',
    'OpusWorldWind/placemarks/PointPlacemarkAttributes',
    'OpusWorldWind/programs/PointProgram',
    'WebWorldWind/WorldWind',
    'WebWorldWind/shapes/AbstractShape',
    'WebWorldWind/shaders/GpuProgram',
    'WebWorldWind/geom/Matrix',
    'WebWorldWind/pick/PickedObject'
], function(OpusWorldWind, PointPlacemarkAttributes, PointProgram, WorldWind, AbstractShape, GpuProgram, Matrix, PickedObject) {

    // Todo: test
    var pointProgram = new PointProgram();

    /**
     * Creates a new PointPlacemark.
     * 
     * @class
     * @alias PointPlacemark
     * @constructor
     * @augments AbstractShape
     * @classdesc PointPlacemark is a simple point at a specified position.
     * @param  {Position} position
     * @param  {PointPlacemarkAttributes} attributes
     */
    var PointPlacemark = function(position, attributes) {
        attributes = attributes || new PointPlacemarkAttributes(null);

        if (!position) {
            throw new WorldWind.ArgumentError(WorldWind.Logger.logMessage(WorldWind.Logger.LEVEL_SEVERE, "PointPlacemark", "constructor", "missingPosition"));
        }

        AbstractShape.call(this, attributes);

        this._position = position;
        this.depthOffset = -0.003;
    };


    PointPlacemark.prototype = Object.create(AbstractShape.prototype);

    Object.defineProperties(PointPlacemark.prototype, {
        /**
         * Position of the placemark.
         * 
         * @inner
         * @memberof PointPlacemark
         * @type {Position}
         */
        position: {
            get: function() {
                return this._position;
            },
            set: function(position) {
                this._position = position;
                this.reset();
            }
        }
    });

    /**
     * Prepares the data for rendering. 
     * 
     * @function doMakeOrderedRenderable
     * @param {WebGLRenderingContext} drawingContext - Drawing context.
     * @returns PointPlacemark
     */
    PointPlacemark.prototype.doMakeOrderedRenderable = function(dc) {
        var currentData = this.currentData;
        var surfacePoint = new WorldWind.Vec3();
        var screenPoint = new WorldWind.Vec3();
        dc.surfacePointForMode(this.position.latitude, this.position.longitude, this.position.altitude, this.altitudeMode, surfacePoint);
        if (!dc.projectWithDepth(surfacePoint, this.depthOffset, screenPoint)) {
            return null;
        }
        currentData.screenPoint = screenPoint;
        currentData.eyeDistance = surfacePoint.distanceTo(dc.eyePoint);
        return this;
    };

    /**
     * Initializes the drawing process for this placemark.
     * 
     * @function beginDrawing
     * @param {WebGLRenderingContext} drawingContext - Drawing context.
     */
    PointPlacemark.prototype.beginDrawing = function(dc) {
        var gl = dc.currentGlContext;
        dc.findAndBindProgram(PointProgram);
        gl.enableVertexAttribArray(dc.currentProgram.vertexPointLocation);
    };

    /**
     * Called during the rendering process, to assess how this placemark should be rendered.
     * 
     * @function doRenderOrdered
     * @param {WebGLRenderingContext} drawingContext - Drawing context.
     */
    PointPlacemark.prototype.doRenderOrdered = function(dc) {
        var currentData = this.currentData;
        var gl = dc.currentGlContext;
        var program = dc.currentProgram;

        if (!currentData.vboKey) {
            currentData.vboKey = dc.gpuResourceCache.generateCacheKey();
        }

        var vboId = dc.gpuResourceCache.resourceForKey(currentData.vboKey);
        if (!vboId) {
            vboId = gl.createBuffer();
            var data = Float32Array.from([0, 0, 0]);
            dc.gpuResourceCache.putResource(currentData.vboKey, vboId, data.length * 4);
            gl.bindBuffer(gl.ARRAY_BUFFER, vboId);
            gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
            dc.frameStatistics.incrementVboLoadCount(1);
        }

        var pickColor;
        if (dc.pickingMode) {
            pickColor = dc.uniquePickColor();
        }

        var mvpMatrix = Matrix.fromIdentity();
        mvpMatrix.copy(dc.screenProjection);
        mvpMatrix.multiplyByTranslation(currentData.screenPoint[0], currentData.screenPoint[1], currentData.screenPoint[2]);

        program.loadPointSize(gl, this.activeAttributes.pointSize);
        program.loadModelviewProjection(gl, mvpMatrix);
        program.loadColor(gl, dc.pickingMode ? pickColor : this.activeAttributes.interiorColor);
        gl.bindBuffer(gl.ARRAY_BUFFER, vboId);
        gl.vertexAttribPointer(program.vertexPointLocation, 3, gl.FLOAT, false, 0, 0);
        gl.drawArrays(gl.POINTS, 0, 1);

        if (dc.pickingMode) {
            var po = new PickedObject(pickColor, this.pickDelegate ? this.pickDelegate : this, this.position, dc.currentLayer, false);
            dc.resolvePick(po);
        }
    };

    /**
     * Resets the gl context after finishing drawing this placemark.
     * 
     * @function endDrawing
     * @param {WebGLRenderingContext} drawingContext - Drawing context.
     */
    PointPlacemark.prototype.endDrawing = function(dc) {
        gl.disableVertexAttribArray(dc.currentProgram.vertexPointLocation);
    };

    // OpusWorldWind.PointProgram = PointProgram;

    return PointPlacemark;
});