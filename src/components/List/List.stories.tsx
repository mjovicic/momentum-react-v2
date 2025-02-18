/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React from 'react';
import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import List, { ListProps } from './';
import argTypes from './List.stories.args';
import Documentation from './List.stories.docs.mdx';
import ListItemBase from '../ListItemBase';
import SpaceListItem from '../SpaceListItem';
import { PresenceType } from '../Avatar/Avatar.types';
import { TEAM_COLORS } from '../ThemeProvider/ThemeProvider.constants';
import { TeamColor } from '../ThemeProvider/ThemeProvider.types';
import Avatar from '../Avatar';
import Flex from '../Flex';
import Icon from '../Icon';
import ButtonPill from '../ButtonPill';
import Text from '../Text';
import { action } from '@storybook/addon-actions';
import MeetingListItem from '../MeetingListItem';
import { MeetingMarker } from '../MeetingListItem/MeetingListItem.types';
import ButtonGroup from '../ButtonGroup';
import ButtonHyperlink from '../ButtonHyperlink';

const TEST_LIST_SIZE = 30;

export default {
  title: 'Momentum UI/List',
  component: List,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
      source: { type: 'code' },
    },
  },
};

const Example = Template<ListProps>(List).bind({});

Example.argTypes = { ...argTypes };

Example.args = {
  listSize: TEST_LIST_SIZE,
  children: Array.from(Array(TEST_LIST_SIZE).keys()).map((index) => (
    <ListItemBase itemIndex={index} key={index} isPadded>
      {`Item ${index}`}
    </ListItemBase>
  )),
};

const Common = MultiTemplate<ListProps>(List).bind({});

Common.argTypes = { ...argTypes };
delete Common.argTypes.children;

Common.args = {
  listSize: TEST_LIST_SIZE,
  shouldItemFocusBeInset: true,
  shouldFocusOnPress: true,
};

Common.parameters = {
  variants: [
    {
      children: (
        <div>
          {Array.from(Array(TEST_LIST_SIZE).keys()).map((index) => {
            return (
              <SpaceListItem
                contextMenuActions={[
                  { text: 'Action 1', action: action('Action') },
                  { text: 'Action 2', action: action('Action 2') },
                ]}
                key={index}
                itemIndex={index}
                firstLine={`Daniel Webex - ${index}`}
                teamColor="gold"
                onPress={action(`List Item Press ${index}`)}
                avatar={
                  <Avatar
                    title="D"
                    presence={PresenceType.Meet}
                    size={32}
                    color={TEAM_COLORS.gold as TeamColor}
                  />
                }
                action={
                  <Flex alignItems="center" xgap="0.5rem">
                    <Flex alignItems="center" xgap="0.125rem">
                      <Text type="body-secondary">23</Text>
                      <Icon name="participant-list" weight="bold" strokeColor="none" scale={16} />
                    </Flex>
                    <ButtonPill color="join" size={28}>
                      00:00
                    </ButtonPill>
                    <ButtonPill color="join" size={28}>
                      Button 2
                    </ButtonPill>
                    <ButtonPill disabled color="join" size={28}>
                      Button 3
                    </ButtonPill>
                  </Flex>
                }
              />
            );
          })}
        </div>
      ),
    },
  ],
};

const CalendarList = MultiTemplate<ListProps>(List).bind({});

CalendarList.argTypes = { ...argTypes };
delete CalendarList.argTypes.children;

CalendarList.args = {
  listSize: TEST_LIST_SIZE,
  shouldItemFocusBeInset: false,
  shouldFocusOnPress: true,
};

CalendarList.parameters = {
  variants: [
    {
      children: (
        <div>
          {Array.from(Array(TEST_LIST_SIZE).keys()).map((index) => {
            return (
              <>
                {(index % 3 === 0 || index % 7 == 0) && (
                  <ListItemBase isPadded interactive={false}>
                    <Text type="header-primary">This is a header</Text>
                  </ListItemBase>
                )}
                <MeetingListItem
                  key={index}
                  itemIndex={index}
                  image={<Avatar initials="TU" />}
                  color={MeetingMarker.AcceptedActive}
                  buttonGroup={
                    <ButtonGroup spaced>
                      <ButtonHyperlink>Link</ButtonHyperlink>
                    </ButtonGroup>
                  }
                >
                  <Text type="header-primary">This is a meeting</Text>
                  <Text type="body-secondary">10:00 - 11:00</Text>
                </MeetingListItem>
              </>
            );
          })}
        </div>
      ),
    },
  ],
};

export { Example, Common, CalendarList };
