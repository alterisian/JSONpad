jp.Window.XmlConvert = Ext.extend(Ext.Window, {
    layout: 'form',
    width: 500,
    height: 400,
    border: false,
    closeAction: 'destroy',
    plain: true,
    modal: true,
    resizable: false,
    draggable: false,
    title: 'Convert XML to JSON data',

    jpEditor: null,
    //id: 'JP_aboutWindow',
    initComponent: function() {
	this.items = [{
		xtype: 'jp.Window.XmlConvert.form'
	}];

	jp.Window.XmlConvert.superclass.initComponent.call(this);
    }
});

Ext.reg('jp.Window.XmlConvert', jp.Window.XmlConvert);