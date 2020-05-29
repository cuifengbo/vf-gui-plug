
import { importScript } from "../../../utils"

export class TestDropShadowFilter{
    public constructor(app: vf.Application, uiStage: vf.gui.Stage){
        this.onLoad(app, uiStage);
    }

    private onLoad(app: vf.Application, uiStage: vf.gui.Stage){
        let url =
            process.env.NODE_ENV === "production"
                ? "//s.vipkidstatic.com/vf/plugin/TextChoice/0.0.3.js"
                : "./dist/filterDropShadow.js";
                
        importScript(url, 'DropShadowFilter', (value: any, className: string) => {
            
            let rect = new vf.gui.Rect();
            
            rect.color = 0x00ff00;
            rect.x = 20;
            rect.y = 20;
            rect.style.width = 200;
            rect.style.height = 200;
            uiStage.addChild(rect);
            
            rect.style.filter.DropShadowFilter
            
            let pic = new vf.gui.Image();
            pic.style.left = 70;
            pic.style.top = 50;
            pic.style.width = 100;
            pic.style.height = 160;
            pic.src = './assets/dino.png';
            
            uiStage.addChild(pic);
            // alpha number
            // The alpha of the shadow
            // Default Value:
            // 0.5
            pic.style.filter.DropShadowFilter.alpha = 0.5;

            //  blur number
            // The blur of the shadow
            // Default Value:
            // 2
            pic.style.filter.DropShadowFilter.blur = 2;

            //  color number
            // The color of the shadow.
            // Default Value:
            // 0x000000
            pic.style.filter.DropShadowFilter.color = 0x000000;

            //  distance number
            // Distance offset of the shadow
            // Default Value:
            // 5
            pic.style.filter.DropShadowFilter.distance  = 5;

            //  kernels Array.<number>
            // Sets the kernels of the Blur Filter
            // pixelSize number | Array.<number> | PIXI.Point
            // Sets the pixelSize of the Kawase Blur filter
            // Default Value:
            // 1
            pic.style.filter.DropShadowFilter.kernels = [1,1];

            //  quality number
            // Sets the quality of the Blur Filter
            // Default Value:
            // 3
            pic.style.filter.DropShadowFilter.quality = 3;

            //  resolution number
            // The resolution of the filter.
            // Default Value:
            // vf.settings.RESOLUTION
            pic.style.filter.DropShadowFilter.resolution = 1;

            //  rotation number
            // The angle of the shadow in degrees
            // Default Value:
            // 2
            pic.style.filter.DropShadowFilter.rotation = 45;        
           
            //没有参数传递导致次级滤镜无效
            
            setInterval(()=>{
               pic.style.filter.DropShadowFilter.rotation = Math.random()*360;
               pic.style.filter.DropShadowFilter.distance = Math.random()*15;
               pic.style.filter.DropShadowFilter.alpha = 1;
               pic.style.filter.DropShadowFilter.quality = 10;
            },100)
           
        });

    }
}