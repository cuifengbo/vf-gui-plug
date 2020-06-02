
import { importScript } from "../../../utils"

export class TestRGBSplitFilter{
    public constructor(app: vf.Application, uiStage: vf.gui.Stage){
        this.onLoad(app, uiStage);
    }

    private onLoad(app: vf.Application, uiStage: vf.gui.Stage){
        let url =
            process.env.NODE_ENV === "production"
                ? "//s.vipkidstatic.com/vf/plugin/TextChoice/0.0.3.js"
                : "./dist/filterRGBSplit.js";
                
        importScript(url, 'RGBSplitFilter', (value: any, className: string) => {
            
            let rect = new vf.gui.Rect();
            
            rect.color = 0x00ff00;
            rect.x = 20;
            rect.y = 20;
            rect.style.width = 200;
            rect.style.height = 200;
            uiStage.addChild(rect);
            
           // rect.style.filter.RGBSplitFilter.blue = [1,1];
            
            let pic = new vf.gui.Image();
            pic.style.left = 70;
            pic.style.top = 50;
            pic.style.width = 100;
            pic.style.height = 160;
            pic.src = './assets/dino.png';
            
            uiStage.addChild(pic);

            // blue vf.Point
            // Blue offset.
            pic.style.filter.RGBSplitFilter.blue =[1,1];

            // green vf.Point
            // Green channel offset.
            pic.style.filter.RGBSplitFilter.green =[1,1];

            // red vf.Point
            // Red channel offset.
            pic.style.filter.RGBSplitFilter.red =[10,10];

            setInterval(()=>{
                pic.style.filter.RGBSplitFilter.blue = [Math.random()*10,Math.random()*10];
                pic.style.filter.RGBSplitFilter.green = [Math.random()*10,Math.random()*10];
                pic.style.filter.RGBSplitFilter.red = [Math.random()*10,Math.random()*10];
            },10)
           
        });

    }
}