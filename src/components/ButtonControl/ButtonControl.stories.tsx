import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';
import AriaButtonDocs from '../../storybook/docs.stories.aria-button.mdx';

import ButtonControl, { ButtonControlProps, BUTTON_CONTROL_CONSTANTS as CONSTANTS } from './';
import argTypes from './ButtonControl.stories.args';
import Documentation from './ButtonControl.stories.docs.mdx';

export default {
  title: 'Momentum UI/ButtonControl',
  component: ButtonControl,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs, AriaButtonDocs),
    },
  },
};

const Example = Template<ButtonControlProps>(ButtonControl).bind({});

Example.argTypes = { ...argTypes };

Example.args = {
  control: CONSTANTS.CONTROLS.CLOSE,
};

const Common = MultiTemplate<ButtonControlProps>(ButtonControl).bind({});

Common.argTypes = { ...argTypes };
delete Common.argTypes.children;

Common.parameters = {
  variants: [...Object.values(CONSTANTS.CONTROLS).map((control) => ({ control }))],
};

export { Example, Common };
