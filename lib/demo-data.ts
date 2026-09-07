/**
 * RONIN HQ — Demo / Illustrative Data
 *
 * All data is synthetic. Addresses are fabricated. Labels are generic
 * crypto-asset placeholders. Nothing here represents real accounts,
 * performance, or financial advice.
 */

/* ============================================================
   Types
   ============================================================ */

export interface MarketRegime {
  id: string;
  name: string;
  confidence: number;
  description: string;
}

export type SignalType =
  | 'momentum'
  | 'reversal'
  | 'accumulation'
  | 'distribution'
  | 'liquidity'
  | 'volatility';

export type SignalDirection = 'bullish' | 'bearish' | 'neutral';

export type SignalGrade =
  | 'LOW'
  | 'MODERATE'
  | 'MEDIUM'
  | 'HIGH'
  | 'EXTREME';

export interface Signal {
  id: string;
  asset: string;
  type: SignalType;
  direction: SignalDirection;
  probability: number;
  grade: SignalGrade;
  marketRegimeId: string;
  evidenceSummary: string;
  decisionWindow: string;
  modelAgreement: number;
  dataQuality: number;
  riskScore: number;
  timestamp: string;
}

export type PredictionOutcome = 'ACTIVE' | 'SIGNAL EXPIRED' | 'NO VALID PREDICTION';

export interface PredictionReceipt {
  id: string;
  asset: string;
  direction: SignalDirection;
  probability: number;
  expectedReturn: string;
  expectedMFE: string;
  expectedMAE: string;
  decisionWindow: string;
  horizon: string;
  risk: string;
  evidence: string[];
  modelAgreement: number;
  dataQuality: number;
  modelVersion: string;
  featureVersion: string;
  timestamp: string;
  invalidationConditions: string[];
  outcome: PredictionOutcome;
}

export interface WalletNode {
  id: string;
  address: string;
  label: string;
  cohort: string;
  concentration: number;
  behavioralPattern: string;
  lastActivity: string;
  outcomeNote: string;
  leadTimeDays: number;
}

export interface WalletEdge {
  source: string;
  target: string;
  relationship: string;
  strength: number;
}

export type RankingStatus = 'active' | 'inactive' | 'watchlist';

export interface RankingEntry {
  rank: number;
  name: string;
  score: number;
  change: string;
  confidence: number;
  status: RankingStatus;
}

export interface RankingBoard {
  id: string;
  title: string;
  description: string;
  entries: RankingEntry[];
}

export interface ResearchBrief {
  id: string;
  title: string;
  category: string;
  summary: string;
  keyFindings: string[];
}

export interface AccessTierDetail {
  id: string;
  name: string;
  price: string;
  period: string;
  features: string[];
  highlighted: boolean;
}

/* ============================================================
   Regimes
   ============================================================ */

export const REGIMES: MarketRegime[] = [
  {
    id: 'regime-001',
    name: 'Risk-On Expansion',
    confidence: 0.82,
    description:
      'Broad market capitalization expansion with increasing volatility-adjusted momentum across major asset pairs. Risk appetite elevated.',
  },
  {
    id: 'regime-002',
    name: 'Cautious Recovery',
    confidence: 0.67,
    description:
      'Partial recovery from recent drawdown. Selective accumulation detected in mid-cap assets while large caps consolidate.',
  },
  {
    id: 'regime-003',
    name: 'Distribution Phase',
    confidence: 0.74,
    description:
      'Whale wallets shifting to distribution. On-chain metrics suggest topping formation with elevated sell pressure at key levels.',
  },
  {
    id: 'regime-004',
    name: 'Low Volatility Range',
    confidence: 0.91,
    description:
      'Compressed volatility with tight trading ranges. Historical precedents suggest breakout imminent within 5-7 day window.',
  },
];

/* ============================================================
   Signals
   ============================================================ */

