import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import imageIcon from './theme/conditional.svg';

import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
export default class ConditionalRenderUI extends Plugin {
    init(){
        console.log("ConditionalRenderUI#init()");
        const editor = this.editor;
        editor.ui.componentFactory.add('conditional', locale => {
            const view = new ButtonView( locale );

            view.set( {
                label: 'Conditional Rendering.',
                icon: imageIcon,
                tooltip: true
            } );

            view.on( 'execute', () => {
               
                editor.model.change( writer => {
                    
                    const conditionalRenderBlock=createConditionalRenderingBlock(writer);
                    // Insert the image in the current selection location.
                    editor.model.insertContent( conditionalRenderBlock, editor.model.document.selection );

                });
            } );

            return view;
        });
    }
}


function createConditionalRenderingBlock(writer) {
    const crBlock = writer.createElement('conditionalRender');
    const conditionStart = writer.createElement('conditionStart');
    const conditionalData = writer.createElement('conditionalData')
    const conditionEnd = writer.createElement('conditionEnd');

    writer.append(conditionStart,crBlock);
    writer.append(conditionalData,crBlock);
    writer.append(conditionEnd,crBlock);

    return crBlock;
}