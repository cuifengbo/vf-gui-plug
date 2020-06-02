import {vertex} from '../../filterTools/fragments';
import fragment from './rgb-split.frag';

/**
 * An RGB Split Filter.<br>
 * ![original](../tools/screenshots/dist/original.png)![filter](../tools/screenshots/dist/rgb.png)
 * @param {vf.Point} [red=[-10,0]] Red channel offset
 * @param {vf.Point} [green=[0, 10]] Green channel offset
 * @param {vf.Point} [blue=[0, 0]] Blue channel offset
 */
class RGBSplitFilter extends vf.gui.Filter {
    constructor() {
        super(vertex, fragment);
        this.red = [-10, 0];
        this.green = [0, 10];
        this.blue = [0, 0];``
    }

    /**
     * Red channel offset.
     *
     * @member {vf.Point}
     */
    get red() {
        return this.uniforms.red;
    }
    set red(value) {
        this.uniforms.red = value;
    }

    /**
     * Green channel offset.
     *
     * @member {vf.Point}
     */
    get green() {
        return this.uniforms.green;
    }
    set green(value) {
        this.uniforms.green = value;
    }

    /**
     * Blue offset.
     *
     * @member {vf.Point}
     */
    get blue() {
        return this.uniforms.blue;
    }
    set blue(value) {
        this.uniforms.blue = value;
    }
}

export { RGBSplitFilter };

