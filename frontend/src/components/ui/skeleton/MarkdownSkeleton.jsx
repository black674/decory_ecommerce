import React from "react";
import Section from "@/components/ui/section/Section";

export default function MarkdownSkeleton() {
  return (
    <Section className="py-12 min-h-[90vh] lg:min-h-[95vh]">
      <div className="animate-pulse space-y-6">
        {/* Heading skeleton */}
        <div className="h-9 bg-gray-200 rounded-md w-3/4 mb-6"></div>

        {/* Paragraph skeletons */}
        <div className="space-y-3">
          <div className="h-5 bg-gray-200 rounded-md w-full"></div>
          <div className="h-5 bg-gray-200 rounded-md w-full"></div>
          <div className="h-5 bg-gray-200 rounded-md w-5/6"></div>
        </div>

        {/* Subheading skeleton */}
        <div className="h-7 bg-gray-200 rounded-md w-2/3 mt-8 mb-4"></div>

        {/* More paragraph skeletons */}
        <div className="space-y-3">
          <div className="h-5 bg-gray-200 rounded-md w-full"></div>
          <div className="h-5 bg-gray-200 rounded-md w-full"></div>
          <div className="h-5 bg-gray-200 rounded-md w-4/5"></div>
        </div>

        {/* List skeleton */}
        <div className="pl-5 space-y-2 mt-4">
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full bg-gray-300 mr-3"></div>
            <div className="h-5 bg-gray-200 rounded-md w-4/5"></div>
          </div>
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full bg-gray-300 mr-3"></div>
            <div className="h-5 bg-gray-200 rounded-md w-3/4"></div>
          </div>
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full bg-gray-300 mr-3"></div>
            <div className="h-5 bg-gray-200 rounded-md w-5/6"></div>
          </div>
        </div>

        {/* Blockquote skeleton */}
        <div className="pl-4 border-l-4 border-gray-300 my-6">
          <div className="h-5 bg-gray-200 rounded-md w-full"></div>
          <div className="h-5 bg-gray-200 rounded-md w-4/5 mt-2"></div>
        </div>

        {/* Code block skeleton */}
        <div className="bg-gray-200 p-4 rounded-md w-full h-24 mt-6"></div>

        {/* Additional paragraph skeletons for more height */}
        <div className="space-y-3 mt-8">
          <div className="h-5 bg-gray-200 rounded-md w-full"></div>
          <div className="h-5 bg-gray-200 rounded-md w-full"></div>
          <div className="h-5 bg-gray-200 rounded-md w-5/6"></div>
        </div>

        {/* Additional list skeleton */}
        <div className="pl-5 space-y-2 mt-6">
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full bg-gray-300 mr-3"></div>
            <div className="h-5 bg-gray-200 rounded-md w-4/5"></div>
          </div>
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full bg-gray-300 mr-3"></div>
            <div className="h-5 bg-gray-200 rounded-md w-3/4"></div>
          </div>
        </div>
      </div>
    </Section>
  );
}
