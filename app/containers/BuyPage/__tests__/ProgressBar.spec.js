import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LinearProgress from '@material-ui/core/LinearProgress';
import { ProgressBar } from '../ProgressBar';

Enzyme.configure({ adapter: new Adapter() });

describe('containers/BuyPage/<ProgressBar />', () => {
  const classes = {
    linearprogress: 'fakeCssClass'
  };
  it('should render an null', () => {
    const renderedComponent = shallow(<ProgressBar />);
    expect(renderedComponent.type()).toEqual(null);
  });

  it('should render an LinearProgress component', () => {
    let renderedComponent = shallow(
      <ProgressBar balanceLoading classes={classes} />
    );
    expect(renderedComponent.type()).toEqual(LinearProgress);

    renderedComponent = shallow(<ProgressBar priceLoading classes={classes} />);
    expect(renderedComponent.type()).toEqual(LinearProgress);

    renderedComponent = shallow(
      <ProgressBar balanceLoading priceLoading classes={classes} />
    );
    expect(renderedComponent.type()).toEqual(LinearProgress);
  });
});
