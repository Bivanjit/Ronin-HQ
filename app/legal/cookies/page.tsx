/**
 * RONIN HQ — Cookie Policy
 *
 * Server component. Details cookie and local storage usage, references
 * the consent management system.
 */

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy — RONIN HQ',
  description:
    'Cookie and local storage usage policy for the RONIN HQ illustrative intelligence interface.',
};

export default function CookiesPage() {
  return (
    <article className="legal-page">
      <h1 className="legal-page-title">Cookie Policy</h1>
      <p className="legal-page-updated">Last updated: September 2025</p>

      <p className="legal-intro">
        This Cookie Policy explains how the RONIN HQ illustrative
        intelligence interface uses cookies and similar local storage
        technologies. We believe in transparency and minimal data usage.
      </p>

      {/* 1 */}
      <section className="legal-section">
        <h2>1. No Traditional Cookies</h2>
        <div className="legal-callout">
          <strong>No cookies used:</strong> This interface does not use
          traditional HTTP cookies. All preference storage is handled through
          the browser local storage API, which does not transmit data in
          network requests.
        </div>
      </section>

      {/* 2 */}
      <section className="legal-section">
        <h2>2. Local Storage</h2>
        <p>
          The interface uses the browser&apos;s local storage API to persist
          your preferences. Local storage is a client-side mechanism that
          stores data entirely on your device. The data is never transmitted
          to any server.
        </p>
        <p>Local storage is used for the following purposes:</p>
        <ul>
          <li>
            <strong>Consent preferences</strong> -- Stores which categories
            of storage you have consented to. This includes essential
            (always active), functional (optional), and performance
            (optional) categories.
          </li>
          <li>
            <strong>Interface preferences</strong> -- Stores display and
            interaction preferences to maintain a consistent experience
            across sessions.
          </li>
        </ul>
      </section>

      {/* 3 */}
      <section className="legal-section">
        <h2>3. Storage Categories</h2>
        <p>
          The consent management system recognizes three categories of local
          storage:
        </p>
        <ul>
          <li>
            <strong>Essential (always active)</strong> -- Required for the
            interface to function. Includes consent state itself. This
            category cannot be disabled.
          </li>
          <li>
            <strong>Functional (opt-in)</strong> -- Remembers your interface
            preferences such as display settings. Disabled by default.
          </li>
          <li>
            <strong>Performance (opt-in)</strong> -- Reserved for future use.
            Currently no data is collected or stored in this category.
            Disabled by default.
          </li>
        </ul>
      </section>

      {/* 4 */}
      <section className="legal-section">
        <h2>4. Consent Management</h2>
        <p>
          When you first visit the interface, a consent banner is displayed
          offering three options: Accept All, Reject Non-Essential, and
          Manage Preferences. Selecting any option records your consent
          choice to local storage.
        </p>
        <p>
          You can change your preferences at any time by clicking the
          &quot;Cookie Settings&quot; button in the footer of any page. This
          reopens the preferences dialog where you can toggle functional and
          performance categories independently.
        </p>
      </section>

      {/* 5 */}
      <section className="legal-section">
        <h2>5. No Third-Party Tracking</h2>
        <p>
          This interface does not load any third-party scripts, analytics
          tools, advertising pixels, or tracking technologies. There are no
          third-party cookies or local storage access from external domains.
        </p>
      </section>

      {/* 6 */}
      <section className="legal-section">
        <h2>6. Clearing Your Data</h2>
        <p>You can remove all locally stored data by:</p>
        <ul>
          <li>
            Using your browser&apos;s settings to clear local storage for
            this site
          </li>
          <li>
            Clearing all site data through your browser&apos;s privacy
            settings
          </li>
          <li>
            Uninstalling or clearing the browser data associated with this
            interface
          </li>
        </ul>
        <p>
          Clearing local storage will reset your consent preferences, and the
          consent banner will be shown again on your next visit.
        </p>
      </section>

      {/* 7 */}
      <section className="legal-section">
        <h2>7. Changes to This Policy</h2>
        <p>
          We may update this Cookie Policy from time to time. Changes will
          be posted on this page with an updated date. If significant changes
          are made, the consent banner will be shown again so you can review
          and update your preferences.
        </p>
      </section>
    </article>
  );
}
