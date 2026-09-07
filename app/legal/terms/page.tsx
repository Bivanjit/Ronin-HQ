/**
 * RONIN HQ — Terms of Service
 *
 * Server component. Professional legal language covering use of the
 * illustrative intelligence interface.
 */

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — RONIN HQ',
  description:
    'Terms governing use of the RONIN HQ illustrative intelligence interface.',
};

export default function TermsPage() {
  return (
    <article className="legal-page">
      <h1 className="legal-page-title">Terms of Service</h1>
      <p className="legal-page-updated">Last updated: September 2025</p>

      <p className="legal-intro">
        These Terms of Service govern your access to and use of the RONIN HQ
        illustrative intelligence interface. By accessing or using this
        interface, you agree to be bound by these terms. If you do not agree,
        do not use the interface.
      </p>

      {/* 1 */}
      <section className="legal-section">
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using the RONIN HQ interface, you acknowledge that
          you have read, understood, and agree to be bound by these Terms of
          Service and all applicable laws and regulations. These terms apply
          to all visitors, users, and others who access or use the interface.
        </p>
      </section>

      {/* 2 */}
      <section className="legal-section">
        <h2>2. Illustrative Nature</h2>
        <div className="legal-callout">
          <strong>Important:</strong> This interface is designed for
          informational and research purposes only. All data, signals,
          predictions, wallet intelligence, and other content presented are
          illustrative and do not represent real market data, guaranteed
          outcomes, or live trading information.
        </div>
        <p>
          Nothing on this interface constitutes financial advice, investment
          advice, trading advice, or any other form of professional advice.
          You should consult a qualified professional before making any
          financial decisions.
        </p>
      </section>

      {/* 3 */}
      <section className="legal-section">
        <h2>3. Eligibility</h2>
        <p>
          You must be at least eighteen (18) years of age to use this
          interface. By using the interface, you represent and warrant that
          you meet this age requirement and have the legal capacity to enter
          into these terms.
        </p>
      </section>

      {/* 4 */}
      <section className="legal-section">
        <h2>4. Account and Access</h2>
        <p>
          Access to the interface may be tiered, with different levels of
          functionality available at different access tiers. All tier
          structures, pricing, and features shown are illustrative and may
          change without notice.
        </p>
        <p>
          You are responsible for maintaining the confidentiality of any
          preferences or settings stored locally on your device. RONIN does
          not manage user accounts or store credentials on its servers.
        </p>
      </section>

      {/* 5 */}
      <section className="legal-section">
        <h2>5. Acceptable Use</h2>
        <p>You agree not to:</p>
        <ul>
          <li>
            Use the interface for any unlawful purpose or in violation of
            any applicable law or regulation.
          </li>
          <li>
            Attempt to gain unauthorized access to any part of the interface,
            its systems, or connected networks.
          </li>
          <li>
            Interfere with, disrupt, or place an unreasonable load on the
            interface or its infrastructure.
          </li>
          <li>
            Scrape, crawl, or use automated means to access or collect data
            from the interface without prior written consent.
          </li>
          <li>
            Reproduce, distribute, or create derivative works based on the
            interface content without authorization.
          </li>
          <li>
            Misrepresent your identity or affiliation with any person or
            entity.
          </li>
        </ul>
      </section>

      {/* 6 */}
      <section className="legal-section">
        <h2>6. Intellectual Property</h2>
        <p>
          All content, design, artwork, branding, code, and other materials
          on the RONIN HQ interface are the intellectual property of RONIN
          and are protected by applicable copyright, trademark, and other
          intellectual property laws.
        </p>
        <p>
          You are granted a limited, non-exclusive, non-transferable license
          to access and use the interface for its intended informational
          purpose. This license does not include any right to reproduce,
          distribute, modify, or create derivative works.
        </p>
      </section>

      {/* 7 */}
      <section className="legal-section">
        <h2>7. Third-Party Services</h2>
        <p>
          The interface may integrate with or reference third-party platforms,
          including but not limited to messaging services such as Telegram.
          Your use of third-party services is governed by their respective
          terms and privacy policies, not these terms.
        </p>
        <p>
          RONIN is not responsible for the availability, accuracy, content,
          or practices of any third-party services.
        </p>
      </section>

      {/* 8 */}
      <section className="legal-section">
        <h2>8. Disclaimer of Warranties</h2>
        <div className="legal-callout legal-callout-red">
          <strong>No warranty:</strong> The interface is provided on an
          &quot;as is&quot; and &quot;as available&quot; basis without
          warranties of any kind, whether express or implied, including but
          not limited to implied warranties of merchantability, fitness for
          a particular purpose, or non-infringement.
        </div>
        <p>
          RONIN does not warrant that the interface will be uninterrupted,
          error-free, secure, or free of viruses or other harmful components.
          Any reliance on the content of this interface is at your own risk.
        </p>
      </section>

      {/* 9 */}
      <section className="legal-section">
        <h2>9. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by applicable law, RONIN shall not
          be liable for any indirect, incidental, special, consequential, or
          punitive damages arising out of or related to your use of the
          interface, including but not limited to loss of profits, data, use,
          goodwill, or other intangible losses.
        </p>
        <p>
          In no event shall RONIN total aggregate liability exceed the amount
          you paid, if any, to RONIN for access to the interface during the
          twelve (12) months preceding the claim.
        </p>
      </section>

      {/* 10 */}
      <section className="legal-section">
        <h2>10. Indemnification</h2>
        <p>
          You agree to indemnify, defend, and hold harmless RONIN, its
          affiliates, officers, directors, employees, and agents from and
          against any claims, liabilities, damages, losses, and expenses
          (including reasonable legal fees) arising out of or related to
          your use of the interface or violation of these terms.
        </p>
      </section>

      {/* 11 */}
      <section className="legal-section">
        <h2>11. Modifications to Terms</h2>
        <p>
          RONIN reserves the right to modify these terms at any time.
          Changes will be effective when posted on this page. Your continued
          use of the interface after any changes constitutes acceptance of
          the updated terms.
        </p>
      </section>

      {/* 12 */}
      <section className="legal-section">
        <h2>12. Governing Law</h2>
        <p>
          These terms shall be governed by and construed in accordance with
          applicable law, without regard to its conflict of law principles.
          Any dispute arising from these terms or the use of the interface
          shall be resolved in the appropriate courts of the applicable
          jurisdiction.
        </p>
      </section>
    </article>
  );
}
