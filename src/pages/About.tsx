import Layout from "@/components/layout/Layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authors } from "@/data/blogData";
import { useEffect } from "react";
import gsap from "gsap";
import { Users, BookOpen, Globe, Award } from "lucide-react";

const About = () => {
  useEffect(() => {
    gsap.fromTo(
      ".about-section",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.2, duration: 0.6, ease: "power2.out" }
    );
  }, []);

  const stats = [
    { icon: Users, label: "Readers", value: "50K+" },
    { icon: BookOpen, label: "Articles", value: "500+" },
    { icon: Globe, label: "Countries", value: "120+" },
    { icon: Award, label: "Awards", value: "12" },
  ];

  return (
    <Layout
      title="About Us - Clarity Blog"
      description="Learn about Clarity Blog's mission to deliver insightful content on technology, lifestyle, and more."
    >
      {/* Hero */}
      <section className="gradient-hero py-20 about-section">
        <div className="container text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">About Clarity</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We're a team of passionate writers and creators dedicated to bringing you 
            the most insightful content across technology, lifestyle, travel, and culture.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 about-section">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-7 w-7 text-primary" />
                </div>
                <p className="font-heading text-3xl font-bold">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-secondary/30 about-section">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                At Clarity Blog, we believe in the power of well-crafted content to inform, 
                inspire, and transform. Our mission is to create a platform where readers 
                can discover thoughtful perspectives on the topics that matter most.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We strive to maintain the highest standards of journalism while making 
                complex topics accessible and engaging for everyone.
              </p>
            </div>
            <div className="bg-card rounded-2xl p-8 shadow-card">
              <h3 className="font-heading text-xl font-bold mb-4">Our Values</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <div>
                    <p className="font-medium">Quality First</p>
                    <p className="text-sm text-muted-foreground">Every article is carefully researched and edited.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <div>
                    <p className="font-medium">Reader-Centric</p>
                    <p className="text-sm text-muted-foreground">We write for our readers, not algorithms.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <div>
                    <p className="font-medium">Diverse Perspectives</p>
                    <p className="text-sm text-muted-foreground">We embrace different viewpoints and voices.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 about-section">
        <div className="container">
          <h2 className="font-heading text-3xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {authors.map((author) => (
              <div key={author.id} className="bg-card rounded-xl p-6 text-center shadow-card">
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <AvatarImage src={author.avatar} alt={author.name} />
                  <AvatarFallback>{author.name[0]}</AvatarFallback>
                </Avatar>
                <h3 className="font-heading font-bold text-lg">{author.name}</h3>
                <p className="text-sm text-muted-foreground mt-2">{author.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
