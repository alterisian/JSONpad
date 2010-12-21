NodeMouseoverPlugin = Ext.extend(Object, {
	init: function(tree) {
		if (!tree.rendered) {
			tree.on('render', function() {
				this.init(tree)
				}, this);
			return;
		}
		this.tree = tree;
		tree.body.on('mouseover', this.onTreeMouseover, this, {
			delegate: 'div.x-tree-node-el'
		});
	},

	onTreeMouseover: function(e, t) {
		var nodeEl = Ext.get(t);
		if (nodeEl) {
			var nodeId = nodeEl.getAttributeNS('ext', 'tree-node-id');
			if (nodeId) {
				this.tree.fireEvent('mouseover', this.tree.getNodeById(nodeId), e);
			}
		}
	}
});