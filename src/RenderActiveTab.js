import React from 'react';
import PropTypes from 'prop-types';

const RenderActive = ({ currentTab, components, ...restProps }) => {
  const { component, render, ...restTab } = currentTab || {};

  if (!component && !render) {
    // eslint-disable-next-line no-console
    console.warn(
      'Tabbed Component: Each tab object is expected to have a component property or render property.'
    );
    return null;
  }

  if (render) {
    if (typeof render !== 'function') {
      // eslint-disable-next-line no-console
      console.warn(
        `Tabbed Component: A tab's render property expects type of (function); got (${typeof render}).`
      );
      return null;
    }

    return render({ ...restTab, ...restProps });
  }

  const Component = components[component];

  if (!Component) {
    // eslint-disable-next-line no-console
    console.warn(
      `Tabbed Component: The component specified for ${currentTab.key} does not exist.`
    );
    return null;
  }

  return <Component {...restTab} {...restProps} />;
};

RenderActive.propTypes = {
  currentTab: PropTypes.shape({
    component: PropTypes.string,
    render: PropTypes.func,
  }),
  components: PropTypes.objectOf(PropTypes.element),
};

export default RenderActive;
