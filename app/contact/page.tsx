"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageSquare, 
  Briefcase, 
  Users, 
  HelpCircle,
  CheckCircle,
  UserPlus,
  DollarSign,
  Newspaper,
  Lightbulb
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    inquiry: "general"
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleRadioChange = (value: string) => {
    setFormState(prev => ({
      ...prev,
      inquiry: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success("Thank you for your message! I'll be in touch soon.", {
        icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      });
      
      // Reset form
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
        inquiry: "general"
      });
      
      // Reset submission status after a delay
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }, 1500);
  };
  
  const contactInfo = [
    {
      title: "Email Us",
      detail: "himanshu@newzyworld.com",
      icon: <Mail className="h-6 w-6 text-primary" />
    },
    {
      title: "Call Us",
      detail: "+91 9999999999",
      icon: <Phone className="h-6 w-6 text-primary" />
    },
    {
      title: "Location",
      detail: "Haryana",
      icon: <MapPin className="h-6 w-6 text-primary" />
    }
  ];
  
  const faqs = [
    {
      question: "How do I create an account?",
      answer: "To create an account, click the 'Sign In' button in the top navigation bar and then choose your preferred authentication method (Google or GitHub).",
      icon: <UserPlus className="h-5 w-5 text-blue-500" />
    },
    {
      question: "Is Newzy World free to use?",
      answer: "Yes, Newzy World is currently free for all users.",
      icon: <DollarSign className="h-5 w-5 text-green-500" />
    },
    {
      question: "How is news content selected?",
      answer: "Our content is selected through a combination of AI algorithms that analyze thousands of sources and human editorial oversight to ensure quality and relevance.",
      icon: <Newspaper className="h-5 w-5 text-purple-500" />
    },
    {
      question: "Can I suggest a news source?",
      answer: "Absolutely! I am always looking to expand my sources. Send me your suggestions through this contact form or email me directly.",
      icon: <Lightbulb className="h-5 w-5 text-amber-500" />
    }
  ];
  
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="mb-16 text-center"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <Badge className="mb-4 px-3 py-1 bg-primary/10 text-primary border-primary/20 hover:bg-purple-300 cursor-default">Contact Us</Badge>
        <h1 className="text-4xl font-bold mb-6">Get in Touch</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Have questions, feedback, or just want to say Hello? I would love to hear from you.
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-24">
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Send Me a Message</CardTitle>
              <CardDescription>
                Fill out the form below and I'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="contact" className="mb-8">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="contact">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    General Talks!!🗣️
                  </TabsTrigger>
                  <TabsTrigger value="business">
                    <Briefcase className="h-4 w-4 mr-2" />
                    Business Talks!!💵
                  </TabsTrigger>
                  <TabsTrigger value="support">
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Support!!💁‍♂️
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="contact" className="pt-4">
                  <p className="text-sm text-muted-foreground mb-6">
                    Have a question or comment? I would love to hear from you.
                  </p>
                </TabsContent>
                
                <TabsContent value="business" className="pt-4">
                  <p className="text-sm text-muted-foreground mb-6">
                    Interested in partnering with Me or exploring business opportunities?
                  </p>
                </TabsContent>
                
                <TabsContent value="support" className="pt-4">
                  <p className="text-sm text-muted-foreground mb-6">
                    Need help with your account or experiencing technical issues?
                  </p>
                </TabsContent>
              </Tabs>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name(Aapka Naam)</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      placeholder="HimSolo" 
                      required 
                      value={formState.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      placeholder="himsolo@xyz.com" 
                      required 
                      value={formState.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input 
                    id="subject" 
                    name="subject" 
                    placeholder="How can I help you?" 
                    required 
                    value={formState.subject}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Type of Inquiry</Label>
                  <RadioGroup 
                    value={formState.inquiry}
                    onValueChange={handleRadioChange}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="general" id="general" />
                      <Label htmlFor="general" className="cursor-pointer">General</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="technical" id="technical" />
                      <Label htmlFor="technical" className="cursor-pointer">Technical</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="feedback" id="feedback" />
                      <Label htmlFor="feedback" className="cursor-pointer">Feedback</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Your Message(Aapka Message 😊")</Label>
                  <Textarea 
                    id="message" 
                    name="message" 
                    placeholder="Tell us how we can help..." 
                    rows={5} 
                    required 
                    value={formState.message}
                    onChange={handleChange}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-pulse">Sending message...</span>
                    </>
                  ) : isSubmitted ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Message Sent
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>
                Here are the different ways you can reach us.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="bg-primary/10 rounded-full p-3 mr-4">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.detail}</p>
                  </div>
                </div>
              ))}
              
              <Separator className="my-6" />
              
              <div>
                <h3 className="font-medium mb-3">Office Hours</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>I am a student, still studying and Exploring 😅</p>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div>
                <h3 className="font-medium mb-3">Follow Us</h3>
                <div className="flex space-x-3">
                  <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                    </svg>
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                    </svg>
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
                    <a href="https://www.linkedin.com/in/himanshuverma192005/" target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect width="4" height="12" x="2" y="9"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      <motion.div 
        className="mb-24"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <h2 className="text-3xl font-semibold text-center mb-12">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-start space-x-4 pb-2">
                <div className="mt-1 rounded-full bg-primary/10 p-2">
                  {faq.icon}
                </div>
                <div>
                  <CardTitle className="text-xl">{faq.question}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
      
      <motion.div 
        className="bg-primary/5 rounded-xl p-12 text-center"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <h2 className="text-3xl font-semibold mb-6">Join Our Growing Community</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
          Connect with Newzy World and be part of the revolution in news consumption. 
          Follow Me on social media for updates, insights, and community discussions.
        </p>
        <Button size="lg" className="bg-primary hover:bg-primary/90">
          <Users className="mr-2 h-5 w-5" />
          Subscribe to Updates
        </Button>
      </motion.div>
    </div>
  );
} 