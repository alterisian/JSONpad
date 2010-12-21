jp.Window.XmlConvert.form = Ext.extend(Ext.FormPanel, {
    autoHeight: true,
    labelWidth: 100,
    frame: true,

    tabPanel: null,
    tabConvertText: null,
    tabConvertOther: null,
    fieldUrl: null,

    fileUpload: true,

    parent: null,

    initComponent: function() {
	this.items = [
	this.getFormTabPanel()
	];

	this.buttons = this.getFormButtons();

	jp.Window.XmlConvert.form.superclass.initComponent.call(this);

	this.tabPanel = this.items.itemAt(0);
	this.tabConvertText = this.findByType("jp.Window.XmlConvert.form.TabConvertText")[0];
	this.tabConvertOther = this.findByType("jp.Window.XmlConvert.form.TabConvertOther")[0];

	this.parent = this.findParentByType('jp.Window.XmlConvert');
    },

    getFormTabPanel: function () {
	return {
	    xtype:'tabpanel',
	    activeTab: 0,
	    height:290,
	    deferredRender: false,
	    items:[{
		xtype: 'jp.Window.XmlConvert.form.TabConvertText'
	    },{
		xtype: 'jp.Window.XmlConvert.form.TabConvertOther'
	    }]
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
			var data = null;
			if (me.tabPanel.getActiveTab().getXType() == "jp.Window.XmlConvert.form.TabConvertText") {
			    me.el.mask('Converting XML to JSON data...', 'x-mask-loading');

			    data = me.tabConvertText.getValue();
			    data = xmlJsonClass.xml2json(jp.xml.parseXml(data), "  ", true, false);

			    me.el.unmask();
			    
			    me.setImportResult( data );
			} else if (me.tabPanel.getActiveTab().getXType() == "jp.Window.XmlConvert.form.TabConvertOther") {
			    var waitMsg = "";
			    var importType = "";
			    if (me.tabConvertOther.fileSelected) {
				waitMsg = 'Fetching XML from file...';
				importType = 'file';
			    } else {
				waitMsg = 'Fetching XML from url...';
				importType = 'url';
			    }
			    me.getForm().submit({
				url: 'php/import.php',
				waitMsg: waitMsg,
				params: {
				    dataType: 'xml',
				    importType: importType
				},
				success: function(fp, o) {
				    me._setImportResult( o.result.data );
				},
				failure: function(ft, o) {
				//@todo WEB | Submit XML import > failure exception
				}
			    });
			}
		    }
		}
	    }
	},{
	    text: 'Reset',
	    handler: function() {
		me.getForm().reset();

		me.tabConvertOther.fieldUrl.enable();
		me.tabConvertOther.fileSelected = false;

		me.tabConvertText.setValue('');
	    }
	}];
    },

    _setImportResult: function ( dataString ) {
	this.parent.jpEditor.tabPanel.getCodemirror().setValue( dataString );

	this.parent.jpEditor.statusPanel.setStatus({
	    text: 'Imported JSON data succesfully',
	    iconCls: 'x-status-valid',
	    clear: true
	});

	this.parent.close();
    }
});

Ext.reg('jp.Window.XmlConvert.form', jp.Window.XmlConvert.form);