jp.TabPanel.Tab.TreePanel.contextMenu = Ext.extend(Ext.menu.Menu, {
    treePanelToolbar: null,
    treePanel: null,
    initComponent: function() {
	this.items = this.getMenuItems();

	this.listeners = {
	    'show': this.onShow,
	    scope: this
	};

	jp.TabPanel.Tab.TreePanel.contextMenu.superclass.initComponent.call(this);
    },

    afterRender: function () {
	jp.TabPanel.Tab.TreePanel.contextMenu.superclass.afterRender.call(this);

	if (this.treePanel == null) this.treePanel = Ext.getCmp("jp.Editor").tabPanel.getTreePanel();
	if (this.treePanelToolbar == null) this.treePanelToolbar = this.treePanel.getTopToolbar();
    },

    onShow: function () {
	var selectedNode = this.treePanel.getSelectionModel().getSelectedNode();
	
	if ( selectedNode.getDepth() == 0 ) {
	    this.btn_duplicate.disable();
	    this.btn_delete.disable();
	} else {
	    this.btn_duplicate.enable();
	    this.btn_delete.enable();
	}
    },

    actionAddKey: function () {
	this.treePanelToolbar.actionAddKey();
    },
    actionAddObject: function () {
	this.treePanelToolbar.actionAddObject();
    },
    actionAddArray: function () {
	this.treePanelToolbar.actionAddArray();
    },
    actionDuplicateNode: function () {
	this.treePanelToolbar.actionDuplicateNode();
    },
    actionDeleteNode: function () {
	this.treePanelToolbar.actionDeleteNode();
    },

    getMenuItems: function () {
	return [{
	    text: 'Add',
	    iconCls: 'icon_tree_addKey',
	    ref: 'btn_add',
	    menu: {
		items: [
		{
		    text: 'Add Key',
		    handler: this.actionAddKey,
		    scope: this
		},
		'-',
		{
		    text: 'Add Object',
		    handler: this.actionAddObject,
		    scope: this
		},
		{
		    text: 'Add Array',
		    handler: this.actionAddArray,
		    scope: this
		}
		]
	    }
	},{
	    text: 'Duplicate',
	    iconCls: 'icon_tree_duplicate',
	    handler: this.actionDuplicateNode,
	    scope: this,
	    ref: 'btn_duplicate'
	}, '-',{
	    text: 'Delete',
	    iconCls: 'icon_tree_delete',
	    handler: this.actionDeleteNode,
	    scope: this,
	    ref: 'btn_delete'
	}];
    }
});

Ext.reg('jp.TabPanel.Tab.TreePanel.contextMenu', jp.TabPanel.Tab.TreePanel.contextMenu);