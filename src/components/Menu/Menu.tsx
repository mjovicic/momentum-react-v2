/* eslint-disable @typescript-eslint/ban-types */
import { Node } from '@react-types/shared';
import React, { forwardRef, ReactElement, RefObject, useContext, useRef, useCallback } from 'react';
import classnames from 'classnames';

import { STYLE } from './Menu.constants';
import { MenuAppearanceContextValue, MenuContextValue, Props } from './Menu.types';
import './Menu.style.scss';
import { useMenu } from '@react-aria/menu';
import { useTreeState, TreeState } from '@react-stately/tree';
import MenuItem from '../MenuItem';
import { mergeProps } from '@react-aria/utils';
import MenuSection from '../MenuSection';

export const MenuContext = React.createContext<MenuContextValue>({});

export function useMenuContext(): MenuContextValue {
  return useContext(MenuContext);
}

export const MenuAppearanceContext = React.createContext<MenuAppearanceContextValue>({});

const Menu = <T extends object>(props: Props<T>, providedRef: RefObject<HTMLUListElement>) => {
  const { className, id, style, itemShape, itemSize } = props;
  const contextProps = useMenuContext();

  const _props = {
    ...mergeProps(contextProps, props),
  };

  const state = useTreeState({ ..._props });

  const internalRef = useRef();
  const ref = providedRef || internalRef;

  const { menuProps } = useMenu(_props, state, ref);

  const renderItem = useCallback(
    <T extends object>(item: Node<T>, state: TreeState<T>) => {
      if (item.type === 'section') {
        return <MenuSection key={item.key} item={item} state={state} onAction={_props.onAction} />;
      } else {
        // collection.getKeys() return all keys (including sub-keys of child elements)
        // and we don't want to render items twice
        if (item.parentKey !== null) {
          return;
        }

        let menuItem = (
          <MenuItem key={item.key} item={item} state={state} onAction={_props.onAction} />
        );

        if (item.wrapper) {
          menuItem = item.wrapper(menuItem);
        }

        return menuItem;
      }
    },
    [state]
  );

  return (
    <MenuAppearanceContext.Provider value={{ itemShape, itemSize }}>
      <ul
        className={classnames(className, STYLE.wrapper)}
        id={id}
        style={style}
        ref={ref}
        {...menuProps}
      >
        {Array.from(state.collection.getKeys()).map((key) => {
          const item = state.collection.getItem(key) as Node<T>;
          return renderItem(item, state);
        })}
      </ul>
    </MenuAppearanceContext.Provider>
  );
};

/**
 * Menu Element which displays a list of options/actions.
 */

const _Menu = forwardRef(Menu);
_Menu.displayName = '_Menu';

export default _Menu as <T>(
  props: Props<T> & { ref?: RefObject<HTMLUListElement> }
) => ReactElement;
