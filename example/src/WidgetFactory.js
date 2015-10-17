import _ from 'lodash';

//external widgets with more controls
var ReactBootstrap = require('react-bootstrap');

var Widgets = {};

var bootstrapWidgets = ['Input', 'Button', 'Panel', 'Glyphicon', 'Tooltip', 'Alert', 'Label'];
_.each(bootstrapWidgets, function (widgetName) {
    var name = 'react-bootstrap.' + widgetName;
    Widgets[name] = ReactBootstrap[widgetName];
});

var bootstrapSettings = {
    fields:{
        //content:{type:'string'},
        bsSize:{type:'select',settings: {
            options: _.map(['large','medium','small','xsmall'], function (key, value) {
                return {value: key, label: key};
            })
        }},
        bsStyle:{type:'select',settings: {
            options: _.map(['default','primary','success','info','warning','danger','link'], function (key, value) {
                return {value: key, label: key};
            })
        }}
    }
};

_.extend(Widgets['react-bootstrap.Button'], {
    metaData: {
        props: {
            bsSize: 'medium', bsStyle: 'default', content: 'Type content'
        },
        settings:bootstrapSettings
    }
});
_.extend(Widgets['react-bootstrap.Label'], {
    metaData: {
        props: {
            bsSize: 'medium', bsStyle: 'default', content: 'Type content'
        },
        settings:bootstrapSettings
    }
});

_.extend(Widgets['react-bootstrap.Panel'], {
    metaData: {
        props: {
            header:"Header",bsStyle: 'default', content: 'Type content'
        },
        settings:bootstrapSettings
    }
});

_.extend(Widgets['react-bootstrap.Glyphicon'], {
    metaData: {
        props: {
            bsSize: 'medium', bsStyle: 'default', glyph: 'star'
        },
        settings:bootstrapSettings
    }
});

_.extend(Widgets['react-bootstrap.Alert'], {
    metaData: {
        props: {
            bsSize: 'medium', bsStyle: 'default', content: 'Type content'
        },
        settings:bootstrapSettings
    }
});

_.extend(Widgets['react-bootstrap.Well'], {
    metaData: {
        props: {
            bsSize: 'medium', bsStyle: 'default', content: 'Type content'
        },
        settings:bootstrapSettings
    }
});

_.extend(Widgets['react-bootstrap.Input'], {
    metaData: {
        props: {
            type: 'text',placeholder:'type your text', label:'label', help:'',value:''
        },
        settings:bootstrapSettings
    }
});

module.exports = Widgets;
