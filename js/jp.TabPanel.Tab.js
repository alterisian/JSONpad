jp.TabPanel.Tab = Ext.extend(Ext.Panel, {
    title: 'Untitled Document',
    layout: 'border',
    closable: true,
    treePanel: null,
    initComponent: function() {
	this.items = [{
		xtype: 'jp.TabPanel.Tab.CodeMirror'
	    },{
		xtype: 'jp.TabPanel.Tab.TreePanel'
	    },{
		xtype: 'jp.TabPanel.Tab.TreeEditPanel'
	    }];

	jp.TabPanel.Tab.superclass.initComponent.call(this);

	this.treePanel = this.items.itemAt(1);
    }
});

Ext.reg('jp.TabPanel.Tab', jp.TabPanel.Tab);