
import { importScript } from "../../../utils"

export class TestMultiColorReplaceFilter{
    public constructor(app: vf.Application, uiStage: vf.gui.Stage){
        this.onLoad(app, uiStage);
    }

    private onLoad(app: vf.Application, uiStage: vf.gui.Stage){
        let url =
            process.env.NODE_ENV === "production"
                ? "//s.vipkidstatic.com/vf/plugin/TextChoice/0.0.3.js"
                : "./dist/filterMultiColorReplace.js";
                
        importScript(url, 'MultiColorReplaceFilter', (value: any, className: string) => {
            
            let rect = new vf.gui.Rect();
            
            rect.color = 0x00ff00;
            rect.x = 20;
            rect.y = 20;
            rect.style.width = 200;
            rect.style.height = 200;
            uiStage.addChild(rect);

            // epsilon number
            // Tolerance of the floating-point comparison between colors (lower = more exact, higher = more inclusive)
            // Default Value:
            // 0.05
            rect.style.filter.MultiColorReplaceFilter.epsilon =0.05;
           
            
            //  replacements Array.<Array>
            // The source and target colors for replacement. See constructor for information on the format.
            rect.style.filter.MultiColorReplaceFilter.replacements =[
                [0xffffff, 0x000000],
                [0x000000, 0xFFFFFF]
            ]
           
            let pic = new vf.gui.Image();
            pic.style.left = 70;
            pic.style.top = 50;
            pic.style.width = 100;
            pic.style.height = 160;
            pic.src = './assets/dino.png';
            
            uiStage.addChild(pic);
            pic.style.filter.MultiColorReplaceFilter.replacements =[
                [0xffffff, 0x000000],
                [0x000000, 0xFFFFFF]
            ]

            setInterval(()=>{
                pic.style.filter.MultiColorReplaceFilter.replacements =[
                    [0xffffff, Math.random()*0xffffff],
                    [Math.random()*0xffffff, 0xFFFFFF]
                ]
            },10)
           
        });

    }
}