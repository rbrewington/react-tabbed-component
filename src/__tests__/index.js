/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import ChildResolver from 'react-child-resolver';
import Tabs from '../Tabs';
import RenderActiveTab from '../RenderActiveTab';

describe('<Tabs />', () => {
  const ChildZero = () => <div />;
  const ChildOne = () => <span />;

  it('should render null if no children are supplied', () => {
    const wrapper = shallow(<Tabs activeIndex={1} />);
    expect(wrapper.type()).toBe(null);
  });
  it('should render a childResolver.', () => {
    const wrapper = shallow(
      <Tabs>
        <ChildZero />
      </Tabs>
    );
    expect(wrapper.type()).toBe(ChildResolver);
  });
  it('should render the first child if no index is provided', () => {
    const wrapper = shallow(
      <Tabs>
        <ChildZero />
        <ChildOne />
      </Tabs>
    );

    expect(wrapper.props().children).toEqual(<ChildZero />);
  });
  it('should render the child that corresponds to the given activeIndex', () => {
    const wrapper = shallow(
      <Tabs activeIndex={1}>
        <ChildZero />
        <ChildOne />
      </Tabs>
    );

    expect(wrapper.props().children).toEqual(<ChildOne />);
  });
});

describe('<RenderActiveTab />', () => {
  // eslint-disable-next-line no-console
  const consoleWarn = console.warn;

  it('should warn if there is no component for the active tab.', () => {
    /* eslint-disable no-console */
    console.warn = jest.fn();
    // eslint-disable-next-line react/prop-types
    const Tab = ({ title }) => <div>{title}</div>;
    const tabs = [{ title: 'Tab One', component: 'Tab' }, { title: 'Tab Two' }];
    shallow(<RenderActiveTab currentTab={tabs[1]} components={{ Tab }} />);
    expect(console.warn).toBeCalled();
    console.warn = consoleWarn;
    /* eslint-enable no-console */
  });
  it('should warn if the component of the active tab is not in the list of components', () => {
    /* eslint-disable no-console */
    console.warn = jest.fn();
    // eslint-disable-next-line react/prop-types
    const Tab = ({ title }) => <div>{title}</div>;
    const tabs = [
      { title: 'Tab One', component: 'Tab' },
      { title: 'Tab Two', component: 'Tab2' },
    ];
    shallow(<RenderActiveTab currentTab={tabs[1]} components={{ Tab }} />);
    expect(console.warn).toBeCalled();
    console.warn = consoleWarn;
    /* eslint-enable no-console */
  });
  it('should render the component of the active tab.', () => {
    // eslint-disable-next-line react/prop-types
    const Tab = ({ title }) => <div>{title}</div>;
    // eslint-disable-next-line react/prop-types
    const Tab2 = ({ title }) => <span>{title}</span>;
    const tabs = [
      { title: 'Tab One', component: 'Tab' },
      { title: 'Tab Two', component: 'Tab2' },
    ];
    const wrapper = shallow(
      <RenderActiveTab currentTab={tabs[1]} components={{ Tab, Tab2 }} />
    );
    expect(wrapper.type()).toBe(Tab2);
  });
  it('should pass all tab properties except component to the active tab.', () => {
    // eslint-disable-next-line react/prop-types
    const Tab = ({ title }) => <div>{title}</div>;
    const tabOneProps = {
      title: 'Tab One',
      subtitle: 'first tab',
      color: 'red',
    };
    const tabs = [
      { key: 'tab-one', component: 'Tab', ...tabOneProps },
      {
        key: 'tab-two',
        title: 'Tab Two',
        component: 'Tab',
        subtitle: 'second tab',
        color: 'blue',
      },
    ];
    const wrapper = shallow(
      <RenderActiveTab currentTab={tabs[0]} components={{ Tab }} />
    );
    expect(wrapper.props()).toEqual(expect.objectContaining(tabOneProps));
  });
  it('should pass tab properties and render active tab properties unused props to tab.', () => {
    // eslint-disable-next-line react/prop-types
    const Tab = ({ title }) => <div>{title}</div>;
    const wrapper = shallow(
      <RenderActiveTab
        currentTab={{ title: 'tab one', component: 'Tab' }}
        components={{ Tab }}
        extraProp="extra"
      />
    );
    expect(wrapper.props()).toEqual(
      expect.objectContaining({
        title: 'tab one',
        extraProp: 'extra',
      })
    );
    expect(wrapper.props().component).not.toBeDefined;
  });
  it('should call render function with props if exists.', () => {
    const mockRenderFunction = jest.fn(({ title }) => <div>{title}</div>);
    shallow(
      <RenderActiveTab
        currentTab={{
          title: 'render function tab',
          render: mockRenderFunction,
        }}
        extraProp="extra"
      />
    );
    expect(mockRenderFunction).toBeCalled;
    expect(mockRenderFunction).lastCalledWith({
      title: 'render function tab',
      extraProp: 'extra',
    });
  });
  it('should warn if render is provided but it is not a function.', () => {
    /* eslint-disable no-console */
    console.warn = jest.fn();

    const wrapper = shallow(
      <RenderActiveTab
        currentTab={{
          title: 'render function tab',
          render: 'bad render',
        }}
      />
    );

    expect(console.warn).toBeCalled;
    expect(wrapper.type()).toBe(null);

    console.warn = consoleWarn;
    /* eslint-enable no-console */
  });
});

describe('<TabbedComponent />', () => {});
