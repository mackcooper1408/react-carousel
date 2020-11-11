import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

const testCardData =
[
  {
    src: "image1",
    caption: "Photo by Richard Pasquarella on Unsplash"
  },
  {
    src: "image2",
    caption: "Photo by Pratik Patel on Unsplash"
  },
  {
    src: "image3",
    caption: "Photo by Josh Post on Unsplash"
  },
  {
    src: "image4",
    caption: "Photo by XYZ on Unsplash"
    
  }
]

describe("Carousel component test", function(){

  it("renders without crashing", function () {
    // this is a low-value test, but better than nothing
    render(<Carousel/>);
  });

  it("matches snapshot", function () {
    const { container } = render(<Carousel/>);
    expect(container).toMatchSnapshot();
  });


  it("works when you click on the right and left arrows", function() {
    const { queryByTestId, queryByAltText, debug } = render(<Carousel cardData={testCardData}/>);
    
    debug();
    
    // expect the first image to show, but not the second
    expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
    expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
  
    // move forward in the carousel
    const rightArrow = queryByTestId("right-arrow");
    fireEvent.click(rightArrow);
  
    // expect the second image to show, but not the first
    expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
    expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
  
    // move backward in the carousel
    const leftArrow = queryByTestId("left-arrow");
    fireEvent.click(leftArrow);
    
    // expect the first image to show, but not the second
    expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
    expect(queryByAltText("Photo by Josh Post on Unsplash")).not.toBeInTheDocument();
  });

  it("hides arrows on either end", function() {
    const { queryByTestId } = render(<Carousel cardData={testCardData}/>);
    
    // expect no left arrow
    const leftArrow = queryByTestId("left-arrow");
    expect(leftArrow).not.toBeInTheDocument();

    
    // click through all photos
    const rightArrow = queryByTestId("right-arrow");
    let i = 0;
    while (i < testCardData.length - 1) {
      fireEvent.click(rightArrow);
      i++;
    }
    expect(rightArrow).not.toBeInTheDocument();
  
  });
  
});