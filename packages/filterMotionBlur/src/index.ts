import {vertex} from '../../filterTools/fragments';
import fragment from './motion-blur.frag';

/**
 * The MotionBlurFilter applies a Motion blur to an object.<br>
 * ![original](../tools/screenshots/dist/original.png)![filter](../tools/screenshots/dist/motion-blur.png)
 * @class
 * @param {PIXI.ObservablePoint|PIXI.Point|number[]} [velocity=[0, 0]] Sets the velocity of the motion for blur effect.
 * @param {number} [kernelSize=5] - The kernelSize of the blur filter. Must be odd number >= 5
 * @param {number} [offset=0] - The offset of the blur filter.
 */
const o = {
    velocity : [0, 0],
    kernelSize : 5,
    offset : 0
}

class MotionBlurFilter extends vf.gui.Filter {
    _velocity: any;
    kernelSize: number;
    constructor() {
        super(vertex, fragment);
        this.uniforms.uVelocity = new Float32Array(2);
        this._velocity = new vf.ObservablePoint(this.velocityChanged, this);
        this.velocity = o.velocity;

        /**
         * The kernelSize of the blur, higher values are slower but look better.
         * Use odd value greater than 5.
         * @member {number}
         * @default 5
         */
        this.kernelSize = o.kernelSize;
        this.offset = o.offset;
    }

    /**
     * Override existing apply method in PIXI.Filter
     * @private
     */
    apply(filterManager:any, input:any, output:any, clear:any) {
        const {x, y} = this.velocity;

        this.uniforms.uKernelSize = (x !== 0 || y !== 0) ? this.kernelSize : 0;
        filterManager.applyFilter(this, input, output, clear);
    }

    /**
     * Sets the velocity of the motion for blur effect.
     *
     * @member {PIXI.ObservablePoint|PIXI.Point|number[]}
     */
    set velocity(value) {
        if (Array.isArray(value)) {
            this._velocity.set(value[0], value[1]);
        }
        else if (value instanceof vf.Point || value instanceof vf.ObservablePoint) {
            this._velocity.copyFrom(value);
        }
    }

    get velocity() {
        return this._velocity;
    }

    /**
     * Handle velocity changed
     * @private
     */
    velocityChanged() {
        this.uniforms.uVelocity[0] = this._velocity.x;
        this.uniforms.uVelocity[1] = this._velocity.y;
    }

    /**
     * The offset of the blur filter.
     *
     * @member {number}
     * @default 0
     */
    set offset(value) {
        this.uniforms.uOffset = value;
    }

    get offset() {
        return this.uniforms.uOffset;
    }
}

export { MotionBlurFilter };

