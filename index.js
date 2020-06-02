
//导入测试插件
import {TestTextChoice} from './packages/TextChoice/test'
import {TestTextFillBlanks} from './packages/TextFillBlanks/test'
import {TestFilterAlpha} from './packages/filterAlpha/test'
import {TestAdjustmentFilter} from './packages/filterAdjustment/test'
import {TestColorMatrixFilter} from './packages/filterColorMatrix/test'
import {TestBlurFilter} from './packages/filterBlur/test'
//import {TestDisplacementFilter} from './packages/filterDisplacement/test'
import {TestFxaaFilter} from './packages/filterFxaa/test'
import {TestNoiseFilter} from './packages/filterNoise/test'
import {TestKawaseBlurFilter} from './packages/filterKawaseBlur/test'
import {TestAdvancedBloomFilter} from './packages/filterAdvancedBloom/test'
import {TestAsciiFilter} from './packages/filterAscii/test'
import {TestBevelFilter} from './packages/filterBevel/test'
import {TestBloomFilter} from './packages/filterBloom/test'
import {TestBulgePinchFilter} from './packages/filterBulgePinch/test'
import {TestColorOverlayFilter} from './packages/filterColorOverlay/test'
import {TestColorReplaceFilter} from './packages/filterColorReplace/test'
import {TestConvolutionFilter} from './packages/filterConvolution/test'
import {TestCrossHatchFilter} from './packages/filterCrossHatch/test'
import {TestCRTFilter} from './packages/filterCRT/test'
import {TestDotFilter} from './packages/filterDot/test'
import {TestDropShadowFilter} from './packages/filterDropShadow/test'
import {TestEmbossFilter} from './packages/filterEmboss/test'
import {TestGlitchFilter} from './packages/filterGlitch/test'
import {TestGlowFilter} from './packages/filterGlow/test'
import {TestGodrayFilter} from './packages/filterGodray/test'
import {TestMotionBlurFilter} from './packages/filterMotionBlur/test'
import {TestMultiColorReplaceFilter} from './packages/filterMultiColorReplace/test'
import {TestOldFilmFilter} from './packages/filterOldFilm/test'
import {TestOutlineFilter} from './packages/filterOutline/test'
import {TestPixelateFilter} from './packages/filterPixelate/test'
import {TestRadialBlurFilter} from './packages/filterRadialBlur/test'
import {TestReflectionFilter} from './packages/filterReflection/test'
import {TestRGBSplitFilter} from './packages/filterRGBSplit/test'
import {TestShockwaveFilter} from './packages/filterShockwave/test'
import {TestSimpleLightmapFilter} from './packages/filterSimpleLightmap/test'
import {TestTiltShiftFilter} from './packages/filterTiltShift/test'
import {TestTwistFilter} from './packages/filterTwist/test'
import {TestZoomBlurFilter} from './packages/filterZoomBlur/test'


var app = new vf.Application({ 
    width: window.innerWidth, 
    height: window.innerHeight,
    antialias:true,
    forceCanvas:false,
    resolution: window.devicePixelRatio,
    forceFXAA:true
});     
var uiStage = new gui.Stage(app.view.width, app.view.height,app);
app.stage.addChild(uiStage.container);
document.body.appendChild(app.view);

function updata(deltaTime) {
    gui.TickerShared.update(deltaTime,app.ticker.lastTime,app.ticker.elapsedMS);
}

app.ticker.maxFPS = 60;
app.ticker.add(updata, this);


//添加测试页面
//new TestTextChoice(app, uiStage);
//new TestTextFillBlanks(app, uiStage);
//new TestFilterAlpha(app, uiStage);
//new TestAdjustmentFilter(app, uiStage);
//new TestColorMatrixFilter(app, uiStage);
//new TestBlurFilter(app, uiStage);
//new TestDisplacementFilter(app, uiStage);//暂停中 因为构造函数不能传餐
//new TestFxaaFilter(app, uiStage);
//new TestNoiseFilter(app, uiStage);
//new TestKawaseBlurFilter(app, uiStage);
//new TestAdvancedBloomFilter(app, uiStage);
//new TestAsciiFilter(app, uiStage);
//new TestBevelFilter(app, uiStage);
//new TestBloomFilter(app, uiStage);
//new TestBulgePinchFilter(app, uiStage);
//new TestColorOverlayFilter(app, uiStage);
//new TestConvolutionFilter(app, uiStage);
//new TestCrossHatchFilter(app, uiStage);
//new TestCRTFilter(app, uiStage);
//new TestDotFilter(app, uiStage);
//new TestDropShadowFilter(app, uiStage);
//new TestEmbossFilter(app, uiStage);
//new TestGlitchFilter(app, uiStage);
//new TestGlowFilter(app, uiStage);
//new TestGodrayFilter(app, uiStage);
//new TestMotionBlurFilter(app, uiStage);
//new TestMultiColorReplaceFilter(app, uiStage);
//new TestOldFilmFilter(app, uiStage);
//new TestOutlineFilter(app, uiStage);
//new TestPixelateFilter(app, uiStage);
//new TestRadialBlurFilter(app, uiStage);
//new TestReflectionFilter(app, uiStage);
//new TestRGBSplitFilter(app, uiStage);
//new TestShockwaveFilter(app, uiStage);
//new TestSimpleLightmapFilter(app, uiStage);
//new TestTiltShiftFilter(app, uiStage);
//new TestTwistFilter(app, uiStage);
new TestZoomBlurFilter(app, uiStage);
