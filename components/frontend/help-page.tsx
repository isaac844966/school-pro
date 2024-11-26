import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MessageSquare,
  Mail,
  Phone,
  BookOpen,
  Users,
  MessageCircle,
} from "lucide-react";
import SectionHeader from "./SectionHeader";

export default function HelpCenter() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Header */}
      <SectionHeader
        heading="Help Center & Resources"
        description=" Find answers, learn best practices, and discover how to get the most
          out of our SocialPro! Browse through our help articles and FAQs to
          enhance your experience."
      />

      {/* Help Articles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 mt-8">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <BookOpen className="w-6 h-6 mb-4" />
            <h3 className="font-medium mb-2">Getting Started Guide</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Learn the basics of using our platform
            </p>
            <Button variant="outline" className="w-full">
              Read Guide
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <Users className="w-6 h-6 mb-4" />
            <h3 className="font-medium mb-2">Account Management</h3>
            <p className="text-sm text-muted-foreground mb-4">
              How to manage your account settings
            </p>
            <Button variant="outline" className="w-full">
              Learn More
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <MessageCircle className="w-6 h-6 mb-4" />
            <h3 className="font-medium mb-2">Troubleshooting Common Issues</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Solutions for frequent problems
            </p>
            <Button variant="outline" className="w-full">
              View Solutions
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Section */}
      <div className="bg-slate-50 rounded-lg p-8 mb-12">
        <h2 className="text-center text-xl font-semibold mb-8">
          You ask? We answer
        </h2>
        <Accordion type="single" collapsible className="max-w-3xl mx-auto">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is SocialPro?</AccordionTrigger>
            <AccordionContent>
              SchoolPro is a comprehensive online school management system
              designed to streamline educational administration. It provides
              tools for managing admissions, student information, scheduling,
              grading, and more—all accessible anytime, anywhere through the
              internet.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              Can SocialPro adapt to my brand's unique requirements?
            </AccordionTrigger>
            <AccordionContent>
              Yes! SchoolPro is highly flexible and can be adapted to various
              educational systems. You can customize grading criteria, class
              levels, timetables, and report cards within minutes. We'll help
              you set everything up during your free trial period.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              What are the system requirements for using SocialPro?
            </AccordionTrigger>
            <AccordionContent>
              SchoolPro is web-based and requires only a modern web browser that
              supports HTML5, such as Google Chrome, Mozilla Firefox, or
              Microsoft Edge. No additional software installation is needed.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              What are the system requirements for using SocialPro?
            </AccordionTrigger>
            <AccordionContent>
              SchoolPro is web-based and requires only a modern web browser that
              supports HTML5, such as Google Chrome, Mozilla Firefox, or
              Microsoft Edge. No additional software installation is needed.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>
              How can I migrate my existing school data to SchoolPro?
            </AccordionTrigger>
            <AccordionContent>
              SchoolPro provides a simple data migration process. You can import
              your existing data using Microsoft Excel (.xls) files. Our system
              offers a step-by-step guide to ensure smooth data transfer.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <AccordionTrigger>
              What kind of support does SchoolPro offer?
            </AccordionTrigger>
            <AccordionContent>
              We provide comprehensive technical support via email, phone, and
              live chat during weekdays. Our support team is ready to assist you
              with any questions or technical issues you may encounter,
              completely free of charge.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Contact Section */}
      <div>
        <h2 className="text-xl font-semibold mb-8">Get in Touch</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <Mail className="w-6 h-6 mb-4" />
                <h3 className="font-medium mb-2">Email Support</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Write to us if you have any questions
                </p>
                <Input placeholder="Enter your email" className="mb-2" />
                <Button variant="outline" className="w-full">
                  Send Email
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <MessageSquare className="w-6 h-6 mb-4" />
                <h3 className="font-medium mb-2">Live Chat</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Chat with us for instant support
                </p>
                <Button variant="outline" className="w-full">
                  Start Chat
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <Phone className="w-6 h-6 mb-4" />
                <h3 className="font-medium mb-2">Phone Support</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Call us directly for immediate assistance
                </p>
                <Button variant="outline" className="w-full">
                  Call Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
