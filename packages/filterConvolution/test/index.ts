
import { importScript } from "../../../utils"

export class TestConvolutionFilter{
    public constructor(app: vf.Application, uiStage: vf.gui.Stage){
        this.onLoad(app, uiStage);
    }

    private onLoad(app: vf.Application, uiStage: vf.gui.Stage){
        let url =
            process.env.NODE_ENV === "production"
                ? "//s.vipkidstatic.com/vf/plugin/TextChoice/0.0.3.js"
                : "./dist/filterConvolution.js";
                
        importScript(url, 'ConvolutionFilter', (value: any, className: string) => {
            
            let rect = new vf.gui.Rect();
            
            rect.color = 0x00ff00;
            rect.x = 20;
            rect.y = 20;
            rect.style.width = 200;
            rect.style.height = 200;
            uiStage.addChild(rect);
            // width number
            // 滤镜单位宽度
            rect.style.filter.ConvolutionFilter.width = 2;

            // height number
            // 滤镜单位高度
            rect.style.filter.ConvolutionFilter.height = 2;

            // matrix array<number>
            // 滤镜矩阵
            rect.style.filter.ConvolutionFilter.matrix = [1,1,1,1,1,1,1,1,1]


            let pic = new vf.gui.Image();
            pic.style.left = 70;
            pic.style.top = 50;
            pic.style.width = 100;
            pic.style.height = 160;
            pic.src = './assets/dino.png';
            
            uiStage.addChild(pic);
            pic.style.filter.ConvolutionFilter.width = 2;

            pic.style.filter.ConvolutionFilter.height = 2;
            
            pic.style.filter.ConvolutionFilter.matrix = [1,1,1,1,1,1,1,1,1]
            setInterval(()=>{
                pic.style.filter.ConvolutionFilter.width = Math.random()*10;
                pic.style.filter.ConvolutionFilter.height = Math.random()*10;
            },10)
           
        });

    }
}