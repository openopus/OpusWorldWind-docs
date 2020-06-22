/**
 * @exports PointProgram
 */
define([
    'WebWorldWind/WorldWind',
    'WebWorldWind/shaders/GpuProgram'
], function(WorldWind, GpuProgram) {

    /**
     * Creates a new PointProgram.
     * 
     * @alias PointProgram
     * @constructor
     * @augments GpuProgram
     * @classdesc PointProgram represents a point OpenGL program.
     * @param  {OpenGL} attributes
     */
    var PointProgram = function(gl) {
        var vertexShaderSource =
            'uniform float pointSize;' +
            'uniform mat4 mvpMatrix;' +
            'attribute vec3 vertexPoint;' +
            'void main() {' +
            '   gl_PointSize = pointSize;' +
            '   gl_Position = mvpMatrix * vec4(vertexPoint, 1);' +
            '}';
        var fragmentShaderSource =
            'precision mediump float;' +
            'uniform vec4 color;' +
            'void main() {' +
            '   float s = gl_PointCoord.s;' +
            '   float t = gl_PointCoord.t;' +
            '   if(4.*((s-0.5)*(s-0.5) + (t-0.5)*(t-0.5)) > 1.) {' +
            '       gl_FragColor = vec4(0.,0.,0.,0.);' +
            '   } else {' +
            '       gl_FragColor = color;' +
            '   }' +
            '}';
        GpuProgram.call(this, gl, vertexShaderSource, fragmentShaderSource);
        this.vertexPointLocation = this.attributeLocation(gl, 'vertexPoint');
        this.pointSizeLocation = this.uniformLocation(gl, 'pointSize');
        this.mvpMatrixLocation = this.uniformLocation(gl, 'mvpMatrix');
        this.colorLocation = this.uniformLocation(gl, 'color');
    };

    PointProgram.key = 'WorldWindGpuPointProgram';

    PointProgram.prototype = Object.create(GpuProgram.prototype);

    PointProgram.prototype.loadPointSize = function(gl, pointSize) {
        gl.uniform1f(this.pointSizeLocation, pointSize);
    };

    PointProgram.prototype.loadModelviewProjection = function(gl, matrix) {
        this.loadUniformMatrix(gl, matrix, this.mvpMatrixLocation);
    };

    PointProgram.prototype.loadColor = function(gl, color) {
        this.loadUniformColor(gl, color, this.colorLocation);
    };

    PointProgram.prototype.loadColorComponents = function(gl, red, green, blue, alpha) {
        this.loadUniformColorComponents(gl, red, green, blue, alpha, this.colorLocation);
    };

    return PointProgram;
});