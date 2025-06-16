"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { 
  Newspaper, 
  Users, 
  Lightbulb, 
  Globe, 
  Rocket, 
  Code, 
  Check, 
  ChevronRight,
  Brain,
  TrendingUp,
  FileText,
  ShieldCheck,
  Layers,
  Monitor,
  Smartphone,
  Zap
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

export default function AboutPage() {
  const router = useRouter();
  
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const teamMembers = [
    {
      name: "Himanshu",
      role: "Developer",
      image: "c:\Users\himan\OneDrive\Desktop\himanshu new.jpg",
      bio: "A 3rd Year Student of Data Science at JCBOSE UST, YMCA, Faridabad."
    },
  ];
  
  const values = [
    {
      title: "Preciseness",
      description: "I am committed to deliver accurate, well-sourced news.",
      icon: <Check className="h-6 w-6 text-blue-500" />
    },
    {
      title: "Briefness",
      description: "I leverage AI to provide a personalized brief news experience.",
      icon: <Lightbulb className="h-6 w-6 text-yellow-500" />
    },
    {
      title: "Accessibility",
      description: "I believe everyone should have access to quality information.",
      icon: <Globe className="h-6 w-6 text-purple-500" />
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
        <Badge className="mb-4 px-3 py-1 bg-primary/10 text-primary border-primary/20">About Us</Badge>
        <h1 className="text-4xl font-bold mb-6">Our Mission and Vision</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          "Newzy World is changing the way you read news by mixing AI with quality journalism to bring you news that actually matters to you.".
        </p>
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={fadeIn} className="space-y-6">
          <h2 className="text-3xl font-semibold">My Story</h2>
          <p className="text-muted-foreground">
            Newzy World emerged from a simple but powerful idea: what if we could harness 
            the power of artificial intelligence to transform how people discover and engage with news?
          </p>
          <p className="text-muted-foreground">
            This is my Fifth Semester project, and it has been a journey of learning,
            experimentation, and innovation. I started with a vision to create a platform that not only
            delivers news but also enhances the reading experience through AI-driven personalization.
          </p>
          <p className="text-muted-foreground">
            Today, I am proud to say that Newzy World is not just a news aggregator,
            but a comprehensive news platform that combines cutting-edge AI technology with a commitment to quality journalism.
          </p>
          <div className="pt-4">
            <Button onClick={() => router.push('/contact')} className="group">
              Connect with me
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </motion.div>
        
        <motion.div variants={fadeIn}>
          <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
            <Image 
              src="https://www.bankrate.com/2022/10/27135704/GettyImages-91630491.jpeg" 
              alt="Team brainstorming at AI News Hub" 
              width={800} 
              height={450} 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </motion.div>
      </motion.div>
      
      <Separator className="my-16" />
      
      <motion.div 
        className="mb-24"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <h2 className="text-3xl font-semibold text-center mb-12">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <Card key={index} className="border-2 border-border hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                  {value.icon}
                </div>
                <CardTitle>{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
      
      <motion.div 
        className="mb-24"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <h2 className="text-3xl font-semibold text-center mb-12">What Sets Us Apart</h2>
        <Tabs defaultValue="ai" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-12">
            <TabsTrigger value="ai" className="flex items-center space-x-2">
              <Brain className="h-4 w-4" />
              <span>AI-Powered Curation</span>
            </TabsTrigger>
            <TabsTrigger value="journalism" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Quality Journalism</span>
            </TabsTrigger>
            <TabsTrigger value="experience" className="flex items-center space-x-2">
              <Layers className="h-4 w-4" />
              <span>User Experience</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="ai" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-medium mb-4 flex items-center">
                  <Brain className="h-6 w-6 mr-3 text-primary" />
                  Advanced AI Technology
                </h3>
                <p className="text-muted-foreground mb-6">
                  Our proprietary machine learning algorithms analyze thousands of news sources in real-time, 
                  identifying the most relevant and important stories based on your interests and reading habits.
                </p>
                <div className="grid grid-cols-1 gap-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center space-x-3 pb-2">
                      <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-2">
                        <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <CardTitle className="text-lg">Personalized Feeds</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Content that adapts to your interests while still ensuring you receive important headlines.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center space-x-3 pb-2">
                      <div className="rounded-full bg-orange-100 dark:bg-orange-900/30 p-2">
                        <ShieldCheck className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                      </div>
                      <CardTitle className="text-lg">Bias Detection</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Our AI identifies potential bias in news coverage, helping you get a balanced perspective.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <Image 
                  src="https://www.aam-us.org/wp-content/uploads/2023/01/AdobeStock_378897598.jpeg?fit=5500,3667" 
                  alt="AI-powered news curation" 
                  width={500} 
                  height={400} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="journalism" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="order-2 lg:order-1 rounded-lg overflow-hidden shadow-lg">
                <Image 
                  src="https://i0.wp.com/judithjohnsonphd.com/wp-content/uploads/2019/04/jaredd-craig-744902-unsplash-e1554719380319.jpg?fit=3960,2247&ssl=1" 
                  alt="Journalism excellence" 
                  width={600} 
                  height={400} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h3 className="text-2xl font-medium mb-4 flex items-center">
                  <FileText className="h-6 w-6 mr-3 text-primary" />
                  Journalistic Excellence
                </h3>
                <p className="text-muted-foreground mb-6">
                  Technology enhances but doesn't replace human expertise. Our editorial team of veteran journalists
                  oversees our content to ensure accuracy, relevance, and ethical reporting standards.
                </p>
                <div className="grid grid-cols-1 gap-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center space-x-3 pb-2">
                      <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-2">
                        <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <CardTitle className="text-lg">Fact-Checking</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Rigorous verification process for all featured stories to combat misinformation.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center space-x-3 pb-2">
                      <div className="rounded-full bg-purple-100 dark:bg-purple-900/30 p-2">
                        <Globe className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                      </div>
                      <CardTitle className="text-lg">Source Transparency</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Clear attribution and source information for every article we feature.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="experience" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-medium mb-4 flex items-center">
                  <Layers className="h-6 w-6 mr-3 text-primary" />
                  Seamless User Experience
                </h3>
                <p className="text-muted-foreground mb-6">
                  We've designed our platform with your needs in mind, creating an intuitive interface that
                  makes staying informed both effortless and enjoyable.
                </p>
                <div className="grid grid-cols-1 gap-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center space-x-3 pb-2">
                      <div className="rounded-full bg-indigo-100 dark:bg-indigo-900/30 p-2">
                        <Zap className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <CardTitle className="text-lg">Distraction-Free Reading</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Clean, minimalist design that puts the focus on content, not advertisements.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center space-x-3 pb-2">
                      <div className="rounded-full bg-rose-100 dark:bg-rose-900/30 p-2">
                        <Smartphone className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                      </div>
                      <CardTitle className="text-lg">Cross-Platform Access</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Consistent experience across all your devices, with seamless synchronization.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <Image 
                  src="https://dinnova.io/wp-content/uploads/2024/07/Seamless-User-Experience-The-Secret-to-Your-Success.jpeg" 
                  alt="User experience design" 
                  width={600} 
                  height={250} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
      
      <Separator className="my-16" />
      
      <motion.div 
        className="mb-24"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <h2 className="text-3xl font-semibold text-center mb-12">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <Avatar className="h-24 w-24 mx-auto">
                  <AvatarImage src={member.image} alt={member.name} />
                  <AvatarFallback>{member.name[0]}</AvatarFallback>
                </Avatar>
                <CardTitle className="mt-4">{member.name}</CardTitle>
                <CardDescription>{member.role}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
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
        <h2 className="text-3xl font-semibold mb-6">Join me on My Journey</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
          Let's explore news like never before.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" variant="secondary" onClick={() => router.push('/news')}>
            Explore our news
          </Button>
          <Button size="lg" variant="secondary" onClick={() => router.push('/contact')}>
            Connect with Me
          </Button>
        </div>
      </motion.div>
    </div>
  );
} 