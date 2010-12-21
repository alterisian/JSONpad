Ext.namespace('Ext.ux.form');

Ext.ux.form.CodeMirror = Ext.extend(Ext.form.TextArea, {
    language: 'txt',
    hideLabel: true,
    codeMirrorPath: 'lib/CodeMirror/web',  // <---- change this!
    initComponent: function() {
	    if ( this.codeMirrorPath === null ) {
		    throw 'Ext.ux.form.CodeMirror: codeMirrorPath required';
	    }
	    this.codeEditor = null;
	    this.initialized = false;
	    this.initialWidth = 0;
	    this.initialHeight = 0;
	    if ( this.hideLabel ) {
		    this.separator = '';
	    }
	    Ext.ux.form.CodeMirror.superclass.initComponent.apply(this, arguments);
	    this.addEvents('initialize');
	    this.on({
	        resize: function(ta, width, height) {
		        if ( Ext.isNumber(width) ) {
			        width -= 50;
		        }
		        if ( !this.initialized ) {
			        this.initialWidth = width;
			        this.initialHeight = height;
		        }
		        else if ( this.codeEditor ) {
			        width = width || this.initialWidth;
			        height = height || this.initialHeight;
			        var el = Ext.get(this.codeEditor.wrapping);
			        el.setSize(width, height);
			        // Ext.get(this.id).setSize(width, height);
		        }
		        return true;
	        },
	        render: function() {
		        var parser, stylesheet;
		        switch (this.language.toLowerCase()) {
			        case 'css':
				        parser = 'parsecss.js';
				        stylesheet = this.codeMirrorPath + '/css/csscolors.css';
				        break;
			        case 'js':
				        parser = [
				            'tokenizejavascript.js',
				            'parsejavascript.js'
				        ];
				        stylesheet = this.codeMirrorPath + '/css/jscolors.css';
				        break;
			        case 'php':
				        parser = [
				            "parsexml.js",
				            "parsecss.js",
				            "tokenizejavascript.js",
				            "parsejavascript.js",
				            "../contrib/php/js/tokenizephp.js",
				            "../contrib/php/js/parsephp.js",
				            "../contrib/php/js/parsephphtmlmixed.js"
				        ];
				        stylesheet = [
				            this.codeMirrorPath + '/css/xmlcolors.css',
				            this.codeMirrorPath + '/css/jscolors.css',
				            this.codeMirrorPath + '/css/csscolors.css',
				            this.codeMirrorPath + '/contrib/php/css/phpcolors.css'
				        ];
				        break;
			        case 'htm':
			        case 'html':
			        case 'xml':
				        parser = 'parsexml.js';
				        stylesheet = this.codeMirrorPath + '/css/xmlcolors.css';
				        break;
			        default:
				        parser = 'parsedummy.js';
				        stylesheet = this.codeMirrorPath + '/css/jscolors.css';  // <-- change this
				        break;

		        }
		        var me = this;
		        this.codeEditor = new CodeMirror.fromTextArea(this.id, {
		            saveFunction: this.initialConfig.saveFn || undefined,
		            parserfile: parser,
		            stylesheet: stylesheet,
		            path: this.codeMirrorPath + '/js/',
		            textWrapping: false,
		            lineNumbers: true,
		            iframeClass: 'codemirror-iframe ' + this.id,
		            content: this.initialConfig.value,
		            initCallback: function() {
			            me.initialized = true;
			            (function() {
				            if ( me.codeEditor ) {
					            var el = Ext.get(me.codeEditor.wrapping);
					            el.setSize(me.initialwidth, me.initialHeight);
					            Ext.get(me.id).setSize(me.initialWidth, me.initialHeight);
				            }
			            }).defer(10);
			            me.fireEvent('initialize', true);
		            }
		        });

	        }
	    });
    },
    getValue: function() {
	    if ( this.initialized ) {
		    return this.codeEditor.getCode();
	    }
	    return this.initialConfig.value;
    },
    setValue: function(v) {
	    if ( this.initialized ) {
		    this.codeEditor.setCode(v);
	    }
    },
    validate: function() {
	    this.getValue();
	    Ext.ux.form.CodeMirror.superclass.validate.apply(this, arguments);
    }
});
Ext.reg('ux-codemirror', Ext.ux.form.CodeMirror);