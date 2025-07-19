import Head from 'next/head';
import { useTheme } from '../src/hooks/useTheme';
import { Button } from '../src/components/ui/button';
import { Sun, Moon } from 'lucide-react';

export default function PrivacyPage() {
  const { theme, toggleTheme } = useTheme();
  return (
    <>
      <Head>
        <title>Decloak.ai – AI-Powered Digital Footprint Protection - Privacy Policy</title>
        <meta
          name="description"
          content="Learn how Decloak.ai protects and uses your data."
        />
        <meta name="keywords" content="decloak privacy policy" />
      </Head>
      <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
        <div className="min-h-screen bg-background transition-colors duration-300 p-6">
          <div className="max-w-3xl mx-auto space-y-6 text-foreground">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold">Privacy Policy</h1>
              <Button type="button" variant="ghost" size="icon" onClick={toggleTheme} className="w-9 h-9">
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
            </div>
            <div class="max-w-3xl mx-auto px-4 py-8 text-gray-800">
              <p class="text-sm text-gray-500 mb-6">Last Updated: July 19, 2025</p>

              <p class="mb-4">Decloak.ai ("we", "us", or "our") respects your privacy and is committed to protecting your personal information. This Privacy Policy describes how we collect, use, and protect your data when you visit our website and join our early access waitlist.</p>

              <h2 class="text-xl font-semibold mt-6 mb-2">1. What Information We Collect</h2>
              <p class="mb-4">We collect your email address when you voluntarily submit it to join the waitlist. No other personal information is collected at this stage.</p>

              <h2 class="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
              <ul class="list-disc pl-6 mb-4">
                <li>To reserve your spot in our early access program</li>
                <li>To send important updates about the product and onboarding</li>
                <li>To respond to direct inquiries</li>
              </ul>
              <p class="mb-4">We do not use your email for third-party marketing or promotional campaigns.</p>

              <h2 class="text-xl font-semibold mt-6 mb-2">3. Data Sharing & Disclosure</h2>
              <p class="mb-4">We do not sell, rent, or share your personal information with third parties. Your data is used solely within Decloak.ai.</p>

              <h2 class="text-xl font-semibold mt-6 mb-2">4. Data Security</h2>
              <p class="mb-4">We implement appropriate technical and organizational safeguards, including encryption and access controls, to protect your data.</p>

              <h2 class="text-xl font-semibold mt-6 mb-2">5. Your Rights</h2>
              <p class="mb-2">You may request to:</p>
              <ul class="list-disc pl-6 mb-4">
                <li>Access the data we store about you</li>
                <li>Delete your data</li>
                <li>Withdraw your consent</li>
              </ul>
              <p class="mb-4">Contact us at <a href="mailto:privacy@decloak.ai" class="text-blue-600 underline">privacy@decloak.ai</a> to make such requests.</p>

              <h2 class="text-xl font-semibold mt-6 mb-2">6. Cookies and Tracking</h2>
              <p class="mb-4">Decloak.ai does not currently use cookies or tracking technologies.</p>

              <h2 class="text-xl font-semibold mt-6 mb-2">7. Third-Party Services</h2>
              <p class="mb-4">We may use third-party platforms (e.g., email services, hosting) to deliver core services. These vendors are selected with privacy in mind.</p>

              <h2 class="text-xl font-semibold mt-6 mb-2">8. Children’s Privacy</h2>
              <p class="mb-4">Our services are not intended for children under 13. We do not knowingly collect data from minors.</p>

              <h2 class="text-xl font-semibold mt-6 mb-2">9. Changes to This Policy</h2>
              <p class="mb-4">We may revise this Privacy Policy. Updates will be posted here with a revised date.</p>

              <h2 class="text-xl font-semibold mt-6 mb-2">10. Contact Us</h2>
              <p class="mb-4">
                If you have questions or concerns, email us at <a href="mailto:privacy@decloak.ai" class="text-blue-600 underline">privacy@decloak.ai</a>.
              </p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
