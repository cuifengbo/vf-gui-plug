
import { importScript } from "../../../utils"

export class TestShockwaveFilter{
    public constructor(app: vf.Application, uiStage: vf.gui.Stage){
        this.onLoad(app, uiStage);
    }

    private onLoad(app: vf.Application, uiStage: vf.gui.Stage){
        let url =
            process.env.NODE_ENV === "production"
                ? "//s.vipkidstatic.com/vf/plugin/TextChoice/0.0.3.js"
                : "./dist/filterShockwave.js";
                
        importScript(url, 'ShockwaveFilter', (value: any, className: string) => {
            
            let rect = new vf.gui.Rect();
            
            rect.color = 0x00ff00;
            rect.x = 20;
            rect.y = 20;
            rect.style.width = 200;
            rect.style.height = 200;
            uiStage.addChild(rect);
            // size number
            // The pixel size used by the filter.
            rect.style.filter.ShockwaveFilter.size = 10;
            
            let pic = new vf.gui.Image();
            pic.style.left = 70;
            pic.style.top = 50;
            pic.style.width = 100;
            pic.style.height = 160;
            pic.src = './assets/dino.png';
            
            uiStage.addChild(pic);

            // amplitude number
            // The amplitude of the shockwave.
            pic.style.filter.ShockwaveFilter.amplitude =10;

            //  brightness number
            // The brightness of the shockwave.
            pic.style.filter.ShockwaveFilter.brightness =1;

            //  center PIXI.Point | Array.<number>
            // Sets the center of the shockwave in normalized screen coords. That is (0,0) is the top-left and (1,1) is the bottom right.
            pic.style.filter.ShockwaveFilter.center = [55,44]

            //  radius number
            // The maximum radius of shockwave. < 0.0 means it's infinity.
            pic.style.filter.ShockwaveFilter.radius = -1;
            //  speed number
            // The speed about the shockwave ripples out. The unit is pixel/second
            pic.style.filter.ShockwaveFilter.speed = 1;

            //  time number
            // Sets the elapsed time of the shockwave. It could control the current size of shockwave.
            pic.style.filter.ShockwaveFilter.time = 10;

            //  wavelength number
            // The wavelength of the shockwave.
            pic.style.filter.ShockwaveFilter.wavelength =100;

            var max = 100;
            setInterval(()=>{
                if(pic.style.filter.ShockwaveFilter.time<max){
                    pic.style.filter.ShockwaveFilter.time++;
                }else{
                    pic.style.filter.ShockwaveFilter.time=0;
                }  
            },10)
           
        });

    }
}