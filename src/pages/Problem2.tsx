import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: blue;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Problem2 = () => {
  const [tokens, setTokens] = useState<
    { value: string; label: string; image: string; price: number }[]
  >([]);
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [amount, setAmount] = useState("");

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

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("fromCurrency", fromCurrency);
    console.log("toCurrency", toCurrency);

    alert(`Swapped ${amount} ${fromCurrency} to ${toCurrency}`);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Select
        options={tokens}
        onChange={(option) => option?.value && setFromCurrency(option.value)}
        placeholder="Select from currency"
      />
      <Select
        options={tokens}
        onChange={(option) => option?.value && setToCurrency(option.value)}
        placeholder="Select to currency"
      />
      <Input
        type="number"
        value={amount}
        onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
          setAmount(e.target.value)
        }
        placeholder="Amount"
      />
      <Button type="submit">Swap</Button>
    </Form>
  );
};

export default Problem2;
