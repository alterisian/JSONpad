Ext.ns('jp');

jp.Editor = Ext.extend(Ext.Viewport, {
    layout: 'border',

    actionPanel: null,
    tabPanel: null,
    statusPanel: null,

    id: 'jp.Editor',

    initComponent: function() {
	var config = {
	    items: [
	    this.buildActionPanel(),
	    this.buildTabPanel(),
	    this.buildStatusbarPanel(),
	    ]
	};
	
	Ext.apply(this, Ext.apply(this.initialConfig, config));

	jp.Editor.superclass.initComponent.call(this);

	this.actionPanel = this.items.itemAt(0);
	this.tabPanel = this.items.itemAt(1);
	this.statusPanel = this.items.itemAt(2);
    },

    buildActionPanel: function () {
	return {
	    xtype: 'jp.ActionPanel'
	};
    },

    buildTabPanel: function () {
	return {
	    xtype: 'jp.TabPanel'
	};
    },

    buildStatusbarPanel: function () {
	return {
	    xtype: 'jp.StatusbarPanel'
	};
    }
});

Ext.reg('jp.Editor', jp.Editor);