import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import Command from '@ckeditor/ckeditor5-core/src/command';
import imageIcon from  './theme/save.svg';

export default class Save extends Plugin {
    static get requires() {
        return [ SaveUI ];
    }

    static get pluginName() {
        return "Save";
    }
}

class SaveUI extends Plugin {
    init() {
        const editor = this.editor;
        const t = editor.t;

        editor.ui.componentFactory.add('save',locale => {
            //const command = editor.commands.get( 'insertSimpleBox' );
            const buttonView = new ButtonView( locale );

            buttonView.set( {
                // The t() function helps localize the editor. All strings enclosed in t() can be
                // translated and change when the language of the editor changes.
                label: t( 'Save' ),
                icon: imageIcon,
                //withText: true,
                tooltip: true
            } );

            buttonView.on('execute',()=>{
                const saveCommand = editor.commands.get('saveCommand');
                saveCommand.execute({value:editor});
            });

            return buttonView;
        });
    }
}



