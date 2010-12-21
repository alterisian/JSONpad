jp.Window.ImportJson = Ext.extend(Ext.Window, {
    layout: 'form',
    width: 500,
    //height: 120,
   // closeAction: 'destroy',
    plain: true,
    modal: true,
    resizable: false,
    draggable: false,
    title: 'Import JSON data',

    jpEditor: null,
    //id: 'JP_aboutWindow',
    initComponent: function() {
	this.items = [{
		xtype: 'jp.Window.ImportJson.form'
	}];

	jp.Window.ImportJson.superclass.initComponent.call(this);
    }
});

Ext.reg('jp.Window.ImportJson', jp.Window.ImportJson);