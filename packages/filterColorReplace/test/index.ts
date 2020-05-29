
import { importScript } from "../../../utils"

export class TestColorReplaceFilter{
    public constructor(app: vf.Application, uiStage: vf.gui.Stage){
        this.onLoad(app, uiStage);
    }

    private onLoad(app: vf.Application, uiStage: vf.gui.Stage){
        let url =
            process.env.NODE_ENV === "production"
                ? "//s.vipkidstatic.com/vf/plugin/TextChoice/0.0.3.js"
                : "./dist/filterColorReplace.js";
                
        importScript(url, 'ColorReplaceFilter', (value: any, className: string) => {
            
            let rect = new vf.gui.Rect();
            
            rect.color = 0x00ff00;
            rect.x = 20;
            rect.y = 20;
            rect.style.width = 200;
            rect.style.height = 200;
            uiStage.addChild(rect);
            // size number
            // The pixel size used by the filter.
            rect.style.filter.ColorReplaceFilter.originColor = 0x75f94c;
            
            rect.style.filter.ColorReplaceFilter.newColor = 0xFFcc00;
            
            let pic = new vf.gui.Image();
            pic.style.left = 70;
            pic.style.top = 50;
            pic.style.width = 100;
            pic.style.height = 160;
            pic.src = './assets/dino.png';
            
            uiStage.addChild(pic);

            pic.style.filter.ColorReplaceFilter.epsilon = 0.1;

            pic.style.filter.ColorReplaceFilter.newColor = 0x000000;

            pic.style.filter.ColorReplaceFilter.originColor = 0xffffff;
            

            setInterval(()=>{
                pic.style.filter.ColorReplaceFilter.epsilon = Math.random();
            },10)
           
        });

    }
}