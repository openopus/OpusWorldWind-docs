/**
 * @exports WcPlacemark
 */
define([
    'WebWorldWind/WorldWind',
    'WebWorldWind/shapes/Placemark',
    'WebWorldWind/util/Color',
    'OpusWorldWind/programs/OutlineTextureProgram'
], function(WorldWind, Placemark, Color, OutlineTextureProgram) {

    /**
     * Creates a new WcPlacemark.
     * 
     * @alias WcPlacemark
     * @constructor
     * @augments Placemark
     * @classdesc WcPlacemark represents a WcPlacemark.
     * @param  {WcPlacemark} attributes
     */
    var WcPlacemark = function(position, eyeDistanceScaling, attributes) {
        Placemark.call(this, position, eyeDistanceScaling, attributes);
    };

    WcPlacemark.prototype = Object.create(Placemark.prototype);

    /**
     * Initializes the drawing process for this placemark.
     * 
     * @function beginDrawing
     * @param {WebGLRenderingContext} drawingContext - Drawing context.
     */
    WcPlacemark.prototype.beginDrawing = function(dc) {
        var gl = dc.currentGlContext;
        dc.findAndBindProgram(OutlineTextureProgram);

        var program = dc.currentProgram;
        gl.bindBuffer(gl.ARRAY_BUFFER, dc.unitQuadBuffer());
        gl.vertexAttribPointer(program.vertexTexCoordLocation, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(program.vertexPointLocation);
        gl.enableVertexAttribArray(program.vertexTexCoordLocation);

        program.loadTextureUnit(gl, gl.TEXTURE0);
        program.loadModulateColor(gl, dc.pickingMode);
    };

    /**
     * Called during the rendering process to render this placemark.
     * 
     * @function doDrawOrderedPlacemark
     * @param {WebGLRenderingContext} drawingContext - Drawing context.
     */
    WcPlacemark.prototype.doDrawOrderedPlacemark = function(dc) {
        var gl = dc.currentGlContext,
            program = dc.currentProgram;
        if (!dc.pickingMode && this.activeAttributes && this.activeAttributes.drawOutline) {
            program.loadOutlineHorizontalThickness(gl, this.activeAttributes.outlineWidth / this.imageBounds.width);
            program.loadOutlineVerticalThickness(gl, this.activeAttributes.outlineWidth / this.imageBounds.height);
            program.loadOutlineColor(gl, this.activeAttributes.outlineColor);
        } else {
            program.loadOutlineHorizontalThickness(gl, 0);
            program.loadOutlineVerticalThickness(gl, 0);
            program.loadOutlineColor(gl, Color.TRANSPARENT);
        }
        Placemark.prototype.doDrawOrderedPlacemark.call(this, dc);
    };

    return WcPlacemark;
});