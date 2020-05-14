export class TextFillBlanks extends vf.gui.DisplayObject {
    public constructor() {
        super();
    }

    private _optionList: any[] = []; //选项数组,{id,text, displayObject}
    private _originBlockTextList: string[] = []; //原始文本拆分后的list
    private _curPosX: number = 0; //当前行的起始位置x
    private _curPosY: number = 25; //当前行的起始位置y
    private _optionId: number = 0; //选项id

    /**
     * 每个选项的状态
     * {
     *  id:0
     *  status: 'selected_right' //selected_right-选中且为正确项  selected_wrong-选中且为错误项  unselected_right-未选中且为正确项  unselected_wrong-未选中且为错误项
     * }
     */
    private _optionStatusList: any[] = [];

    /**
     * 正确答案
     */
    private _optionAnswer: string[] = [];

    /**
     * 已选择的选项数量
     */
    private _selectedTotal: number = 0;

    /**
     * 组件配置
     */
    private _config: any = {
        containerWidth: 1000,                 //组件容器宽度
        labelStyle: {
            lineHeight: 40,                       //行高
            fontSize: 40,                         //文本字号
            color: 0xff0000,                      //文本颜色
            fontFamily: '',                       //文本字体
        },
        textSelectedColor: 0x5161bb,          //文本选中时的颜色
        optionBackgroundColor: 0xe9ecfe,      //选项线条背景色
        optionBoardColor: 0x7487ef,           //选项选中时的颜色
        optionPaddingX: 0,                   //选项水平间隔
        optionPaddingY: 15,                   //选项框竖直间隔
        optionBoardLineWidth: 2,              //选项选中时线宽
        optionBlankLineWidth: 2,              //选项线宽
        optionBlankMinSize: 100,              //选项框最小宽度
        optionRightColor: 0x00ff00,           //选项正确颜色
        optionWrongColor: 0xff0000,           //选项错误颜色
        targetOption: null,                   //目标属性
        selectOption: null,                   //选项属性
    };

    private _resultKeyArr: string[] = []; //作答结果

    /**
     * 设置选中框的key
     * @param key
     */
    public setBlankValue(key: string) {
        if (this._selectedOptionId == -1) return;

        this._resultKeyArr[this._selectedOptionId] = key;
        let text = this._originText;
        for (let i = 0; i < this._resultKeyArr.length; ++i) {
            let option = this.config.selectOption.find(
                (item: { key: string | number }) => item.key == this._resultKeyArr[i]
            );
            let str = option ? option.text : " ";
            text = text.replace(/{}/, `{${str}}`);
        }
        this.text = text;
        if (key != "") {
            this.changeOptionSelected();
        } else {
            this.checkOptionSelected(this._selectedOptionId);
        }
    }

    private changeOptionSelected() {
        for (let i = 0; i < this._optionList.length; ++i) {
            if (this._optionList[i].text.trim() == "") {
                this.selectedOptionId = i;
                return;
            }
        }
        this._selectedOptionId = -1;
        this.emit("COMPLETE", this); //作答完成，回调
    }

    public set config(value: any) {
        this._config = Object.assign(this._config, value);
        this.parseTemplateData();
    }

    public get config() {
        return this._config;
    }

    /**
     * 验证结果
     */
    private _checkResult: boolean = false;
    public set checkResult(value: boolean) {
        if (this._checkResult) return;
        this._checkResult = value;
        this.dealCheckResult();
        this.parseText();
    }

    /**
     * 文本内容
     */
    private _originText: string = "";
    private _text: string = "";
    private set text(value: string) {
        this._text = value;
        this.parseText();
    }
    private get text() {
        return this._text;
    }

    /**
     * 设置选中option
     */
    private _selectedOptionId: number = 0;
    public set selectedOptionId(value: number) {
        this._selectedOptionId = value;
        this.checkOptionSelected(value);
    }

    /**
     * 解析模板data
     */
    private parseTemplateData() {
        if (!this.config.targetOption || !this.config.selectOption) return;
        let text = (this._originText = this.config.targetOption.text);
        let answerStr = this.config.targetOption.key;
        this._optionAnswer = answerStr.split(",");
        this.text = text; //触发解析
        this.selectedOptionId = 0;
    }

    private reset() {
        this.removeChildren();
        this._optionId = 0;
        this._optionList = [];
        this._curPosX = 0;
        this._curPosY = 0;
    }

    private parseText() {
        this.reset();
        //为避免重复，搞个比较复杂的*_#
        this._text = this._text.replace(/\{/g, "*_#{");
        this._text = this._text.replace(/\}/g, "}*_#");
        this._originBlockTextList = this._text.split("*_#");
        this._originBlockTextList.forEach((item) => {
            //判断是否带{}
            if (item.indexOf("{") !== -1 && item.indexOf("}") !== -1) {
                if (this._checkResult) {
                    //选项验证,不可点击
                    this.dealCheckedOption(item);
                } else {
                    this.dealOption(item);
                }
            } else {
                this.dealText(item, true);
            }
        });

        //注册点击事件
        this._optionList.forEach((item) => {
            let interactObj: vf.gui.DisplayObject = item.interactObj as vf.gui.DisplayObject;
            interactObj.interactabled = true;
            interactObj.on("click", this.onClick, this);
        });
    }

    private onClick() {
        let id: number = parseInt(arguments[1].name);
        this.checkOptionSelected(id);
    }

    private checkOptionSelected(id: number) {
        if (this._optionList.length == 0) return;
        //无论如何能找到对应的id
        let option = this._optionList.find((item) => {
            return item.id == id;
        });

        //已经选中的重置
        let selectedOption = this._optionList.find((item) => {
            return !!item.selected;
        });
        if (selectedOption) {
            if (selectedOption.id == id) return;
            this.onUnSelected(selectedOption);
        }
        this.onSelected(option);
    }

    /**
     * 选项选中
     */
    private onSelected(option: any) {
        option.selected = true;
        this._selectedOptionId = option.id;
        let rect = option.displayObj as vf.gui.Rect;
        rect.getChildAt(0).visible = true;
        if (option.text.trim() != "") {
            this.setBlankValue("");
        }

        let data = {
            id: option.id,
            key: this.config.selectOption[option.id].key,
            selected: option.selected,
        };

        //抛出事件
        this.emit("OPTION_CHANGE", this, data);
    }

    /**
     * 取消选中
     */
    private onUnSelected(option: any) {
        option.selected = false;
        let rect: vf.gui.Rect = option.displayObj as vf.gui.Rect;
        rect.getChildAt(0).visible = false;

        let data = {
            id: option.id,
            key: this.config.selectOption[option.id].key,
            selected: option.selected,
        };
        //抛出事件
        this.emit("OPTION_CHANGE", this, data);
    }

    /**
     * 处理选项
     */
    private dealOption(item: string) {
        item = item.replace(/[\{\}]/g, " ");
        let label = this.createLabel(item);
        let _width = label.width;
        _width = this.config.optionBlankMinSize > label.width ? this.config.optionBlankMinSize : label.width;

        if (this._curPosX + _width + this.config.optionPaddingX * 2 > this.config.containerWidth) {
            //超过了，直接折行
            this._curPosY += this.config.labelStyle.lineHeight;
            this._curPosX = 0;
        }
        let displayObj: any = null;
        let interactObj: any = null;
        //填空题，默认文字颜色是选中颜色
        label.style.color = this.config.textSelectedColor;
        displayObj = interactObj = this.createLine(_width + this.config.optionPaddingX * 2);
        this.addElement(displayObj, this._curPosX, this._curPosY + this.config.labelStyle.fontSize + 5);
        interactObj = this.createTransparentRect(
            _width + this.config.optionPaddingX * 2,
            this.config.labelStyle.fontSize + this.config.optionPaddingY * 2
        );
        this.addElement(interactObj, this._curPosX, this._curPosY - this.config.optionPaddingY);
        this.addElement(
            label,
            this._curPosX + (_width + this.config.optionPaddingX * 2 - label.width) / 2,
            this._curPosY
        );
        this._curPosX += _width;
        //添加到选项数组
        interactObj.name = this._optionId;
        let option = {
            id: this._optionId++,
            text: item.trim(),
            selected: false,
            displayObj: displayObj as vf.gui.Rect,
            interactObj: interactObj as vf.gui.DisplayObject,
            label: label,
        };
        this._optionList.push(option);
    }

    /**
     * 处理验证阶段的选项
     */
    private dealCheckedOption(item: string) {
        item = item.replace(/[\{\}]/g, " ");
        let label = this.createLabel(item);
        let _width = 0;
        if (_width + label.width + this._curPosX > this.config.containerWidth) {
            //超过了，直接折行
            this._curPosY += this.config.labelStyle.lineHeight;
            this._curPosX = 0;
        }
        let displayObj: any = null;
        let interactObj: any = null;
        let status = this._optionStatusList[this._optionId].status;
        //填空题，正确是绿色，错误是红色且添加删除线
        if (status == "selected_right" || status == "unselected_right") {
            label.style.color = this.config.optionRightColor;
        } else {
            label.style.color = this.config.optionWrongColor;
            displayObj = this.createLine(label.width);
            displayObj.color = this.config.optionWrongColor;
            this.addElement(displayObj, this._curPosX, this._curPosY + this.config.labelStyle.fontSize / 2 + this.config.labelStyle.fontSize / 10);
        }
        this.addElement(label, this._curPosX, this._curPosY);
        this._curPosX += _width + label.width;
        this._optionId++;
    }

    /**
     * 答题结果验证
     */
    private dealCheckResult() {
        this._optionStatusList = [];
        let text = this._originText;
        for (let i = 0; i < this._optionAnswer.length; ++i) {
            if (this._optionAnswer[i] == this._resultKeyArr[i]) {
                //作答正确
                let item = this.config.selectOption[this._resultKeyArr[i]];
                let option = `{${item.text}}`;
                text = text.replace(/{}/, option);
                let optionStatus: any = {};
                optionStatus.status = "selected_right";
                this._optionStatusList.push(optionStatus);
            } else {
                //作答错误
                let item = this._resultKeyArr[i] ? this.config.selectOption[this._resultKeyArr[i]] : { text: " " };
                let option = `{${item.text}}{}`; //因为答错了，要给后面跟一个正确的选项
                text = text.replace(/{}/, option);
                let optionStatus: any = {};
                optionStatus.status = "selected_wrong";
                this._optionStatusList.push(optionStatus);
                item = this.config.selectOption[this._optionAnswer[i]];
                option = `{${item.text}}`;
                text = text.replace(/{}/, option);
                let optionStatus2: any = {};
                optionStatus2.status = "selected_right";
                this._optionStatusList.push(optionStatus2);
            }
        }
        this._text = text;

        this.emit("RESULT", this, {keys: this._resultKeyArr}); //验证结果完成，回调
    }
    /**
     * 处理文本
     * @param flag  //是否遇难后直接折行
     */
    private dealText(text: string, flag: boolean = false) {
        if (text == "") {
            return;
        }
        let label = this.createLabel(text);
        if (text.indexOf("\n") !== -1) {
            //有换行符
            label.release();
            let arr = text.split("\n");
            for (let i = 0; i < arr.length; ++i) {
                this.dealText(arr[i], false);
                if (i !== arr.length - 1) {
                    this._curPosY += this.config.labelStyle.lineHeight;
                    this._curPosX = 0;
                }
            }
        } else if (this._curPosX + label.width > this.config.containerWidth) {
            //判断label是否需要折行
            if (flag) {
                label.release();
                //简单的方法是按空格截一下，暂时先这样，如果有性能问题再换其他方法
                text = text.replace(/ /g, " *_#");
                let arr: string[] = text.split("*_#");
                arr.forEach((item) => {
                    this.dealText(item, false);
                });
            } else {
                this._curPosX = 0;
                this._curPosY += this.config.labelStyle.lineHeight;
                this.addElement(label, this._curPosX, this._curPosY);
                this._curPosX += label.width;
            }
        } else {
            this.addElement(label, this._curPosX, this._curPosY);
            this._curPosX += label.width;
        }
    }

    private addElement(element: vf.gui.DisplayObject, left: number, top: number) {
        element.style.left = left;
        element.style.top = top;
        this.addChild(element);
    }

    private createLabel(text: string) {
        const label = new vf.gui.Label();
        label.text = text;
        label.fontCssStyle = this.config.labelStyle;
        label.validateSize();
        return label;
    }

    private createTransparentRect(width: number, height: number) {
        const rect = new vf.gui.Rect();
        rect.style.width = width;
        rect.style.height = height;
        rect.color = 0xffffff;
        rect.alpha = 0.01;
        return rect;
    }

    private createLine(width: number) {
        const rect = new vf.gui.Rect();
        rect.style.width = width;
        rect.style.height = this.config.optionBlankLineWidth;
        rect.color = this.config.optionBackgroundColor;

        const rect1 = new vf.gui.Rect();
        rect1.style.width = width;
        rect1.style.height = this.config.optionBoardLineWidth;
        rect1.color = this.config.optionBoardColor;
        rect1.visible = false;
        rect.addChild(rect1);
        return rect;
    }
}