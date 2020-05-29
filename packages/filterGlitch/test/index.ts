
import { importScript } from "../../../utils"

export class TestGlitchFilter{
    public constructor(app: vf.Application, uiStage: vf.gui.Stage){
        this.onLoad(app, uiStage);
    }

    private onLoad(app: vf.Application, uiStage: vf.gui.Stage){
        let url =
            process.env.NODE_ENV === "production"
                ? "//s.vipkidstatic.com/vf/plugin/TextChoice/0.0.3.js"
                : "./dist/filterGlitch.js";
                
        importScript(url, 'GlitchFilter', (value: any, className: string) => {
            
            let rect = new vf.gui.Rect();
            
            rect.color = 0x00ff00;
            rect.x = 20;
            rect.y = 20;
            rect.style.width = 200;
            rect.style.height = 200;
            uiStage.addChild(rect);
            //average boolean
            // true will divide the bands roughly based on equal amounts where as setting to false will vary the band sizes dramatically (more random looking).
            // Default Value:
            // false
            rect.style.filter.GlitchFilter.average = false;

            // blue PIXI.Point
            // Blue offset.
            rect.style.filter.GlitchFilter.blue = [1,1];

            // direction number
            // The angle in degree of the offset of slices.
            // Default Value:
            // 0
            rect.style.filter.GlitchFilter.direction = 0;

            // fillMode number
            // The fill mode of the space after the offset.
            rect.style.filter.GlitchFilter.fillMode = 10;

            // green PIXI.Point
            // Green channel offset.
            rect.style.filter.GlitchFilter.green = [1,1];

            // minSize number
            // Minimum size of slices as a portion of the sampleSize
            rect.style.filter.GlitchFilter.minSize = 10;

            // offset number
            // The maximum offset value for each of the slices.
            rect.style.filter.GlitchFilter.offset = 1000;

            // offsets Array.<number>
            // Manually set custom slices offset of displacement bitmap, this is a collection of values from -1 to 1. To change the max offset value set offset.
            rect.style.filter.GlitchFilter.offsets = [-1,1,1];

            // red PIXI.Point
            // Red channel offset.
            rect.style.filter.GlitchFilter.red = [1,1];

            // seed number
            // A seed value for randomizing color offset. Animating this value to Math.random() produces a twitching effect.
            rect.style.filter.GlitchFilter.seed = 1;

            // sizes Array.<number>
            // Manually custom slices size (height) of displacement bitmap
            rect.style.filter.GlitchFilter.sizes = [1,1,1];

            // slices number
            // The count of slices.
            // Default Value:
            // 5
            rect.style.filter.GlitchFilter.slices = 5;
            
            let pic = new vf.gui.Image();
            pic.style.left = 70;
            pic.style.top = 50;
            pic.style.width = 100;
            pic.style.height = 160;
            pic.src = './assets/dino.png';
            
            uiStage.addChild(pic);
            pic.style.filter.GlitchFilter

            setInterval(()=>{
                pic.style.filter.GlitchFilter.direction = Math.random()*360;
            },1000)
           
        });

    }
}