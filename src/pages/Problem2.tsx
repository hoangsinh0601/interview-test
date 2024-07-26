import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form, Image, Input, Modal, Select } from "antd";

const Problem2 = () => {
  const [tokens, setTokens] = useState<
    { value: string; label: string; image: string; price: number }[]
  >([]);
  const [isOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm();

  const fetchTokens = async () => {
    try {
      const pricesRes = await axios.get(
        "https://interview.switcheo.com/prices.json"
      );
      const prices = pricesRes.data;
      const tokensRes = await axios.get(
        "https://api.github.com/repos/Switcheo/token-icons/contents/tokens?ref=main"
      );

      const tokensData = tokensRes.data.filter((token: { name: string }) =>
        prices.some(
          (price: { currency: string }) =>
            price.currency === token.name.replace(".svg", "")
        )
      );

      setTokens(
        tokensData.map((token: { name: string; download_url: string }) => ({
          value: token.name.replace(".svg", ""),
          label: token.name.replace(".svg", ""),
          image: token.download_url,
          price: prices[token.name.replace(".svg", "")],
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTokens();
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = (values: {
    fromCurrency: string;
    toCurrency: string;
    amount: string;
  }) => {
    alert(
      `From: ${values.fromCurrency}, To: ${values.toCurrency}, Amount: ${values.amount}`
    );
    handleClose();
  };

  return (
    <div>
      <Button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Open
      </Button>

      {isOpen && (
        <Modal open={isOpen} onCancel={handleClose} onOk={() => form.submit()}>
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            <Form.Item
              label="From currency:"
              name={"fromCurrency"}
              rules={[
                {
                  required: true,
                  message: `Please select a currency`,
                },
              ]}
            >
              <Select key={"fromCurrency"}>
                {tokens?.map((option) => (
                  <Select.Option key={option.value} value={option.value}>
                    <div className="flex items-center">
                      <Image
                        src={option.image}
                        alt={option.label}
                        height={1}
                        width={1}
                      />
                      <div>{option.label}</div>
                    </div>
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="To currency:"
              name={"toCurrency"}
              rules={[
                {
                  required: true,
                  message: `Please select a currency`,
                },
              ]}
            >
              <Select key={"toCurrency"}>
                {tokens?.map((option) => (
                  <Select.Option key={option.value} value={option.value}>
                    <div className="flex items-center">
                      <Image
                        src={option.image}
                        alt={option.label}
                        height={1}
                        width={1}
                      />
                      <div>{option.label}</div>
                    </div>
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Amount:"
              name={"amount"}
              rules={[
                {
                  required: true,
                  message: `Please input amount`,
                },
              ]}
            >
              <Input key={"amount"} type="number" />
            </Form.Item>
          </Form>
        </Modal>
      )}
    </div>
  );
};

export default Problem2;