export const SIGNALS: Signal[] = [
  {
    id: 'sig-001',
    asset: 'ETH',
    type: 'momentum',
    direction: 'bullish',
    probability: 0.78,
    grade: 'HIGH',
    marketRegimeId: 'regime-001',
    evidenceSummary:
      'Sustained volume increase over 72h with institutional-grade wallet accumulation. Funding rate normalization supports continuation.',
    decisionWindow: '2026-09-08T12:00:00Z',
    modelAgreement: 0.85,
    dataQuality: 0.92,
    riskScore: 0.34,
    timestamp: '2026-09-07T08:15:00Z',
  },
  {
    id: 'sig-002',
    asset: 'SOL',
    type: 'accumulation',
    direction: 'bullish',
    probability: 0.71,
    grade: 'MEDIUM',
    marketRegimeId: 'regime-002',
    evidenceSummary:
      'Stealth accumulation pattern in mid-range wallets. DEX liquidity deepening with reduce in exchange inflows.',
    decisionWindow: '2026-09-09T00:00:00Z',
    modelAgreement: 0.72,
    dataQuality: 0.88,
    riskScore: 0.41,
    timestamp: '2026-09-07T07:30:00Z',
  },
  {
    id: 'sig-003',
    asset: 'BTC',
    type: 'reversal',
    direction: 'bearish',
    probability: 0.63,
    grade: 'MODERATE',
    marketRegimeId: 'regime-003',
    evidenceSummary:
      'Distribution detected across top-10 wallets. Open interest declining with basis narrowing. Historical reversal pattern at this level.',
    decisionWindow: '2026-09-08T18:00:00Z',
    modelAgreement: 0.68,
    dataQuality: 0.85,
    riskScore: 0.55,
    timestamp: '2026-09-07T06:45:00Z',
  },
  {
    id: 'sig-004',
    asset: 'ARB',
    type: 'liquidity',
    direction: 'bullish',
    probability: 0.59,
    grade: 'MODERATE',
    marketRegimeId: 'regime-004',
    evidenceSummary:
      'Liquidity pool imbalances suggest directional move. Cross-chain bridges showing net inflow to L2 ecosystem.',
    decisionWindow: '2026-09-09T12:00:00Z',
    modelAgreement: 0.64,
    dataQuality: 0.79,
    riskScore: 0.48,
    timestamp: '2026-09-07T05:00:00Z',
  },
  {
    id: 'sig-005',
    asset: 'OP',
    type: 'volatility',
    direction: 'neutral',
    probability: 0.55,
    grade: 'LOW',
    marketRegimeId: 'regime-004',
    evidenceSummary:
      'Implied volatility expansion ahead of ecosystem event. Direction unclear; range breakout likely within decision window.',
    decisionWindow: '2026-09-10T00:00:00Z',
    modelAgreement: 0.52,
    dataQuality: 0.81,
    riskScore: 0.62,
    timestamp: '2026-09-07T04:30:00Z',
  },
  {
    id: 'sig-006',
    asset: 'MATIC',
    type: 'distribution',
    direction: 'bearish',
    probability: 0.72,
    grade: 'HIGH',
    marketRegimeId: 'regime-003',
    evidenceSummary:
      'Sustained outflow from staking contracts with increasing CEX deposits. Whale cohort shifting allocation.',
    decisionWindow: '2026-09-08T06:00:00Z',
    modelAgreement: 0.77,
    dataQuality: 0.90,
    riskScore: 0.38,
    timestamp: '2026-09-07T03:15:00Z',
  },
];

/* ============================================================
   Predictions
   ============================================================ */

