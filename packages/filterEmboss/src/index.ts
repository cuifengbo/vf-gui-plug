import {vertex} from '../../filterTools/fragments';
import fragment from './emboss.frag';

/**
 * An RGB Split Filter.<br>
 * ![original](../tools/screenshots/dist/original.png)![filter](../tools/screenshots/dist/emboss.png)
 *
 * @class
 * @param {number} [strength=5] Strength of the emboss.
 */
class EmbossFilter extends vf.gui.Filter {
   
    constructor(){
        super(vertex, fragment);
        this.strength = 5;
    }

    /**
     * Strength of emboss.
     *
     * @member {number}
     */
    get strength() {
        return this.uniforms.strength;
    }
    set strength(value) {
        this.uniforms.strength = value;
    }
}

export { EmbossFilter };
