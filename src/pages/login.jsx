import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import Title from "antd/es/typography/Title";
import { Link } from "react-router-dom";
const LoginPage = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("value", values);
  };

  return (
    <Row justify={"center"} style={{ marginTop: "100px" }}>
      <Col xs={24} md={8}>
        <fieldset
          style={{
            padding: "15px",
            margin: "5px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          <legend>Đăng nhập</legend>
          <Form name="basic" form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              sm={24}
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Email không được để trống",
                },
                {
                  type: "email",
                  message: "Email không đúng định dạng",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Mật khẩu không được để trống",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Form.Item>
                <Button type="primary" onClick={() => form.submit()}>
                  Login
                </Button>
              </Form.Item>
              <div style={{ marginTop: "4px" }}>
                <Link to="/">
                  Go to homepage <ArrowRightOutlined />
                </Link>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <Divider />
              <div
                style={{
                  marginTop: "10px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <p>
                  Chưa có tài khoản tại đây?
                  <Link to="/register"> Đăng ký ngay</Link>
                </p>
              </div>
            </div>
          </Form>
        </fieldset>
      </Col>
    </Row>
  );
};

export default LoginPage;
