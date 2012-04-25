
/**
 * @class Inkpod.widget.form.ColorSet
 * @extentds Inkpod.widget.form.Field
 * 
 * Set of color fields.
 * 
 */

Ext.ns("Inkpod.widget.form");

Inkpod.widget.form.ColorSet = Ext.extend(Inkpod.widget.form.Field, {

    cls: 'ikp-color-set',

    /**
     * @cfg {Array} colors 色設定
     */
    colors: null,
    
    /**
     * ColorFormの配列
     */
    colorForms: null,

    /**
     * Colorフィールドのクラス
     */
    colorFormCls: 'ikp-color-form',
    
    /**
     * Colorフィールドの入る要素
     */
    colorFormContainerEl: null,
    
    /**
     * 追加ボタン コンポーネント
     */
    addButton: null,
    
	/**
	 * 初期化
	 */
    initComponent: function() {
        var that = this;
        
        Inkpod.widget.form.ColorSet.superclass.initComponent.call(that);
        
		that.colorForms = [];
	},
	
	/**
	 * 描画
	 */
    afterRender : function(ct, position) {
		var that = this,
		    el = that.el,
			logger = Inkpod.logger;

        Inkpod.widget.form.ColorSet.superclass.afterRender.call(that, ct, position);

        var bodyEl = that.bodyEl;
		// colorFormのコンテンツ
        var colorFormContainerEl = bodyEl.createChild({
            tag: 'div',
            cls: 'color-form-container'
        });
        that.colorFormContainerEl = colorFormContainerEl;
        
		// 追加ボタンを作成
		that.addButton = new Ext.Button({
			cls: 'add-color-button',
			text: 'add',
			iconCls: 'add',
			iconMask: true,
			renderTo: bodyEl,
			handler: function(btn, event) {
				that.addColorForm('#FFFFFF', true);
				CPICK.init();
			}
		});

		// カラーの追加
		if (that.colors) {
		    that.setValue(that.colors);
        }
		
		// 並び替え
		that.sortable = new Ext.util.Sortable(colorFormContainerEl, {
			constrain: colorFormContainerEl,
			direction: 'vertical',
			handleSelector: '.' + that.colorFormCls + ' .drag-handle',
			itemSelector: '.' + that.colorFormCls,
			animationDuration: 200,
			listeners: {
				sortchange: function(sortable, el, index) {
					// console.log('sortchange', el, index);
				    var colorForms = that.colorForms;
					var elindex = that.indexOfColorForm(el);
					var colorForm = colorForms[elindex];
					colorForms.splice(elindex, 1);
					colorForms = colorForms.insert(index, colorForm);
				},
				sortstart: function(sortable, ev) {
					//console.log('sort start', ev);
				},
				sortend: function(sortable, ev) {
					//console.log('sort end', ev);
				}
			}
		});
	},

	/**
	 * 引数の el が colorForms に含まれる index を返す。
	 * 無い場合は -1 を返す 
	 */
	indexOfColorForm: function(el) {
		var that = this,
			elIndex = -1;
		
		that.colorForms.forEach(function(colorForm, index){
			if (colorForm.el === el) {
				elIndex = index;
			}
		});
		return elIndex;
	},
	
	/**
	 * カラーフィールドを追加する
	 * 
	 * @return 作成したカラーフィールド要素
	 */
	addColorForm: function(color, animation) {
		var that = this,
			logger = Inkpod.logger,
			colorFormContainerEl = that.colorFormContainerEl,
			colorForms = that.colorForms,
			colorForm;
		
		//logger.debug('addColorForm: ' + color);
		
		colorForm = new Inkpod.widget.form.ColorForm({
			color: color,
			renderTo: colorFormContainerEl
		});
		// アニメーション
		if (animation) {
			Ext.Anim.run(colorForm.el, 'fade', {
				out: false
			});
		}
        colorForms.push(colorForm);

		// 削除ボタンのリスナー
		colorForm.addListener('destroy', function(ev){
		    colorForms.remove(colorForm);
		    
		    // サイズを一時設定
            var height = that.getBodyHeight() + that.el.getBorderWidth('tb');
            that.setHeight(height);
            Inkpod.logger.debug("set tmp height: " + height);
            setTimeout(function(){
                that.setHeight(null);
            }, 200)
		}, this);
		
		
		return colorForm;
	},
	
	getBodyHeight: function() {
	    var that = this,
	        colorForms = that.colorForms,
	        size = 0;
	    
	    colorForms.forEach(function(form){
	        var formEl = form.el;
	        size += formEl.getOuterHeight();
	    });
	    if (colorForms.isEmpty()) {
	        size = 2;
	    }
	    size += that.addButton.el.getOuterHeight();  
	    
	    return size;
	},

	/**
	 * 色の配列をセット
	 */
	setValue: function(colors) {
	    var that = this;
	    
	    if (typeof colors === 'string') {
	        colors = [colors];
	    }
	    that.colors = colors;
	    if (that.rendered) {
	        that.clearColorForms();
	        colors.forEach(function(color) {
	            that.addColorForm(color, false);
	        });
	        CPICK.init();
	    }

	},
	
	/**
	 * 色の配列を所得
	 */
	getValue: function() {
	    var that = this,
	        colorForms = that.colorForms,
	        colors = [];

	    if (that.rendered) {
	        if (colorForms) {
	            colorForms.forEach(function(colorForm) {
	                colors.push(colorForm.getValue());
	            });
	        }
	    } else {
	        colors = that.colors;
	    }
        return colors;
	},
	
	/**
	 * カラーフィールドを全削除
	 */
	clearColorForms: function() {
		var that = this,
		    colorForms = that.colorForms,
		    colorFormContainerEl = that.colorFormContainerEl;
		
		if (colorForms && colorForms.length > 0) {
		    colorFormContainerEl.select('.'+that.colorFormCls).remove();
	        colorForms.clear();
            // サイズを一時設定
            var height = that.getBodyHeight() + that.el.getBorderWidth('tb');
            that.setHeight(height);
            that.setHeight(null);
		}
	}
	
});

Ext.reg('ikp-color-set', Inkpod.widget.form.ColorSet);
