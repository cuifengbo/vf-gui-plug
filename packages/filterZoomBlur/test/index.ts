
import { importScript } from "../../../utils"

export class TestZoomBlurFilter{
    public constructor(app: vf.Application, uiStage: vf.gui.Stage){
        this.onLoad(app, uiStage);
    }

    private onLoad(app: vf.Application, uiStage: vf.gui.Stage){
        let url =
            process.env.NODE_ENV === "production"
                ? "//s.vipkidstatic.com/vf/plugin/TextChoice/0.0.3.js"
                : "./dist/filterZoomBlur.js";
                
        importScript(url, 'ZoomBlurFilter', (value: any, className: string) => {
            
            let rect = new vf.gui.Rect();
            
            rect.color = 0x00ff00;
            rect.x = 20;
            rect.y = 20;
            rect.style.width = 200;
            rect.style.height = 200;
            uiStage.addChild(rect);
            // size number
            // The pixel size used by the filter.
            rect.style.filter.ZoomBlurFilter.size = 10;
            
            let pic = new vf.gui.Image();
            pic.style.left = 70;
            pic.style.top = 50;
            pic.style.width = 100;
            pic.style.height = 160;
            pic.src = './assets/dino.png';
            
            uiStage.addChild(pic);
            // center vf.Point | Array.<number>
            // Center of the effect.
            // Default Value:
            // [0, 0]
            pic.style.filter.ZoomBlurFilter.center = [50,50];

            // innerRadius number
            // Radius of the inner region not effected by blur.
            // Default Value:
            // 0
            pic.style.filter.ZoomBlurFilter.innerRadius = 0;

            // radius number
            // Outer radius of the effect. The default value is -1. < 0.0 means it's infinity.
            // Default Value:
            // -1
            pic.style.filter.ZoomBlurFilter.radius = -1;

            // strength number
            // Intensity of the zoom effect.
            // Default Value:
            // 0.1
            pic.style.filter.ZoomBlurFilter.strength = 0.1;

            setInterval(()=>{
                pic.style.filter.ZoomBlurFilter.strength = Math.random();
            },10)
           
        });

    }
}