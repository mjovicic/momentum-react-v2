import React from 'react';
import { mount } from 'enzyme';

import ModalContainer, { MODAL_CONTAINER_CONSTANTS as CONSTANTS } from './';

describe('<ModalContainer />', () => {
  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      const container = mount(<ModalContainer />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', () => {
      expect.assertions(1);

      const className = 'example-class';

      const container = mount(<ModalContainer className={className} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', () => {
      expect.assertions(1);

      const id = 'example-id';

      const container = mount(<ModalContainer id={id} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const container = mount(<ModalContainer style={style} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with color', () => {
      expect.assertions(1);

      const color = Object.values(CONSTANTS.COLORS).pop();

      const container = mount(<ModalContainer color={color} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with elevation', () => {
      expect.assertions(1);

      const elevation = Object.values(CONSTANTS.ELEVATIONS).pop();

      const container = mount(<ModalContainer elevation={elevation} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with isPadded', () => {
      expect.assertions(1);

      const container = mount(<ModalContainer isPadded />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with radius', () => {
      expect.assertions(1);

      const round = Object.values(CONSTANTS.ROUNDS).pop();

      const container = mount(<ModalContainer round={round} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with arrow', () => {
      expect.assertions(1);

      const arrow = Object.values(CONSTANTS.ARROWS).pop();

      const container = mount(<ModalContainer arrow={arrow} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with children', () => {
      expect.assertions(1);

      const children = <div>Example Text</div>;

      const container = mount(<ModalContainer>{children}</ModalContainer>);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its wrapper class', () => {
      expect.assertions(1);

      const element = mount(<ModalContainer />)
        .find(ModalContainer)
        .getDOMNode();

      expect(element.classList.contains(CONSTANTS.STYLE.wrapper)).toBe(true);
    });

    it('should have provided class when className is provided', () => {
      expect.assertions(1);

      const className = 'example-class';

      const element = mount(<ModalContainer className={className} />)
        .find(ModalContainer)
        .getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', () => {
      expect.assertions(1);

      const id = 'example-id';

      const element = mount(<ModalContainer id={id} />)
        .find(ModalContainer)
        .getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const element = mount(<ModalContainer style={style} />)
        .find(ModalContainer)
        .getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });

    it('should have provided data-color when color is provided', () => {
      expect.assertions(1);

      const color = Object.values(CONSTANTS.COLORS).pop();

      const element = mount(<ModalContainer color={color} />)
        .find(ModalContainer)
        .getDOMNode()
        .getElementsByTagName('div')[0];

      expect(element.getAttribute('data-color')).toBe(color);
    });

    it('should have provided data-elevation when elevation is provided', () => {
      expect.assertions(1);

      const elevation = Object.values(CONSTANTS.ELEVATIONS).pop();

      const element = mount(<ModalContainer elevation={elevation} />)
        .find(ModalContainer)
        .getDOMNode()
        .getElementsByTagName('div')[0];

      expect(element.getAttribute('data-elevation')).toBe(`${elevation}`);
    });

    it('should have provided data-padded when isPadded is provided', () => {
      expect.assertions(1);

      const isPadded = true;

      const element = mount(<ModalContainer isPadded={isPadded} />)
        .find(ModalContainer)
        .getDOMNode()
        .getElementsByTagName('div')[0];

      expect(element.getAttribute('data-padded')).toBe(`${isPadded}`);
    });

    it('should have provided data-round when round is provided', () => {
      expect.assertions(1);

      const round = Object.values(CONSTANTS.ROUNDS).pop();

      const element = mount(<ModalContainer round={round} />)
        .find(ModalContainer)
        .getDOMNode()
        .getElementsByTagName('div')[0];

      expect(element.getAttribute('data-round')).toBe(`${round}`);
    });

    it('should have provided data-arrow when arrow is provided', () => {
      expect.assertions(1);

      const arrow = Object.values(CONSTANTS.ARROWS).pop();

      const element = mount(<ModalContainer arrow={arrow} />)
        .find(ModalContainer)
        .getDOMNode();

      expect(element.getAttribute('data-arrow')).toBe(arrow);
    });

    it('should have provided data-horizontal-arrow when a horizontal arrow is provided', () => {
      expect.assertions(1);

      const arrow = CONSTANTS.ARROWS.LEFT;

      const element = mount(<ModalContainer arrow={arrow} />)
        .find(ModalContainer)
        .getDOMNode()
        .getElementsByTagName('div')[0];

      expect(element.getAttribute('data-horizontal-arrow')).toBe('true');
    });

    it('should have provided data-vertical-arrow when a vertical arrow is provided', () => {
      expect.assertions(1);

      const arrow = CONSTANTS.ARROWS.TOP;

      const element = mount(<ModalContainer arrow={arrow} />)
        .find(ModalContainer)
        .getDOMNode()
        .getElementsByTagName('div')[0];

      expect(element.getAttribute('data-vertical-arrow')).toBe('true');
    });
  });
});
