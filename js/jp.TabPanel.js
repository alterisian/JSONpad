Ext.ns('jp');

jp.TabPanel = Ext.extend(Ext.TabPanel, {
	region: 'center',
	activeTab: 0,
	border: false,

	treePanel: null,

	initComponent: function() {
		this.plugins = this.getTabPlugins();

		this.items = [ this.buildEditorTab() ];

		jp.TabPanel.superclass.initComponent.call(this);
	},

	getTabPlugins: function () {
		return [
		    //new Ext.ux.TabCloseMenu(),
		    new Ext.ux.TabTitleEdit()
		];
	},

	buildEditorTab: function () {
		return {
			xtype: 'jp.TabPanel.Tab'
		}
	},

	addEditorTab: function() {
		this.add( this.buildEditorTab() ).show();
	},

	closeActiveTab: function () {
		this.remove( this.getActiveTab() );
	},

	getCodemirror: function () {
		return this.getActiveTab().findByType("jp.TabPanel.Tab.CodeMirror")[0];
	},

	getCodemirrorStatusbar: function () {
		return this.getCodemirror().getBottomToolbar();
	},

	getTreePanel: function () {
		return this.getActiveTab().findByType("jp.TabPanel.Tab.TreePanel")[0];
	},

	getTreeEditPanel: function () {
		return this.getActiveTab().findByType("jp.TabPanel.Tab.TreeEditPanel")[0];
	}
});

Ext.reg('jp.TabPanel', jp.TabPanel);