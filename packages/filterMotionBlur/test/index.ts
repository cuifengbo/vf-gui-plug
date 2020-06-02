
import { importScript } from "../../../utils"

export class TestMotionBlurFilter{
    public constructor(app: vf.Application, uiStage: vf.gui.Stage){
        this.onLoad(app, uiStage);
    }

    private onLoad(app: vf.Application, uiStage: vf.gui.Stage){
        let url =
            process.env.NODE_ENV === "production"
                ? "//s.vipkidstatic.com/vf/plugin/TextChoice/0.0.3.js"
                : "./dist/filterMotionBlur.js";
                
        importScript(url, 'MotionBlurFilter', (value: any, className: string) => {
            
            let rect = new vf.gui.Rect();
            
            rect.color = 0x00ff00;
            rect.x = 20;
            rect.y = 20;
            rect.style.width = 200;
            rect.style.height = 200;
            uiStage.addChild(rect);
          
            // kernelSize number
            // The kernelSize of the blur, higher values are slower but look better. Use odd value greater than 5.
            // Default Value:
            // 5
            rect.style.filter.MotionBlurFilter.kernelSize = 5;

            //  offset number
            // The offset of the blur filter.
            // Default Value:
            // 0
            rect.style.filter.MotionBlurFilter.offset = 0;

            //  velocity PIXI.ObservablePoint | PIXI.Point | Array.<number>
            // Sets the velocity of the motion for blur effect.
            rect.style.filter.MotionBlurFilter.velocity = [0,0];
                        
            let pic = new vf.gui.Image();
            pic.style.left = 70;
            pic.style.top = 50;
            pic.style.width = 100;
            pic.style.height = 160;
            pic.src = './assets/dino.png';
            
            uiStage.addChild(pic);
            pic.style.filter.MotionBlurFilter.kernelSize = 9;
            pic.style.filter.MotionBlurFilter.offset = 100;

            setInterval(()=>{
               // pic.style.filter.MotionBlurFilter.size = Math.random()*10;
            },1000)
           
        });

    }
}