
import { importScript } from "../../../utils"

export class TestCRTFilter {
    public constructor(app: vf.Application, uiStage: vf.gui.Stage) {
        this.onLoad(app, uiStage);
    }

    private onLoad(app: vf.Application, uiStage: vf.gui.Stage) {
        let url =
            process.env.NODE_ENV === "production"
                ? "//s.vipkidstatic.com/vf/plugin/TextChoice/0.0.3.js"
                : "./dist/filterCRT.js";

        importScript(url, 'CRTFilter', (value: any, className: string) => {

            let rect = new vf.gui.Rect();

            rect.color = 0x00ff00;
            rect.x = 20;
            rect.y = 20;
            rect.style.width = 200;
            rect.style.height = 200;
            uiStage.addChild(rect);

            // curvature number
            // Bent of interlaced lines, higher value means more bend
            // Default Value:
            // 1
            rect.style.filter.CRTFilter.curvature = 1;
           
            // lineContrast number
            // Contrast of interlaced lines
            // Default Value:
            // 0.25
            rect.style.filter.CRTFilter.lineContrast = 0.25;

            // lineWidth number
            // Width of interlaced lines
            // Default Value:
            // 1
            rect.style.filter.CRTFilter.lineWidth = 1;

            // noise number
            // Opacity / intensity of the noise effect between 0 and 1
            // Default Value:
            // 0
            rect.style.filter.CRTFilter.noise = 0;

            // noiseSize number
            // The size of the noise particles
            // Default Value:
            // 0
            rect.style.filter.CRTFilter.noiseSize = 0;
            
            // seed number
            // A seed value to apply to the random noise generation
            // Default Value:
            // 0
            rect.style.filter.CRTFilter.seed = 0;
            
            // time number
            // For animating interlaced lines
            // Default Value:
            // 0
            rect.style.filter.CRTFilter.time = 0;
            
            // verticalLine boolean
            // true for vertical lines, false for horizontal lines
            // Default Value:
            //     false
            rect.style.filter.CRTFilter.verticalLine = false;

            // vignetting number
            // The radius of the vignette effect, smaller values produces a smaller vignette
            // Default Value:
            // 0
            rect.style.filter.CRTFilter.vignetting = 0;

            // vignettingAlpha number
            // Amount of opacity of vignette
            // Default Value:
            // 0
            rect.style.filter.CRTFilter.vignettingAlpha = 0;

            // vignettingBlur number
            // Blur intensity of the vignette
            // Default Value:
            // 0
            rect.style.filter.CRTFilter.vignettingBlur = 0;
            
            let pic = new vf.gui.Image();
            pic.style.left = 70;
            pic.style.top = 50;
            pic.style.width = 100;
            pic.style.height = 160;
            pic.src = './assets/dino.png';

            uiStage.addChild(pic);
           
            pic.style.filter.CRTFilter;
            
            setInterval(() => {
                pic.style.filter.CRTFilter.lineWidth = Math.random() * 10;
            }, 100)

        });

    }
}