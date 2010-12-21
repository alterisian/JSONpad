jp.TabPanel.Tab.TreeEditPanel.form = Ext.extend(Ext.FormPanel, {
    layout: 'form',
    frame: true,
    border: false,
    //autoHeight: true,
    ref: 'form',
    anchor: '100% 100%',

    //buttonAlign: 'left',
    
    initComponent: function() {
	this.items = this.getFormItems();

	/*this.buttons = [{
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
	}];*/

	jp.TabPanel.Tab.TreeEditPanel.form.superclass.initComponent.call(this);

    //var tabsEdit = me.findParentByType("jp_main_center_ediTreeForm_tabs_edit");

    //var comboVal = "";



    /*this.jsontype.addListener('beforeselect', function (combo, record, index) {
	    comboVal = combo.getValue();
	});

	this.jsontype.addListener('select', function (combo, record, index) {
	    debug.trace("how the fu..."+deactivateTrigger);
	    if (!deactivateTrigger) {
		debug.trace("__"+record.get("type")+"__");
		debug.trace("--"+this.jsontype.getValue());
		debug.trace("::"+combo.getValue());
		debug.trace("xx"+index);

		if (comboVal != record.get("type") && comboVal != "") {
		    switch ( record.get("type") ) {
			case 'null':
			    this.jsonvalue.setValue("null");
			    this.jsonvalue.disable();
			    break;
			default:
			    if (comboVal == "null")
				this.jsonvalue.setValue("");

			    this.jsonvalue.enable();
			    break;
		    }

		    /*var tb = tabsEdit.findParentByType("jp_main_center_ediTreeForm").getTopToolbar();
		    tb.save.enable();
		    tabsEdit.formUnsaved = true;*/
    //this.jsontype.fireEvent("change");
    /*}
	    }
	/*

	    tabsEdit.formChanged();*/
    //}, this);

    //this.jsontype.addListener('change', tabsEdit.formChanged, tabsEdit);
    /*this.jsonkey.addListener('change', tabsEdit.formChanged, tabsEdit);
	this.jsonvalue.addListener('change', tabsEdit.formChanged, tabsEdit);*/


    /*var str = "";
	var jsonKeyEvent = "";
	var jsonValueEvent = "";
	/*this.jsonkey.addListener('keydown', function () {
	    debug.trace("==kEY_KEYDOWN==");
	    jsonKeyEvent = "down";
	    if (!tabsEdit.formUnsaved)
		str = this.getValue();
	}, this.jsonkey);

	this.jsonkey.addListener('keyup', function () {
	    debug.trace("==kEY_KEYUP==");
	    if (str != this.getValue() && !tabsEdit.formUnsaved && jsonKeyEvent == "down")
		this.fireEvent("change");

	    jsonValueEvent = "";
	    jsonKeyEvent = "";
	    }, this.jsonkey);

	/*this.jsonkey.addListener('blur', function () {
	    debug.trace("==kEY_BLUR==");
	    if (str == this.getValue()) {
		str = "";
		jsonKeyEvent = "";
	    }
	}, this.jsonkey);*/

    /*this.jsonvalue.addListener('keydown', function () {
	    debug.trace("==VAL_KEYDOWN==");
	    jsonValueEvent = "down";
	    if (!tabsEdit.formUnsaved)
		str = this.getValue();
	}, this.jsonvalue);

	this.jsonvalue.addListener('keyup', function () {
	    debug.trace("==VAL_KEYUP==");
	    if (str != this.getValue() && !tabsEdit.formUnsaved && jsonValueEvent == "down")
		this.fireEvent("change");

	    jsonKeyEvent = "";
	    jsonValueEvent = "";
	    }, this.jsonvalue);

	/*this.jsonvalue.addListener('blur', function () {
	    if (str == this.getValue())
		str = "";
	}, this.jsonvalue);*/
    },

    getFormItems: function () {
	return [
	{
	    xtype:          'combo',
	    mode:           'local',
	    value:          'string',
	    anchor:         '50%',
	    triggerAction:  'all',
	    forceSelection: true,
	    ref:            'datatype',
	    //editable:       false,
	    fieldLabel:     'Datatype',
	    name:           'datatype',
	    hiddenName:     'datatype_hidden',
	    displayField:   'caption',
	    valueField:     'type',
	    //tpl: combo_datatype,
	    store: new Ext.data.ArrayStore({
		fields: ['caption', 'type'],
		data : [
		['String', 'string'],
		['Number', 'number'],
		['Boolean', 'boolean'],
		['NULL', 'null']
		]
	    }),
	    listeners: {
		'disable': this.onDisableReset,
		'select': this.onDataTypeSelect,
		scope: this
	    }
	},
	{
	    xtype: 'textarea',
	    fieldLabel: 'Key',
	    anchor: '100%',
	    name: 'jsonKey',
	    ref: 'jsonkey',
	    enableKeyEvents: true,
	    listeners: {
		'disable': this.onDisableReset,
		scope: this
	    }
	},
	{
	    xtype: 'textarea',
	    fieldLabel: 'Value',
	    anchor: '100%',
	    name: 'jsonValue',
	    ref: 'jsonvalue',
	    enableKeyEvents: true,
	    listeners: {
		'disable': this.onDisableReset,
		scope: this
	    }
	}
	];
    },

    onDisableReset: function ( field ) {
	//debug.trace(field);
	field.reset();
    },

    onDataTypeSelect: function (combo, record, index) {
	//if (comboVal != record.get("type") && comboVal != "") {
	if ( record.get("type") != "" ) {
	    switch ( record.get("type") ) {
		case 'null':
		    debug.trace("set it to null?")
		    
		    this.jsonvalue.disable();
		    this.jsonvalue.setValue("null");
		    break;
		default:
		    if (record.get("type") == "null")
			this.jsonvalue.setValue("");

		    this.jsonvalue.enable();
		    break;
	    }
	}
    }
});

Ext.reg('jp.TabPanel.Tab.TreeEditPanel.form', jp.TabPanel.Tab.TreeEditPanel.form);