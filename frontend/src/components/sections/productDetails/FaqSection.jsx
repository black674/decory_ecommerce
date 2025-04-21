import React, { useState } from "react";
import { Box, Flex, Text } from "@radix-ui/themes";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <Box className="border-b border-gray-200 py-4" onClick={onClick}>
      <Flex justify="between" align="center" className="cursor-pointer">
        <Text className="font-medium lg:text-lg">{question}</Text>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </Flex>
      {isOpen && (
        <Box className="mt-2 text-gray-600 lg:text-base">{answer}</Box>
      )}
    </Box>
  );
};

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "What materials are used in this product?",
      answer:
        "This product is crafted from high-quality, sustainable materials including premium hardwood, eco-friendly fabrics, and non-toxic finishes. All materials are sourced responsibly to ensure both durability and environmental sustainability.",
    },
    {
      question: "How do I clean and maintain this product?",
      answer:
        "For regular cleaning, use a soft, dry cloth to remove dust. For deeper cleaning, use a slightly damp cloth with mild soap. Avoid harsh chemicals or abrasive cleaners as they may damage the finish. We recommend periodic polishing for wooden components to maintain their luster.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy for all products in their original condition. If you're not completely satisfied, you can return the item for a full refund or exchange. Please note that custom orders may have different return terms.",
    },
    {
      question: "Do you offer warranty coverage?",
      answer:
        "Yes, all our products come with a 1-year warranty against manufacturing defects. Some premium items have extended warranty options available at purchase. The warranty covers structural integrity and craftsmanship but does not cover normal wear and tear.",
    },
    {
      question: "What are the shipping options and delivery times?",
      answer:
        "We offer standard shipping (5-7 business days), express shipping (2-3 business days), and premium next-day delivery options. Shipping times may vary based on your location and product availability. You'll receive tracking information once your order ships.",
    },
  ];

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Box className="py-6 lg:py-12">
      <Text size="5" className="font-medium mb-6">
        Frequently Asked Questions
      </Text>
      <Box className="space-y-1">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === index}
            onClick={() => handleToggle(index)}
          />
        ))}
      </Box>
    </Box>
  );
}
