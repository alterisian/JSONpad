jp.Window.XmlConvert.form.TabConvertOther = Ext.extend(Ext.Panel, {
    title: 'From other ressource',
    
    layout:'form',
    defaultType: 'textfield',
    frame: true,
    labelWidth: 100,

    defaults: {
	anchor: '95%',
	msgTarget: 'side'
    },

    fieldUrl: null,
    fieldLocal: null,

    fileSelected: false,

    initComponent: function() {
	this.items = [
	    this.getUrlItem(),
	    this.getLocalItem(),
	];

	jp.Window.XmlConvert.form.TabConvertOther.superclass.initComponent.call(this);

	this.fieldUrl = this.items.itemAt(0);
	this.fieldLocal = this.items.itemAt(1);
    },

    onFileSelect: function(fb, v) {
	if (v != "") {
	    this.fieldUrl.disable();
	    this.fieldUrl.reset();
	    this.fileSelected = true;
	} else {
	    this.fileSelected = false;
	    this.fieldUrl.enable();
	}
    },

    getUrlItem: function () {
	return {
	    xtype: 'textfield',
	    emptyText: 'http://www.example.com/',
	    fieldLabel: 'From URL',
	    vtype: 'urlOnly',
	    name: 'remoteData'
	};
    },

    getLocalItem: function () {
	return {
	    xtype: 'fileuploadfield',
	    emptyText: 'Select a local XML file',
	    fieldLabel: 'From local',
	    name: 'localData',
	    buttonText: '',
	    buttonCfg: {
		iconCls: 'btn_drive_upload'
	    },
	    listeners: {
		'fileselected': this.onFileSelect,
		scope: this
	    }
	};
    }
});

Ext.reg('jp.Window.XmlConvert.form.TabConvertOther', jp.Window.XmlConvert.form.TabConvertOther);