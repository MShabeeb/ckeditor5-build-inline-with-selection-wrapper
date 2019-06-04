import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import PlaceholderUI from './placeholderui';
import PlaceholderEditing from './placeholderediting';

export default class Placeholder extends Plugin {
    static get requires() {
        return [ PlaceholderEditing, PlaceholderUI ];
    }

    static get pluginName() {
        return "Placeholder";
    }
}

