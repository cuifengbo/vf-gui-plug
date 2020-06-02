
import { importScript } from "../../../utils"

export class TestGlowFilter{
    public constructor(app: vf.Application, uiStage: vf.gui.Stage){
        this.onLoad(app, uiStage);
    }

    private onLoad(app: vf.Application, uiStage: vf.gui.Stage){
        let url =
            process.env.NODE_ENV === "production"
                ? "//s.vipkidstatic.com/vf/plugin/TextChoice/0.0.3.js"
                : "./dist/filterGlow.js";
                
        importScript(url, 'GlowFilter', (value: any, className: string) => {
            
            let rect = new vf.gui.Rect();
            
            rect.color = 0x00ff00;
            rect.x = 20;
            rect.y = 20;
            rect.style.width = 200;
            rect.style.height = 200;
            uiStage.addChild(rect);
            // size number
            // The pixel size used by the filter.
            

            // color number
            // The color of the glow.
            // Default Value:
            // 0xFFFFFF
            rect.style.filter.GlowFilter.color = 0xffffff;

            //  innerStrength number
            // The strength of the glow inward from the edge of the sprite.
            // Default Value:
            // 0
            rect.style.filter.GlowFilter.innerStrength = 0;

            //  knockout boolean
            // Only draw the glow, not the texture itself
            // Default Value:
            // false
            rect.style.filter.GlowFilter.knockout = true;

            //  outerStrength number
            // The strength of the glow outward from the edge of the sprite.
            // Default Value:
            // 4
            rect.style.filter.GlowFilter.outerStrength = 4;
           
            let pic = new vf.gui.Image();
            pic.style.left = 70;
            pic.style.top = 50;
            pic.style.width = 100;
            pic.style.height = 160;
            pic.src = './assets/dino.png';
            
            uiStage.addChild(pic);
            pic.style.filter.GlowFilter.color 

            setInterval(()=>{
                pic.style.filter.GlowFilter.color = Math.random()*0xffffff;
            },20)
           
        });

    }
}