import {vertex} from '../../filterTools/fragments';
import fragment from './twist.frag';


/**
 * This filter applies a twist effect making display objects appear twisted in the given direction.<br>
 * ![original](../tools/screenshots/dist/original.png)![filter](../tools/screenshots/dist/twist.png)
 
 * @param {number} [radius=200] The radius of the twist.
 * @param {number} [angle=4] The angle of the twist.
 * @param {number} [padding=20] Padding for filter area.
 */
class TwistFilter extends vf.gui.Filter {
    constructor() {
        super(vertex, fragment);

        this.radius = 200;
        this.angle = 4;
        this.padding = 20;
    }

    /**
     * This point describes the the offset of the twist.
     *
     * @member {vf.Point}
     */
    get offset() {
        return this.uniforms.offset;
    }
    set offset(value) {
        if(Array.isArray(value)){

        }
        this.uniforms.offset = value;
    }

    /**
     * The radius of the twist.
     *
     * @member {number}
     */
    get radius() {
        return this.uniforms.radius;
    }
    set radius(value) {
        this.uniforms.radius = value;
    }

    /**
     * The angle of the twist.
     *
     * @member {number}
     */
    get angle() {
        return this.uniforms.angle;
    }
    set angle(value) {
        this.uniforms.angle = value;
    }
}

export { TwistFilter };

