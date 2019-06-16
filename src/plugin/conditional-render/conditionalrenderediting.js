
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { toWidget, toWidgetEditable, viewToModelPositionOutsideModelElement } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';


export default class ConditionalRenderEditing extends Plugin {

    static get requires() {                                                    // ADDED
        return [ Widget ];
    }

	init() {
        const editor = this.editor;
        const schema = editor.model.schema;
        
        schema.register( 'conditionalRenderer', {
			allowWhere: '$block',
            allowContentOf: '$root',
            allowAttributes: [ 'condition' ]
        });

        /*schema.register('conditionStart', {
            allowIn: 'conditionalRenderer',
            
            allowContentOf: '$block'
        })*/

        this.defineConverters();
        //editor.conversion.elementToElement( { model: 'conditionalRenderer', view: { name: 'div', classes: 'conditional-renderer' } } );
        this.editor.editing.mapper.on(
            'viewToModelPosition',
            viewToModelPositionOutsideModelElement( this.editor.model, viewElement => viewElement.hasClass( 'conditionalRenderer' ) )
        );
    }
    
    defineConverters() {
        const conversion = this.editor.conversion;

        conversion.for( 'upcast' ).elementToElement( {
            model: (viewElement, modelWriter) => {
                const condition = viewElement.getChild( 0 ).data.slice( 1, -1 );
                return modelWriter.createElement( 'conditionalRenderer',{condition});
            },
            view: {
                name: 'div',
                classes: [ 'conditional-renderer' ]
            }
        } );


        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'conditionalRenderer',
            view: this.createContentRendererView
        });

        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'conditionalRenderer',
            view: (modelItem, viewWriter)=>{
                const widgetElement = this.createContentRendererView(modelItem, viewWriter);
                return  toWidgetEditable( widgetElement, viewWriter );
            }
        });  

        /*conversion.elementToElement({
            model:'conditionStart',
            view:{
                name:'span',
                classes:'condition-start'
            }
        });*/
    }

    createContentRendererView(modelItem, viewWriter)  {

        const condition = modelItem.getAttribute( 'condition' );
        const view = viewWriter.createContainerElement( 'div', {
            class: 'conditional-renderer'
        });

        /*const conditionView =  viewWriter.createUIElement('span',{class:'condition'},(domDocument)=>{
            const domElement = conditionView.toDomElement( domDocument );
            domElement.innerHTML = '{'+condition+'}';
            return domElement;
        });

        const conditionViewEnd =  viewWriter.createUIElement('span',{class:'condition-end'},(domDocument)=>{
            const domElement = conditionViewEnd.toDomElement( domDocument );
            domElement.innerHTML = '{/}';
            return domElement;
        });

        //const innerText = viewWriter.createText( '{TEST}' );

        viewWriter.insert( viewWriter.createPositionAt(view, 0 ), conditionView );
        viewWriter.insert( viewWriter.createPositionAt(view, 1 ), conditionViewEnd );*/
        return view;
    }

    afterinit() {
        const editor = this.editor;
        this.listenTo(this.editor.editing.view.document, 'enter', ( evt, data ) => {
            const doc = this.editor.model.document;
            const positionParent = doc.selection.getLastPosition().parent;
            
            if ( doc.selection.isCollapsed && positionParent.isEmpty ) {

                // TO DO : Execute Command has to be called here
				this.editor.editing.view.scrollToTheSelection();

				data.preventDefault();
				evt.stop();
			}
        });
    }
}
