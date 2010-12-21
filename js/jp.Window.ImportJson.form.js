jp.Window.ImportJson.form = Ext.extend(Ext.FormPanel, {
    autoHeight: true,
    bodyStyle: 'padding: 10px 10px 0 10px;',
    labelWidth: 100,
    frame: true,
    defaults: {
	anchor: '95%',
	msgTarget: 'side'
    },

    fieldUrl: null,
    fieldLocal: null,

    fileSelected: false,

    fileUpload: true,

    jpEditor: null,
    parent: null,

    initComponent: function() {
	this.items = [
	this.getUrlItem(),
	this.getLocalItem(),
	];

	this.buttons = this.getFormButtons();

	jp.Window.ImportJson.form.superclass.initComponent.call(this);

	this.fieldUrl = this.items.itemAt(0);
	this.fieldLocal = this.items.itemAt(1);

	this.parent = this.findParentByType('jp.Window.ImportJson');
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
	    emptyText: 'Select a local JSON data file',
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
    },

    getFormButtons: function () {
	var me = this;
	return [{
	    text: 'Get data',
	    handler: function(){
		if(me.getForm().isValid()) {
		    if (Ext.isAir) {
		    //@todo AIR | Import JSON data form submit
		    } else {
			var waitMsg = "";
			var importType = "";
			if (me.fileSelected) {
			    waitMsg = 'Fetching JSON data from file...';
			    importType = 'file';
			} else {
			    waitMsg = 'Fetching JSON data from url...';
			    importType = 'url';
			}
			
			me.getForm().submit({
			    url: 'php/import.php',
			    waitMsg: waitMsg,
			    params: {
				dataType: 'json',
				importType: importType
			    },
			    success: function(fp, o) {
debug.trace(o.result);
				me._setImportResult( o.result.data );
			    },
			    failure: function(ft, o) {
			    //@todo WEB | Submit JSON import > failure exception
			    }
			});
		    }
		}
	    }
	},{
	    text: 'Reset',
	    handler: function() {
		me.getForm().reset();
		me.fieldUrl.enable();
		this.fileSelected = false;
	    }
	}];
    },

    _setImportResult: function ( dataString ) {
debug.trace("_"+ dataString+"_");
debug.trace("_"+ dataString.substr(1, dataString.length) +"_");
	this.parent.jpEditor.tabPanel.getCodemirror().setValue( dataString );

	this.parent.jpEditor.statusPanel.setStatus({
	    text: 'Imported JSON data succesfully',
	    iconCls: 'x-status-valid',
	    clear: true
	});

	this.parent.close();
    }
});

Ext.reg('jp.Window.ImportJson.form', jp.Window.ImportJson.form);