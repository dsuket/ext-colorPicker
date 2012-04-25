
/**
 * @class Inkpod.widget.form.ColorForm
 * @extentds Ext.Component
 * 
 * Color Forom.
 * That form has color picker.
 * for Sencha Touch 1.1
 */

Ext.ns("Inkpod.widget.form");

Inkpod.widget.form.ColorForm = Ext.extend(Ext.Component, {
	
    cls: 'ikp-color-form',
    
    /**
     * @cfg color color name. CSS Color Format.
     */
    color: 'white',
    
    colorPickerTarget: null,
    colorPickerWidth: 320,
    colorPickerHeight: 256,
    
    /**
     * @cfg {Boolean} enableHandle
     * enable drag handle
     */
    enableHandle: true,
    
    /**
	 * Initialize
	 */
	 initComponent: function() {
		var that = this;
		
		Inkpod.widget.form.ColorForm.superclass.initComponent.call(that);
		
		that.colorPickerTarget = that.colorPickerTarget || Ext.id();
		
	},
	
    /**
     * render elements
     */
    afterRender : function(ct, position) {
        var that = this,
            logger = Inkpod.logger,
            el = that.el,
            pickerTarget,
            deleteButtonEl;
        
        Inkpod.widget.form.ColorForm.superclass.afterRender.call(that, ct, position);
        
        var colorPickerClasses = 
            ['html5jp-cpick',
             '[target:' + that.colorPickerTarget +
             ';width:'  + that.colorPickerWidth + 
             ';height:' + that.colorPickerHeight +
             ';show:0' +
             ';hide:0' +
             ';coloring:true]',
             'color-button'];

        // Drag handle
        if (that.enableHandle) {
            var colorHandle = el.createChild({
                tag: 'div',
                cls: 'drag-handle'
            });
        }
        
        // Color picker button
        var colorButtonEl = el.createChild({
            tag: 'button',
            cls: colorPickerClasses.join(' ')
        });
            
        // textField of color
        pickerTarget = el.createChild({
            id:  that.colorPickerTarget,
            tag: 'input',
            type: 'text',
            value: that.color,
            cls: 'color-text-field',
            size: 7
        });
        pickerTarget.addListener('change', function(e){
            that.color = pickerTarget.getValue();
        })
        that.colorPickerTarget = pickerTarget;
        
        // delete element button
        deleteButtonEl = el.createChild({
            tag: 'div',
            cls: 'delete-button'
        });
        deleteButtonEl.addListener('tap', function(){
            that.destroy();
        });
        
    },
	
	/**
	 * Get color value
	 */
	getValue: function() {
	    var that = this;
	    if (that.rendered) {
	        return that.colorPickerTarget.getValue();
	    } else {
	        return that.color;
	    }
	},

	/**
	 * Set color value.
	 */	
	setValue: function(value) {
	    var that = this;
	    if (that.rendered) {
	        that.colorPickerTarget.dom.value = value;
	    } else {
	        that.color = value;
	    }
	}
	
});

// register xtype
Ext.reg('ikp-color-form', Inkpod.widget.form.ColorForm);
