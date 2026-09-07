'use client';

/**
 * RONIN HQ — Telegram Acknowledgement
 *
 * Dialog requiring acknowledgement of 9 items before confirming a
 * link to the official RONIN Telegram channel. All items are required.
 */

import { useEffect, useState } from 'react';
import { Dialog } from '@/components/ui/Dialog';
import { useToast } from '@/lib/toast';

interface TelegramAcknowledgementProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const CHECKBOX_LABELS: string[] = [
  'I confirm I am 18 years of age or older',
  'I understand this is informational and for research purposes only',
  'I acknowledge that returns are not guaranteed and predictions may be incorrect',
  'I understand this is not financial or investment advice',
  'I will never share seed phrases or private keys with anyone',
  'I understand RONIN will never request seed phrases or private keys',
  'I will verify official channels independently',
  'I understand Telegram is a third-party platform with its own terms',
  'I have read and agree to the Terms & Conditions and Privacy Policy',
];

export default function TelegramAcknowledgement({
  isOpen,
  onClose,
  onConfirm,
}: TelegramAcknowledgementProps) {
  const [checked, setChecked] = useState<boolean[]>(() =>
    CHECKBOX_LABELS.map(() => false),
  );
  const { addToast } = useToast();
  const allChecked = checked.every(Boolean);

  useEffect(() => {
    if (isOpen) {
      setChecked(CHECKBOX_LABELS.map(() => false));
    }
  }, [isOpen]);

  const toggle = (index: number) => {
    setChecked((prev) =>
      prev.map((value, i) => (i === index ? !value : value)),
    );
  };

  const handleConfirm = () => {
    onConfirm();
    addToast('Telegram link ready. Opening in a new tab.', 'success');
    onClose();
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Join RONIN Intelligence on Telegram"
    >
      <div className="legal-callout" style={{ marginTop: 0 }}>
        This acknowledgement does not constitute legal compliance. Read all
        terms independently.
      </div>

      <p style={{ margin: 0 }}>
        Please review and confirm each acknowledgement. All items are
        required before proceeding to the official RONIN Telegram channel.
      </p>

      <div role="group" aria-label="Required acknowledgements">
        {CHECKBOX_LABELS.map((label, index) => (
          <label
            key={label}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 'var(--space-3)',
              padding: 'var(--space-2) 0',
              cursor: 'pointer',
              fontSize: 'var(--text-sm)',
            }}
          >
            <input
              type="checkbox"
              checked={checked[index]}
              onChange={() => toggle(index)}
              style={{
                marginTop: 'var(--space-1)',
                accentColor: 'var(--vermilion)',
                flexShrink: 0,
              }}
              aria-label={label}
            />
            <span>{label}</span>
          </label>
        ))}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 'var(--space-3)',
          marginTop: 'var(--space-6)',
          paddingTop: 'var(--space-4)',
          borderTop: '1px solid var(--line)',
        }}
      >
        <button type="button" className="btn btn-secondary" onClick={onClose}>
          Cancel
        </button>
        <button
          type="button"
          className="btn btn-gold"
          onClick={handleConfirm}
          disabled={!allChecked}
          aria-disabled={!allChecked}
        >
          Proceed to Telegram
        </button>
      </div>
    </Dialog>
  );
}
