
import { importScript } from "../../../utils"

export class TestGodrayFilter{
    public constructor(app: vf.Application, uiStage: vf.gui.Stage){
        this.onLoad(app, uiStage);
    }

    private onLoad(app: vf.Application, uiStage: vf.gui.Stage){
        let url =
            process.env.NODE_ENV === "production"
                ? "//s.vipkidstatic.com/vf/plugin/TextChoice/0.0.3.js"
                : "./dist/filterGodray.js";
                
        importScript(url, 'GodrayFilter', (value: any, className: string) => {
            
            let rect = new vf.gui.Rect();
            
            rect.color = 0x00ff00;
            rect.x = 20;
            rect.y = 20;
            rect.style.width = 200;
            rect.style.height = 200;
            uiStage.addChild(rect);
            
            // angle number
            // The angle/light-source of the rays in degrees. For instance, a value of 0 is vertical rays, values of 90 or -90 produce horizontal rays.
            // Default Value:
            // 30
            rect.style.filter.GodrayFilter.angle = 30;

            //  center PIXI.Point | Array.<number>
            // The position of the emitting point for light rays only used if parallel is set to false.
            // Default Value:
            // [0, 0]
            rect.style.filter.GodrayFilter.center = [0,0];

            //  gain number
            // General intensity of the effect. A value closer to 1 will produce a more intense effect, where a value closer to 0 will produce a subtler effect.
            // Default Value:
            // 0.5
            rect.style.filter.GodrayFilter.gain = 0.5;

            //  lacunarity number
            // The density of the fractal noise. A higher amount produces more rays and a smaller amound produces fewer waves.
            // Default Value:
            // 2.5
            rect.style.filter.GodrayFilter.lacunarity = 2.5

            //  parallel boolean
            // true if light rays are parallel (uses angle), false to use the focal center point
            // Default Value:
            // true
            rect.style.filter.GodrayFilter.parallel = true;

            //  time number
            // The current time.
            // Default Value:
            // 0
            rect.style.filter.GodrayFilter.time = 0;

            let pic = new vf.gui.Image();
            pic.style.left = 70;
            pic.style.top = 50;
            pic.style.width = 100;
            pic.style.height = 160;
            pic.src = './assets/dino.png';
            
            uiStage.addChild(pic);
            pic.style.filter.GodrayFilter.angle =10;

            setInterval(()=>{
                pic.style.filter.GodrayFilter.angle = Math.random()*360;
            },10)
           
        });

    }
}