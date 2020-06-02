import {vertex} from '../../filterTools/fragments';
import fragment from './glow.frag';

/**
 * GlowFilter, originally by mishaa
 * [codepen]{@link http://codepen.io/mishaa/pen/raKzrm}.<br>
 * ![original](../tools/screenshots/dist/original.png)![filter](../tools/screenshots/dist/glow.png)
 //todo distance 属性暂时无法在初始化后使用. 
 */
const o = {
    distance: 10,
    outerStrength: 4,
    innerStrength: 0,
    color: 0xffffff,
    quality: 0.1,
    knockout: false,
}
class GlowFilter extends vf.gui.Filter {

    constructor() {
        let {
            distance,
            outerStrength,
            innerStrength,
            color,
            knockout,
            quality } = Object.assign({},o);

        distance = Math.round(distance);

        super(vertex, fragment
            .replace(/__ANGLE_STEP_SIZE__/gi, '' + (1 / quality / distance).toFixed(7))
            .replace(/__DIST__/gi, distance.toFixed(0) + '.0'));

        this.uniforms.glowColor = new Float32Array([0, 0, 0, 1]);

        Object.assign(this, {
            color,
            outerStrength,
            innerStrength,
            padding: distance,
            knockout,
        });
    }

    /**
     * The color of the glow.
     * @member {number}
     * @default 0xFFFFFF
     */
    get color() {
        return vf.utils.rgb2hex(this.uniforms.glowColor);
    }
    set color(value) {
        vf.utils.hex2rgb(value, this.uniforms.glowColor);
    }

    /**
     * The strength of the glow outward from the edge of the sprite.
     * @member {number}
     * @default 4
     */
    get outerStrength() {
        return this.uniforms.outerStrength;
    }
    set outerStrength(value) {
        this.uniforms.outerStrength = value;
    }

    /**
     * The strength of the glow inward from the edge of the sprite.
     * @member {number}
     * @default 0
     */
    get innerStrength() {
        return this.uniforms.innerStrength;
    }
    set innerStrength(value) {
        this.uniforms.innerStrength = value;
    }

    /**
     * Only draw the glow, not the texture itself
     * @member {boolean}
     * @default false
     */
    get knockout() {
        return this.uniforms.knockout;
    }
    set knockout(value) {
        this.uniforms.knockout = value;
    }
}


export { GlowFilter };
