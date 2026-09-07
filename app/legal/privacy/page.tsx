/**
 * RONIN HQ — Privacy Policy
 *
 * Server component. Covers minimal data collection, local storage
 * usage, and references the consent system.
 */

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — RONIN HQ',
  description:
    'How the RONIN HQ illustrative intelligence interface handles data and privacy.',
};

export default function PrivacyPage() {
  return (
    <article className="legal-page">
      <h1 className="legal-page-title">Privacy Policy</h1>
      <p className="legal-page-updated">Last updated: September 2025</p>

      <p className="legal-intro">
        This Privacy Policy explains how the RONIN HQ illustrative
        intelligence interface handles information. We are committed to
        protecting your privacy and minimizing data collection to the
        greatest extent possible.
      </p>

      {/* 1 */}
      <section className="legal-section">
        <h2>1. Overview</h2>
        <p>
          RONIN HQ is designed as a privacy-first illustrative interface.
          The interface does not collect personal information, does not use
          analytics or tracking services, and does not transmit data to
          external servers. All user preferences are stored locally on your
          device.
        </p>
      </section>

      {/* 2 */}
      <section className="legal-section">
        <h2>2. Local Storage</h2>
        <p>
          The interface uses browser local storage to maintain your consent
          preferences and interface settings. This data never leaves your
          device and is not accessible to RONIN or any third party.
        </p>
        <p>Local storage is used for:</p>
        <ul>
          <li>
            Consent preferences (cookie categories you have selected)
          </li>
          <li>Interface display preferences</li>
        </ul>
        <p>
          You can clear this data at any time through your browser settings
          or through the cookie preferences dialog within the interface.
        </p>
      </section>

      {/* 3 */}
      <section className="legal-section">
        <h2>3. No Personal Data Collection</h2>
        <div className="legal-callout">
          <strong>No personal data:</strong> This interface does not collect
          names, email addresses, phone numbers, IP addresses, device
          identifiers, or any other personally identifiable information.
        </div>
        <p>
          There are no account registration forms, login systems, or data
          submission mechanisms that would transmit personal information
          to any server.
        </p>
      </section>

      {/* 4 */}
      <section className="legal-section">
        <h2>4. No Cookies</h2>
        <p>
          This interface does not use traditional cookies. The term
          &quot;cookie preferences&quot; is used for clarity, but all
          preference storage is handled through the browser local storage
          API, which does not transmit data in HTTP requests.
        </p>
        <p>
          No third-party cookies, analytics scripts, advertising pixels, or
          tracking technologies are used.
        </p>
      </section>

      {/* 5 */}
      <section className="legal-section">
        <h2>5. Third-Party Services</h2>
        <p>
          The interface may integrate with third-party platforms such as
          Telegram for community communication. When you choose to interact
          with a third-party service, that service operates under its own
          privacy policy and terms of service.
        </p>
        <p>
          RONIN does not share any data with third-party services. Any data
          you voluntarily share on third-party platforms is governed by that
          platform&apos;s privacy policy.
        </p>
      </section>

      {/* 6 */}
      <section className="legal-section">
        <h2>6. Consent Management</h2>
        <p>
          The interface provides a consent management system that allows you
          to control which categories of local storage are active. Your
          consent choices are stored locally and can be modified at any time
          through the cookie preferences dialog accessible from the footer
          of every page.
        </p>
        <p>
          Three categories are available: Essential (always active), Functional
          (optional), and Performance (optional). All categories default to
          the minimum necessary for the interface to function.
        </p>
      </section>

      {/* 7 */}
      <section className="legal-section">
        <h2>7. Data Security</h2>
        <p>
          Since all data is stored locally on your device and no data is
          transmitted to external servers, the primary security
          considerations relate to your device and browser security. We
          recommend keeping your browser updated and using standard security
          practices.
        </p>
      </section>

      {/* 8 */}
      <section className="legal-section">
        <h2>8. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Changes will
          be posted on this page with an updated date. Continued use of the
          interface after changes are posted constitutes acceptance of the
          updated policy.
        </p>
      </section>

      {/* 9 */}
      <section className="legal-section">
        <h2>9. Contact</h2>
        <p>
          If you have questions about this Privacy Policy or how the
          interface handles data, please reach out through the official
          RONIN Telegram channel listed on the main site.
        </p>
      </section>
    </article>
  );
}
