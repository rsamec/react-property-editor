import React from 'react';
//import {Pie,Bar, SmoothLine,StockLine,Scatterplot,Tree,Radar} from 'react-pathjs-chart';

const DEFAULT_WIDTH = 200;
const DEFAULT_HEIGHT = 200;

var chartSettings = {
    fields: {
        options:{
            fields:{
                data:{type:'bindingEditor'},
                fill: {type: 'colorPicker'},
                color: {type: 'colorPicker'},
                stroke: {type: 'colorPicker'},
                margin:{type:'boxEditor'},
                legendPosition: {type: 'select', settings: {options: ['topLeft','topRight','bottomLeft','bottomRight']}},
                label:{type:'fontEditor'},
                animate:{
                    fields:{type:{type:'select',  settings: {options: ['delayed','async','oneByOne']}}}}
                ,
                axisY: {
                    fields: {
                        orient: {type: 'select', settings: {options: ['left', 'right']}},
                        tickValues: {type: 'tickValues'},
                        label:{type:'fontEditor'},
                    }
                },
                axisX: {
                    fields: {
                        orient: {type: 'select', settings: {options: ['top', 'bottom']}},
                        tickValues: {type: 'tickValues'},
                        label: {type:'fontEditor'}
                    }
                }
            }
        }
    }
};

export class SmoothLine {
    get props() {
        return {
            data:{Path:'smoothLine'},
            xKey: '',
            yKey: '',
            options: {
                width: 600,
                height: 600,
                color: '#2980B9',
                margin: {top: 40, left: 60, bottom: 50, right: 20},
                animate: {
                    type: 'delayed',
                    duration: 200
                },
                axisX: {
                    showAxis: true,
                    showLines: true,
                    showLabels: true,
                    showTicks: true,
                    zeroAxis: false,
                    orient: 'bottom',
                    label: {
                        fontFamily: 'Arial',
                        fontSize: 14,
                        fontWeight: true,
                        fill: '#34495E'
                    }
                },
                axisY: {
                    showAxis: true,
                    showLines: true,
                    showLabels: true,
                    showTicks: true,
                    zeroAxis: false,
                    orient: 'left',
                    label: {
                        fontFamily: 'Arial',
                        fontSize: 14,
                        fontWeight: true,
                        fill: '#34495E'
                    }
                }
            }
        }
    }
    get settings(){
        return chartSettings;
    }
}

export class Pie {
    get props() {
        return {
            data:{Path:'pie'},
            accessorKey:'',
            options:{
                margin: {top: 20, left: 20, right: 20, bottom: 20},
                width: 600,
                height: 600,
                color: '#2980B9',
                r: 100,
                R: 200,
                legendPosition: 'topLeft',
                animate:{
                    type:'oneByOne',
                    duration:200,
                    fillTransition:3
                },
                label:{
                    fontFamily:'Arial',
                    fontSize:14,
                    fontWeight:true,
                    fill:'#ECF0F1'
                }
            }
        }
    }
    get settings(){
        return chartSettings;
    }
}
export class Tree {
    get props() {
        return {
            data:{Path:'tree'},
            options: {
                margin: {top: 20, left: 50, right: 80, bottom: 20},
                width: 600,
                height: 600,
                fill: "#2980B9",
                stroke: "#3E90F0",
                r: 5,
                animate: {
                    type: 'oneByOne',
                    duration: 200,
                    fillTransition: 3
                },
                label: {
                    fontFamily: 'Arial',
                    fontSize: 14,
                    fontWeight: true,
                    fill: '#34495E'
                }
            }
        }
    }
    get settings(){
        return chartSettings;
    }
}
export class Radar {
    get props() {
        return {
            data:{Path:'radar'},
            options: {
                width: 600,
                height: 600,
                margin: {top: 20, left: 20, right: 20, bottom: 20},
                r: 300,
                max: 150,
                fill: "#2980B9",
                stroke: "#2980B9",
                animate: {
                    type: 'oneByOne',
                    duration: 200
                },
                label: {
                    fontFamily: 'Arial',
                    fontSize: 14,
                    fontWeight: true,
                    fill: '#34495E'
                }
            }
        }
    }
    get settings(){
        return chartSettings;
    }
}
export class Bar {
    get props() {
        return {
            data: {Path:'bar'},
            accessorKey: '',
            options: {
                width: 600,
                height: 600,
                margin: {top: 20, left: 20, bottom: 50, right: 20},
                color: '#2980B9',
                gutter: 20,
                animate: {
                    type: 'oneByOne',
                    duration: 200,
                    fillTransition: 3
                },
                axisX: {
                    showAxis: true,
                    showLines: true,
                    showLabels: true,
                    showTicks: true,
                    zeroAxis: false,
                    orient: 'bottom',
                    label: {
                        fontFamily: 'Arial',
                        fontSize: 14,
                        fontWeight: true,
                        fill: '#34495E'
                    }
                },
                axisY: {
                    showAxis: true,
                    showLines: true,
                    showLabels: true,
                    showTicks: true,
                    zeroAxis: false,
                    orient: 'left',
                    label: {
                        fontFamily: 'Arial',
                        fontSize: 14,
                        fontWeight: true,
                        fill: '#34495E'
                    }
                }
            }
        }
    }
    get settings(){
        return chartSettings;
    }
}
export class Scatterplot {
    props() {

        return {
            data: {Path:'scatterplot'},
            xKey: '',
            yKey: '',
            options: {
                width: 600,
                height: 600,
                margin: {top: 40, left: 60, bottom: 30, right: 30},
                fill: "#2980B9",
                stroke: "#3E90F0",
                animate: {
                    type: 'delayed',
                    duration: 200
                },
                label: {
                    fontFamily: 'Arial',
                    fontSize: 14,
                    fontWeight: true,
                    fill: '#34495E'
                },
                axisX: {
                    showAxis: true,
                    showLines: true,
                    showLabels: true,
                    showTicks: true,
                    zeroAxis: false,
                    orient: 'bottom',
                    label: {
                        fontFamily: 'Arial',
                        fontSize: 14,
                        fontWeight: true,
                        fill: '#34495E'
                    }
                },
                axisY: {
                    showAxis: true,
                    showLines: true,
                    showLabels: true,
                    showTicks: true,
                    zeroAxis: false,
                    orient: 'left',
                    label: {
                        fontFamily: 'Arial',
                        fontSize: 14,
                        fontWeight: true,
                        fill: '#34495E'
                    }
                }
            }
        }
    }
    get settings(){
        return chartSettings;
    }
}

export default {
    'Chart.SmoothLine': new SmoothLine(),
    'Chart.Pie': new Pie(),
    'Chart.Scatterplot': new Scatterplot(),
    'Chart.Tree': new Tree(),
    'Chart.Radar': new Bar(),
    'Chart.Bar': new Bar()
}
