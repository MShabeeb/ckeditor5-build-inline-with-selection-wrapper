import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { toWidget, toWidgetEditable } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';
import './theme/conditional-render.css';

export default class ConditionalRenderEditing extends Plugin {
    

    static get requires() {
        return [Widget];
    }

    init(){
        console.log("ConditionalRenderEditing#init()");
        this.defineSchema();
        this.defineConverters();
        
    }

    //<section class='conditional-render'><span class='condition-start'></span><div class='conditional-data'></div><span class='condition-end'></span></section>
    
    //<conditionalRender><conditionStart>{Question.value==1}</conditionStart><conditionalData>Data</conditionalData><conditionEnd>{/}</conditionEnd></conditionalRender>
    defineSchema() {
        const schema = this.editor.model.schema;
        schema.register('conditionalRender',{
            isObject: true,
             //isInline: true,
            allowWhere: '$block',
            //allowContentOf: '$root',
            //allowAttributes: [ 'condition' ]
        });


        schema.register('conditionStart', {
            isLimit: true,
            allowIn: 'conditionalRender',
            allowContentOf: '$block',
        });

        schema.register('conditionEnd', {
            isLimit: true,
            allowIn: 'conditionalRender',
            allowContentOf: '$block',
        });

        schema.register('conditionalData', {
            isOject: true,
            allowIn: 'conditionalRender',
            allowContentOf: '$root',
        });
    }

    defineConverters() {
        const conversion = this.editor.conversion;

       /*conversion.elementToElement({
           model:'conditionalRender',
           view: {
               name: 'section',
               classes: 'conditional-render'
           }
       });*/

       conversion.for('upcast').elementToElement({
            model:'conditionalRender',
            view: {
                name: 'section',
                classes: 'conditional-render'
            }
        });

        conversion.for('dataDowncast').elementToElement({
            model:'conditionalRender',
            view: {
                name: 'section',
                classes: 'conditional-render'
            }
        });

        conversion.for('editingDowncast').elementToElement({
            model:'conditionalRender',
            view: (modelElement,viewWriter) => {
                const section = viewWriter.createContainerElement('section', { class: 'conditional-render'});
                return toWidget(section, viewWriter, { label: 'conditional rendering block.' });
            }
        });




       /*conversion.elementToElement({
            model:'conditionStart',
            view: {
                name: 'span',
                classes: 'condition-start'
            }
        });*/

        conversion.for('upcast').elementToElement({
            model:'conditionStart',
            view: {
                name: 'span',
                classes: 'condition-start'
            }
        });

        conversion.for('dataDowncast').elementToElement({
            model:'conditionStart',
            view: {
                name: 'span',
                classes: 'condition-start'
            }
        });


        conversion.for('editingDowncast').elementToElement({
            model:'conditionStart',
            view: (modelElement,viewWriter) => {
                const span = viewWriter.createContainerElement('span', { class: 'condition-start'});
                return toWidget(span,viewWriter, { label: 'condition start' });
            }
        });


     /*conversion.elementToElement({
            model:'conditionEnd',
            view: {
                name: 'span',
                classes: 'condition-end'
            }
        });*/


        conversion.for('upcast').elementToElement({
            model:'conditionEnd',
            view: {
                name: 'span',
                classes: 'condition-end'
            }
        });

        conversion.for('dataDowncast').elementToElement({
            model:'conditionEnd',
            view: {
                name: 'span',
                classes: 'condition-end'
            }
        });


        conversion.for('editingDowncast').elementToElement({
            model:'conditionEnd',
            view: (modelElement,viewWriter) => {
                const span = viewWriter.createContainerElement('span', { class: 'condition-end'});
                return toWidget(span,viewWriter, { label: 'condition end' });
            }
        });

        /*conversion.elementToElement({
            model:'conditionalData',
            view: {
                name: 'div',
                classes: 'conditional-data'
            }
        });*/

        // View to Model, HTML to Model
        conversion.for('upcast').elementToElement({
            model:'conditionalData',
            view: {
                name: 'div',
                classes: 'conditional-data'
            }
        });


        conversion.for('dataDowncast').elementToElement({
            model:'conditionalData',
            view: {
                name: 'div',
                classes: 'conditional-data'
            }
        });

        conversion.for('editingDowncast').elementToElement({
            model:'conditionalData',
            view: (modelElement,viewWriter) => {
                const div = viewWriter.createEditableElement('div', { class: 'conditional-data'});
                return toWidgetEditable(div,viewWriter);
            }
        });


       /*conversion.for('upcast').elementToElement({
            model:'conditionalRender',
            view: {
                name: 'section',
                classes: 'conditional-render'
            }
       });


       conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'conditionalRender',
            view: {
                name: 'section',
                classes: 'conditional-render'
            }
        });


        conversion.for('upcast').elementToElement({
            model:'condition',
            view: {
                name: 'mark',
                classes: 'condition-mark'
            }
       });

       conversion.for('dataDowncast').elementToElement({
        model:'condition',
        view: {
            name: 'mark',
            classes: 'condition-mark'
        }
   });

        /*conversion.for( 'editingDowncast' ).elementToElement( {
                model: 'conditionalRender',
                view: ( modelElement, viewWriter ) => {
                    const section = viewWriter.createContainerElement( 'section', { class: 'conditional-render' } );

                    return toWidgetEditable( section, viewWriter);
                }
        });*/
    }
}
