import { isKeyHotkey } from 'is-hotkey';
import { Block } from 'slate';
import { isEqual } from 'lodash';

const isEnterHotKey = isKeyHotkey('enter');

const friendlyOnEnter = (options = {
    defaultBlock: 'paragraph',
    excludes: []
}) => ({
    onKeyDown: (event, change) => {
        if (
            isEnterHotKey(event) &&
            change.value.startBlock.type !== defaultBlock &&
            excludes.filter(block => block === change.value.startBlock.type).length === 0) {
            const currentSelection = change.value.selection;
            const endOfBlockSelection = change.extendToEndOf(change.value.startBlock).value
                .selection;
            if (
                change.value.startBlock.type !== 'list-item' &&
                isEqual(currentSelection, endOfBlockSelection)
            ) {
                event.preventDefault();
                change.insertBlock(Block.create(defaultBlock));
                return false;
            } else if (
                change.value.startBlock.type === 'list-item' &&
                change.value.startBlock.isEmpty &&
                isEqual(currentSelection, endOfBlockSelection)
            ) {
                event.preventDefault();
                change
                    .setBlock(defaultBlock)
                    .unwrapBlock('bulleted-list')
                    .unwrapBlock('numbered-list');
                return false;
            }
            change.select(currentSelection);
        }
    },
});

export default friendlyOnEnter;
