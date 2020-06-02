
import { importScript } from "../../../utils"

export class TestReflectionFilter{
    public constructor(app: vf.Application, uiStage: vf.gui.Stage){
        this.onLoad(app, uiStage);
    }

    private onLoad(app: vf.Application, uiStage: vf.gui.Stage){
        let url =
            process.env.NODE_ENV === "production"
                ? "//s.vipkidstatic.com/vf/plugin/TextChoice/0.0.3.js"
                : "./dist/filterReflection.js";
                
        importScript(url, 'ReflectionFilter', (value: any, className: string) => {
            
            let rect = new vf.gui.Rect();
            
            rect.color = 0x00ff00;
            rect.x = 20;
            rect.y = 20;
            rect.style.width = 200;
            rect.style.height = 200;
            uiStage.addChild(rect);
            
            rect.style.filter.ReflectionFilter
            
            let pic = new vf.gui.Image();
            pic.style.left = 70;
            pic.style.top = 50;
            pic.style.width = 100;
            pic.style.height = 160;
            pic.src = './assets/dino.png';
            
            uiStage.addChild(pic);

            // alpha Array.<number>
            // Starting and ending alpha values
            // Default Value:
            // [1, 1]
            pic.style.filter.ReflectionFilter.alpha = [1, 1];

            //  amplitude Array.<number>
            // Starting and ending amplitude of waves
            // Default Value:
            // [0, 20]
            pic.style.filter.ReflectionFilter.amplitude = [0, 20];

            //  boundary number
            // Vertical position of the reflection point, default is 50% (middle) smaller numbers produce a larger reflection, larger numbers produce a smaller reflection.
            // Default Value:
            // 0.5
            pic.style.filter.ReflectionFilter.boundary = 0.5;

            //  mirror boolean
            // true to reflect the image, false for waves-only
            // Default Value:
            // true
            pic.style.filter.ReflectionFilter.mirror = true;

            //  time number
            // Time for animating position of waves
            // Default Value:
            // 0
            pic.style.filter.ReflectionFilter.time = 0;

            //  waveLength Array.<number>
            // Starting and ending length of waves
            // Default Value:
            // [30, 100]
            pic.style.filter.ReflectionFilter.waveLength = [30, 100];
            const max = 9999;
            setInterval(()=>{
                if( pic.style.filter.ReflectionFilter.time<max){
                    pic.style.filter.ReflectionFilter.time++ ;
                }
               
            },80)
           
        });

    }
}