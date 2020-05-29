import {vertex} from '../../filterTools/fragments';
import fragment from './convolution.frag';

/**
 * The ConvolutionFilter class applies a matrix convolution filter effect.
 * A convolution combines pixels in the input image with neighboring pixels to produce a new image.
 * A wide variety of image effects can be achieved through convolutions, including blurring, edge
 * detection, sharpening, embossing, and beveling. The matrix should be specified as a 9 point Array.
 * See http://docs.gimp.org/en/plug-in-convmatrix.html for more info.<br>
 * ![original](../tools/screenshots/dist/original.png)![filter](../tools/screenshots/dist/convolution.png)
 *
 * @class
 
 * @param [matrix=[0,0,0,0,0,0,0,0,0]] {number[]} An array of values used for matrix transformation. Specified as a 9 point Array.
 * @param [width=200] {number} Width of the object you are transforming
 * @param [height=200] {number} Height of the object you are transforming
 */
const o:any = {
    matrix:[0,0,0,0,0,0,0,0,0],
    width: 200,
    height: 200
}
class ConvolutionFilter extends vf.gui.Filter {

    constructor() {
        super(vertex, fragment);
        this.uniforms.texelSize = new Float32Array(2);
        this.uniforms.matrix = new Float32Array(9);
        if (o.matrix !== undefined) {
            this.matrix = o.matrix;
        }
        this.width = o.width;
        this.height = o.height;
    }

    /**
     * An array of values used for matrix transformation. Specified as a 9 point Array.
     *
     * @member {Array<number>}
     */
    get matrix() {
        return this.uniforms.matrix;
    }
    set matrix(matrix) {
        matrix.forEach((v:any, i:any) => this.uniforms.matrix[i] = v);
    }

    /**
     * Width of the object you are transforming
     *
     * @member {number}
     */
    get width() {
        return 1/this.uniforms.texelSize[0];
    }
    set width(value) {
        this.uniforms.texelSize[0] = 1/value;
    }

    /**
     * Height of the object you are transforming
     *
     * @member {number}
     */
    get height() {
        return 1/this.uniforms.texelSize[1];
    }
    set height(value) {
        this.uniforms.texelSize[1] = 1/value;
    }
}

export { ConvolutionFilter };