export const PREDICTIONS: PredictionReceipt[] = [
  {
    id: 'pred-001',
    asset: 'ETH',
    direction: 'bullish',
    probability: 0.78,
    expectedReturn: '+8.2%',
    expectedMFE: '+12.4%',
    expectedMAE: '-3.1%',
    decisionWindow: '48h',
    horizon: '5-day',
    risk: 'Moderate — 0.34 risk score',
    evidence: [
      'Institutional wallet accumulation cluster',
      'Funding rate normalization from -0.012% to +0.008%',
      'Volume profile supports breakout above $2,480',
      'Network activity at 6-month high',
    ],
    modelAgreement: 0.85,
    dataQuality: 0.92,
    modelVersion: 'v4.2.1',
    featureVersion: 'f2026.09.06',
    timestamp: '2026-09-07T08:15:00Z',
    invalidationConditions: [
      'Close below $2,380',
      'Funding rate inversion below -0.03%',
      'Exchange inflow spike exceeding 2 standard deviations',
    ],
    outcome: 'ACTIVE',
  },
  {
    id: 'pred-002',
    asset: 'SOL',
    direction: 'bullish',
    probability: 0.71,
    expectedReturn: '+6.5%',
    expectedMFE: '+9.8%',
    expectedMAE: '-2.7%',
    decisionWindow: '72h',
    horizon: '7-day',
    risk: 'Moderate-High — 0.41 risk score',
    evidence: [
      'Stealth accumulation in 500-2000 SOL range wallets',
      'DEX liquidity depth up 34% over 14 days',
      'Net exchange outflow sustained for 9 days',
    ],
    modelAgreement: 0.72,
    dataQuality: 0.88,
    modelVersion: 'v4.2.1',
    featureVersion: 'f2026.09.06',
    timestamp: '2026-09-07T07:30:00Z',
    invalidationConditions: [
      'Close below $138',
      'Staking exit queue exceeding 72h average',
    ],
    outcome: 'ACTIVE',
  },
  {
    id: 'pred-003',
    asset: 'BTC',
    direction: 'bearish',
    probability: 0.63,
    expectedReturn: '-4.1%',
    expectedMFE: '-6.8%',
    expectedMAE: '+1.9%',
    decisionWindow: '24h',
    horizon: '3-day',
    risk: 'Moderate-High — 0.55 risk score',
    evidence: [
      'Top-10 wallet cohort distribution pattern',
      'Open interest declining 18% over 48h',
      'Basis narrowing from +0.4% to +0.05%',
    ],
    modelAgreement: 0.68,
    dataQuality: 0.85,
    modelVersion: 'v4.2.1',
    featureVersion: 'f2026.09.06',
    timestamp: '2026-09-07T06:45:00Z',
    invalidationConditions: [
      'Strong close above $68,500',
      'Net whale accumulation resuming',
      'Funding rate surge above +0.05%',
    ],
    outcome: 'SIGNAL EXPIRED',
  },
  {
    id: 'pred-004',
    asset: 'ARB',
    direction: 'bullish',
    probability: 0.59,
    expectedReturn: '+5.8%',
    expectedMFE: '+8.3%',
    expectedMAE: '-3.5%',
    decisionWindow: '48h',
    horizon: '5-day',
    risk: 'Moderate — 0.48 risk score',
    evidence: [
      'Cross-chain bridge net inflow to Arbitrum',
      'Liquidity pool directional imbalance',
    ],
    modelAgreement: 0.64,
    dataQuality: 0.79,
    modelVersion: 'v4.2.1',
    featureVersion: 'f2026.09.06',
    timestamp: '2026-09-07T05:00:00Z',
    invalidationConditions: [
      'Bridge flow reversal exceeding 48h average',
      'Close below $0.82',
    ],
    outcome: 'NO VALID PREDICTION',
  },
  {
    id: 'pred-005',
    asset: 'OP',
    direction: 'neutral',
    probability: 0.55,
    expectedReturn: '+/- 3.2%',
    expectedMFE: '+5.1%',
    expectedMAE: '-4.8%',
    decisionWindow: '72h',
    horizon: '5-day',
    risk: 'High — 0.62 risk score',
    evidence: [
      'Implied volatility at 90th percentile',
      'Ecosystem governance event upcoming',
    ],
    modelAgreement: 0.52,
    dataQuality: 0.81,
    modelVersion: 'v4.2.1',
    featureVersion: 'f2026.09.06',
    timestamp: '2026-09-07T04:30:00Z',
    invalidationConditions: [
      'Event outcome significantly deviates from expectation',
    ],
    outcome: 'ACTIVE',
  },
];

/* ============================================================
   Wallets
   ============================================================ */

