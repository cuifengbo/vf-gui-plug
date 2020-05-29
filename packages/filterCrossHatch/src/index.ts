import {vertex} from '../../filterTools/fragments';
import fragment from './crosshatch.frag';


/**
 * A Cross Hatch effect filter.<br>
 * ![original](../tools/screenshots/dist/original.png)![filter](../tools/screenshots/dist/cross-hatch.png)
 */
class CrossHatchFilter extends vf.gui.Filter {
    constructor() {
        super(vertex, fragment);
    }
}

export { CrossHatchFilter };
