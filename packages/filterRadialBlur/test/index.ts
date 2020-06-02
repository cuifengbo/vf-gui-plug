
import { importScript } from "../../../utils"

export class TestRadialBlurFilter{
    public constructor(app: vf.Application, uiStage: vf.gui.Stage){
        this.onLoad(app, uiStage);
    }

    private onLoad(app: vf.Application, uiStage: vf.gui.Stage){
        let url =
            process.env.NODE_ENV === "production"
                ? "//s.vipkidstatic.com/vf/plugin/TextChoice/0.0.3.js"
                : "./dist/filterRadialBlur.js";
                
        importScript(url, 'RadialBlurFilter', (value: any, className: string) => {
            
            let rect = new vf.gui.Rect();
            
            rect.color = 0x00ff00;
            rect.x = 20;
            rect.y = 20;
            rect.style.width = 200;
            rect.style.height = 200;
            uiStage.addChild(rect);
            // angle vf.Point | Array.<number>
            // Sets the angle in degrees of the motion for blur effect.
            // Default Value:
            // [0, 0]
            rect.style.filter.RadialBlurFilter.angle = [0,0];
            
            //  center vf.Point | Array.<number>
            // Center of the effect.
            // Default Value:
            // [0, 0]
            rect.style.filter.RadialBlurFilter.center = [0,0];

            //  radius number
            // Outer radius of the effect. The default value of -1 is infinite.
            // Default Value:
            // -1
            rect.style.filter.RadialBlurFilter.radius = -1;
           
            

            let pic = new vf.gui.Image();
            pic.style.left = 70;
            pic.style.top = 50;
            pic.style.width = 100;
            pic.style.height = 160;
            pic.src = './assets/dino.png';
            
            uiStage.addChild(pic);
            pic.style.filter.RadialBlurFilter.angle = [0,0];
            pic.style.filter.RadialBlurFilter.center = [50,50];
            pic.style.filter.RadialBlurFilter.radius = 50;

            setInterval(()=>{
                // pic.style.filter.RadialBlurFilter.radius = Math.random()*10;
                // pic.style.filter.RadialBlurFilter.angle = [Math.random(),Math.random()];
                // pic.style.filter.RadialBlurFilter.center = [Math.random()*100,Math.random()*100];
            },10)
           
        });

    }
}