export const WALLETS: WalletNode[] = [
  {
    id: 'wal-001',
    address: '0x7a3F...b4f1',
    label: 'Whale Alpha',
    cohort: 'Tier 1 Accumulator',
    concentration: 0.82,
    behavioralPattern: 'Stealth accumulation with periodic consolidation',
    lastActivity: '2026-09-07T06:00:00Z',
    outcomeNote: 'Preceded 14.2% move over 5 days (historical)',
    leadTimeDays: 3,
  },
  {
    id: 'wal-002',
    address: '0x2e8D...c7a3',
    label: 'Smart Money Bridge',
    cohort: 'Cross-Chain Specialist',
    concentration: 0.71,
    behavioralPattern: 'Cross-chain bridge utilization for strategic positioning',
    lastActivity: '2026-09-07T04:30:00Z',
    outcomeNote: 'Early L2 rotation detected 2 days before leg',
    leadTimeDays: 2,
  },
  {
    id: 'wal-003',
    address: '0x9b1C...e5d8',
    label: 'Yield Strategist',
    cohort: 'DeFi Optimizer',
    concentration: 0.65,
    behavioralPattern: 'Complex multi-protocol yield positioning',
    lastActivity: '2026-09-06T22:15:00Z',
    outcomeNote: 'Positioning precedes TVL shifts',
    leadTimeDays: 4,
  },
  {
    id: 'wal-004',
    address: '0x4f7A...a2b9',
    label: 'Momentum Tracker',
    cohort: 'Trend Follower',
    concentration: 0.77,
    behavioralPattern: 'Late-stage momentum participation with trailing exits',
    lastActivity: '2026-09-07T02:00:00Z',
    outcomeNote: 'Consistent trend-following with ~68% directional accuracy',
    leadTimeDays: 1,
  },
  {
    id: 'wal-005',
    address: '0xd3E6...f1c4',
    label: 'Contrarian Signal',
    cohort: 'Reversal Hunter',
    concentration: 0.58,
    behavioralPattern: 'Contrarian positioning at exhaustion points',
    lastActivity: '2026-09-06T18:45:00Z',
    outcomeNote: 'Historically positions 1-2 days before reversals',
    leadTimeDays: 2,
  },
  {
    id: 'wal-006',
    address: '0x8c2B...d6e7',
    label: 'NFT-DeFi Hybrid',
    cohort: 'Multi-Vertical',
    concentration: 0.53,
    behavioralPattern: 'Simultaneous NFT and DeFi positioning',
    lastActivity: '2026-09-07T01:30:00Z',
    outcomeNote: 'Cross-vertical correlation with 3-day lead',
    leadTimeDays: 3,
  },
  {
    id: 'wal-007',
    address: '0x1a5F...c8d2',
    label: 'Staking Mover',
    cohort: 'Staking Specialist',
    concentration: 0.88,
    behavioralPattern: 'Large staking deposits followed by strategic withdrawals',
    lastActivity: '2026-09-06T20:00:00Z',
    outcomeNote: 'Staking exit precedes volatility events',
    leadTimeDays: 2,
  },
];

/* ============================================================
   Wallet Edges
   ============================================================ */

export const WALLET_EDGES: WalletEdge[] = [
  {
    source: 'wal-001',
    target: 'wal-004',
    relationship: 'Follow-the-leader',
    strength: 0.72,
  },
  {
    source: 'wal-002',
    target: 'wal-006',
    relationship: 'Cross-chain coordination',
    strength: 0.61,
  },
  {
    source: 'wal-003',
    target: 'wal-007',
    relationship: 'Yield-staking correlation',
    strength: 0.55,
  },
  {
    source: 'wal-005',
    target: 'wal-001',
    relationship: 'Contrarian complement',
    strength: 0.48,
  },
  {
    source: 'wal-001',
    target: 'wal-002',
    relationship: 'Asset flow correlation',
    strength: 0.67,
  },
  {
    source: 'wal-004',
    target: 'wal-003',
    relationship: 'Inverse positioning',
    strength: 0.42,
  },
];

/* ============================================================
   Ranking Boards
   ============================================================ */

