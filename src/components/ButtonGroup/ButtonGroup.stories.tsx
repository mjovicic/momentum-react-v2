import React from 'react';

import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import ButtonPill from '../ButtonPill';
import ButtonCircle from '../ButtonCircle';
import Icon from '../Icon';

import ButtonGroup, { ButtonGroupProps } from './';
import argTypes from './ButtonGroup.stories.args';
import Documentation from './ButtonGroup.stories.docs.mdx';

export default {
  title: 'Momentum UI/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
  subComponents: { ButtonPill },
};

const commonChildren = [
  <ButtonPill key="0">Example</ButtonPill>,
  <ButtonCircle key="1">
    <Icon name="redo" autoScale={150} />
  </ButtonCircle>,
  <ButtonCircle key="2">
    <Icon name="cancel" autoScale={150} />
  </ButtonCircle>,
];

const Example = Template<ButtonGroupProps>(ButtonGroup).bind({});

Example.args = {
  children: [...commonChildren],
};

Example.argTypes = { ...argTypes };

const Rounding = MultiTemplate<ButtonGroupProps>(ButtonGroup).bind({});

Rounding.args = {
  children: [...commonChildren],
};

Rounding.parameters = {
  variants: [{}, { round: true }],
};

Rounding.argTypes = { ...argTypes };
delete Rounding.argTypes.round;

const Spacing = MultiTemplate<ButtonGroupProps>(ButtonGroup).bind({});

Spacing.args = {
  children: [...commonChildren],
};

Spacing.parameters = {
  variants: [{}, { spaced: true }],
};

Spacing.argTypes = { ...argTypes };
delete Spacing.argTypes.spaced;

const Common = MultiTemplate<ButtonGroupProps>(ButtonGroup).bind({});

Common.argTypes = { ...argTypes };
delete Common.argTypes.children;
delete Common.argTypes.separation;
delete Common.argTypes.spaced;
delete Common.argTypes.round;

Common.parameters = {
  variants: [
    {
      children: [
        <ButtonPill key="0">Example</ButtonPill>,
        <ButtonCircle key="1">
          <Icon name="redo" autoScale={150} />
        </ButtonCircle>,
        <ButtonCircle key="2">
          <Icon name="cancel" autoScale={150} />
        </ButtonCircle>,
      ],
      round: true,
    },
    {
      children: [
        <ButtonPill color="message" key="0">
          Message
        </ButtonPill>,
        <ButtonCircle color="message" key="1">
          <Icon name="send" autoScale={150} />
        </ButtonCircle>,
      ],
      round: true,
    },
    {
      children: [
        <ButtonPill color="join" key="0">
          Join
        </ButtonPill>,
        <ButtonCircle color="join" key="1">
          <Icon name="enter-room" autoScale={150} />
        </ButtonCircle>,
      ],
      round: true,
    },
    {
      children: [
        <ButtonPill color="cancel" key="0">
          Cancel
        </ButtonPill>,
        <ButtonCircle color="cancel" key="1">
          <Icon name="cancel" autoScale={150} />
        </ButtonCircle>,
      ],
      round: true,
    },
    {
      children: [
        <ButtonCircle key="0" ghost size={64}>
          <Icon name="exit-room" autoScale={150} />
        </ButtonCircle>,
        <ButtonCircle key="1" ghost size={64}>
          <Icon name="location" autoScale={150} />
        </ButtonCircle>,
        <ButtonCircle key="2" ghost size={64}>
          <Icon name="room-calendar" autoScale={150} />
        </ButtonCircle>,
        <ButtonCircle key="3" ghost size={64}>
          <Icon name="assign-host" autoScale={150} />
        </ButtonCircle>,
        <ButtonCircle key="4" ghost size={64}>
          <Icon name="settings" autoScale={150} />
        </ButtonCircle>,
      ],
      round: true,
      spaced: true,
      style: {
        backgroundColor: 'IndianRed',
      },
    },
    {
      children: [
        <ButtonCircle key="0" ghost size={32}>
          <Icon name="camera-presence" autoScale={150} />
        </ButtonCircle>,
        <ButtonCircle key="1" ghost size={32}>
          <Icon name="quiet-hours-presence" autoScale={150} />
        </ButtonCircle>,
        <ButtonCircle key="2" ghost size={32}>
          <Icon name="handset" autoScale={150} />
        </ButtonCircle>,
        <ButtonCircle key="3" ghost size={32}>
          <Icon name="meetings-presence" autoScale={150} />
        </ButtonCircle>,
        <ButtonCircle key="4" ghost size={32}>
          <Icon name="pto-presence" autoScale={150} />
        </ButtonCircle>,
      ],
      round: true,
      spaced: true,
      style: {
        backgroundColor: 'Chocolate',
      },
    },
  ],
};

export { Example, Rounding, Spacing, Common };
