import React from 'react';
import PropTypes from 'prop-types';
import ChildResolver from 'react-child-resolver';

// TODO: use child resolver
const Tabs = ({ children = [], ...restProps }) => {
  const { activeIndex = 0 } = restProps;
  let currentStep = children[activeIndex];
  if (!Array.isArray(children)) {
    currentStep = children;
  }
  if (currentStep) {
    return (
      <ChildResolver {...restProps}>
        {currentStep}
      </ChildResolver>
    );
    // return React.cloneElement(currentStep, restProps);
  }
  return null;
};

Tabs.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
    PropTypes.func,
  ]),
};

export default Tabs;
