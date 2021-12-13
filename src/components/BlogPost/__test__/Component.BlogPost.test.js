import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import { BlogPost } from "../BlogPost";
import Blog from "../../../lib/classes/Blog";

const __mock__ = {
  id: 53,
  h1: "Всем выйти из тени!",
  title: "Всем выйти из тени!",
  description: "Как купить подержанный автомобиль без скрученного пробега?",
  content_article: null,
  banner_url: "https://c.radikal.ru/c08/1904/18/fe4e6b48c7cf.jpg",
  enabled: true,
  previewText:
    "Продажа машины в современном мире — это уже давно рутина, бизнес. Вот только конкуренция в нём такая, что ради лишней копейки продавцы зачастую и пробег скрутят, и склеивают одно авто из трех.",
  createdAt: "2019-04-18",
  urn: "2019-04-18-autoteka",
  category: {
    id: 1,
    label: "Общее",
    urn: "common",
    postsCount: null,
  },
};
const post = new Blog(__mock__.id, __mock__);

describe("Components BlogPost", () => {
  const wrapper = shallow(<BlogPost post={post} />);
  it("Рендериться без сбоев", () => {
    let wrapperSnapshot = renderer.create(wrapper).toJSON();
    expect(wrapperSnapshot).toMatchSnapshot();
    wrapperSnapshot = renderer.create(wrapper).toJSON();
    expect(wrapperSnapshot).toMatchSnapshot();
  });

  describe("Метод Render", () => {
    it("Ссылка на страницу блога", () => {
      const node = wrapper.exists("a");
      expect(node).toEqual(true);
    });

    it("Содержит контейнер с картинкой", () => {
      expect(wrapper.find(".img")).toBeTruthy();
    });

    it("Заголовок статьи не пуст", () => {
      expect(wrapper.find(".content_title").text()).toHaveLength(19);
    });

    it("Содержит контейнер для вывода превью блога", () => {
      expect(wrapper.find(".content_text")).toBeTruthy();
    });

    it("Содержит подвал карточки блога", () => {
      expect(wrapper.find(".content_footer")).toBeTruthy();
    });
  });
});
