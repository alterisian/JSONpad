jp.TabPanel.Tab.TreePanel.tbar = Ext.extend(Ext.Toolbar, {
    //ref: 'treetools',
    treePanel: null,
    initComponent: function() {
	//var tree = this.findParentByType("jp.TabPanel.Tab.TreePanel");
	this.treePanel = this.findParentByType("jp.TabPanel.Tab.TreePanel");
	this.items = this.getToolbarItems();

	jp.TabPanel.Tab.TreePanel.tbar.superclass.initComponent.call(this);
    },

    getToolbarItems: function () {
	var treePanel = this.treePanel;
	return [
	{
	    iconCls: 'icon_tree_add',
	    tooltip: 'Add a value/object/array',
	    menu: {
		ref: 'menu',
		items: [
		{
		    text: 'Add value',
		    handler: this.actionAddValue,
		    scope: this
		},'-',{
		    text: 'Add object',
		    ref: 'addObject',
		    handler: this.actionAddObject,
		    scope: this
		},
		{
		    text: 'Add array',
		    ref: 'addArray',
		    handler: this.actionAddArray,
		    scope: this
		}
		]
	    }
	},
	{
	    iconCls: 'icon_tree_duplicate',
	    tooltip: 'Duplicate selected node',
	    handler: this.actionDuplicateNode,
	    scope: this,
	    ref: 'duplicateNode',
	    disabled: true
	},
	{
	    iconCls: 'icon_tree_delete',
	    tooltip: 'Delete selected node',
	    handler: this.actionDeleteNode,
	    scope: this,
	    ref: 'deleteNode',
	    disabled: true
	},
	'->',
	new Ext.form.TextField({
	    width: 110,
	    emptyText:'Search inside tree',
	    enableKeyEvents: true,
	    //tooltip: 'Search inside key and values', @todo Tooltip for searchfield
	    listeners:{
		render: function(f) {
		    this.filter = new Ext.tree.TreeFilter(this, {
			clearBlank: true,
			autoClear: true
		    });
		},
		keydown: {
		    fn: function(t, e){
			this.filterNodes(t.getValue(), this);
		    },
		    buffer: 350,
		    scope: treePanel
		},
		scope: treePanel
	    }
	})
	];
    },

    actionAddValue: function () {
	this.treePanel.addNode('value');
    },

    actionAddObject: function () {
	this.treePanel.addNode('object');
    },

    actionAddArray: function () {
	this.treePanel.addNode('array');
    },

    actionDuplicateNode: function () {
	this.treePanel.duplicateSelectedNode();
    },

    actionDeleteNode: function () {
	this.treePanel.deleteSelectedNode();
    }
});

Ext.reg('jp.TabPanel.Tab.TreePanel.tbar', jp.TabPanel.Tab.TreePanel.tbar);