import { CaretRightOutlined, MinusOutlined } from "@ant-design/icons";
import "./experience.css";
const Experience = () => {
  return (
    <div className="container__experience">
      <div className="container__experience-title">KINH NGHIỆM LÀM VIỆC</div>
      <div className="container__experience-listproject">
        <div className="container__experience-itemproject">
          <div className="container__experience-project-top">
            <div className="container__experience-project-detail">
              <CaretRightOutlined className="container__experience-icon" />
              <div className="container__skill-name">Web bán quần áo</div>
            </div>
            <div className="container__experience-year">
              <p>2022</p>
              <p className="container__experience-line"></p>
              <p>Apple Inc.</p>
            </div>
          </div>
          <div className="container__experience-project">
            <MinusOutlined className="container__experience-minus-icon" />

            <p className="container__experience-project-title">
              Chuyên ngành: Lập trình Website
            </p>
          </div>
          <div className="container__experience-project">
            <MinusOutlined className="container__experience-detail-minus-icon" />

            <p className="container__experience-project-title">
              Chuyên ngành: Lập trình Website
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
