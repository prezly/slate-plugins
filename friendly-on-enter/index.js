import { isKeyHotkey } from 'is-hotkey';
import { Block } from 'slate';
import { isEqual } from 'lodash';

const isEnterHotKey = isKeyHotkey('enter');

const userFriendlyOnEnterBehaviour = () => ({
    onKeyDown: (event, change) => {
        if (
            (isEnterHotKey(event) && change.value.startBlock.type !== 'list-item') ||
            (isEnterHotKey(event) &&
                change.value.startBlock.type === 'list-item' &&
                change.value.startBlock.isEmpty)
        ) {
            const currentSelection = change.value.selection;
            const endOfBlockSelection = change.extendToEndOf(change.value.startBlock).value
                .selection;
            if (isEqual(currentSelection, endOfBlockSelection)) {
                event.preventDefault();
                change.insertBlock(Block.create('paragraph'));
                change.unwrapBlock('bulleted-list').unwrapBlock('numbered-list');
                return false;
            }
            change.select(currentSelection);
        }
    },
});

export default userFriendlyOnEnterBehaviour;
