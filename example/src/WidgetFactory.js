export default class WidgetFactory {
    constructor(){
        this.widgets = {};
    }
    registerWidget(name,widget){
        this.widgets[name] = widget;
    }
}
