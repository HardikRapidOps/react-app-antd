import { useMemo, useState } from "react";
import { Anchor, Card, Col, Modal, Row } from "antd";
import { categories } from "../../shared/categoriesData";

const { Meta } = Card;

export const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const menuItems = useMemo(() => {
    return categories.map(({ name }) => {
      return {
        key: name,
        href: `#${name}`,
        title: name,
      };
    });
  }, []);

  const showProducts = (subcategory) => {
    setIsModalOpen(true);
    setSelectedSubcategory(subcategory);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Row>
      <Col span={16}>
        {categories.map((category, index) => {
          return (
            <div id={category.name} key={index}>
              <h2>{category.name}</h2>
              <Row gutter={16}>
                {category.subcategories.map((subcategory, index) => {
                  return (
                    <Col span={8} style={{ textAlign: "center" }} key={index}>
                      <Card
                        hoverable
                        cover={<img alt="example" src={subcategory.imageUrl} />}
                        onClick={() => showProducts(subcategory)}
                      >
                        <Meta title={subcategory.name} />
                        {subcategory.products?.[0]?.name}
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            </div>
          );
        })}
      </Col>
      <Col span={8}>
        <Anchor items={menuItems} />
      </Col>
      <Modal
        title={selectedSubcategory?.name}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={"50%"}
      >
        <Row gutter={16}>
          {selectedSubcategory?.products?.map((product, index) => {
            return (
              <Col span={8} style={{ textAlign: "center" }} key={index}>
                <Card
                  hoverable
                  cover={
                    <img alt="example" src={selectedSubcategory.imageUrl} />
                  }
                >
                  {product.name}
                </Card>
              </Col>
            );
          })}
        </Row>
      </Modal>
    </Row>
  );
};
