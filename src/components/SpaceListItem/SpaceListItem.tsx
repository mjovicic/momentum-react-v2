import React, { FC, forwardRef, RefObject, useRef } from 'react';
import classnames from 'classnames';

import { DEFAULTS, STYLE } from './SpaceListItem.constants';
import { Props } from './SpaceListItem.types';
import './SpaceListItem.style.scss';
import ListItemBase from '../ListItemBase';
import ListItemBaseSection from '../ListItemBaseSection';
import Text from '../Text';
import Icon from '../Icon';

//TODO: support 2-line labels for right/position-end section.
/**
 * The SpaceListItem component.
 */
const SpaceListItem: FC<Props> = forwardRef(
  (props: Props, providedRef: RefObject<HTMLLIElement>) => {
    const {
      className,
      id,
      style,
      avatar,
      firstLine,
      secondLine,
      isNewActivity,
      isUnread,
      teamColor = DEFAULTS.TEAM_COLOR,
      isMention,
      isEnterRoom,
      isAlert,
      isAlertMuted,
      isError,
      action,
      isSelected,
      isCompact = false,
      itemIndex,
      ...rest
    } = props;

    const renderText = () => {
      const _secondLineArray: string[] = typeof secondLine === 'string' ? [secondLine] : secondLine;

      if (secondLine) {
        return (
          <>
            <Text type="body-primary" data-test="list-item-first-line">
              {firstLine}
            </Text>
            {/* //TODO: change with dot divider when available */}
            {isCompact && <span className={STYLE.dotDivider}> - </span>}
            <Text
              style={{ color: `var(--theme-text-team-${teamColor}-normal)` }}
              type="body-secondary"
              data-test="list-item-second-line"
            >
              {/* //TODO: change with dot divider when available */}
              {_secondLineArray.join(' - ')}
            </Text>
          </>
        );
      } else {
        return (
          <Text data-test="list-item-first-line" type="body-primary">
            {firstLine}
          </Text>
        );
      }
    };

    const renderRightSection = () => {
      const iconProps = {
        weight: 'bold' as const,
        scale: 14 as const,
        strokeColor: 'none',
      };
      if (isMention) {
        return <Icon fillColor={'var(--listitem-tick)'} name="mention" {...iconProps} />;
      } else if (isEnterRoom) {
        return <Icon fillColor={'var(--listitem-tick)'} name="enter-room" {...iconProps} />;
      } else if (isAlertMuted) {
        return <Icon fillColor={'var(--listitem-icon)'} name="alert-muted" {...iconProps} />;
      } else if (isAlert) {
        return <Icon fillColor={'var(--listitem-icon)'} name="alert" {...iconProps} />;
      } else if (isError) {
        return (
          <Icon
            fillColor={'var(--label-error-text)'}
            name="priority-circle"
            {...iconProps}
            weight="filled"
          />
        );
      } else if (isUnread) {
        return <Icon name="unread" fillColor={'var(--listitem-tick)'} {...iconProps} />;
      } else if (action) {
        return <>{action}</>;
      } else return null;
    };

    const internalRef = useRef();
    const ref = providedRef || internalRef;

    return (
      <ListItemBase
        ref={ref}
        size={isCompact ? 32 : 50}
        shape="isPilled"
        className={classnames(className, {
          [STYLE.isNewActivity]: isNewActivity || isMention || isEnterRoom || isUnread,
        })}
        id={id}
        style={style}
        {...rest}
        isSelected={isSelected}
        itemIndex={itemIndex}
      >
        <ListItemBaseSection position="start">{avatar}</ListItemBaseSection>
        <ListItemBaseSection
          position="middle"
          className={classnames(STYLE.textWrapper, isCompact ? 'text-row' : 'text-column')}
        >
          {renderText()}
        </ListItemBaseSection>
        <ListItemBaseSection position="end">{renderRightSection()}</ListItemBaseSection>
      </ListItemBase>
    );
  }
);

SpaceListItem.displayName = 'SpaceListItem';

export default SpaceListItem;
