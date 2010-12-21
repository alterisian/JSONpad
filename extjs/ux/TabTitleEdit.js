/*!
 * Ext JS Library 3.3.0
 * Copyright(c) 2006-2010 Ext JS, Inc.
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
/**
 * @class Ext.ux.TabTitleEdit
 * @extends Object
 ***** Plugin (ptype = 'tabtitleedit') for making editable tab titles
 *
 * @constructor
 * @param {Object} config The configuration options
 * @ptype tabtitleedit
 */
Ext.ux.TabTitleEdit = Ext.extend(Object, {
    /**
     * @cfg {String} closeTabText
     * The text for closing the current tab. Defaults to <tt>'Close Tab'</tt>.
     */
    //closeTabText: 'Close Tab',

    /**
     * @cfg {String} closeOtherTabsText
     * The text for closing all tabs except the current one. Defaults to <tt>'Close Other Tabs'</tt>.
     */
    //closeOtherTabsText: 'Close Other Tabs',

    /**
     * @cfg {Boolean} showCloseAll
     * Indicates whether to show the 'Close All' option. Defaults to <tt>true</tt>.
     */
    //showCloseAll: true,

    /**
     * @cfg {String} closeAllTabsText
     * <p>The text for closing all tabs. Defaults to <tt>'Close All Tabs'</tt>.
     */
    //closeAllTabsText: 'Close All Tabs',

    constructor : function(config){
	Ext.apply(this, config || {});
    },

    //public
    init : function(tabs){
	this.tabs = tabs;
debug.trace("DEBUG tabs");
	debug.trace(tabs);
	debug.trace("DEBUG tabs--"+tabs.id);

	var lastClick = 0;

	//tabs.mon('click', this.clickTest, this, true);
debug.trace(Ext.get(tabs.id));
    //.on('click', this.clickTest, this, true);

    /*tabs.on({
            scope: this,
            : this.onContextMenu,
            destroy: this.destroy
        });*/
    },

    clickTest: function(e) {
	var time = new Date().getTime();
	if (time-lastClick < 400) {
	    lastClick = 0;
	    this.onDblClick(e);
	}
	else {
	    lastClick = time;
	    this.onClick(e);
	}
    },

    onClick: function(e) {
	debug.trace("click");
	var el = getEl(e.getTarget());
	el.update('1');
    },

    onDblClick: function(e) {
	debug.trace("dblclick");
	var el = getEl(e.getTarget());
	el.update('2');
    },

    destroy : function(){
	//Ext.destroy(this.menu);
	//delete this.menu;
	delete this.tabs;
    //delete this.active;
    },

    onTabTitleClick: function () {
	debug.trace("click the title?");
    }
});

Ext.preg('tabtitleedit', Ext.ux.TabTitleEdit);