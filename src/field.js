
/**
 * @class Inkpod.widget.form.Field
 * @extends Ext.Component
 * formのフィールド。
 * label と body を持つ
 */

Ext.ns("Inkpod.widget.form");

Inkpod.widget.form.Field = Ext.extend(Ext.Component, {

    baseCls: 'ikp-field',

    /**
     * ラベルの文字列
     */
    label: '',

    /**
     * ラベルの幅
     */
    labelWidth: 100,
    
    /**
     * ラベルのクラス
     */
    labelCls: 'ikp-field-label',
    
    /**
     * Bodyのクラス
     */
    bodyCls: 'ikp-field-body',
    
    /**
     * ラベル要素
     */
    labelEl: null,
    
    /**
     * body要素
     */
    bodyEl: null,
    
    /**
     * 描画
     */
    afterRender : function(ct, position) {
        var that = this,
            el = that.el,
            logger = Inkpod.logger;

        Inkpod.widget.form.Field.superclass.afterRender.call(that, ct, position);

        var width = that.getWidth(),
            labelWidth = that.labelWidth,
            bodyWidth = width - labelWidth - el.getBorderWidth('lr');
        
        // ラベル
        that.labelEl = el.createChild({
            tag: 'div',
            cls: that.labelCls,
            style: {
                width: labelWidth + 'px'
            },
            html: that.label
        });

        // body
        that.bodyEl = el.createChild({
            tag: 'div',
            cls: that.bodyCls,
            style: {
                width: bodyWidth + 'px'
            }
        });
    }

});
