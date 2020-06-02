
import { importScript } from "../../../utils"

export class TestOutlineFilter{
    public constructor(app: vf.Application, uiStage: vf.gui.Stage){
        this.onLoad(app, uiStage);
    }

    private onLoad(app: vf.Application, uiStage: vf.gui.Stage){
        let url =
            process.env.NODE_ENV === "production"
                ? "//s.vipkidstatic.com/vf/plugin/TextChoice/0.0.3.js"
                : "./dist/filterOutline.js";
                
        importScript(url, 'OutlineFilter', (value: any, className: string) => {
            
            let rect = new vf.gui.Rect();
            
            rect.color = 0x00ff00;
            rect.x = 20;
            rect.y = 20;
            rect.style.width = 200;
            rect.style.height = 200;
            uiStage.addChild(rect);

            // color number
            // The color of the glow.
            // Default Value:
            // 0x000000
            rect.style.filter.OutlineFilter.color =0xffcc00;

            //  thickness number
            // The thickness of the outline.
            // Default Value:
            // 1
            rect.style.filter.OutlineFilter.thickness =2;
            
            let pic = new vf.gui.Image();
            pic.style.left = 70;
            pic.style.top = 50;
            pic.style.width = 100;
            pic.style.height = 160;
            pic.src = './assets/dino.png';
            
            uiStage.addChild(pic);
            pic.style.filter.OutlineFilter.thickness = 2;

            setInterval(()=>{
                pic.style.filter.OutlineFilter.color = Math.random()*0xffffff;
                pic.style.filter.OutlineFilter.thickness = Math.random()*10;
            },10)
           
        });

    }
}