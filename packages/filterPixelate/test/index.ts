
import { importScript } from "../../../utils"

export class TestPixelateFilter{
    public constructor(app: vf.Application, uiStage: vf.gui.Stage){
        this.onLoad(app, uiStage);
    }

    private onLoad(app: vf.Application, uiStage: vf.gui.Stage){
        let url =
            process.env.NODE_ENV === "production"
                ? "//s.vipkidstatic.com/vf/plugin/TextChoice/0.0.3.js"
                : "./dist/filterPixelate.js";
                
        importScript(url, 'PixelateFilter', (value: any, className: string) => {
            
            let rect = new vf.gui.Rect();
            
            rect.color = 0x00ff00;
            rect.x = 20;
            rect.y = 20;
            rect.style.width = 200;
            rect.style.height = 200;
            uiStage.addChild(rect);
            //size PIXI.Point | Array.<number> | number
            // This a point that describes the size of the blocks. x is the width of the block and y is the height.
            rect.style.filter.PixelateFilter.size = 10;
            
            let pic = new vf.gui.Image();
            pic.style.left = 70;
            pic.style.top = 50;
            pic.style.width = 100;
            pic.style.height = 160;
            pic.src = './assets/dino.png';
            
            uiStage.addChild(pic);
            pic.style.filter.PixelateFilter.size =10;

            setInterval(()=>{
                pic.style.filter.PixelateFilter.size = Math.random()*10;
            },1000)
           
        });

    }
}