// helper class for consuming emojiStyles

import { theme1, theme2, theme3 } from './emojiStyle.css';

export const themeStyles = [theme1, theme2, theme3];

import { enter, enterActive, leave, leaveActive, appear, appearActive } from './emojiStyle.css';

export const transitionStyle = {
  enter: 'enter',
  enterActive: 'enterActive',
  leave: 'leave',
  leaveActive: 'leaveActive',
  appear: 'appear',
  appearActive: 'appearActive'
}

export const transitionOptions = {
  transitionEnterTimeout: 1000,
  transitionLeaveTimeout: 1000,
  transitionName: transitionStyle
};

export const emojiSet = [
  // original set
  '🍕', '🐡', '🐓', '👽', '👹', '🚶',
  // least commonly used
  '🍯', '🎣', '🚱', '💆', '🗽', '🔝', '💣', '🎧', '🍞',
  // '⌛'️,
  '🍝', '💅',
  '👶', '👴', '🌄', '🌅'
];

export function emojiFor(index) {
  return emojiSet[index % emojiSet.length];
}
