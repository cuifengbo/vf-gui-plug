import {KawaseBlurFilter} from '../../filterKawaseBlur/src'
import {vertex} from '../../filterTools/fragments';
import fragment from './dropshadow.frag';


/**
 * Drop shadow filter.<br>
 * ![original](../tools/screenshots/dist/original.png)![filter](../tools/screenshots/dist/drop-shadow.png)
 * @class
  * @param {object} [options] Filter options
 * @param {number} [options.rotation=45] The angle of the shadow in degrees.
 * @param {number} [options.distance=5] Distance of shadow
 * @param {number} [options.color=0x000000] Color of the shadow
 * @param {number} [options.alpha=0.5] Alpha of the shadow
 * @param {number} [options.shadowOnly=false] Whether render shadow only
 * @param {number} [options.blur=2] - Sets the strength of the Blur properties simultaneously
 * @param {number} [options.quality=3] - The quality of the Blur filter.
 * @param {number[]} [options.kernels=null] - The kernels of the Blur filter.
 * @param {number|number[]|PIXI.Point} [options.pixelSize=1] - the pixelSize of the Blur filter.
 * @param {number} [options.resolution=PIXI.settings.RESOLUTION] - The resolution of the Blur filter.
 */

 const o = {
    rotation: 45,
    distance: 5,
    color: 0x000000,
    alpha: 0.5,
    shadowOnly: false,
    kernels: null,
    blur: 2,
    quality: 3,
    pixelSize: 1,
    resolution: vf.settings.RESOLUTION,
 }
class DropShadowFilter extends vf.gui.Filter {
    _tintFilter: import("src/core/Filter").Filter;
    _blurFilter: KawaseBlurFilter;
    shadowOnly: any;
    angle!: number ;
    _resolution: any;
    _distance: any;
    constructor() {
 
        super();

        const { kernels, blur, quality, pixelSize, resolution } = o;

        this._tintFilter = new vf.gui.Filter(vertex, fragment);
        this._tintFilter.uniforms.color = new Float32Array(4);
        this._tintFilter.uniforms.shift = new vf.Point();
        this._tintFilter.resolution = resolution;
        this._blurFilter = kernels ?
            new KawaseBlurFilter() :
            new KawaseBlurFilter();

        this.pixelSize = [pixelSize,pixelSize];
        this.resolution = resolution;

        const { shadowOnly, rotation, distance, alpha, color } = o;

        this.shadowOnly = shadowOnly;
        this.rotation = rotation;
        this.distance = distance;
        this.alpha = alpha;
        this.color = color;

        this._updatePadding();
    }

    apply(filterManager:any, input:any, output:any, clear:any) {
        const target = filterManager.getFilterTexture();

        this._tintFilter.apply(filterManager, input, target, 1);
        this._blurFilter.apply(filterManager, target, output, clear);

        if (this.shadowOnly !== true) {
            filterManager.applyFilter(this, input, output, 0);
        }

        filterManager.returnFilterTexture(target);
    }

    /**
     * Recalculate the proper padding amount.
     * @private
     */
    _updatePadding() {
        this.padding = this.distance + (this.blur * 2);
    }

    /**
     * Update the transform matrix of offset angle.
     * @private
     */
    _updateShift() {
        this._tintFilter.uniforms.shift.set(
            this.distance * Math.cos(this.angle),
            this.distance * Math.sin(this.angle)
        );
    }

    /**
     * The resolution of the filter.
     *
     * @member {number}
     * @default PIXI.settings.RESOLUTION
     */
    get resolution() {
        return this._resolution;
    }
    set resolution(value) {
        this._resolution = value;

        if (this._tintFilter) {
            this._tintFilter.resolution = value;
        }
        if (this._blurFilter) {
            this._blurFilter.resolution = value;
        }
    }

    /**
     * Distance offset of the shadow
     * @member {number}
     * @default 5
     */
    get distance() {
        return this._distance;
    }
    set distance(value) {
        this._distance = value;
        this._updatePadding();
        this._updateShift();
    }

    /**
     * The angle of the shadow in degrees
     * @member {number}
     * @default 2
     */
    get rotation() {
        return this.angle / vf.DEG_TO_RAD;
    }
    set rotation(value) {
        this.angle = value * vf.DEG_TO_RAD;
        this._updateShift();
    }

    /**
     * The alpha of the shadow
     * @member {number}
     * @default 1
     */
    get alpha() {
        return this._tintFilter.uniforms.alpha;
    }
    set alpha(value) {
        this._tintFilter.uniforms.alpha = value;
    }

    /**
     * The color of the shadow.
     * @member {number}
     * @default 0x000000
     */
    get color() {
        return vf.utils.rgb2hex(this._tintFilter.uniforms.color);
    }
    set color(value) {
        vf.utils.hex2rgb(value, this._tintFilter.uniforms.color);
    }

    /**
     * Sets the kernels of the Blur Filter
     *
     * @member {number[]}
     */
    get kernels() {
        return this._blurFilter.kernels;
    }
    set kernels(value) {
        this._blurFilter.kernels = value;
    }

    /**
     * The blur of the shadow
     * @member {number}
     * @default 2
     */
    get blur() {
        return this._blurFilter.blur;
    }
    set blur(value) {
        this._blurFilter.blur = value;
        this._updatePadding();
    }

    /**
     * Sets the quality of the Blur Filter
     *
     * @member {number}
     * @default 4
     */
    get quality() {
        return this._blurFilter.quality;
    }
    set quality(value) {
        this._blurFilter.quality = value;
    }

    /**
     * Sets the pixelSize of the Kawase Blur filter
     *
     * @member {number|number[]|PIXI.Point}
     * @default 1
     */
    get pixelSize() {
        return this._blurFilter.pixelSize;
    }
    set pixelSize(value) {
        this._blurFilter.pixelSize = value;
    }
}

export { DropShadowFilter };
