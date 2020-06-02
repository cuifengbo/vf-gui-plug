
import { importScript } from "../../../utils"

export class TestTiltShiftFilter{
    public constructor(app: vf.Application, uiStage: vf.gui.Stage){
        this.onLoad(app, uiStage);
    }

    private onLoad(app: vf.Application, uiStage: vf.gui.Stage){
        let url =
            process.env.NODE_ENV === "production"
                ? "//s.vipkidstatic.com/vf/plugin/TextChoice/0.0.3.js"
                : "./dist/filterTiltShift.js";
                
        importScript(url, 'TiltShiftFilter', (value: any, className: string) => {
            
            let rect = new vf.gui.Rect();
            
            rect.color = 0x00ff00;
            rect.x = 20;
            rect.y = 20;
            rect.style.width = 200;
            rect.style.height = 200;
            uiStage.addChild(rect);
            
          //  rect.style.filter.TiltShiftFilter
            
            let pic = new vf.gui.Image();
            pic.style.left = 70;
            pic.style.top = 50;
            pic.style.width = 100;
            pic.style.height = 160;
            pic.src = './assets/dino.png';
            
            uiStage.addChild(pic);
            
            // blur number
            // The strength of the blur.
            pic.style.filter.TiltShiftFilter.blur = 15;

            //  end vf.Point
            // The Y value to end the effect at.
            let ep = new vf.Point(10,10);
            pic.style.filter.TiltShiftFilter.end = ep;

            //  gradientBlur number
            // The strength of the gradient blur.
            
            pic.style.filter.TiltShiftFilter.gradientBlur = 100;

            //  start vf.Point
            // The Y value to start the effect at.
            let sp = new vf.Point(1,1);
            pic.style.filter.TiltShiftFilter.start = sp;

            var max = 100;
            var t =1;

            setInterval(()=>{
                if(t<max){
                    t++;
                    sp = new vf.Point(1,t);
                }else{
                    t=1;
                }
                pic.style.filter.TiltShiftFilter.start = sp;
            },10)
           
        });

    }
}