import React, { useState } from "react";
import { Box, Flex, Text } from "@radix-ui/themes";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Section from "@/components/ui/section/Section";

const InfoItem = ({ title, content, isOpen, onClick }) => {
  return (
    <Box className="border-b border-gray-200 py-4" onClick={onClick}>
      <Flex justify="between" align="center" className="cursor-pointer">
        <Text className="font-medium lg:text-lg">{title}</Text>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </Flex>
      {isOpen && (
        <Box className="mt-2 text-gray-600 lg:text-base">{content}</Box>
      )}
    </Box>
  );
};

export default function AdditionalInfoSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const additionalInfo = [
    {
      title: "Product Specifications",
      content: (
        <Box className="space-y-2">
          <Text as="p">• Dimensions: W80 × D80 × H74 cm</Text>
          <Text as="p">• Weight: 12 kg</Text>
          <Text as="p">• Material: Solid oak wood, premium fabric</Text>
          <Text as="p">• Assembly: Partial assembly required</Text>
          <Text as="p">• Country of Origin: Made in Sweden</Text>
        </Box>
      ),
    },
    {
      title: "Shipping & Delivery",
      content: (
        <Box className="space-y-2">
          <Text as="p">• Free standard shipping on orders over $50</Text>
          <Text as="p">• Express delivery available for additional fee</Text>
          <Text as="p">• Delivery time: 3-5 business days (standard)</Text>
          <Text as="p">• Tracking information provided via email</Text>
          <Text as="p">• Curbside delivery for larger items</Text>
        </Box>
      ),
    },
    {
      title: "Care Instructions",
      content: (
        <Box className="space-y-2">
          <Text as="p">• Clean with a soft, dry cloth</Text>
          <Text as="p">• Avoid direct sunlight for prolonged periods</Text>
          <Text as="p">• Keep away from heat sources</Text>
          <Text as="p">
            • For wooden parts: apply furniture polish every 3-6 months
          </Text>
          <Text as="p">• For fabric: spot clean with mild detergent</Text>
        </Box>
      ),
    },
    {
      title: "Warranty Information",
      content: (
        <Box className="space-y-2">
          <Text as="p">• 2-year limited warranty</Text>
          <Text as="p">• Covers manufacturing defects</Text>
          <Text as="p">• Does not cover normal wear and tear</Text>
          <Text as="p">• Extended warranty options available</Text>
          <Text as="p">• Contact customer service for warranty claims</Text>
        </Box>
      ),
    },
    {
      title: "Returns & Exchanges",
      content: (
        <Box className="space-y-2">
          <Text as="p">• 30-day return policy</Text>
          <Text as="p">• Item must be in original condition</Text>
          <Text as="p">• Return shipping fee may apply</Text>
          <Text as="p">• Exchanges processed within 5-7 business days</Text>
          <Text as="p">• See our full return policy for details</Text>
        </Box>
      ),
    },
  ];

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Section>
      <Box className="py-6 lg:py-12">
        <Text size="5" className="font-medium mb-6">
          Additional Product Information
        </Text>
        <Box className="space-y-1">
          {additionalInfo.map((info, index) => (
            <InfoItem
              key={index}
              title={info.title}
              content={info.content}
              isOpen={openIndex === index}
              onClick={() => handleToggle(index)}
            />
          ))}
        </Box>
      </Box>
    </Section>
  );
}
