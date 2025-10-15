import { useState, useEffect } from "react";
import styled from "styled-components";

const ScrollButton = styled.button<{ $visible: boolean }>`
  position: fixed;
  bottom: 40px;
  right: 40px;
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 50%;
  background-color: #007bff;
  color: white;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateY(${({ $visible }) => ($visible ? "0" : "20px")});
  transition: opacity 0.3s ease, transform 0.3s ease;
  z-index: 9999;
  pointer-events: ${({ $visible }) => ($visible ? "auto" : "none")};

  @media (max-width: 768px) {
    bottom: 20px;
    right: 20px;
  }
`;

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setVisible(scrollTop > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <ScrollButton $visible={visible} onClick={handleClick}>
      ↑
    </ScrollButton>
  );
}
