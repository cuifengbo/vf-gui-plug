
import { importScript } from "../../../utils"

export class TestOldFilmFilter{
    public constructor(app: vf.Application, uiStage: vf.gui.Stage){
        this.onLoad(app, uiStage);
    }

    private onLoad(app: vf.Application, uiStage: vf.gui.Stage){
        let url =
            process.env.NODE_ENV === "production"
                ? "//s.vipkidstatic.com/vf/plugin/TextChoice/0.0.3.js"
                : "./dist/filterOldFilm.js";
                
        importScript(url, 'OldFilmFilter', (value: any, className: string) => {
            
            let rect = new vf.gui.Rect();
            
            rect.color = 0x00ff00;
            rect.x = 20;
            rect.y = 20;
            rect.style.width = 200;
            rect.style.height = 200;
            uiStage.addChild(rect);
            
            
            let pic = new vf.gui.Image();
            pic.style.left = 70;
            pic.style.top = 50;
            pic.style.width = 100;
            pic.style.height = 160;
            pic.src = './assets/dino.png';
            
            uiStage.addChild(pic);
        
            pic.style.filter.OldFilmFilter.noise = 1;
            // noise number
            // Opacity/intensity of the noise effect between 0 and 1
            // Default Value:
            // 0
            pic.style.filter.OldFilmFilter.noise = 0.3;

            //  noiseSize number
            // The size of the noise particles
            // Default Value:
            // 0
            pic.style.filter.OldFilmFilter.noiseSize = 1;

            //  scratch number
            // How often scratches appear
            // Default Value:
            // 0
            pic.style.filter.OldFilmFilter.scratch = 0.5;

            //  scratchDensity number
            // The density of the number of scratches
            // Default Value:
            // 0
            pic.style.filter.OldFilmFilter.scratchDensity = 0.3;

            //  scratchWidth number
            // The width of the scratches
            // Default Value:
            // 0
            pic.style.filter.OldFilmFilter.scratchWidth = 1;

            //  seed number
            // A see value to apply to the random noise generation
            pic.style.filter.OldFilmFilter.seed = 1;

            //  sepia number
            // The amount of saturation of sepia effect, a value of 1 is more saturation and closer to 0 is less, and a value of 0 produces no sepia effect
            // Default Value:
            // 0
            pic.style.filter.OldFilmFilter.sepia = 0.3;

            //  vignetting number
            // The radius of the vignette effect, smaller values produces a smaller vignette
            // Default Value:
            // 0
            pic.style.filter.OldFilmFilter.vignetting = 0.3;

            //  vignettingAlpha number
            // Amount of opacity of vignette
            // Default Value:
            // 0
            pic.style.filter.OldFilmFilter.vignettingAlpha = 1;

            //  vignettingBlur number
            // Blur intensity of the vignette
            // Default Value:
            // 0
            pic.style.filter.OldFilmFilter.vignettingBlur = 0.3;
            setInterval(()=>{
                 pic.style.filter.OldFilmFilter.noise = Math.random();
                 pic.style.filter.OldFilmFilter.seed =  Math.random();
            },10)
           
        });

    }
}