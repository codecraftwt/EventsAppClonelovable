// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolViewProps, SymbolWeight } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

type IconMapping = Record<SymbolViewProps['name'], ComponentProps<typeof MaterialIcons>['name']>;
type IconSymbolName = keyof typeof MAPPING;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'calendar': 'event',
  'heart.fill': 'favorite',
  'book.fill': 'book',
  'location.fill': 'location-on',
  'magnifyingglass': 'search',
  'message.fill': 'message',
  'questionmark.circle.fill': 'help',
  'line.3.horizontal.decrease': 'filter-list',
  'clock.fill': 'schedule',
  'person.2.fill': 'people',
  'arrow.right': 'arrow-forward',
  'tag.fill': 'local-offer',
  'photo': 'photo',
  'bubble.left': 'comment',
  'square.and.arrow.up': 'share',
  'leaf.fill': 'eco',
  'fork.knife': 'restaurant',
  'doc.text.fill': 'description',
  'video.fill': 'play-circle-filled',
  'headphones': 'headset',
  'hand.raised.fill': 'pan-tool',
  'building.2.fill': 'business',
  'person.3.fill': 'groups',
  'map.fill': 'map',
  'calendar.badge.plus': 'event-available',
  'person.badge.plus': 'person-add',
  'arrow.up.right': 'open-in-new',
  'xmark': 'close',
  'briefcase.fill': 'work',
  'paintbrush.fill': 'brush',
  'laptopcomputer': 'laptop',
  'checkmark': 'check',
  'trash.fill': 'delete',
  'heart': 'favorite-border',
} as IconMapping;

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}
