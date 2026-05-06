import Layout from "@/components/layout/Layout";
import { useEffect } from "react";
import gsap from "gsap";

const PrivacyPolicy = () => {
  useEffect(() => {
    gsap.fromTo(
      ".privacy-content",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    );
  }, []);

  return (
    <Layout
      title="Privacy Policy - ClarityMFG"
      description="Learn how ClarityMFG collects, uses, and protects your personal information."
    >
      <section className="py-16 privacy-content">
        <div className="container max-w-3xl">
          <h1 className="font-heading text-4xl font-bold mb-8">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: January 1, 2025</p>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="font-heading text-2xl font-bold mb-4">1. Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed">
                We collect information you provide directly to us, such as when you create an account, 
                subscribe to our newsletter, or contact us. This may include your name, email address, 
                and any other information you choose to provide.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold mb-4">2. How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use the information we collect to provide, maintain, and improve our services, 
                send you technical notices and support messages, and respond to your comments and questions.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold mb-4">3. Information Sharing</h2>
              <p className="text-muted-foreground leading-relaxed">
                We do not share your personal information with third parties except as described in 
                this privacy policy or with your consent. We may share information with vendors and 
                service providers who need access to such information to carry out work on our behalf.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold mb-4">4. Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We take reasonable measures to help protect information about you from loss, theft, 
                misuse, unauthorized access, disclosure, alteration, and destruction.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold mb-4">5. Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use cookies and similar tracking technologies to track activity on our website 
                and hold certain information. You can instruct your browser to refuse all cookies 
                or to indicate when a cookie is being sent.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold mb-4">6. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at 
                privacy@clarityMFG.com or through our contact page.
              </p>
            </section>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PrivacyPolicy;
