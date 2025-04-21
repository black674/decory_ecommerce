import Section from "@/components/ui/section/Section";
import { Box, Tabs } from "@radix-ui/themes";
import ReviewsSection from "./ReviewsSection";
import FaqSection from "./FaqSection";
import AdditionalInfoSection from "./AdditionalInfoSection";

export default function ActiveTab() {
  return (
    <Section>
      <Tabs.Root defaultValue="reviews">
        <Tabs.List color="gray" highContrast>
          <Tabs.Trigger value="additionalInfo" className="lg:!text-lg">
            Additional Info
          </Tabs.Trigger>
          <Tabs.Trigger value="Questions" className="lg:!text-lg">
            Questions
          </Tabs.Trigger>
          <Tabs.Trigger value="reviews" className="lg:!text-lg">
            Reviews
          </Tabs.Trigger>
        </Tabs.List>

        <Box pt="3">
          <Tabs.Content value="additionalInfo">
            <AdditionalInfoSection />
          </Tabs.Content>

          <Tabs.Content value="Questions">
            <FaqSection />
          </Tabs.Content>

          <Tabs.Content value="reviews">
            <ReviewsSection />
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </Section>
  );
}