export const RANKING_BOARDS: RankingBoard[] = [
  {
    id: 'rb-001',
    title: 'Top Intelligence Opportunities',
    description:
      'Ranked by composite intelligence score combining on-chain signals, model agreement, and wallet behavior.',
    entries: [
      { rank: 1, name: 'ETH', score: 92, change: '+3', confidence: 0.85, status: 'active' },
      { rank: 2, name: 'SOL', score: 87, change: '+5', confidence: 0.72, status: 'active' },
      { rank: 3, name: 'ARB', score: 78, change: '-1', confidence: 0.64, status: 'active' },
      { rank: 4, name: 'MATIC', score: 74, change: '+2', confidence: 0.77, status: 'watchlist' },
      { rank: 5, name: 'OP', score: 69, change: '-3', confidence: 0.52, status: 'active' },
    ],
  },
  {
    id: 'rb-002',
    title: 'Highest Conviction',
    description:
      'Signals with the strongest model agreement and data quality scores.',
    entries: [
      { rank: 1, name: 'ETH Momentum', score: 95, change: '+1', confidence: 0.85, status: 'active' },
      { rank: 2, name: 'MATIC Distribution', score: 88, change: '+4', confidence: 0.77, status: 'watchlist' },
      { rank: 3, name: 'SOL Accumulation', score: 82, change: '+2', confidence: 0.72, status: 'active' },
      { rank: 4, name: 'BTC Reversal', score: 76, change: '-2', confidence: 0.68, status: 'inactive' },
      { rank: 5, name: 'ARB Liquidity', score: 71, change: '0', confidence: 0.64, status: 'active' },
    ],
  },
  {
    id: 'rb-003',
    title: 'Best Wallets',
    description:
      'Highest-performing tracked wallets by historical outcome correlation.',
    entries: [
      { rank: 1, name: 'Whale Alpha (0x7a3F...b4f1)', score: 94, change: '+1', confidence: 0.88, status: 'active' },
      { rank: 2, name: 'Contrarian Signal (0xd3E6...f1c4)', score: 89, change: '+3', confidence: 0.82, status: 'active' },
      { rank: 3, name: 'Smart Money Bridge (0x2e8D...c7a3)', score: 85, change: '+2', confidence: 0.79, status: 'active' },
      { rank: 4, name: 'Staking Mover (0x1a5F...c8d2)', score: 81, change: '-1', confidence: 0.75, status: 'active' },
      { rank: 5, name: 'Yield Strategist (0x9b1C...e5d8)', score: 77, change: '0', confidence: 0.71, status: 'watchlist' },
    ],
  },
  {
    id: 'rb-004',
    title: 'Emerging Wallets',
    description:
      'Recently discovered wallets showing promising behavioral patterns.',
    entries: [
      { rank: 1, name: 'NFT-DeFi Hybrid (0x8c2B...d6e7)', score: 83, change: '+8', confidence: 0.71, status: 'active' },
      { rank: 2, name: 'New Accumulator (0x3fE1...a9c4)', score: 79, change: '+12', confidence: 0.65, status: 'active' },
      { rank: 3, name: 'MEV Watch (0x6d4B...e2f7)', score: 74, change: '+6', confidence: 0.58, status: 'watchlist' },
      { rank: 4, name: 'Bridge Sentinel (0xb8C3...d1a6)', score: 71, change: '+9', confidence: 0.54, status: 'active' },
    ],
  },
  {
    id: 'rb-005',
    title: 'Best Recent Predictions',
    description:
      'Recently resolved predictions ranked by outcome accuracy.',
    entries: [
      { rank: 1, name: 'SOL Breakout (Aug 28)', score: 96, change: '0', confidence: 0.91, status: 'active' },
      { rank: 2, name: 'ETH Range Break (Sep 1)', score: 93, change: '+1', confidence: 0.88, status: 'active' },
      { rank: 3, name: 'ARB Liquidity Pulse (Aug 25)', score: 88, change: '-1', confidence: 0.82, status: 'inactive' },
      { rank: 4, name: 'OP Volatility Expansion (Sep 3)', score: 84, change: '+2', confidence: 0.79, status: 'active' },
      { rank: 5, name: 'MATIC Staking Shift (Aug 30)', score: 81, change: '0', confidence: 0.76, status: 'active' },
    ],
  },
  {
    id: 'rb-006',
    title: 'Model Performance',
    description:
      'Signal type performance over the last 30-day evaluation window.',
    entries: [
      { rank: 1, name: 'Momentum Signals', score: 89, change: '+2', confidence: 0.85, status: 'active' },
      { rank: 2, name: 'Accumulation Signals', score: 84, change: '+5', confidence: 0.79, status: 'active' },
      { rank: 3, name: 'Distribution Signals', score: 81, change: '+1', confidence: 0.77, status: 'active' },
      { rank: 4, name: 'Reversal Signals', score: 74, change: '-3', confidence: 0.68, status: 'active' },
      { rank: 5, name: 'Liquidity Signals', score: 71, change: '+1', confidence: 0.64, status: 'active' },
      { rank: 6, name: 'Volatility Signals', score: 66, change: '-2', confidence: 0.52, status: 'watchlist' },
    ],
  },
  {
    id: 'rb-007',
    title: 'Regime Performance',
    description:
      'Regime detection accuracy over the trailing evaluation period.',
    entries: [
      { rank: 1, name: 'Low Volatility Range', score: 94, change: '+1', confidence: 0.91, status: 'active' },
      { rank: 2, name: 'Risk-On Expansion', score: 88, change: '+3', confidence: 0.82, status: 'active' },
      { rank: 3, name: 'Distribution Phase', score: 82, change: '+2', confidence: 0.74, status: 'active' },
      { rank: 4, name: 'Cautious Recovery', score: 76, change: '-1', confidence: 0.67, status: 'active' },
    ],
  },
  {
    id: 'rb-008',
    title: 'Most Consistent Signals',
    description:
      'Signals with the lowest variance in model agreement over time.',
    entries: [
      { rank: 1, name: 'ETH Accumulation', score: 91, change: '+1', confidence: 0.87, status: 'active' },
      { rank: 2, name: 'SOL Momentum', score: 86, change: '+2', confidence: 0.83, status: 'active' },
      { rank: 3, name: 'BTC Range Break', score: 83, change: '0', confidence: 0.80, status: 'active' },
      { rank: 4, name: 'MATIC Distribution', score: 79, change: '+3', confidence: 0.76, status: 'active' },
      { rank: 5, name: 'ARB Bridge Flow', score: 75, change: '-1', confidence: 0.72, status: 'watchlist' },
    ],
  },
];

