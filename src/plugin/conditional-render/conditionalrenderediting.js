
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { toWidget } from '@ckeditor/ckeditor5-widget/src/utils';
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

        this.defineConverters();
        //editor.conversion.elementToElement( { model: 'conditionalRenderer', view: { name: 'div', classes: 'conditional-renderer' } } );
    }
    
    defineConverters() {
        const conversion = this.editor.conversion;

        conversion.for( 'upcast' ).elementToElement( {
            model: (viewElement, modelWriter) => {
                //const name = viewElement.getChild( 0 ).data.slice( 1, -1 );
                return modelWriter.createElement( 'conditionalRenderer');
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
            view: this.createContentRendererView
        });  
    }

    createContentRendererView(modelItem, viewWriter)  {
        const view = viewWriter.createContainerElement( 'div', {
            class: 'conditional-renderer'
        } );

        const condition =  viewWriter.createUIElement('span',{class:'condition'},(domDocument)=>{
            const domElement = condition.toDomElement( domDocument );
            domElement.innerHTML = '<b>this is ui element</b>';
            return domElement;
        });

        //const innerText = viewWriter.createText( '{TEST}' );

        viewWriter.insert( viewWriter.createPositionAt( view, 0 ), condition );
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
