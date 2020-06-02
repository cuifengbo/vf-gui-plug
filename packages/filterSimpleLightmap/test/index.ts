
import { importScript } from "../../../utils"

export class TestSimpleLightmapFilter{
    public constructor(app: vf.Application, uiStage: vf.gui.Stage){
        this.onLoad(app, uiStage);
    }

    private onLoad(app: vf.Application, uiStage: vf.gui.Stage){
        let url =
            process.env.NODE_ENV === "production"
                ? "//s.vipkidstatic.com/vf/plugin/TextChoice/0.0.3.js"
                : "./dist/filterSimpleLightmap.js";
                
        importScript(url, 'SimpleLightmapFilter', (value: any, className: string) => {
            
            let rect = new vf.gui.Rect();
            
            rect.color = 0x00ff00;
            rect.x = 20;
            rect.y = 20;
            rect.style.width = 200;
            rect.style.height = 200;
            uiStage.addChild(rect);
            // size number
            // The pixel size used by the filter.
           // rect.style.filter.SimpleLightmapFilter.size = 10;
            
            let pic = new vf.gui.Image();
            pic.style.left = 70;
            pic.style.top = 50;
            pic.style.width = 100;
            pic.style.height = 160;
            pic.src = './assets/dino.png';
            uiStage.addChild(pic);
            // alpha number
            // When setting color as hex, this can be used to set alpha independently.
            pic.style.filter.SimpleLightmapFilter.alpha = .5

            //  color Array.<number> | number
            // An RGBA array of the ambient color or a hex color without alpha
            pic.style.filter.SimpleLightmapFilter.color = 0x666666
            
            //  texture PIXI.Texture
            // a texture where your lightmap is rendered
            let t = new vf.BaseTexture('./assets/dino.png');
            let tt = new vf.Texture(t);
            pic.style.filter.SimpleLightmapFilter.texture = tt;
            setInterval(()=>{
                pic.style.filter.SimpleLightmapFilter.color = Math.random()*0xFFFFFF;
            },10)
           
        });

    }
}