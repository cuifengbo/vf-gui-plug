import {vertex} from '../../filterTools/fragments';
import fragment from './zoom-blur.frag';


/**
 * The ZoomFilter applies a Zoom blur to an object.<br>
 * ![original](../tools/screenshots/dist/original.png)![filter](../tools/screenshots/dist/zoom-blur.png)
 *
 
 * @param {object} [options] Filter options to use.
 * @param {number} [options.strength=0.1] Sets the strength of the zoom blur effect
 * @param {vf.Point|number[]} [options.center=[0,0]] The center of the zoom.
 * @param {number} [options.innerRadius=0] The inner radius of zoom. The part in inner circle won't apply zoom blur effect.
 * @param {number} [options.radius=-1] See `radius` property.
 */
const o = {}

class ZoomBlurFilter extends vf.gui.Filter {
    constructor() {
        super(vertex, fragment);

        Object.assign(this, {
            strength: 0.1,
            center: [0, 0],
            innerRadius: 0,
            radius: -1,
        }, o);
    }

    /**
     * Center of the effect.
     *
     * @member {PIXI.Point|number[]}
     * @default [0, 0]
     */
    get center() {
        return this.uniforms.uCenter;
    }
    set center(value) {
        this.uniforms.uCenter = value;
    }

    /**
     * Intensity of the zoom effect.
     *
     * @member {number}
     * @default 0.1
     */
    get strength() {
        return this.uniforms.uStrength;
    }
    set strength(value) {
        this.uniforms.uStrength = value;
    }

    /**
     * Radius of the inner region not effected by blur.
     *
     * @member {number}
     * @default 0
     */
    get innerRadius() {
        return this.uniforms.uInnerRadius;
    }
    set innerRadius(value) {
        this.uniforms.uInnerRadius = value;
    }

    /**
     * Outer radius of the effect. The default value is `-1`.
     * `< 0.0` means it's infinity.
     *
     * @member {number}
     * @default -1
     */
    get radius() {
        return this.uniforms.uRadius;
    }
    set radius(value) {
        if (value < 0 || value === Infinity) {
            value = -1;
        }
        this.uniforms.uRadius = value;
    }
}

export { ZoomBlurFilter };

