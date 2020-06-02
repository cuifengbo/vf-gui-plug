import {TiltShiftXFilter} from './TiltShiftXFilter';
import {TiltShiftYFilter} from './TiltShiftYFilter';

/**
 * @author Vico @vicocotea
 * original filter https://github.com/evanw/glfx.js/blob/master/src/filters/blur/tiltshift.js by Evan Wallace : http://madebyevan.com/
 */

/**
 * A TiltShift Filter. Manages the pass of both a TiltShiftXFilter and TiltShiftYFilter.<br>
 * ![original](../tools/screenshots/dist/original.png)![filter](../tools/screenshots/dist/tilt-shift.png)
 *
 * @class
 * @extends PIXI.Filter
 * @memberof PIXI.filters
 * @see {@link https://www.npmjs.com/package/@pixi/filter-tilt-shift|@pixi/filter-tilt-shift}
 * @see {@link https://www.npmjs.com/package/pixi-filters|pixi-filters}
 * @param {number} [blur=100] The strength of the blur.
 * @param {number} [gradientBlur=600] The strength of the gradient blur.
 * @param {PIXI.Point} [start=null] The Y value to start the effect at.
 * @param {PIXI.Point} [end=null] The Y value to end the effect at.
 */
const o = {
    blur : 100, 
    gradientBlur : 600, 
    start : null, 
    end : null
}
class TiltShiftFilter extends vf.gui.Filter {
    tiltShiftYFilter: any;
    tiltShiftXFilter: any;
    constructor() {
        super();
        this.tiltShiftXFilter = new TiltShiftXFilter(o.blur, o.gradientBlur, o.start, o.end);
        this.tiltShiftYFilter = new TiltShiftYFilter(o.blur, o.gradientBlur, o.start, o.end);
    }

    apply(filterManager:any, input:any, output:any) {
        let renderTarget = filterManager.getFilterTexture();
        this.tiltShiftXFilter.apply(filterManager, input, renderTarget);
        this.tiltShiftYFilter.apply(filterManager, renderTarget, output);
        filterManager.returnFilterTexture(renderTarget);
    }

    /**
     * The strength of the blur.
     *
     * @member {number}
     */
    get blur() {
        return this.tiltShiftXFilter.blur;
    }
    set blur(value) {
        this.tiltShiftXFilter.blur = this.tiltShiftYFilter.blur = value;
    }

    /**
     * The strength of the gradient blur.
     *
     * @member {number}
     */
    get gradientBlur() {
        return this.tiltShiftXFilter.gradientBlur;
    }
    set gradientBlur(value) {
        this.tiltShiftXFilter.gradientBlur = this.tiltShiftYFilter.gradientBlur = value;
    }

    /**
     * The Y value to start the effect at.
     *
     * @member {PIXI.Point}
     */
    get start() {
        return this.tiltShiftXFilter.start;
    }
    set start(value) {
        this.tiltShiftXFilter.start = this.tiltShiftYFilter.start = value;
    }

    /**
     * The Y value to end the effect at.
     *
     * @member {PIXI.Point}
     */
    get end() {
        return this.tiltShiftXFilter.end;
    }
    set end(value) {
        this.tiltShiftXFilter.end = this.tiltShiftYFilter.end = value;
    }
}

export { TiltShiftFilter };

