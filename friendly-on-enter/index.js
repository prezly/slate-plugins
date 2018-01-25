import { isKeyHotkey } from 'is-hotkey';
import { Block } from 'slate';
import { isEqual } from 'lodash';

const isEnterHotKey = isKeyHotkey('enter');

const userFriendlyOnEnterBehaviour = () => ({
    onKeyDown: (event, change) => {
        if (isEnterHotKey(event)) {
            const currentSelection = change.value.selection;
            const endOfBlockSelection = change.extendToEndOf(change.value.startBlock).value
                .selection;
            if (
                change.value.startBlock.type !== 'list-item' &&
                isEqual(currentSelection, endOfBlockSelection)
            ) {
                event.preventDefault();
                change.insertBlock(Block.create('paragraph'));
                return false;
            } else if (
                change.value.startBlock.type === 'list-item' &&
                change.value.startBlock.isEmpty &&
                isEqual(currentSelection, endOfBlockSelection)
            ) {
                event.preventDefault();
                change
                    .setBlock('paragraph')
                    .unwrapBlock('bulleted-list')
                    .unwrapBlock('numbered-list');
                return false;
            }
            change.select(currentSelection);
        }
    },
});

export default userFriendlyOnEnterBehaviour;