/* ============================================================
   Research Briefs
   ============================================================ */

export const RESEARCH_BRIEFS: ResearchBrief[] = [
  {
    id: 'rb-001',
    title: 'Cross-Chain Bridge Flow Analysis: L2 Accumulation Patterns',
    category: 'On-Chain Intelligence',
    summary:
      'Analysis of bridge flows into Arbitrum and Optimism over the trailing 30 days reveals selective accumulation. Net inflows to L2 ecosystems have increased 28% compared to the prior month, with particular concentration in DeFi-related protocols.',
    keyFindings: [
      'Net L2 bridge inflow up 28% month-over-month',
      'Arbitrum captured 62% of cross-chain volume',
      'DeFi protocol deposits account for 71% of bridge activity',
      'Average deposit size increased from $12,400 to $18,700',
    ],
  },
  {
    id: 'rb-002',
    title: 'Whale Wallet Cohort Behavior: Distribution vs Accumulation',
    category: 'Wallet Intelligence',
    summary:
      'Top-50 wallets by holdings show diverging behavior. Tier 1 accumulators continue building positions while a subset has shifted to distribution. The net effect suggests a market in transition between accumulation and distribution phases.',
    keyFindings: [
      '34 of top-50 wallets showing net accumulation',
      '16 wallets in distribution mode (up from 9 last month)',
      'Distribution wallets skewed toward BTC and MATIC',
      'Accumulation wallets focused on ETH and SOL ecosystems',
    ],
  },
  {
    id: 'rb-003',
    title: 'Volatility Regime Detection: Breakout Probability Assessment',
    category: 'Market Structure',
    summary:
      'Current low-volatility compression across major assets suggests elevated breakout probability. Historical pattern matching indicates a resolution within the next 5-7 day window with directional bias toward the upside based on supporting on-chain flows.',
    keyFindings: [
      'Implied volatility at 30th percentile (trailing 90 days)',
      'Historical precedents show breakout within 5-7 days 78% of the time',
      'On-chain flow bias favors upside resolution',
      'Funding rates neutral — no overcrowding detected',
    ],
  },
  {
    id: 'rb-004',
    title: 'DeFi Yield Migration: Capital Flow Patterns',
    category: 'DeFi Intelligence',
    summary:
      'Capital is migrating from established yield protocols toward newer staking mechanisms. This rotation pattern has historically preceded broader market moves by 3-5 days as capital seeks yield before deploying into directional positions.',
    keyFindings: [
      'Staking TVL increased 19% over 14 days',
      'Lending protocol deposits declined 8%',
      'Yield optimization activity at 3-month high',
      'Capital rotation pattern historically precedes directional moves by 3-5 days',
    ],
  },
];

/* ============================================================
   Access Tiers
   ============================================================ */

export const ACCESS_TIERS: AccessTierDetail[] = [
  {
    id: 'open-circle',
    name: 'Open Circle',
    price: 'Free',
    period: 'forever',
    features: [
      'Market regime overview',
      'Limited signal access',
      'Community research briefs',
      'Basic wallet tracking',
    ],
    highlighted: false,
  },
  {
    id: 'vanguard',
    name: 'Vanguard',
    price: '$49',
    period: '/month',
    features: [
      'Full signal intelligence',
      'Prediction receipts with evidence',
      'Advanced wallet clustering',
      'Ranking boards access',
      'Priority research briefs',
    ],
    highlighted: false,
  },
  {
    id: 'warden',
    name: 'Warden',
    price: '$149',
    period: '/month',
    features: [
      'Everything in Vanguard',
      'Real-time wallet edge detection',
      'Custom signal filters',
      'Historical outcome analytics',
      'API access',
      'Dedicated support',
    ],
    highlighted: true,
  },
  {
    id: 'shogun',
    name: 'Shogun',
    price: '$499',
    period: '/month',
    features: [
      'Everything in Warden',
      'White-glove onboarding',
      'Custom model training data',
      'Direct analyst access',
      'Institutional-grade reporting',
      'Custom integrations',
    ],
    highlighted: false,
  },
];
