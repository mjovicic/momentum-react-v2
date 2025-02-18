import React, { cloneElement, FC, ReactElement, useEffect, useRef, useState } from 'react';
import { useOverlayTriggerState } from '@react-stately/overlays';
import { useHover } from '@react-aria/interactions';
import { useOverlayTrigger } from '@react-aria/overlays';

import { Props } from './OverlayTrigger.types';
import { DEFAULTS, POSITIONINGS } from './OverlayTrigger.constants';

/**
 * The OverlayTrigger component.
 *
 * @alpha
 */
const OverlayTrigger: FC<Props> = (props: Props) => {
  const {
    hoverDelay = DEFAULTS.HOVER_DELAY,
    hoverOverlay,
    hoverOverlayType = DEFAULTS.TYPE,
    hoverPositioning = DEFAULTS.HOVER_POSITIONING,
    preserveHoverOnPress,
    pressOverlay,
    pressOverlayType = DEFAULTS.TYPE,
    pressPositioning = DEFAULTS.PRESS_POSITIONING,
    trigger,
  } = props;

  let triggerProps = {};
  const triggerEvents: Record<string, () => void> = {};

  let mutatedHoverOverlay = null;
  let mutatedPressOverlay = null;

  const triggerRef = useRef<HTMLInputElement>();
  const [triggerPos, setTriggerPos] = useState({
    center: {
      x: 0,
      y: 0,
    },
    horizontalEdgeOffset: 0,
    verticalEdgeOffset: 0,
  });

  const [hoverEndTimer, setHoverEndTimer] = useState<NodeJS.Timeout>();
  const [hoverStartTimer, setHoverStartTimer] = useState<NodeJS.Timeout>();

  const updateModalPositions = () => {
    if (triggerRef.current) {
      const { height, width, x, y } = triggerRef.current.getBoundingClientRect();

      setTriggerPos({
        center: {
          x: x + width / 2,
          y: y + height / 2,
        },
        horizontalEdgeOffset: width / 2,
        verticalEdgeOffset: height / 2,
      });
    }
  };

  useEffect(() => {
    updateModalPositions();
  }, [triggerRef.current]);

  if (hoverOverlay) {
    const hoverState = useOverlayTriggerState({});
    const hoverOverlayRef = useRef();

    const { triggerProps: hoverTriggerProps, overlayProps: hoverOverlayProps } = useOverlayTrigger(
      {
        type: hoverOverlayType,
      },
      hoverState,
      triggerRef
    );

    triggerEvents.onHoverStart = () => {
      updateModalPositions();

      if (hoverDelay <= 0) {
        hoverState.open();

        return;
      }

      if (hoverEndTimer) {
        clearTimeout(hoverEndTimer);
        setHoverEndTimer(undefined);
      }

      if (!hoverStartTimer && !hoverState.isOpen) {
        setHoverStartTimer(
          setTimeout(() => {
            hoverState.open();

            clearTimeout(hoverStartTimer);
            setHoverStartTimer(undefined);
          }, hoverDelay)
        );
      }
    };

    triggerEvents.onHoverEnd = () => {
      updateModalPositions();

      if (hoverDelay <= 0) {
        hoverState.close();

        return;
      }

      if (hoverStartTimer) {
        clearTimeout(hoverStartTimer);
        setHoverStartTimer(undefined);
      }

      if (!hoverEndTimer && hoverState.isOpen) {
        setHoverEndTimer(
          setTimeout(() => {
            hoverState.close();

            clearTimeout(hoverEndTimer);
            setHoverEndTimer(undefined);
          }, hoverDelay)
        );
      }
    };

    const { hoverProps } = useHover({
      isDisabled: trigger.props.isDisabled,
      onHoverEnd: triggerEvents.onHoverEnd,
      onHoverStart: triggerEvents.onHoverStart,
    });

    triggerProps = { ...triggerProps, ...hoverTriggerProps };

    const position = hoverPositioning !== POSITIONINGS.NONE ? { targetPosition: triggerPos } : {};

    mutatedHoverOverlay = cloneElement(hoverOverlay as ReactElement, {
      ...hoverOverlayProps,
      ...hoverProps,
      isOpen: hoverState.isOpen,
      ref: hoverOverlayRef,
      ...position,
    });
  }

  if (pressOverlay) {
    const pressState = useOverlayTriggerState({});
    const pressOverlayRef = useRef();

    const { triggerProps: pressTriggerProps, overlayProps: pressOverlayProps } = useOverlayTrigger(
      {
        type: pressOverlayType,
      },
      pressState,
      triggerRef
    );

    triggerEvents.onPress = () => {
      updateModalPositions();
      pressState.toggle();

      if (triggerEvents.onHoverEnd && !preserveHoverOnPress) {
        triggerEvents.onHoverEnd();
      }
    };

    triggerProps = { ...triggerProps, ...pressTriggerProps };

    const position = pressPositioning !== POSITIONINGS.NONE ? { targetPosition: triggerPos } : {};

    mutatedPressOverlay = cloneElement(pressOverlay as ReactElement, {
      ...pressOverlayProps,
      isOpen: pressState.isOpen,
      onClose: pressState.close,
      isDismissable: true,
      ref: pressOverlayRef,
      ...position,
    });
  }

  const mutatedTrigger = React.cloneElement(trigger as ReactElement, {
    ...triggerProps,
    ...triggerEvents,
    ref: triggerRef,
  });

  return (
    <>
      {mutatedTrigger}
      {mutatedHoverOverlay}
      {mutatedPressOverlay}
    </>
  );
};

export default OverlayTrigger;
