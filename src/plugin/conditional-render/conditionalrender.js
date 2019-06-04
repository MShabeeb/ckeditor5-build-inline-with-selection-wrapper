import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ConditionalRenderEditing from './conditionalrenderediting';
import ConditionalRenderUI from './conditionalrenderui';

export default class ConditionalRender extends Plugin {
    static get requires() {
        return [ ConditionalRenderEditing, ConditionalRenderUI ];
    }

    static get pluginName() {
        return "Conditional Render";
    }
}
