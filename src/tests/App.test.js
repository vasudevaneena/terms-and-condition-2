import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { configure, shallow, mount } from "enzyme";
import App from "../App";

configure({ adapter: new Adapter() });

let wrapper;

beforeEach(() => {
  wrapper = shallow(<App />);
});

describe("App snapshot", () => {
  test("matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe("<App /> rendering", () => {
  it("should render one <section>", () => {
    expect(wrapper.find("section")).toHaveLength(1);
  });
  it("should render one <header>", () => {
    expect(wrapper.find("header")).toHaveLength(1);
  });

  it("should render one <form>", () => {
    expect(wrapper.find("form")).toHaveLength(1);
  });
  it("should render 3 <input>s", () => {
    expect(wrapper.find("input")).toHaveLength(3);
  });
  it("should render 1 <anchor>", () => {
    expect(wrapper.find("a")).toHaveLength(1);
  });
  it("should render 2 <label>s", () => {
    expect(wrapper.find("label")).toHaveLength(2);
  });
  it("should render 1 <button>", () => {
    expect(wrapper.find("button")).toHaveLength(1);
  });
  it("should render 1 <checkbox>s", () => {
    expect(wrapper.find('input[type="checkbox"]')).toHaveLength(1);
  });
});

describe("Form state", function() {
  it(" button is disabled initially", () => {
    expect(wrapper.state("disable")).toEqual(true);
  });
  it(" checkbox uncehcked initially", () => {
    expect(wrapper.state("checkbox")).toEqual(false);
  });

  it("click checkbox", () => {
    wrapper = shallow(<App />, { attachTo: document.body });
    wrapper.find("#checkbox").simulate("change", { target: { checked: true } });
    expect(wrapper.state("checkbox")).toEqual(true);
    expect(wrapper.state("disable")).toEqual(false);
  });
});
