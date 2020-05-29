
import { importScript } from "../../../utils"

export class TestDotFilter {
    public constructor(app: vf.Application, uiStage: vf.gui.Stage) {
        this.onLoad(app, uiStage);
    }

    private onLoad(app: vf.Application, uiStage: vf.gui.Stage) {
        let url =
            process.env.NODE_ENV === "production"
                ? "//s.vipkidstatic.com/vf/plugin/TextChoice/0.0.3.js"
                : "./dist/filterDot.js";

        importScript(url, 'DotFilter', (value: any, className: string) => {

            let rect = new vf.gui.Rect();

            rect.color = 0x00ff00;
            rect.x = 20;
            rect.y = 20;
            rect.style.width = 200;
            rect.style.height = 200;
            uiStage.addChild(rect);
            // angle number
            // The radius of the effect.
            // Default Value:
            // 5
            rect.style.filter.DotFilter.angle = 5;

            //  scale number
            // The scale of the effect.

            // Default Value:
            // 1
            rect.style.filter.DotFilter.scale = 1;

            let pic = new vf.gui.Image();
            pic.style.left = 70;
            pic.style.top = 50;
            pic.style.width = 100;
            pic.style.height = 160;
            pic.src = './assets/dino.png';

            uiStage.addChild(pic);
            pic.style.filter.DotFilter.angle = 10;

            setInterval(() => {
                pic.style.filter.DotFilter.angle = Math.random() * 360;
            }, 10)

        });

    }
}