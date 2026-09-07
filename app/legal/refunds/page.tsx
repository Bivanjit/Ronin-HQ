/**
 * RONIN HQ — Refund Policy
 *
 * Server component. Covers digital subscription refund terms,
 * founding access terms, and contact via Telegram.
 */

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Refund Policy — RONIN HQ',
  description:
    'Refund terms for the RONIN HQ illustrative intelligence interface.',
};

export default function RefundsPage() {
  return (
    <article className="legal-page">
      <h1 className="legal-page-title">Refund Policy</h1>
      <p className="legal-page-updated">Last updated: September 2025</p>

      <p className="legal-intro">
        This Refund Policy outlines the terms for refunds related to the
        RONIN HQ illustrative intelligence interface. All pricing and
        payment terms shown in the interface are for demonstration purposes
        only.
      </p>

      {/* 1 */}
      <section className="legal-section">
        <h2>1. Illustrative Pricing</h2>
        <div className="legal-callout">
          <strong>Note:</strong> All pricing displayed within the RONIN HQ
          interface is illustrative and for demonstration purposes only.
          RONIN does not currently process payments or operate a billing
          system. This policy is provided for completeness and in
          anticipation of future functionality.
        </div>
      </section>

      {/* 2 */}
      <section className="legal-section">
        <h2>2. Digital Subscription Refunds</h2>
        <p>
          In the event that paid subscription tiers are offered, the following
          refund terms would apply:
        </p>
        <ul>
          <li>
            <strong>Full refund</strong> -- Requested within fourteen (14)
            days of the initial subscription purchase.
          </li>
          <li>
            <strong>Partial refund</strong> -- Requested between fifteen
            (15) and thirty (30) days of the initial subscription purchase,
            calculated on a pro-rata basis for the unused portion of the
            billing period.
          </li>
          <li>
            <strong>No refund</strong> -- Requests made after thirty (30)
            days from the initial subscription purchase date, or for renewal
            charges.
          </li>
        </ul>
      </section>

      {/* 3 */}
      <section className="legal-section">
        <h2>3. Recurring Billing</h2>
        <p>
          Subscriptions may renew automatically at the end of each billing
          period unless cancelled before the renewal date. Refund requests
          for renewal charges are evaluated under the terms in Section 2
          above, using the renewal date as the purchase date.
        </p>
      </section>

      {/* 4 */}
      <section className="legal-section">
        <h2>4. Founding Circle Access</h2>
        <p>
          Founding Circle memberships, if offered, may carry special terms:
        </p>
        <ul>
          <li>
            Founding Circle status is granted as a lifetime designation and
            is not subject to recurring charges.
          </li>
          <li>
            Founding Circle purchases may be refunded within thirty (30)
            days of the original purchase if requested.
          </li>
          <li>
            After thirty (30) days, Founding Circle purchases are
            non-refundable.
          </li>
          <li>
            Founding Circle status may be revoked in cases of violation of
            the Terms of Service.
          </li>
        </ul>
      </section>

      {/* 5 */}
      <section className="legal-section">
        <h2>5. Free Tier</h2>
        <p>
          The Open Circle tier is free and does not involve any charges or
          payments. No refund is applicable to free-tier access.
        </p>
      </section>

      {/* 6 */}
      <section className="legal-section">
        <h2>6. How to Request a Refund</h2>
        <p>
          To request a refund, please contact the RONIN team through the
          official Telegram channel listed on the main site. Include the
          following information in your request:
        </p>
        <ul>
          <li>The email address or identifier used during purchase</li>
          <li>The subscription tier and purchase date</li>
          <li>The reason for the refund request</li>
        </ul>
        <p>
          Refund requests will be reviewed within five (5) business days.
          Approved refunds will be processed to the original payment method
          within fourteen (14) business days.
        </p>
      </section>

      {/* 7 */}
      <section className="legal-section">
        <h2>7. Chargebacks</h2>
        <p>
          We encourage you to contact us directly before initiating a
          chargeback with your payment provider. Most issues can be resolved
          quickly through direct communication. Chargebacks initiated without
          prior contact may result in suspension of access.
        </p>
      </section>

      {/* 8 */}
      <section className="legal-section">
        <h2>8. Changes to This Policy</h2>
        <p>
          RONIN reserves the right to modify this Refund Policy at any time.
          Changes will be posted on this page with an updated date. Refund
          requests will be evaluated under the policy in effect at the time
          of the original purchase.
        </p>
      </section>
    </article>
  );
}
