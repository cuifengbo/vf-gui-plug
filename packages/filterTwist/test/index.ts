
import { importScript } from "../../../utils"

export class TestTwistFilter{
    public constructor(app: vf.Application, uiStage: vf.gui.Stage){
        this.onLoad(app, uiStage);
    }

    private onLoad(app: vf.Application, uiStage: vf.gui.Stage){
        let url =
            process.env.NODE_ENV === "production"
                ? "//s.vipkidstatic.com/vf/plugin/TextChoice/0.0.3.js"
                : "./dist/filterTwist.js";
                
        importScript(url, 'TwistFilter', (value: any, className: string) => {
            
            let rect = new vf.gui.Rect();
            
            rect.color = 0x00ff00;
            rect.x = 20;
            rect.y = 20;
            rect.style.width = 200;
            rect.style.height = 200;
            uiStage.addChild(rect);
            // size number
            // The pixel size used by the filter.
            rect.style.filter.TwistFilter;
            
            let pic = new vf.gui.Image();
            pic.style.left = 70;
            pic.style.top = 50;
            pic.style.width = 100;
            pic.style.height = 160;
            pic.src = './assets/dino.png';
            
            uiStage.addChild(pic);
            // angle number
            // The angle of the twist.
            pic.style.filter.TwistFilter.angle = 10;

            // offset vf.Point
            // This point describes the the offset of the twist.
            pic.style.filter.TwistFilter.offset = [50,50];

            // radius number
            // The radius of the twist.
            pic.style.filter.TwistFilter.radius = 100;

            setInterval(()=>{
                pic.style.filter.TwistFilter.offset = [Math.random()*100,Math.random()*100];
            },10)
           
        });

    }
}