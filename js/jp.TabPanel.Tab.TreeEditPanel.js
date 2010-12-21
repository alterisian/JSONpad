jp.TabPanel.Tab.TreeEditPanel = Ext.extend(Ext.Panel, {

    region: 'center',
    title: '',
    // autoHeight: true,
    layout: 'anchor',

    anchor: '100% 100%',
    autoScroll:true,

    initComponent: function() {
	var oThis = this;

	this.items = [{
	    xtype: 'jp.TabPanel.Tab.TreeEditPanel.form'
	}];

	this.listeners = {
	    'disable': this.onDisable,
	    'enable': this.onEnable,
	    scope: this
	};

	this.tbar = {
	    items: [{
		iconCls: 'icon_small_save',
		scale: 'small',
		handler: oThis.saveJsonEditForm,
		tooltip: 'Save data',
		ref: 'save',
		scope: oThis
	    }]
	};
	
	jp.TabPanel.Tab.TreeEditPanel.superclass.initComponent.call(this);
    },

    afterRender: function () {
	jp.TabPanel.Tab.TreeEditPanel.superclass.afterRender.call(this);
	this.disable();
    },

    onDisable: function () {
	this.form.datatype.setValue( "string" );
	this.form.jsonkey.setValue( "" );
	this.form.jsonvalue.setValue( "" );
	this.form.disable();

	var tb = this.getTopToolbar();
	tb.save.disable();
    },

    onEnable: function () {
	this.form.enable();

	var tb = this.getTopToolbar();
	tb.save.enable();
    },

    saveJsonEditForm: function () {
	var statuspanel = this.findParentByType("jp.Editor").statusPanel;
	var tree = this.findParentByType('jp.Editor').tabPanel.getTreePanel();
	var treeSm = tree.getSelectionModel();
	var node = treeSm.getSelectedNode();
	var statustext = "";

	if ( node.attributes.type == 'object' || node.attributes.type == 'array' ) {
	    var jsonIndex = this.form.jsonkey.getValue();

	    node.setText ( (jsonIndex != "" ? jsonIndex : "") ); //JP.util.getJsonTreeNodeString("empty", false)

	    statustext = "Saved " + node.attributes.type + " successfully";
	} else {
	    var jsonType = this.form.datatype.getValue();
	    var jsonKey = this.form.jsonkey.getValue();
	    var jsonValue = (jsonType == "null" ? "null" : this.form.jsonvalue.getValue());

	    node.attributes.type = jsonType;

	    if ( node.parentNode.attributes.type == "array" ) {
		var nodeText = "";
		/*if (jsonValue == "") nodeText = JP.util.getJsonTreeNodeString("empty", false);
		else if (jsonValue == "null") nodeText = JP.util.getJsonTreeNodeString("null", false);
		else */ //@todo Add empty and null strings
		nodeText = jsonValue;

		node.setText ( nodeText );
		this.form.jsonkey.setValue( jsonValue );
	    } else {
		node.setText ( (jsonKey != "" ? jsonKey : "") ); //JP.util.getJsonTreeNodeString("empty", false)
	    }
	    node.attributes.value = jsonValue;
	    statustext = "Saved key successfully";
	}

	statuspanel.setStatus({
	    text: statustext,
	    iconCls: 'x-status-valid',
	    clear: true
	}, "left");
    }
});

Ext.reg('jp.TabPanel.Tab.TreeEditPanel', jp.TabPanel.Tab.TreeEditPanel);