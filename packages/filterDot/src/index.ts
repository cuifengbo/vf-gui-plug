import {vertex} from '../../filterTools/fragments';
import fragment from './dot.frag';


/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 * original filter: https://github.com/evanw/glfx.js/blob/master/src/filters/fun/dotscreen.js
 */

/**
 * This filter applies a dotscreen effect making display objects appear to be made out of
 * black and white halftone dots like an old printer.<br>
 * ![original](../tools/screenshots/dist/original.png)![filter](../tools/screenshots/dist/dot.png)
 *
 * @class
 
 * @param {number} [scale=1] The scale of the effect.
 * @param {number} [angle=5] The radius of the effect.
 */

 const o = {
    scale : 1,
    angle : 5
 }
class DotFilter extends vf.gui.Filter {

    constructor() {
        super(vertex, fragment);
        this.scale = o.scale;
        this.angle = o.angle;
    }

    /**
     * The scale of the effect.
     * @member {number}
     * @default 1
     */
    get scale() {
        return this.uniforms.scale;
    }
    set scale(value) {
        this.uniforms.scale = value;
    }

    /**
     * The radius of the effect.
     * @member {number}
     * @default 5
     */
    get angle() {
        return this.uniforms.angle;
    }
    set angle(value) {
        this.uniforms.angle = value;
    }
}

export { DotFilter };
