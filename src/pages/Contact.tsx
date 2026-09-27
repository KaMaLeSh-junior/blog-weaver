import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import gsap from "gsap";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import AdSpace from "@/components/blog/AdSpace";
import { useAppSettings } from "@/hooks/useAppSettings";
import SocialLinksList from "@/components/SocialLinksList";
import { contactApi } from "@/services/api";
const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    gsap.fromTo(
      ".contact-section",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.2, duration: 0.6, ease: "power2.out" },
    );
  }, []);

  const errorHandling = (title: string, desc: string) => {
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: title,
        description: desc,
      });
      setName("");
      setEmail("");
      setSubject("");
      setPhone("");
      setMessage("");
    }, 1500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (name == "") {
      errorHandling("Oops", "Please enter your name");
    } else if (email == "" || !emailRegex.test(email)) {
      errorHandling("Oops", "Please enter a proper email");
    } else if (phone == "" || isNaN(Number(phone))) {
      errorHandling("Oops", "Please enter a mobile no");
    } else if (subject == "") {
      errorHandling("Oops", "Please enter the subject");
    } else if (message == "") {
      errorHandling("Oops", "Please enter the message");
    }
    const response = await contactApi.submit({
      name: name,
      email: email,
      subject: subject,
      phone: phone,
      message: message,
    });
    console.log(response);
    if (response) {
      setTimeout(() => {
        setIsLoading(false);
        toast({
          title: "Message Sent!",
          description:
            "Thank you for reaching out. We'll get back to you soon.",
        });
        setName("");
        setEmail("");
        setSubject("");
        setPhone("");
        setMessage("");
      }, 1500);
    } else {
      setTimeout(() => {
        setIsLoading(false);
        toast({
          title: "Message Failed!",
          description: response?.message,
        });
        setName("");
        setEmail("");
        setSubject("");
        setPhone("");
        setMessage("");
      }, 1500);
    }
  };

  const { settings } = useAppSettings();
  const contactInfo = [
    settings.email && {
      icon: Mail,
      label: "Email",
      value: settings.email,
      href: `mailto:${settings.email}`,
    },
    settings.phone && {
      icon: Phone,
      label: "Phone",
      value: settings.phone,
      href: `tel:${settings.phone}`,
    },
    settings.address && {
      icon: MapPin,
      label: "Address",
      value: settings.address,
    },
  ].filter(Boolean) as Array<{
    icon: typeof Mail;
    label: string;
    value: string;
    href?: string;
  }>;

  return (
    <Layout
      title="Contact Us - ClarityMFG"
      description="Get in touch with the ClarityMFG team. We'd love to hear from you."
    >
      {/* Hero */}
      <section className="gradient-hero py-16 contact-section">
        <div className="container text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Contact Us
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have a question, suggestion, or just want to say hello? We'd love to
            hear from you.
          </p>
        </div>
      </section>

      <section className="py-16 contact-section">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              <h2 className="font-heading text-2xl font-bold mb-6">
                Get in Touch
              </h2>
              {contactInfo.map((info) => (
                <div key={info.label} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <info.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{info.label}</p>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-muted-foreground">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
              <div className="pt-2">
                <p className="font-medium mb-3">Follow Us</p>
                <SocialLinksList />
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-2xl shadow-card p-8">
                <h2 className="font-heading text-2xl font-bold mb-6">
                  Send us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Your Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Phone</Label>
                    <Input
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 6789012345"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="How can we help?"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Your message here..."
                      rows={5}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full sm:w-auto"
                  >
                    {isLoading ? "Sending..." : "Send Message"}
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Ad Space */}
      <section className="container py-8 contact-section">
        <AdSpace variant="horizontal" />
      </section>
    </Layout>
  );
};

export default Contact;
