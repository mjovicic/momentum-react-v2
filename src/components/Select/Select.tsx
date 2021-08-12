import React, { ReactElement, RefObject, useRef, forwardRef, useState, useEffect } from 'react';
import classnames from 'classnames';

import './Select.style.scss';
import { Props } from './Select.types';
import { DEFAULTS, SELECT_HEIGHT_ADJUST_BORDER, STYLE } from './Select.constants';
import { useSelectState } from '@react-stately/select';
import { useButton } from '@react-aria/button';
import { DismissButton, useOverlay } from '@react-aria/overlays';
import { FocusScope } from '@react-aria/focus';
import { useSelect, HiddenSelect } from '@react-aria/select';
import Icon from '../Icon';
import ListBoxBase from '../ListBoxBase';

// eslint-disable-next-line @typescript-eslint/ban-types
function Select<T extends object>(props: Props<T>, ref: RefObject<HTMLDivElement>): ReactElement {
  const { className, isDisabled, label, name, placeholder, direction = DEFAULTS.DIRECTION } = props;
  const state = useSelectState(props);

  const [inputHeight, setInputHeight] = useState(0);

  const selectRef = useRef<HTMLButtonElement>(null);

  const boxRef = useRef<HTMLUListElement>(null);

  const { labelProps, triggerProps, valueProps, menuProps } = useSelect(props, state, selectRef);

  const { buttonProps } = useButton({ ...triggerProps, isDisabled }, selectRef);
  delete buttonProps.color;

  const overlayRef = useRef(null);
  const { overlayProps } = useOverlay(
    {
      onClose: () => state.close(),
      shouldCloseOnBlur: true,
      isOpen: state.isOpen,
      isDismissable: true,
    },
    overlayRef
  );

  const getArrowIcon = (isOpen: boolean) => {
    if (direction === 'bottom') {
      return isOpen ? 'arrow-up' : 'arrow-down';
    } else {
      return isOpen ? 'arrow-down' : 'arrow-up';
    }
  };

  useEffect(() => {
    if (selectRef && selectRef.current && selectRef.current.clientHeight)
      setInputHeight(selectRef.current.clientHeight + SELECT_HEIGHT_ADJUST_BORDER);
  }, []);

  const listBox = (
    <FocusScope restoreFocus>
      {/*
        This div should really be a Popover component but I will refrain from creating another
        component as this PR is already big. I have created a workaround, so the Select can work meanwhile
      */}
      <div
        {...overlayProps}
        ref={overlayRef}
        className={STYLE.overlay}
        data-direction={direction}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        style={{
          ['--select-dropdown-input-height' as any]: `${(inputHeight / 16).toFixed(1)}rem`,
        }}
      >
        {/* Invisible button for accessibility */}
        <DismissButton onDismiss={() => state.close()} />
        <ListBoxBase
          {...menuProps}
          ref={boxRef}
          state={state}
          disallowEmptySelection
          shouldHaveMenuListBoxWrapper
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus={state.focusStrategy || DEFAULTS.SHOULD_AUTOFOCUS}
        />
        {/* Invisible button for accessibility */}
        <DismissButton onDismiss={() => state.close()} />
      </div>
    </FocusScope>
  );

  return (
    <div className={classnames(className, STYLE.wrapper)} ref={ref}>
      {label && (
        <label htmlFor={name} {...labelProps}>
          {label}
        </label>
      )}
      <HiddenSelect state={state} triggerRef={selectRef} label={label} name={name} />
      <button
        id={name}
        className={classnames(
          STYLE.dropdownInput,
          { [STYLE.selected]: state.selectedItem },
          { [STYLE.open]: state.isOpen }
        )}
        {...buttonProps}
        ref={selectRef}
      >
        <span {...valueProps} className={STYLE.selectedItemWrapper}>
          {state.selectedItem ? state.selectedItem.rendered : placeholder}
        </span>
        <span aria-hidden="true" className={STYLE.iconWrapper}>
          <Icon name={getArrowIcon(state.isOpen)} weight="bold" scale={16} />
        </span>
      </button>
      {state.isOpen && !isDisabled && listBox}
    </div>
  );
}

/**
 * Dropdown / Select Element which displays a listbox with options.
 */

const _Select = forwardRef(Select);

_Select.displayName = 'Select';

export default _Select as <T>(
  props: Props<T> & { ref?: RefObject<HTMLDivElement> }
) => ReactElement;
