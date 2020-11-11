import React from 'react';
import { render } from '@testing-library/react';
import Card from './Card';

describe("Card component tests", function () {
  it("renders correctly", function () {
    const { container, debug } = render(
      <Card 
        caption="caption-test"
        src="src-test"
        currNum={2}
        totalNum={10} />
    );
  });
  it("matches snapshot", function () {
    const { container, debug } = render(
      <Card 
        caption="caption-test"
        src="src-test"
        currNum={2}
        totalNum={10} />
    );
    debug();
    expect(container).toMatchSnapshot();
  });
  it("has correct src and alt", function () {
    const { container } = render(
      <Card 
        caption="caption-test"
        src="src-test"
        currNum={2}
        totalNum={10} />
    );
    const img = container.querySelector(".Card-image")
    expect(img.getAttribute("src")).toEqual("src-test");
    expect(img.getAttribute("alt")).toEqual("caption-test");
  });
  it("displays count correctly", function () {
    const { container } = render(
      <Card 
        caption="caption-test"
        src="src-test"
        currNum={2}
        totalNum={10} />
    );
    const count = container.querySelector(".Card-small")
    expect(count).toContainHTML("2 of 10");
  });

});