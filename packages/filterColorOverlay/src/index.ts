import {vertex} from '../../filterTools/fragments';
import fragment from './colorOverlay.frag';

/**
 * Replace all colors within a source graphic with a single color.<br>
 */

class ColorOverlayFilter extends vf.gui.Filter {
    private _color:number =  0x000000;
    constructor() {
        super(vertex, fragment);
        this.uniforms.color = new Float32Array(3);
    }

    /**
     * The resulting color, as a 3 component RGB e.g. [1.0, 0.5, 1.0]
     * @member {number|Array<number>}
     * @default 0x000000
     */
    set color(value) {
        let arr = this.uniforms.color;
        if (typeof value === 'number') {
            vf.utils.hex2rgb(value, arr);
            this._color = value;
        }
        else {
            arr[0] = value[0];
            arr[1] = value[1];
            arr[2] = value[2];
            this._color = vf.utils.rgb2hex(arr);
        }
    }
    get color() {
        return this._color;
    }
}

export { ColorOverlayFilter };
